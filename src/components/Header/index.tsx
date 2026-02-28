import React from 'react';
import {
    View,
    Text,
    Pressable,
    Animated,
    Image,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from './styles';
import BackIcon from '@/assets/images/back.png';
import OptionsIcon from '@/assets/images/more.png';
import { goBack } from '@/tools/navigation';
import { truncateText } from '@/tools/interactions';

interface OptionsProps {
    id: string;
    name: string;
    icon: ImageSourcePropType;
    onPress: () => void;
}

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
                    <Menu>
                        <MenuTrigger>
                            <Image
                                source={OptionsIcon}
                                style={styles.moreIcon}
                            />
                        </MenuTrigger>
                        <MenuOptions
                            customStyles={{
                                optionsContainer: styles.menuOptionsContainer,
                            }}
                        >
                            {options.map(option => (
                                <MenuOption
                                    key={option.id}
                                    onSelect={option.onPress}
                                    customStyles={{
                                        optionWrapper:
                                            styles.menuOptionWrapper as any,
                                    }}
                                >
                                    {option.icon && (
                                        <Image
                                            source={option.icon}
                                            style={styles.menuIcon}
                                        />
                                    )}
                                    <Text style={styles.menuOptionText}>
                                        {option.name}
                                    </Text>
                                </MenuOption>
                            ))}
                        </MenuOptions>
                    </Menu>
                )}
            </View>
        </View>
    );
};

export default Header;
