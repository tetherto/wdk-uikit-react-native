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

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import type { ColorSchemeName } from 'react-native';
import { darkTheme, lightTheme, createThemeFromBrand } from './defaultThemes';
import type {
  Theme,
  ThemeMode,
  BrandConfig,
  ComponentOverrides,
} from './types';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setBrandConfig: (config: BrandConfig) => void;
  setComponentOverrides: (overrides: ComponentOverrides) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  brandConfig?: BrandConfig;
  customLightTheme?: Theme;
  customDarkTheme?: Theme;
  componentOverrides?: ComponentOverrides;
}

export function ThemeProvider({
  children,
  defaultMode = 'auto',
  brandConfig,
  customLightTheme,
  customDarkTheme,
  componentOverrides: initialComponentOverrides,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [systemColorScheme, setSystemColorScheme] =
    useState<ColorSchemeName | null>(Appearance.getColorScheme() ?? null);
  const [brandConfigState, setBrandConfigState] = useState<
    BrandConfig | undefined
  >(brandConfig);
  const [componentOverrides, setComponentOverrides] = useState<
    ComponentOverrides | undefined
  >(initialComponentOverrides);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme ?? null);
    });

    return () => subscription?.remove();
  }, []);

  const theme = useMemo(() => {
    let effectiveMode: 'light' | 'dark';

    if (mode === 'auto') {
      effectiveMode = systemColorScheme === 'dark' ? 'dark' : 'light';
    } else {
      effectiveMode = mode;
    }

    let selectedTheme: Theme;

    if (brandConfigState) {
      selectedTheme = createThemeFromBrand(brandConfigState, effectiveMode);
    } else if (effectiveMode === 'light') {
      selectedTheme = customLightTheme || lightTheme;
    } else {
      selectedTheme = customDarkTheme || darkTheme;
    }

    // Apply component overrides
    if (componentOverrides) {
      selectedTheme = {
        ...selectedTheme,
        componentOverrides: {
          ...selectedTheme.componentOverrides,
          ...componentOverrides,
        },
      };
    }

    return selectedTheme;
  }, [
    mode,
    systemColorScheme,
    brandConfigState,
    customLightTheme,
    customDarkTheme,
    componentOverrides,
  ]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setMode,
      setBrandConfig: setBrandConfigState,
      setComponentOverrides,
    }),
    [theme, mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
