import React, { memo, useMemo, useRef, useEffect } from 'react';
import {
    Pressable,
    StyleProp,
    ViewStyle,
    Image,
    Animated,
    ImageStyle,
    Easing,
} from 'react-native';

//styles
import useStyles from './styles';
import { preventMultiPress, usePressScale } from '@/tools/interactions';
import PlusIcon from '@/assets/images/plus.png';

interface PlusButtonProps {
    onPress: () => void;
    additionalStyle?: StyleProp<ViewStyle>;
    icon?: any;
    iconStyle?: StyleProp<ImageStyle>;
    disabled?: boolean;
    loading?: boolean;
}

const PlusButton: React.FC<PlusButtonProps> = ({
    onPress,
    additionalStyle,
    icon,
    iconStyle,
    disabled,
    loading,
}) => {
    const styles = useStyles();
    const handlePress = useMemo(
        () => preventMultiPress(onPress, 1000),
        [onPress],
    );
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.95);

    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loading) {
            spinAnim.setValue(0);
            Animated.loop(
                Animated.timing(spinAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ).start();
        } else {
            spinAnim.stopAnimation();
            spinAnim.setValue(0);
        }
    }, [loading, spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={{ opacity: disabled || loading ? 0.5 : 1 }}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <Animated.View style={[styles.button, additionalStyle]}>
                    <Animated.Image
                        source={icon || PlusIcon}
                        style={[
                            styles.icon,
                            iconStyle,
                            loading ? { transform: [{ rotate: spin }] } : {},
                        ]}
                    />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

export default memo(PlusButton);
