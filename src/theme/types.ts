export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  onPrimary: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  borderLight: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeight: {
    regular: '400';
    medium: '500';
    semiBold: '600';
    bold: '700';
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  base: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface BorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
}

export interface ComponentVariant {
  primary: any;
  secondary: any;
  tertiary: any;
  outline: any;
  ghost: any;
}

export interface ComponentOverrides {
  TransactionItem?: {
    container?: any;
    icon?: any;
    title?: any;
    subtitle?: any;
    amount?: any;
  };
  TransactionList?: {
    container?: any;
    emptyState?: any;
    emptyStateText?: any;
  };
  Balance?: {
    container?: any;
    title?: any;
    amount?: any;
  };
  [key: string]: any;
}

export interface Theme {
  mode: ThemeMode;
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  componentVariants?: ComponentVariant;
  componentOverrides?: ComponentOverrides;
}

export interface BrandConfig {
  primaryColor: string;
  secondaryColor?: string;
  fontFamily?: {
    regular?: string;
    medium?: string;
    semiBold?: string;
    bold?: string;
  };
}
