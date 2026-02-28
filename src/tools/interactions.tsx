import React, { useRef, useCallback, useState, useEffect } from 'react';
import { t } from 'i18next';
import {
    ToastAndroid,
    Alert,
    Platform,
    Animated,
    View,
    ViewStyle,
    StyleProp,
    StatusBar,
    StatusBarStyle,
} from 'react-native';



export const displayToast = (msg?: string) => {
    const message =
        typeof msg === 'string' && msg?.trim().length > 0
            ? msg
            : t('error.default');

    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    } else {
        Alert.alert('', message, [{ text: 'OK' }]);
    }
};

export function preventMultiPress(onPress: () => void, delay = 500) {
    let lastPress = 0;
    return () => {
        const now = Date.now();
        if (now - lastPress < delay) return;

        lastPress = now;
        onPress();
    };
}

export function usePressScale(scaleValue = 0.95) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(() => {
        Animated.spring(scaleAnim, {
            toValue: scaleValue,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    }, [scaleAnim, scaleValue]);

    const handlePressOut = useCallback(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    }, [scaleAnim]);

    return {
        scaleAnim,
        handlePressIn,
        handlePressOut,
    };
}

export const defaultShadowStyle = {
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
};

interface CustomScrollIndicatorProps {
    completeScrollBarHeight: number;
    visibleScrollBarHeight: number;
    scrollIndicator: Animated.Value;
    containerStyle?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ViewStyle>;
    trackColor?: string;
    indicatorStyle?: StyleProp<ViewStyle>;
    thumbHeight?: number;
}

export const CustomScrollIndicator = ({
    completeScrollBarHeight,
    visibleScrollBarHeight,
    scrollIndicator,
    containerStyle,
    thumbStyle = {},
    trackColor,
    indicatorStyle,
    thumbHeight,
}: CustomScrollIndicatorProps) => {
    // Don't render if content fits in screen
    if (completeScrollBarHeight <= visibleScrollBarHeight) {
        return null;
    }

    // Calculate scroll indicator size
    const scrollIndicatorSize = thumbHeight
        ? thumbHeight
        : (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight;

    // Calculate maximum scroll distance
    const difference =
        visibleScrollBarHeight > scrollIndicatorSize
            ? visibleScrollBarHeight - scrollIndicatorSize
            : 1;

    // Calculate indicator position
    const scrollIndicatorPosition = scrollIndicator.interpolate({
        inputRange: [0, completeScrollBarHeight - visibleScrollBarHeight],
        outputRange: [0, difference],
        extrapolate: 'clamp',
    });

    return (
        <View
            style={[
                containerStyle,
                trackColor ? { backgroundColor: trackColor } : undefined,
            ]}
        >
            <Animated.View
                style={[
                    {
                        height: scrollIndicatorSize,
                        transform: [{ translateY: scrollIndicatorPosition }],
                    },
                    thumbStyle,
                    indicatorStyle,
                ]}
            />
        </View>
    );
};

export function useCustomScroll() {
    const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
    const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(1);
    const scrollIndicator = useRef(new Animated.Value(0)).current;

    const onContentSizeChange = useCallback((_: number, height: number) => {
        setCompleteScrollBarHeight(height);
    }, []);

    const onLayout = useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }: any) => {
            setVisibleScrollBarHeight(height);
        },
        [],
    );

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
        { useNativeDriver: false },
    );

    return {
        completeScrollBarHeight,
        visibleScrollBarHeight,
        scrollIndicator,
        scrollProps: {
            onContentSizeChange,
            onLayout,
            onScroll,
            scrollEventThrottle: 16,
            showsVerticalScrollIndicator: false,
        },
    };
}

export function useStatusBarColor(
    color: string,
    arg2?: StatusBarStyle | boolean,
    arg3?: boolean,
    arg4?: boolean
) {
    let style: StatusBarStyle = 'light-content';
    let translucent = false;
    let isActive = true;

    // Check for overload: useStatusBarColor(color, isActive)
    if (typeof arg2 === 'boolean') {
        isActive = arg2;
    } else {
        // Standard signature: useStatusBarColor(color, style, translucent, isActive)
        if (arg2) style = arg2;
        if (arg3 !== undefined) translucent = arg3;
        if (arg4 !== undefined) isActive = arg4;
    }

    useEffect(() => {
        if (isActive) {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(color);
                StatusBar.setTranslucent(translucent);
            }
            StatusBar.setBarStyle(style);
        }
    }, [color, style, translucent, isActive]);
}

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
};
