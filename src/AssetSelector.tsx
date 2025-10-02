import { Search, X } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { useTheme } from './theme';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  balance: string;
  balanceUSD: string;
  icon: ImageSourcePropType;
  color: string;
  network?: string;
  hasBalance: boolean;
}

interface AssetSelectorProps {
  tokens: Token[];
  recentTokens: string[];
  onSelectToken: (token: Token) => void;
}

export function AssetSelector({
  tokens,
  recentTokens,
  onSelectToken,
}: AssetSelectorProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;
    const query = searchQuery.toLowerCase();
    return tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    );
  }, [searchQuery, tokens]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surfaceElevated,
          borderRadius: theme.borderRadius.md,
        },
        searchInput: {
          flex: 1,
          marginLeft: theme.spacing.xs,
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.text,
        },
        recentSection: {
          marginBottom: theme.spacing.xl,
        },
        sectionTitle: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.textSecondary,
          marginLeft: theme.spacing.lg,
          marginBottom: theme.spacing.sm,
        },
        recentTokensContainer: {
          paddingHorizontal: theme.spacing.lg,
        },
        recentToken: {
          alignItems: 'center',
          marginRight: theme.spacing.lg,
        },
        recentTokenIcon: {
          width: 48,
          height: 48,
          borderRadius: theme.borderRadius.full,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.xs,
        },
        recentTokenIconImage: {
          width: 28,
          height: 28,
        },
        recentTokenName: {
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text,
        },
        tokensSection: {
          flex: 1,
        },
        tokensList: {
          paddingBottom: theme.spacing.lg,
        },
        tokenRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        },
        tokenInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        tokenIcon: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.full,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: theme.spacing.sm,
        },
        tokenIconImage: {
          width: 24,
          height: 24,
        },
        tokenName: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text,
        },
        tokenNetwork: {
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.textSecondary,
        },
        tokenBalance: {
          alignItems: 'flex-end',
        },
        tokenAmount: {
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text,
        },
        tokenValue: {
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.textSecondary,
          marginTop: 2,
        },
        noBalanceLabel: {
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.error,
          marginTop: 2,
          fontWeight: theme.typography.fontWeight.medium,
        },
        noTokensContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
        noTokensText: {
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
        ...theme.componentOverrides?.AssetSelector,
      }),
    [theme]
  );

  const renderToken = ({ item }: { item: Token }) => {
    const isDisabled = !item.hasBalance;

    return (
      <TouchableOpacity
        style={[styles.tokenRow, isDisabled && { opacity: 0.5 }]}
        onPress={() => onSelectToken(item)}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.7}
      >
        <View style={styles.tokenInfo}>
          <View style={[styles.tokenIcon, { backgroundColor: item.color }]}>
            <Image source={item.icon} style={styles.tokenIconImage} />
          </View>
          <View>
            <Text style={styles.tokenName}>{item.name}</Text>
            {item.network && (
              <Text style={styles.tokenNetwork}>({item.network})</Text>
            )}
            {isDisabled && (
              <Text style={styles.noBalanceLabel}>No balance</Text>
            )}
          </View>
        </View>
        <View style={styles.tokenBalance}>
          <Text style={styles.tokenAmount}>
            {item.balance} {item.symbol}
          </Text>
          <Text style={styles.tokenValue}>{item.balanceUSD}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={theme.colors.textDisabled}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch}>
            <X size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {!searchQuery && recentTokens && recentTokens.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentTokensContainer}
          >
            {recentTokens.map((tokenName) => {
              const token = tokens.find((t) => t.name === tokenName);
              if (!token) return null;
              const isDisabled = !token.hasBalance;
              return (
                <TouchableOpacity
                  key={token.id}
                  style={[styles.recentToken, isDisabled && { opacity: 0.5 }]}
                  onPress={() => onSelectToken(token)}
                  disabled={isDisabled}
                  activeOpacity={isDisabled ? 1 : 0.7}
                >
                  <View
                    style={[
                      styles.recentTokenIcon,
                      { backgroundColor: token.color },
                    ]}
                  >
                    <Image
                      source={token.icon}
                      style={styles.recentTokenIconImage}
                    />
                  </View>
                  <Text style={styles.recentTokenName}>{token.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      <View style={styles.tokensSection}>
        <Text style={styles.sectionTitle}>Your tokens</Text>
        {filteredTokens.length > 0 ? (
          <FlatList
            data={filteredTokens}
            renderItem={renderToken}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tokensList}
          />
        ) : (
          <View style={styles.noTokensContainer}>
            <Text style={styles.noTokensText}>
              {tokens.length > 0
                ? 'No tokens found matching your search'
                : 'No token balances available'}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
