import React, { memo } from 'react';
import {
    Pressable,
    Text,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
    Image,
    ImageSourcePropType,
    Animated,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

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
    withShadow?: boolean;
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
    variante = 'primary',
    withShadow = false
}) => {
    const handlePress = preventMultiPress(onPress, 1000);
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.95);

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || fetching}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                {withShadow ? (
                    <Shadow
                        distance={15}
                        startColor={'rgba(255, 255, 255, 0.15)'}
                        endColor={'rgba(255, 255, 255, 0)'}
                        offset={[0, 0]}
                    >
                        <Animated.View
                            style={[
                                disabled
                                    ? styles.disabled
                                    : variante === 'primary'
                                    ? styles.primary
                                    : styles.secondary,
                                additionalStyle,
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
                                        <Text
                                            style={[
                                                variante === 'primary'
                                                    ? styles.primaryText
                                                    : styles.secondaryText,
                                                textStyle,
                                            ]}
                                        >
                                            {text}
                                        </Text>
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
                    </Shadow>
                ) : (
                    <Animated.View
                        style={[
                            disabled
                                ? styles.disabled
                                : variante === 'primary'
                                ? styles.primary
                                : styles.secondary,
                            additionalStyle,
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
                                    <Text
                                        style={[
                                            variante === 'primary'
                                                ? styles.primaryText
                                                : styles.secondaryText,
                                            textStyle,
                                        ]}
                                    >
                                        {text}
                                    </Text>
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
                )}
            </Animated.View>
        </Pressable>
    );
};

export default memo(Button);
