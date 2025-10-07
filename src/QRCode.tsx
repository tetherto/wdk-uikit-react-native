import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { QrCodeSvg } from 'react-native-qr-svg';
import { useTheme } from './theme';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: any;
}

export function QRCode({
  value,
  size = 200,
  color,
  backgroundColor = 'transparent',
  label,
  containerStyle,
  labelStyle,
}: QRCodeProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => {
    const overrides = theme.componentOverrides?.QRCode || {};

    return StyleSheet.create({
      container: {
        alignItems: 'center',
        ...overrides.container,
      },
      label: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        ...overrides.label,
      },
      qr: {
        backgroundColor: 'transparent',
        ...overrides.qr,
      },
    });
  }, [theme]);

  const effectiveColor = color || theme.colors.primary;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <QrCodeSvg
        dotColor={effectiveColor}
        style={[styles.qr, { backgroundColor }]}
        value={value}
        frameSize={size}
        contentCells={5}
      />
    </View>
  );
}
