import React from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Image,
    FlatList,
} from 'react-native';
import useStyles from './styles';
import closeIcon from '@/assets/images/close.png';
import { t } from 'i18next';
import Button from '@/components/Button';

interface theme {
    id: string;
    name: string;
    icon: any;
}

interface ThemesSelectorProps {
    visible: boolean;
    onClose: () => void;
    onThemeClick: (theme: theme) => void;
    theme: theme[];
}

/**
 * Themes selector component
 * Displays a list of themes for the user to choose from
 */
const ThemesSelector: React.FC<ThemesSelectorProps> = ({
    visible,
    onClose,
    onThemeClick,
    theme,
}) => {
    const styles = useStyles();
    const renderItem = ({ item }: { item: theme }) => (
        <Button
            additionalStyle={styles.themeItem}
            text={item.name}
            onPress={() => onThemeClick(item)}
            icon={item.icon}
            textStyle={styles.themeName}
        />
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            {/* Close button */}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                            >
                                <Image
                                    source={closeIcon}
                                    style={styles.closeButtonImage}
                                />
                            </TouchableOpacity>

                            <Text style={styles.title}>
                                {t('app.selectTheme')}
                            </Text>

                            <FlatList
                                data={theme}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                                style={styles.flatList}
                                contentContainerStyle={styles.listContainer}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ThemesSelector;
