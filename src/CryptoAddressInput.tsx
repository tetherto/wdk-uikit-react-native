import { useMemo } from 'react';
import { Copy, QrCode } from 'lucide-react-native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from './theme';

interface CryptoAddressInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPaste?: () => void;
  onQRScan?: () => void;
  editable?: boolean;
  error?: string;
}

export function CryptoAddressInput({
  label = 'Recipient Address',
  value,
  onChangeText,
  placeholder = 'T08p3BGPIuh1l934IIflu....Kc2GXhKc',
  onPaste,
  onQRScan,
  editable = true,
  error,
}: CryptoAddressInputProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => {
    const overrides = theme.componentOverrides?.CryptoAddressInput || {};

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
      addressInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderWidth: 1,
        borderColor: 'transparent',
        ...overrides.inputContainer,
      },
      errorContainer: {
        borderColor: theme.colors.error,
        ...overrides.errorContainer,
      },
      addressInput: {
        flex: 1,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.text,
        ...overrides.input,
      },
      iconButton: {
        padding: theme.spacing.sm,
        marginLeft: theme.spacing.sm,
        ...overrides.iconButton,
      },
      errorText: {
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
        style={[styles.addressInputContainer, error && styles.errorContainer]}
      >
        <TextInput
          style={styles.addressInput}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textDisabled}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
        />
        {onPaste && (
          <TouchableOpacity style={styles.iconButton} onPress={onPaste}>
            <Copy size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        {onQRScan && (
          <TouchableOpacity style={styles.iconButton} onPress={onQRScan}>
            <QrCode size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
