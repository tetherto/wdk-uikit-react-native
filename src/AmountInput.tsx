import { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from './theme';

interface AmountInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  tokenSymbol: string;
  tokenBalance: string;
  tokenBalanceUSD: string;
  inputMode: 'token' | 'fiat';
  onToggleInputMode: () => void;
  onUseMax: () => void;
  error?: string;
  editable?: boolean;
}

export function AmountInput({
  label = 'Enter Amount',
  value,
  onChangeText,
  tokenSymbol,
  tokenBalance,
  tokenBalanceUSD,
  inputMode,
  onToggleInputMode,
  onUseMax,
  error,
  editable = true,
}: AmountInputProps) {
  const { theme } = useTheme();

  const formatTokenSymbol = useCallback((symbol: string) => {
    if (symbol === 'USDT') return 'USD₮';
    if (symbol === 'XAUT') return 'XAU₮';
    return symbol;
  }, []);

  const getPlaceholder = useCallback(() => {
    if (inputMode === 'token') {
      return `${formatTokenSymbol(tokenSymbol)} 0.00`;
    }
    return '$ 0.00';
  }, [inputMode, tokenSymbol, formatTokenSymbol]);

  const getCurrencyText = useCallback(() => {
    if (inputMode === 'token') {
      return formatTokenSymbol(tokenSymbol);
    }
    return 'USD';
  }, [inputMode, tokenSymbol, formatTokenSymbol]);

  const getBalanceDisplay = useCallback(() => {
    const displaySymbol = formatTokenSymbol(tokenSymbol);
    if (inputMode === 'token') {
      return `Balance: ${tokenBalance} ${displaySymbol}`;
    }
    return `Balance: ${tokenBalanceUSD}`;
  }, [
    inputMode,
    tokenBalance,
    tokenBalanceUSD,
    tokenSymbol,
    formatTokenSymbol,
  ]);

  const styles = useMemo(() => {
    const overrides = theme.componentOverrides?.AmountInput || {};

    return StyleSheet.create({
      container: {
        marginBottom: theme.spacing.lg,
        ...overrides.container,
      },
      sectionTitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        ...overrides.label,
      },
      amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: 'transparent',
        ...overrides.inputContainer,
      },
      errorContainer: {
        borderColor: theme.colors.error,
        ...overrides.errorContainer,
      },
      amountInput: {
        flex: 1,
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        ...overrides.input,
      },
      currencyToggle: {
        backgroundColor: theme.colors.surfaceVariant,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        ...overrides.currencyToggle,
      },
      currencyToggleText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        ...overrides.currencyToggleText,
      },
      balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...overrides.balanceRow,
      },
      useMaxText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        ...overrides.useMaxText,
      },
      balanceText: {
        color: theme.colors.textSecondary,
        fontSize: theme.typography.fontSize.sm,
        ...overrides.balanceText,
      },
      amountError: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
        ...overrides.errorText,
      },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <View
        style={[styles.amountInputContainer, error && styles.errorContainer]}
      >
        <TextInput
          style={styles.amountInput}
          placeholder={getPlaceholder()}
          placeholderTextColor={theme.colors.textDisabled}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          editable={editable}
        />
        <TouchableOpacity
          style={styles.currencyToggle}
          onPress={onToggleInputMode}
        >
          <Text style={styles.currencyToggleText}>{getCurrencyText()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceRow}>
        <TouchableOpacity onPress={onUseMax}>
          <Text style={styles.useMaxText}>Use Max</Text>
        </TouchableOpacity>
        <Text style={styles.balanceText}>{getBalanceDisplay()}</Text>
      </View>
      {error && <Text style={styles.amountError}>{error}</Text>}
    </View>
  );
}
