import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    ImageSourcePropType,
    Modal,
    FlatList,
} from 'react-native';
import { useTheme } from '@/contexts/themeContext';
import useStyles from './styles';

export interface DropdownOption {
    label: string;
    value: string;
}

interface SettingDropdownRowProps {
    label: string;
    selectedValue: string;
    options: DropdownOption[];
    onSelect: (value: string) => void;
    icon?: ImageSourcePropType;
}

const SettingDropdownRow: React.FC<SettingDropdownRowProps> = ({
    label,
    selectedValue,
    options,
    onSelect,
    icon,
}) => {
    const { theme } = useTheme();
    const styles = useStyles();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedLabel =
        options.find(o => o.value === selectedValue)?.label ?? selectedValue;

    return (
        <>
            <Pressable style={styles.row} onPress={() => setModalVisible(true)}>
                <View style={styles.leftSection}>
                    {icon && (
                        <Image
                            source={icon}
                            style={[
                                styles.icon,
                                { tintColor: theme.secondary },
                            ]}
                        />
                    )}
                    <Text style={styles.label}>{label}</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.selectedText}>{selectedLabel}</Text>
                    <Text style={styles.chevron}>›</Text>
                </View>
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{label}</Text>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.value}
                            renderItem={({ item }) => {
                                const isSelected =
                                    item.value === selectedValue;
                                return (
                                    <Pressable
                                        style={[
                                            styles.optionRow,
                                            isSelected &&
                                                styles.optionRowSelected,
                                        ]}
                                        onPress={() => {
                                            onSelect(item.value);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected &&
                                                    styles.optionTextSelected,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default SettingDropdownRow;
