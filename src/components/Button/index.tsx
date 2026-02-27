import React, { memo } from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
    Image,
    ImageSourcePropType,
    Animated,
} from 'react-native';

//styles
import styles from './styles';
import COLORS from '@/theme';
import { preventMultiPress, usePressScale } from '@/tools/interactions';

interface ButtonProps {
    onPress: () => void;
    additionalStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    fetching?: boolean;
    text?: string;
    icon?: ImageSourcePropType;
    iconStyle?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    loaderColor?: string;
    variante?: string;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    additionalStyle,
    disabled,
    fetching,
    text,
    textStyle,
    icon,
    iconStyle,
    loaderColor,
    variante = 'primary'
}) => {
    const handlePress = preventMultiPress(onPress, 1000);
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.95);

    return (
        <TouchableOpacity
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            disabled={disabled || fetching}
        >
            <Animated.View
                style={[
                    disabled ? styles.disabled : variante === 'primary' ? styles.primary : styles.secondary,
                    additionalStyle,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                {fetching ? (
                    <ActivityIndicator
                        size="small"
                        color={loaderColor || COLORS.primary}
                    />
                ) : (
                    <>
                        {text && (
                            <Text style={[variante === 'primary' ? styles.primaryText : styles.secondaryText, textStyle]}>{text}</Text>
                        )}
                        {icon && (
                            <Image
                                source={icon}
                                style={[styles.icon, iconStyle]}
                            />
                        )}
                    </>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default memo(Button);
