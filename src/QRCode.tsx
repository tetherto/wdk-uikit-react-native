// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
