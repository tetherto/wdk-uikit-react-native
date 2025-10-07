# Theme Provider Usage Guide

## Basic Setup

Wrap your app with the `ThemeProvider` to enable theming:

```tsx
import { ThemeProvider, lightTheme } from '@tetherto/wdk-uikit-react-native';

function App() {
  return (
    <ThemeProvider initialTheme={lightTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Features

### 1. Automatic Dark/Light Mode

The theme automatically switches based on system preferences:

```tsx
<ThemeProvider defaultMode="auto" initialTheme={lightTheme}>
  {/* Will use system theme */}
</ThemeProvider>
```

### 2. Manual Theme Control

```tsx
import { useTheme } from '@tetherto/wdk-uikit-react-native';

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

### 3. Brand Integration

Apply your brand colors and fonts:

```tsx
import { ThemeProvider, createThemeFromBrand } from '@tetherto/wdk-uikit-react-native';

const brandTheme = createThemeFromBrand({
  primaryColor: '#007AFF',
  secondaryColor: '#FF3B30',
  fontFamily: {
    regular: 'Inter-Regular',
    bold: 'Inter-Bold',
  },
}, 'light');

<ThemeProvider initialTheme={brandTheme}>
  {/* Your app */}
</ThemeProvider>
```

### 4. Custom Themes

Provide completely custom themes:

```tsx
import { ThemeProvider } from '@tetherto/wdk-uikit-react-native';

const myLightTheme = {
  mode: 'light' as const,
  colors: {
    primary: '#007AFF',
    primaryLight: '#4DA6FF',
    primaryDark: '#0056CC',
    onPrimary: '#FFFFFF',
    secondary: '#FF3B30',
    secondaryLight: '#FF6B60',
    secondaryDark: '#CC2F26',
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
  typography: {
    fontFamily: { regular: 'System', medium: 'System', semiBold: 'System', bold: 'System' },
    fontSize: { xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 30 },
    fontWeight: { regular: '400', medium: '500', semiBold: '600', bold: '700' },
  },
  spacing: { xs: 4, sm: 8, base: 12, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 },
  borderRadius: { none: 0, sm: 4, md: 8, lg: 16, xl: 24, xxl: 32, full: 9999 },
};

<ThemeProvider customLightTheme={myLightTheme}>
  {/* Your app */}
</ThemeProvider>
```

### 5. Component Overrides

Customize individual components:

```tsx
<ThemeProvider
  initialTheme={lightTheme}
  componentOverrides={{
    TransactionItem: {
      container: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    TransactionList: {
      emptyStateText: {
        color: '#999999',
      },
    },
  }}
>
  {/* Your app */}
</ThemeProvider>
```

### 6. Using Theme in Components

Access theme values in your components:

```tsx
import { useTheme } from '@tetherto/wdk-uikit-react-native';

function MyComponent() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
      }}
    >
      <Text style={{ color: theme.colors.text }}>Hello World</Text>
    </View>
  );
}
```

## Theme Structure

### Colors (Semantic Naming)

- `primary`, `primaryLight`, `primaryDark`, `onPrimary` - Main brand colors
- `secondary`, `secondaryLight`, `secondaryDark` - Secondary brand colors
- `background` - Main background color
- `surface`, `surfaceVariant`, `surfaceElevated` - Card/container backgrounds
- `text`, `textSecondary`, `textDisabled` - Text hierarchy
- `border`, `borderLight` - Border colors
- `error`, `warning`, `success`, `info` - Status colors

### Typography

- Font families (regular, medium, semiBold, bold)
- Font sizes (xs, sm, base, md, lg, xl, xxl, xxxl)
- Font weights (regular: '400', medium: '500', semiBold: '600', bold: '700')

### Spacing

- Consistent spacing scale (xs, sm, base, md, lg, xl, xxl, xxxl)

### Border Radius

- Consistent radius scale (none, sm, md, lg, xl, xxl, full)

## Advanced Usage

### Dynamic Theme Updates

```tsx
function Settings() {
  const { setBrandConfig, setComponentOverrides } = useTheme();

  const updateBrand = () => {
    setBrandConfig({
      primaryColor: '#FF6501',
    });
  };

  const customizeTransactions = () => {
    setComponentOverrides({
      TransactionItem: {
        container: {
          backgroundColor: 'rgba(255, 101, 1, 0.1)',
        },
      },
    });
  };

  return (
    <>
      <Button onPress={updateBrand}>Update Brand</Button>
      <Button onPress={customizeTransactions}>Customize Transactions</Button>
    </>
  );
}
```

### Creating Theme from Brand

```tsx
import { createThemeFromBrand } from '@tetherto/wdk-uikit-react-native';

const myTheme = createThemeFromBrand(
  {
    primaryColor: '#FF6501',
    secondaryColor: '#6B7280',
  },
  'dark'
); // 'light' or 'dark'
```