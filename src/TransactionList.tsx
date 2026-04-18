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
