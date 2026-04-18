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

import type { Theme, BrandConfig } from './types';

const defaultTypography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

const defaultSpacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

const defaultBorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#FF6501',
    primaryLight: '#FF8533',
    primaryDark: '#CC5001',
    onPrimary: '#FFFFFF',
    secondary: '#6B7280',
    secondaryLight: '#9CA3AF',
    secondaryDark: '#4B5563',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceVariant: '#F3F4F6',
    surfaceElevated: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    textDisabled: '#9CA3AF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
  },
  typography: defaultTypography,
  spacing: defaultSpacing,
  borderRadius: defaultBorderRadius,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#FF6501',
    primaryLight: '#FF8533',
    primaryDark: '#CC5001',
    onPrimary: '#FFFFFF',
    secondary: '#9CA3AF',
    secondaryLight: '#D1D5DB',
    secondaryDark: '#6B7280',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2A2A2A',
    surfaceElevated: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textDisabled: '#6B7280',
    border: '#374151',
    borderLight: '#1F2937',
    error: '#FF3B30',
    warning: '#FFCC00',
    success: '#4CAF50',
    info: '#007AFF',
  },
  typography: defaultTypography,
  spacing: defaultSpacing,
  borderRadius: defaultBorderRadius,
};

export function createThemeFromBrand(
  brand: BrandConfig,
  mode: 'light' | 'dark' = 'light'
): Theme {
  const baseTheme = mode === 'light' ? lightTheme : darkTheme;

  // Generate color variations from primary color
  const lightenColor = (color: string, amount: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * amount);
    const R = Math.floor(num / 65536) + amt;
    const G = Math.floor((num % 65536) / 256) + amt;
    const B = (num % 256) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const darkenColor = (color: string, amount: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * amount);
    const R = Math.floor(num / 65536) - amt;
    const G = Math.floor((num % 65536) / 256) - amt;
    const B = (num % 256) - amt;
    return (
      '#' +
      (
        0x1000000 +
        (R > 0 ? R : 0) * 0x10000 +
        (G > 0 ? G : 0) * 0x100 +
        (B > 0 ? B : 0)
      )
        .toString(16)
        .slice(1)
    );
  };

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: brand.primaryColor,
      primaryLight: lightenColor(brand.primaryColor, 20),
      primaryDark: darkenColor(brand.primaryColor, 20),
      secondary: brand.secondaryColor || baseTheme.colors.secondary,
      secondaryLight: brand.secondaryColor
        ? lightenColor(brand.secondaryColor, 20)
        : baseTheme.colors.secondaryLight,
      secondaryDark: brand.secondaryColor
        ? darkenColor(brand.secondaryColor, 20)
        : baseTheme.colors.secondaryDark,
    },
    typography: {
      ...baseTheme.typography,
      fontFamily: {
        ...baseTheme.typography.fontFamily,
        ...brand.fontFamily,
      },
    },
  };
}
