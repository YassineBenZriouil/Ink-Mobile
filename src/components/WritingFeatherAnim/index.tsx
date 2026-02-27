import React from 'react';
import LottieView from 'lottie-react-native';
import { View, ViewStyle } from 'react-native';
import styles from './styles';

interface WritingFeatherAnimProps {
    style?: ViewStyle;
    size?: number;
    autoPlay?: boolean;
    loop?: boolean;
    speed?: number;
}

const WritingFeatherAnim: React.FC<WritingFeatherAnimProps> = ({
    style,
    size = 200,
    autoPlay = true,
    loop = true,
    speed = 1,
}) => {
    return (
        <View style={[styles.container, style]}>
            <LottieView
                source={require('@/assets/animations/INK-01.json')}
                autoPlay={autoPlay}
                loop={loop}
                speed={speed}
                style={{ width: size, height: size }}
            />
        </View>
    );
};


export default WritingFeatherAnim;
