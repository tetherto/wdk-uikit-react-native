# @tetherto/wdk-uikit-react-native

A set of reusable, stateless components anyone can use to ship production-quality wallet or wallet-enabled apps fast.

To see it in action, please check the  Wallet [WDK React Native Starter](https://github.com/tetherto/wdk-starter-react-native), a complete wallet application built with WDK and WDK UI Kit.

## 🔍 About WDK

This repository is part of the [**WDK (Wallet Development Kit)**](https://wallet.tether.io/) project, which empowers developers to build secure, non-custodial wallets with unified blockchain access, stateless architecture, and complete user control. 

For detailed documentation about the complete WDK ecosystem, visit [docs.wallet.tether.io](https://docs.wallet.tether.io).


## 🌟 Features

- Ready-made wallet building blocks: amount input, asset selector, address input, QR code, balance, transaction item/list, seed phrase
- Themeable out of the box: light/dark modes, brand colors, `ThemeProvider` and `useTheme` API
- Type-safe, documented props and theme types for excellent DX
- Composable and unopinionated: no business logic; wire in your own data/state from WDK or elsewhere
- Mobile-first: React Native primitives with sensible defaults and accessible touch targets
- Customizable visuals: override per-component variants via `componentVariants` or fine-tune with `componentOverrides`

## ⬇️ Install

```bash
npm install @tetherto/wdk-uikit-react-native
```

## 🚀 Quick Start

Wrap your app with the theme and render a list.

```tsx
import { ThemeProvider, lightTheme, TransactionList } from '@tetherto/wdk-uikit-react-native'

export default function App() {
  const transactions = [{ id: '1', token: 'USDT', amount: '10.00', fiatAmount: '10.00', fiatCurrency: 'USD', network: 'Ethereum', type: 'received' }]

  return (
    <ThemeProvider initialTheme={lightTheme}>
      <TransactionList transactions={transactions} />
    </ThemeProvider>
  )
}
```

## 🔌 Use with WDK

Wire data from WDK into these UI components.

```tsx
import * as React from 'react'
import WDK from '@tetherto/wdk'
import WalletManagerEvm from '@tetherto/wdk-wallet-evm'
import WalletManagerBtc from '@tetherto/wdk-wallet-btc'
import { ThemeProvider, lightTheme, Balance, CryptoAddressInput, AmountInput } from '@tetherto/wdk-uikit-react-native'

export function WalletScreen() {
  const [balance, setBalance] = React.useState<number | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function bootstrap() {
      try {

        const wdkWithWallets = new WDK('your seed phrase')
          .registerWallet('bitcoin', WalletManagerBtc, { provider: 'https://blockstream.info/api' })

        const accounts = await wdkWithWallets.getAccount('bitcoin', 0)
        const address = await accounts.getAddress()
        const balance = await accounts.getBalance()

        setBalance(balance)
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error')
      }
    }

    bootstrap()
  }, [])

  return (
    <ThemeProvider initialTheme={lightTheme}>
      <CryptoAddressInput onQRScan={() => {/** do something */}} />
      <AmountInput
        label="Enter Amount"
        tokenSymbol="BTC"
        value={amount}
        onChangeText={setAmount}
        tokenBalance={balance ?? '0'}
        inputMode={'token'}
        onUseMax={() => setAmount(balance ?? 0)}
      />
      <Balance value={balance ?? 0} currency="BTC" />
    </ThemeProvider>
  )
}
```

## 📚 Components

| Component | Description |
| --- | --- |
| `AmountInput` | Numeric input with token/fiat toggle, balance helper and Max action. |
| `AssetSelector` | Token search & pick list with recent items and empty states. |
| `NetworkSelector` | Network picker with gas level indicators and colors. |
| `Balance` | Displays a balance value with optional masking and custom loader. |
| `CryptoAddressInput` | Address input with QR scan and paste helpers, validation state. |
| `QRCode` | QR renderer for addresses/payment requests with labeling and styling. |
| `TransactionItem` | Single transaction row (sent/received) with token, amounts, network. |
| `TransactionList` | Virtualized list of transactions using `TransactionItem`. |
| `SeedPhrase` | Grid of seed words with optional editing and loading states. |

## 🧾 Component APIs

Each component exposes a typed, minimal API designed to work with WDK data models. Below are the primary props. For example usage, see the Quick Start and the Template Wallet.

### AmountInput

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| label | string | no | 'Enter Amount' | Field label |
| value | string | yes | — | Amount text |
| onChangeText | (text: string) => void | yes | — | Called when text changes |
| tokenSymbol | string | yes | — | Token code, e.g. 'ETH' |
| tokenBalance | string | yes | — | Token balance (e.g. '1.23') |
| tokenBalanceUSD | string | yes | — | Balance in fiat (e.g. '$4200.00') |
| inputMode | 'token' | 'fiat' | yes | — | Current input mode |
| onToggleInputMode | () => void | yes | — | Switch token/fiat |
| onUseMax | () => void | yes | — | Fill with max amount |
| error | string | no | — | Error message |
| editable | boolean | no | true | Disable input when false |

### AssetSelector

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| tokens | Token[] | yes | — | Full list of tokens to display/filter |
| recentTokens | string[] | yes | — | Array of recent token names to show in the Recent row |
| onSelectToken | (t: Token) => void | yes | — | Called when user picks a token; disabled when `hasBalance` is false |

`Token` type:

```ts
type Token = {
  id: string
  symbol: string
  name: string
  balance: string
  balanceUSD: string
  icon: ImageSourcePropType
  color: string
  network?: string
  hasBalance: boolean
}
```

### Balance

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| value | number | no | 0 | Balance number |
| isLoading | boolean | no | false | Show loader state |
| Loader | React.ComponentType | no | — | Custom loader component |
| showHide | boolean | no | true | Toggle hide/show balance |
| currency | string | no | 'USD' | Currency label |
| EyeOpenIcon | React.ComponentType | no | default | Shown when hidden |
| EyeClosedIcon | React.ComponentType | no | default | Shown when visible |

### CryptoAddressInput

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| label | string | no | 'Recipient Address' | Field label |
| value | string | yes | — | Address text |
| onChangeText | (text: string) => void | yes | — | Called when text changes |
| placeholder | string | no | 'T08p3BGPIuh1l934IIflu....Kc2GXhKc' | Hint text |
| onPaste | () => void | no | — | Paste action handler |
| onQRScan | () => void | no | — | Open QR scanner |
| editable | boolean | no | true | Disable input when false |
| error | string | no | — | Error message |

### QRCode

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| value | string | yes | — | Data to encode |
| size | number | no | 200 | QR side in px |
| color | string | no | theme.primary | Dot color |
| backgroundColor | string | no | 'transparent' | Background behind QR |
| label | string | no | — | Optional title above QR |
| containerStyle | ViewStyle | no | — | Wrapper style |
| labelStyle | any | no | — | Style for label |

### TransactionItem

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| transaction | { id: string; token: string; amount: string; fiatAmount: string; fiatCurrency: string; network: string; type: 'sent' | 'received' } | yes | — | Transaction data |
| onPress | () => void | no | — | Row press handler |

### TransactionList

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| transactions | Transaction[] | yes | — | List of transactions |

### NetworkSelector

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| networks | { id: string; name: string; gasLevel: 'High' | 'Normal' | 'Low'; gasColor: string; icon: string | any; color: string }[] | yes | — | Networks to pick from |
| onSelectNetwork | (network: Network) => void | yes | — | Called when a network is chosen |

### SeedPhrase

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| words | string[] | yes | — | Seed words list (12/24, etc.) |
| editable | boolean | no | false | Allow editing inputs |
| onWordChange | (index: number, word: string) => void | no | — | Called on word edit |
| onKeyPress | (index: number, key: string) => void | no | — | Handle key press (e.g. Backspace navigation) |
| isLoading | boolean | no | false | Show generating/loading state |


## 🎨 Theming

Use a built-in theme or create one from your brand. The theming system is lightweight and flexible:

- Follow system light/dark or force a mode
- Start with `lightTheme`/`darkTheme`, or generate from brand colors via `createThemeFromBrand`
- Access theme values anywhere with `useTheme`
- Customize visuals globally with `componentVariants` and surgically with `componentOverrides`

See full guidance in [`THEME_USAGE.md`](./THEME_USAGE.md).

```tsx
import { ThemeProvider, darkTheme, createThemeFromBrand } from '@tetherto/wdk-uikit-react-native'

const brandTheme = createThemeFromBrand({
  primaryColor: '#0F62FE',
  secondaryColor: '#6F6F6F',
  fontFamily: { regular: 'System', bold: 'System' },
}, 'light')

export function Root() {
  return (
    <ThemeProvider initialTheme={brandTheme /* or darkTheme */}>
      {/* your UI */}
    </ThemeProvider>
  )
}
```
### Theme API

Key types: `Theme`, `ThemeMode`, `ColorPalette`, `Typography`, `Spacing`, `BorderRadius`, `ComponentVariant`, `ComponentOverrides`, `BrandConfig`.

`Theme` shape:

```ts
type Theme = {
  mode: 'light' | 'dark' | 'auto'
  colors: ColorPalette
  typography: Typography
  spacing: Spacing
  borderRadius: BorderRadius
  componentVariants?: ComponentVariant
  componentOverrides?: ComponentOverrides
}
```

`BrandConfig` for `createThemeFromBrand`:

```ts
type BrandConfig = {
  primaryColor: string
  secondaryColor?: string
  fontFamily?: {
    regular?: string
    medium?: string
    semiBold?: string
    bold?: string
  }
}
```

Notes:
- `mode` can be 'light', 'dark', or 'auto' (follows system settings).
- `componentVariants` sets default variants/styles per component key (e.g., `AmountInput.default`, `TransactionItem.compact`).
- `componentOverrides` enables targeted overrides for specific component parts (e.g., paddings, font sizes, colors).

Key theme pieces at a glance:

| Token | Purpose |
| --- | --- |
| `colors` | Brand palette and semantic UI colors. |
| `typography` | Font families, sizes, weights. |
| `spacing` | Consistent spacing scale for paddings/margins. |
| `borderRadius` | Rounded corners scale. |
| `componentVariants` | Default visual variants by component. |
| `componentOverrides` | Fine-grained style overrides by component part. |


## 🧪 Full Example Integration

Check the [WDK React Native Starter Wallet](https://github.com/tetherto/wdk-starter-react-native), a complete wallet application built with WDK and WDK UI Kit.

## 🛠️ Development

```bash
npm install
npm run lint
npm test
```

## 📜 License

This project is licensed under the Apache-2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Read the [code of conduct](CODE_OF_CONDUCT.md)
- See [contributing guide](CONTRIBUTING.md)

## 🆘 Support

For support, please open an issue on the GitHub repository.
