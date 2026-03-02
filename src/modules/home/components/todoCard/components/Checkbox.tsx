import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { usePressScale } from '@/tools/interactions';
import { useTheme } from '@/contexts/themeContext';
import { Pressable } from 'react-native';

interface CheckboxProps {
    value: boolean;
    onValueChange?: (newValue: boolean) => void;
    size?: number;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    value,
    onValueChange,
    size = 24,
    disabled = false,
}) => {
    const { theme } = useTheme();
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.85);

    const handlePress = () => {
        if (!disabled && onValueChange) {
            onValueChange(!value);
        }
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                style={[
                    styles.container,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 4,
                        borderColor: value ? theme.secondary : theme.gray,
                        backgroundColor: value ? theme.secondary : 'transparent',
                    },
                ]}
            >
                {value && (
                    <Svg
                        width={size * 0.7}
                        height={size * 0.7}
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <Path
                            d="M20 6L9 17L4 12"
                            stroke={theme.primary}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Checkbox;
