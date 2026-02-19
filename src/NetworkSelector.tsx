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

import { Search, X } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from './theme';

interface NetworkSelectorProps {
  networks: Network[];
  onSelectNetwork: (network: Network) => void;
}

export interface Network {
  id: string;
  name: string;
  gasLevel: 'High' | 'Normal' | 'Low';
  gasColor: string;
  icon: string | any;
  color: string;
}

export function NetworkSelector({
  networks,
  onSelectNetwork,
}: NetworkSelectorProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNetworks = useMemo(() => {
    if (!searchQuery) return networks;
    const query = searchQuery.toLowerCase();
    return networks.filter((network) =>
      network.name.toLowerCase().includes(query)
    );
  }, [searchQuery, networks]);

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
        networksList: {
          paddingBottom: theme.spacing.lg,
        },
        networkRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          marginBottom: theme.spacing.xs,
        },
        networkInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        networkIcon: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.full,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: theme.spacing.sm,
        },
        networkIconText: {
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.text,
        },
        networkIconImage: {
          width: 24,
          height: 24,
        },
        networkName: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text,
        },
        networkGasInfo: {
          alignItems: 'flex-end',
        },
        gasLevel: {
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
        },
        noNetworksContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        },
        noNetworksText: {
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.textSecondary,
          textAlign: 'center',
        },
        ...theme.componentOverrides?.NetworkSelector,
      }),
    [theme]
  );

  const renderNetwork = ({ item }: { item: Network }) => (
    <TouchableOpacity
      style={styles.networkRow}
      onPress={() => onSelectNetwork(item)}
    >
      <View style={styles.networkInfo}>
        <View style={[styles.networkIcon, { backgroundColor: item.color }]}>
          {typeof item.icon === 'string' ? (
            <Text style={styles.networkIconText}>{item.icon}</Text>
          ) : (
            <Image source={item.icon} style={styles.networkIconImage} />
          )}
        </View>
        <View>
          <Text style={styles.networkName}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.networkGasInfo}>
        <Text style={[styles.gasLevel, { color: item.gasColor }]}>
          {item.gasLevel} Gas fees
        </Text>
      </View>
    </TouchableOpacity>
  );

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

      {filteredNetworks.length > 0 ? (
        <FlatList
          data={filteredNetworks}
          renderItem={renderNetwork}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.networksList}
        />
      ) : (
        <View style={styles.noNetworksContainer}>
          <Text style={styles.noNetworksText}>
            No networks found matching your search
          </Text>
        </View>
      )}
    </>
  );
}
