import React from 'react';
import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';

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
    // Format date if it's a Date object
    const displayDate =
        date instanceof Date
            ? date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
              })
            : date;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                style,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.body} numberOfLines={1}>
                {body}
            </Text>
            <Text style={styles.dateText}>{displayDate}</Text>
        </Pressable>
    );
};

export default NoteCard;
