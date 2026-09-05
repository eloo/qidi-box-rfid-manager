import { getColorName, getColorRgb } from "@/constants/colors";
import { getMaterialName } from "@/constants/materials";
import { formatKey, getAuthenticationAttempts } from "@/services/nfcAuth";
import type { NFCReadResult, NFCWriteResult, TagData } from "@/types";
import { Platform } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

// QIDI Box RFID Configuration
const SECTOR = 1;

class NFCService {
  private initialized = false;

  async init(): Promise<boolean> {
    if (this.initialized) return true;

    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        this.initialized = true;
      }

      return supported;
    } catch {
      return false;
    }
  }

  async isEnabled(): Promise<boolean> {
    try {
      return await NfcManager.isEnabled();
    } catch {
      return false;
    }
  }

  async goToNfcSetting() {
    return NfcManager.goToNfcSetting();
  }

  async readTag(): Promise<NFCReadResult> {
    try {
      // Check platform support
      if (Platform.OS !== "android") {
        return {
          success: false,
          error: "NFC reading is currently only supported on Android devices",
        };
      }

      await NfcManager.requestTechnology(NfcTech.MifareClassic);

      await this.authenticate();

      // Use Android-specific handler with platform guard
      if (!NfcManager.mifareClassicHandlerAndroid) {
        throw new Error(
          "Mifare Classic handler not available on this platform",
        );
      }

      const block =
        await NfcManager.mifareClassicHandlerAndroid.mifareClassicSectorToBlock(
          SECTOR,
        );
      const data =
        await NfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(
          block,
        );

      const materialCode = data[0];
      const colorCode = data[1];
      const manufacturerCode = data[2];

      const tagData: TagData = {
        materialCode,
        colorCode,
        manufacturerCode,
        materialName: getMaterialName(materialCode),
        colorName: getColorName(colorCode),
        colorRgb: getColorRgb(colorCode),
        rawData: Array.from(data),
      };

      return {
        success: true,
        data: tagData,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || "Failed to read tag",
      };
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async writeTag(
    materialCode: number,
    colorCode: number,
    manufacturerCode: number = 1,
  ): Promise<NFCWriteResult> {
    try {
      // Check platform support
      if (Platform.OS !== "android") {
        return {
          success: false,
          error: "NFC writing is currently only supported on Android devices",
        };
      }

      // Validate input ranges
      if (materialCode < 1 || materialCode > 50) {
        return {
          success: false,
          error: "Material code must be between 1 and 50",
        };
      }
      if (colorCode < 1 || colorCode > 24) {
        return {
          success: false,
          error: "Color code must be between 1 and 24",
        };
      }
      if (manufacturerCode < 0 || manufacturerCode > 255) {
        return {
          success: false,
          error: "Manufacturer code must be between 0 and 255",
        };
      }

      await NfcManager.requestTechnology(NfcTech.MifareClassic);

      await this.authenticate();

      // Check handler availability
      if (!NfcManager.mifareClassicHandlerAndroid) {
        throw new Error(
          "Mifare Classic handler not available on this platform",
        );
      }

      // Create new data array (16 bytes)
      const newData = new Array<number>(16).fill(0);
      newData[0] = materialCode;
      newData[1] = colorCode;
      newData[2] = manufacturerCode;

      // Write the block
      const block =
        await NfcManager.mifareClassicHandlerAndroid.mifareClassicSectorToBlock(
          SECTOR,
        );

      await NfcManager.mifareClassicHandlerAndroid.mifareClassicWriteBlock(
        block,
        newData,
      );

      // Verify write by reading back
      const verifyData =
        await NfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(
          block,
        );
      if (
        verifyData[0] !== materialCode ||
        verifyData[1] !== colorCode ||
        verifyData[2] !== manufacturerCode
      ) {
        throw new Error("Write verification failed");
      }

      return {
        success: true,
      };
    } catch (error: any) {
      // console.error("Write error:", error);
      return {
        success: false,
        error: error.message || "Failed to write tag",
      };
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async cleanup() {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch {
      // Ignore errors during cleanup
    }
  }

  private async authenticate() {
    // Platform check before authentication
    if (Platform.OS !== "android") {
      throw new Error("Authentication is only supported on Android devices");
    }

    if (!NfcManager.mifareClassicHandlerAndroid) {
      throw new Error("Mifare Classic handler not available");
    }

    const attempts = getAuthenticationAttempts(SECTOR);
    const tried: string[] = [];
    let lastErr: unknown = null;

    for (const [authMethod, key] of attempts) {
      const formattedKey = formatKey(key);
      tried.push(`${authMethod}:${formattedKey}`);

      try {
        if (authMethod === "A") {
          await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
            SECTOR,
            key,
          );
        } else {
          await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateB(
            SECTOR,
            key,
          );
        }

        return;
      } catch (error) {
        lastErr = error;
      }
    }

    if (lastErr) {
      console.error("NFC auth failed. Tried:", tried, lastErr);
      throw new Error(
        `Authentication failed for sector ${SECTOR}. Tried: ${tried.join(", ")}`,
      );
    }

    throw new Error(`Authentication failed for sector ${SECTOR}`);
  }
}

export default new NFCService();
