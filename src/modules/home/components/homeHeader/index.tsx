import React, { memo } from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import useStyles from './styles';
import DOWN_ICON from '@/assets/images/down.png';
import BURGER_ICON from '@/assets/images/burger.png';
import { preventMultiPress } from '@/tools/interactions';

interface HomeHeaderProps {
    title?: string;
    onTitlePress?: () => void;
    onMenuPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
    title,
    onTitlePress,
    onMenuPress,
}) => {
    const styles = useStyles();
    const handleTitlePress = onTitlePress
        ? preventMultiPress(onTitlePress)
        : undefined;
    const handleMenuPress = onMenuPress
        ? preventMultiPress(onMenuPress)
        : undefined;

    return (
        <View style={styles.container}>
            <Pressable style={styles.leftSection} onPress={handleTitlePress}>
                <Text style={styles.title}>{title}</Text>
                <Image source={DOWN_ICON} style={styles.downIcon} />
            </Pressable>

            <Pressable onPress={handleMenuPress}>
                <Image source={BURGER_ICON} style={styles.burgerIcon} />
            </Pressable>
        </View>
    );
};

export default memo(HomeHeader);
