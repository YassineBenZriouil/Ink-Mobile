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

interface ClickableTextProps {
    text: string;
    onPress: () => void;
    additionalStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    fetching?: boolean;
    textStyle?: StyleProp<TextStyle>;
    loaderColor?: string;
}

const ClickableText: React.FC<ClickableTextProps> = ({
    onPress,
    additionalStyle,
    disabled,
    fetching,
    text,
    textStyle,
    loaderColor,
}) => {
    const handlePress = preventMultiPress(onPress, 1000);
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.95);

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            disabled={disabled || fetching}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                {fetching ? (
                    <ActivityIndicator
                        size="small"
                        color={loaderColor || COLORS.primary}
                    />
                ) : (
                    <>
                        {text && (
                            <Text style={[styles.primaryText, textStyle]}>
                                {text}
                            </Text>
                        )}
                    </>
                )}
            </Animated.View>
        </Pressable>
    );
};

export default memo(ClickableText);
