import React, { memo } from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import useStyles from './styles';
import { tr } from '@/locales/i18n';

interface SidebarItem {
    id: string;
    name: string;
    icon?: ImageSourcePropType;
    onPress: () => void;
}

interface SideBarProps {
    sideBarItems?: SidebarItem[];
}

const SideBar: React.FC<DrawerContentComponentProps & SideBarProps> = ({
    sideBarItems,
}) => {
    const styles = useStyles();
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
                            <Image source={item.icon} style={styles.itemIcon} />
                        )}
                        <Text style={styles.itemText}>{item.name}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default memo(SideBar);
