import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface ColorPreviewProps {
  color: string;
  name: string;
  size?: number;
}

export default function ColorPreview({ color, name, size = 24 }: ColorPreviewProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.colorBox,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: theme.colors.outline,
          },
        ]}
      />
      <Text variant="bodyMedium" style={styles.text}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorBox: {
    borderWidth: 1,
  },
  text: {
    flex: 1,
  },
});
