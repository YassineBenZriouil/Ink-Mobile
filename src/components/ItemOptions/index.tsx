import React, { forwardRef } from 'react';
import { Image, Text, ImageSourcePropType } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import useStyles from './styles';
import OptionsIcon from '@/assets/images/more.png';

export interface OptionsProps {
    id: string;
    name: string;
    icon?: ImageSourcePropType;
    onPress: () => void;
}

interface ItemOptionsProps {
    options: OptionsProps[];
    children?: React.ReactNode;
    triggerOnLongPress?: boolean;
}

const ItemOptions = forwardRef<Menu, ItemOptionsProps>(({
    options,
    children,
    triggerOnLongPress,
}, ref) => {
    const styles = useStyles();

    if (!options || options.length === 0) return null;

    return (
        <Menu ref={ref}>
            <MenuTrigger triggerOnLongPress={triggerOnLongPress}>
                {children ? (
                    children
                ) : (
                    <Image source={OptionsIcon} style={styles.moreIcon} />
                )}
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
                            optionWrapper: styles.menuOptionWrapper as any,
                        }}
                    >
                        {option.icon && (
                            <Image
                                source={option.icon}
                                style={styles.menuIcon}
                            />
                        )}
                        <Text style={styles.menuOptionText}>{option.name}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
});

export default ItemOptions;
