import type { TagData } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import ColorPreview from "./ColorPreview";

interface TagDataCardProps {
  data: TagData | null;
}

export default function TagDataCard({ data }: TagDataCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Current Tag Data
        </Text>

        <View style={styles.row}>
          <Text variant="bodyMedium" style={styles.label}>
            Material:
          </Text>
          <Text variant="bodyMedium" style={styles.value}>
            {data && (
              <>
                {data.materialName} (Code: {data.materialCode})
              </>
            )}
          </Text>
        </View>

        <View style={styles.row}>
          <Text variant="bodyMedium" style={styles.label}>
            Color:
          </Text>
          {data && <ColorPreview color={data.colorRgb} name={data.colorName} />}
        </View>

        {/* <View style={styles.row}>
          <Text variant="bodyMedium" style={styles.label}>
            RGB:
          </Text>
          <Text variant="bodyMedium" style={styles.value}>
            {data.colorRgb}
          </Text>
        </View>

				<View style={styles.row}>
					<Text variant="bodyMedium" style={styles.label}>
						Manufacturer:
					</Text>
					<Text variant="bodyMedium" style={styles.value}>
						{data.manufacturerCode === 0 ? "Generic" : "QIDI"}
					</Text>
				</View>

				 <View style={styles.row}>
          <Text variant="bodyMedium" style={styles.label}>
            Raw Data:
          </Text>
          <Text variant="bodySmall" style={[styles.value, styles.mono]}>
            {data.rawData}
          </Text>
        </View>  */}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  label: {
    width: 100,
    fontWeight: "600",
  },
  value: {
    flex: 1,
  },
  mono: {
    fontFamily: "monospace",
  },
});
