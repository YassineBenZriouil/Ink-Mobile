import React, { useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleProp,
    ViewStyle,
    Animated,
} from 'react-native';
import styles from './styles';
import { preventMultiPress, usePressScale } from '@/tools/interactions';
import { tr } from '@/locales/i18n';
import useStyles from './styles';
import ItemOptions, { OptionsProps } from '@/components/ItemOptions';

interface NoteCardProps {
    title: string;
    body: string;
    date: string | Date;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    options?: OptionsProps[];
}

const NoteCard: React.FC<NoteCardProps> = ({
    title,
    body,
    date,
    onPress,
    style,
    options,
}) => {
    const styles = useStyles();
    const handlePress = onPress ? preventMultiPress(onPress, 1000) : undefined;
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.99);
    const menuRef = useRef<any>(null);
    const displayDate =
        date instanceof Date
            ? date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
              })
            : date;

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                style={[styles.container, style]}
                onPress={handlePress}
                onLongPress={() => {
                    if (options && options.length > 0) {
                        menuRef.current?.open();
                    }
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {options && options.length > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            zIndex: 10,
                        }}
                    >
                        <ItemOptions ref={menuRef} options={options}>
                            <View style={{ width: 1, height: 1 }} />
                        </ItemOptions>
                    </View>
                )}
                <Text style={styles.title} numberOfLines={1}>
                    {title || tr('home.noTitle')}
                </Text>
                <Text style={styles.body} numberOfLines={1}>
                    {body || tr('home.noContent')}
                </Text>
                <Text style={styles.dateText}>{displayDate}</Text>
            </Pressable>
        </Animated.View>
    );
};

export default NoteCard;
