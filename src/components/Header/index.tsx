import React from 'react';
import { View, Text, Pressable, Image, ViewStyle } from 'react-native';
import useStyles from './styles';

import BackIcon from '@/assets/images/back.png';
import { goBack } from '@/tools/navigation';
import { truncateText } from '@/tools/interactions';
import ItemOptions, { OptionsProps } from '../ItemOptions';

interface HeaderProps {
    back?: boolean;
    additionalStyle?: ViewStyle;
    title?: string;
    options?: OptionsProps[];
}

const Header: React.FC<HeaderProps> = ({
    back,
    additionalStyle,
    title,
    options,
}) => {
    const styles = useStyles();

    return (
        <View style={[styles.container, additionalStyle]}>
            <View style={styles.leftContainer}>
                {back && (
                    <Pressable onPress={() => goBack()}>
                        <Image source={BackIcon} style={styles.icon} />
                    </Pressable>
                )}
                {title && (
                    <Text style={styles.title}>{truncateText(title, 20)}</Text>
                )}
            </View>
            <View style={styles.rightContainer}>
                {options && options.length > 0 && (
                    <ItemOptions options={options} />
                )}
            </View>
        </View>
    );
};

export default Header;
