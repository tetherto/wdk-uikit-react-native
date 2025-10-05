import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './theme';

// Balance animation hook
const useBalanceAnimation = (finalValue: number) => {
  const [displayValue, setDisplayValue] = useState(finalValue);

  useEffect(() => {
    if (displayValue === finalValue) return;

    const startValue = displayValue;
    const difference = finalValue - startValue;
    const duration = 400;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + difference * easeOutQuart;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(finalValue);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalValue]);

  return displayValue;
};

// Animated Number Component
interface AnimatedNumberProps {
  animateToNumber: number;
  visible: boolean;
  containerStyle?: any;
  fontStyle?: any;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  animateToNumber,
  visible,
  containerStyle,
  fontStyle,
}) => {
  const displayValue = useBalanceAnimation(animateToNumber);

  if (!visible) return null;

  return (
    <View style={containerStyle}>
      <Text style={fontStyle}>
        {displayValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </View>
  );
};

// Default Eye Icons (fallback components) - now use theme
const DefaultEyeOpenIcon = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    eyeIconStyle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      margin: 4,
    },
  });
  return <Text style={styles.eyeIconStyle}>show</Text>;
};
const DefaultEyeClosedIcon = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    eyeIconStyle: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.sm,
      margin: 4,
    },
  });
  return <Text style={styles.eyeIconStyle}>hide</Text>;
};

interface BalanceProps {
  value?: number;
  isLoading?: boolean;
  Loader?: React.ComponentType;
  showHide?: boolean;
  currency?: string;
  EyeOpenIcon?: React.ComponentType;
  EyeClosedIcon?: React.ComponentType;
}

const Balance: React.FC<BalanceProps> = ({
  value,
  isLoading = false,
  Loader,
  showHide = true,
  currency = 'USD',
  EyeOpenIcon = DefaultEyeOpenIcon,
  EyeClosedIcon = DefaultEyeClosedIcon,
}) => {
  const { theme } = useTheme();
  const [showBalance, setShowBalance] = useState(true);
  const [balanceWidth, setBalanceWidth] = useState(0);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleBalanceLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;

    if (width > 0) {
      setBalanceWidth(width);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        // Legacy styles for backward compatibility
        balanceSection: {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.lg,
        },
        balanceAmount: {
          fontSize: 36,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text,
        },
        loadingText: {
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.xs,
        },
        createWalletText: {
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.primary,
          textAlign: 'center',
          marginTop: theme.spacing.md,
        },

        // Advanced Balance Component styles
        balanceContainer: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        },
        balanceWrapper: {
          minHeight: 52,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        },
        balance: {
          paddingTop: 4,
          marginBottom: -4,
          padding: 4,
          position: 'relative',
          height: 52,
          alignItems: 'center',
          color: theme.colors.text,
          fontSize: 40,
          fontWeight: theme.typography.fontWeight.bold,
          justifyContent: 'flex-end',
          bottom: -8,
        },
        animatedBalanceText: {
          color: theme.colors.text,
          fontSize: 40,
          fontWeight: theme.typography.fontWeight.bold,
        },
        showHideBalance: {
          marginLeft: theme.spacing.sm,
          marginBottom: -2,
        },
        balanceCurrencySymbol: {
          paddingTop: 4,
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text,
        },
        eyeIconStyle: {
          color: theme.colors.text,
          fontSize: theme.typography.fontSize.sm,
          margin: 4,
        },
        hiddenBalanceContainer: {
          alignItems: 'flex-end',
        },
        hiddenBalanceText: {
          fontSize: 50,
        },
        ...theme.componentOverrides?.Balance,
      }),
    [theme]
  );

  const renderLoading = () => {
    return Loader ? (
      <Loader />
    ) : (
      <Text style={styles.loadingText}>Loading balance...</Text>
    );
  };

  if (isLoading) {
    return <View style={styles.balanceSection}>{renderLoading()}</View>;
  }

  const displayValue = value || 0;

  return (
    <>
      <View style={styles.balanceContainer}>
        <View style={[styles.balanceWrapper, { minWidth: balanceWidth }]}>
          <View onLayout={handleBalanceLayout}>
            <AnimatedNumber
              animateToNumber={displayValue}
              containerStyle={[styles.balance]}
              fontStyle={styles.animatedBalanceText}
              visible={showBalance}
            />
          </View>
          {!showBalance && (
            <View
              style={[
                styles.balance,
                { width: balanceWidth },
                styles.hiddenBalanceContainer,
              ]}
            >
              <Text
                style={[styles.animatedBalanceText, styles.hiddenBalanceText]}
              >
                ***
              </Text>
            </View>
          )}
        </View>
        <Text testID={'balance-currency'} style={styles.balanceCurrencySymbol}>
          {currency}
        </Text>

        {showHide && (
          <TouchableOpacity
            testID={'balance-toggle-visibility'}
            style={styles.showHideBalance}
            onPress={toggleBalanceVisibility}
          >
            {showBalance ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export { Balance };
