import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import NfcManager from "react-native-nfc-manager";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { useOutlet } from "reconnect.js";

interface AndroidPromptData {
  visible: boolean;
  message?: string;
}

function NfcPromptAndroid() {
  const theme = useTheme();
  const [visible, setVisible] = React.useState<boolean>(false);
  const animValue = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = useOutlet<AndroidPromptData>("androidPrompt");
  const { visible: _visible, message = "" } = data || {};

  React.useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
        delay: 200,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);

  function cancelNfcScan() {
    setTimeout(() => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }, 200);
    setData({ visible: false, message });
  }

  const bgAnimStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get("window").height + 100, 0],
        }),
      },
    ],
  };

  // Only render on Android
  if (Platform.OS !== 'android') {
    return null;
  }

  return (
    <Modal transparent={true} visible={visible}>
      <View style={[styles.wrapper]}>
        <View style={{ flex: 1 }} />

        <Animated.View style={[styles.prompt, promptAnimStyle, { backgroundColor: theme.colors.surface }]}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Icon source="nfc-variant" size={120} color={theme.colors.primary} />

            <Text variant="bodyLarge" style={{ marginTop: 20 }}>{message}</Text>
          </View>

          <Button mode="contained" onPress={cancelNfcScan}>
            CANCEL
          </Button>
        </Animated.View>

        <Animated.View style={[styles.promptBg, bgAnimStyle]} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  promptBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  prompt: {
    height: 300,
    alignSelf: "stretch",
    padding: 20,
    borderRadius: 20,
    margin: 20,
    zIndex: 2,
  },
});

export default NfcPromptAndroid;
