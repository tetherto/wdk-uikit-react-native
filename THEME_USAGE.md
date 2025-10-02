# Theme Provider Usage Guide

## Basic Setup

Wrap your app with the `ThemeProvider` to enable theming:

```tsx
import { ThemeProvider } from 'wdk-uikit-react-native';

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

## Features

### 1. Automatic Dark/Light Mode

The theme automatically switches based on system preferences:

```tsx
<ThemeProvider defaultMode="auto">{/* Will use system theme */}</ThemeProvider>
```

### 2. Manual Theme Control

```tsx
import { useTheme } from 'wdk-uikit-react-native';

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
<ThemeProvider
  brandConfig={{
    primaryColor: '#007AFF',
    secondaryColor: '#FF3B30',
    fontFamily: {
      regular: 'Inter-Regular',
      bold: 'Inter-Bold',
    },
  }}
>
  {/* Your app */}
</ThemeProvider>
```

### 4. Custom Themes

Provide completely custom themes:

```tsx
const myLightTheme = {
  mode: 'light',
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    // ... other colors
  },
  // ... typography, spacing, etc.
};

<ThemeProvider customLightTheme={myLightTheme}>{/* Your app */}</ThemeProvider>;
```

### 5. Component Overrides

Customize individual components:

```tsx
<ThemeProvider
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
import { useTheme } from 'wdk-uikit-react-native';

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

- `primary`, `primaryLight`, `primaryDark` - Main brand colors
- `secondary`, `secondaryLight`, `secondaryDark` - Secondary brand colors
- `background` - Main background color
- `surface` - Card/container background
- `surfaceVariant` - Alternative surface color
- `text`, `textSecondary`, `textDisabled` - Text hierarchy
- `border`, `borderLight` - Border colors
- `error`, `warning`, `success`, `info` - Status colors

### Typography

- Font families (regular, medium, semiBold, bold)
- Font sizes (xs, sm, base, lg, xl, xxl, xxxl)
- Font weights

### Spacing

- Consistent spacing scale (xs, sm, md, lg, xl, xxl, xxxl)

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
import { createThemeFromBrand } from 'wdk-uikit-react-native';

const myTheme = createThemeFromBrand(
  {
    primaryColor: '#FF6501',
    secondaryColor: '#6B7280',
  },
  'dark'
); // 'light' or 'dark'
```

## Component Variants (Future)

The theme system includes support for component variants (primary, secondary, tertiary, outline, ghost) that can be implemented in custom components for consistent styling across the app.
