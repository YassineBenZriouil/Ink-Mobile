import React, { memo, useMemo } from 'react';
import {
    Pressable,
    StyleProp,
    ViewStyle,
    Image,
    Animated,
} from 'react-native';

//styles
import styles from './styles';
import { preventMultiPress, usePressScale } from '@/tools/interactions';
import PlusIcon  from '@/assets/images/plus.png'

interface PlusButtonProps {
    onPress: () => void;
    additionalStyle?: StyleProp<ViewStyle>;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onPress, additionalStyle }) => {
    const handlePress = useMemo(() => preventMultiPress(onPress, 1000), [onPress]);
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.95);

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <Animated.View style={[styles.button, additionalStyle]}>
                    <Image source={PlusIcon} style={[styles.icon]} />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

export default memo(PlusButton);
