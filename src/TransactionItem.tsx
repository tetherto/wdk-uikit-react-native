import { useMemo } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './theme';

export interface Transaction {
  id: string;
  token: string;
  amount: string;
  fiatAmount: string;
  fiatCurrency: string;
  network: string;
  type: 'sent' | 'received';
}

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionItem({
  transaction,
  onPress,
}: TransactionItemProps) {
  const { theme } = useTheme();

  const getTransactionIcon = (type: 'sent' | 'received') => {
    return type === 'sent' ? ArrowUpRight : ArrowDownLeft;
  };

  const getTransactionIconColor = (type: 'sent' | 'received') => {
    return type === 'sent' ? theme.colors.error : theme.colors.success;
  };

  const getTransactionTitle = (type: 'sent' | 'received') => {
    return type === 'sent' ? 'Sent' : 'Received';
  };

  const TransactionIcon = getTransactionIcon(transaction.type);
  const iconColor = getTransactionIconColor(transaction.type);

  const styles = useMemo(() => {
    const overrides = theme.componentOverrides?.TransactionItem || {};

    return StyleSheet.create({
      transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...overrides.container,
      },
      transactionIconContainer: {
        width: 32,
        height: 32,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
        ...overrides.icon,
      },
      transactionInfo: {
        flex: 1,
      },
      transactionAsset: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        ...overrides.title,
      },
      transactionType: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        ...overrides.subtitle,
      },
      transactionAmount: {
        alignItems: 'flex-end',
      },
      transactionCryptoAmount: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        ...overrides.amount,
      },
      transactionUsdAmount: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        ...overrides.amount,
      },
    });
  }, [theme]);

  return (
    <TouchableOpacity style={styles.transactionRow} onPress={onPress}>
      <View style={styles.transactionIconContainer}>
        <TransactionIcon size={16} color={iconColor} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionAsset}>{transaction.token}</Text>
        <Text style={styles.transactionType}>
          {getTransactionTitle(transaction.type)} • {transaction.network}
        </Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text style={styles.transactionCryptoAmount}>{transaction.amount}</Text>
        <Text style={styles.transactionUsdAmount}>
          {transaction.fiatAmount} {transaction.fiatCurrency}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
