import React from 'react';
import { View, Text, Switch, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

interface SettingToggleRowProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    icon?: ImageSourcePropType;
}

const SettingToggleRow: React.FC<SettingToggleRowProps> = ({
    label,
    value,
    onValueChange,
    icon,
}) => {
    const { theme } = useTheme();
    const styles = useStyles();

    return (
        <View style={styles.row}>
            <View style={styles.leftSection}>
                {icon && (
                    <Image
                        source={icon}
                        style={[styles.icon, { tintColor: theme.secondary }]}
                    />
                )}
                <Text style={styles.label}>{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: theme.gray, true: theme.secondary }}
                thumbColor={theme.primary}
            />
        </View>
    );
};

export default SettingToggleRow;
