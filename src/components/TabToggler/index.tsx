import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Animated,
    Image,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import COLORS from '@/theme';
import styles from './styles';

export interface TabItem {
    id: string;
    label: string;
    icon?: ImageSourcePropType;
}

interface TabTogglerProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (id: string) => void;
    additionalStyle?: ViewStyle;
}

const TabToggler: React.FC<TabTogglerProps> = ({
    tabs,
    activeTab,
    onTabChange,
    additionalStyle,
}) => {
    const [width, setWidth] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;

    const activeIdx = Math.max(
        0,
        tabs.findIndex(t => t.id === activeTab),
    );
    const tabWidth = width / tabs.length || 0;

    useEffect(() => {
        if (tabWidth) {
            Animated.spring(translateX, {
                toValue: activeIdx * tabWidth,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
        }
    }, [activeIdx, tabWidth, translateX]);

    return (
        <View style={[styles.wrapper, additionalStyle]}>
            <View
                style={styles.container}
                onLayout={e => setWidth(e.nativeEvent.layout.width)}
            >
                {width > 0 && (
                    <Animated.View
                        style={[
                            styles.indicator,
                            { width: tabWidth, transform: [{ translateX }] },
                        ]}
                    />
                )}
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    const color = isActive ? COLORS.secondary : COLORS.primary;
                    return (
                        <Pressable
                            key={tab.id}
                            style={styles.tab}
                            onPress={() => onTabChange(tab.id)}
                        >
                            {tab.icon && (
                                <Image
                                    source={tab.icon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            )}
                            <Text style={styles.text}>{tab.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

export default TabToggler;
