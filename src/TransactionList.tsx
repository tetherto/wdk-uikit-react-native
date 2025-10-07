import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Transaction } from './TransactionItem';
import { TransactionItem } from './TransactionItem';
import { useTheme } from './theme';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => {
    const overrides = theme.componentOverrides?.TransactionList || {};

    return StyleSheet.create({
      listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        ...overrides.container,
      },
      emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxxl,
        ...overrides.emptyState,
      },
      emptyStateText: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.textSecondary,
        ...overrides.emptyStateText,
      },
    });
  }, [theme]);

  const renderTransaction = ({ item }: { item: Transaction }) => {
    return <TransactionItem transaction={item} />;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No transactions yet</Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}
