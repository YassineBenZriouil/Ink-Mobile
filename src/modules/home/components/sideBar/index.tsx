import React, { memo } from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import useStyles from './styles';
import { tr } from '@/locales/i18n';
import { useTheme } from '@/contexts/themeContext';

interface SidebarItem {
    id: string;
    name: string;
    icon?: ImageSourcePropType;
    onPress: () => void;
    color?: string;
}

interface SideBarProps {
    sideBarItems?: SidebarItem[];
}

const SideBar: React.FC<DrawerContentComponentProps & SideBarProps> = ({
    sideBarItems,
}) => {
    const styles = useStyles();
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{tr('app.menu')}</Text>
            </View>

            <View style={styles.itemsContainer}>
                {sideBarItems?.map(item => (
                    <Pressable
                        key={item.id}
                        style={({ pressed }) => [
                            styles.itemWrapper,
                            { opacity: pressed ? 0.7 : 1 },
                        ]}
                        onPress={item.onPress}
                    >
                        {item.icon && (
                            <Image
                                source={item.icon}
                                style={[
                                    styles.itemIcon,
                                    item.color
                                        ? { tintColor: item.color }
                                        : { tintColor: theme.secondary },
                                ]}
                            />
                        )}
                        <Text
                            style={[
                                styles.itemText,
                                item.color
                                    ? { color: item.color }
                                    : { color: theme.secondary },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default memo(SideBar);
