import React from 'react';
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

interface NoteCardProps {
    title: string;
    body: string;
    date: string | Date;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

const NoteCard: React.FC<NoteCardProps> = ({
    title,
    body,
    date,
    onPress,
    style,
}) => {
    const handlePress = onPress ? preventMultiPress(onPress, 1000) : undefined;
    const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(0.99);
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
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
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
