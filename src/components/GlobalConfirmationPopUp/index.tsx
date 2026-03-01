import React from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Image,
} from 'react-native';
import useStyles from './styles';
import Button from '../Button';
import closeIcon from '@/assets/images/close.png';
import { t } from 'i18next';
import { useTheme } from '@/contexts/themeContext';

interface GlobalConfirmationPopUpProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    showCloseButton?: boolean;
    loading?: boolean;
}

/**
 * Global confirmation popup component
 * Reusable across the app for any confirmation dialogs
 */
const GlobalConfirmationPopUp: React.FC<GlobalConfirmationPopUpProps> = ({
    visible,
    onClose,
    onConfirm,
    title,
    message,
    cancelText,
    confirmText,
    showCloseButton = true,
    loading = false,
}) => {
    const styles = useStyles();
    const { theme } = useTheme();

    // Use translations for default values
    const finalCancelText = cancelText || t('app.cancel');
    const finalConfirmText = confirmText || t('app.confirm');

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
                            {showCloseButton && (
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Image
                                        source={closeIcon}
                                        style={styles.closeButtonImage}
                                    />
                                </TouchableOpacity>
                            )}

                            {/* Title */}
                            <Text style={styles.title}>{title}</Text>

                            {/* Message */}
                            <Text style={styles.message}>{message}</Text>

                            {/* Buttons */}
                            <View style={styles.buttonsContainer}>
                                <Button
                                    additionalStyle={styles.cancelButton}
                                    textStyle={styles.cancelButtonText}
                                    text={finalCancelText}
                                    onPress={onClose}
                                    disabled={loading}
                                />
                                <Button
                                    text={finalConfirmText}
                                    onPress={onConfirm}
                                    additionalStyle={styles.confirmButton}
                                    textStyle={styles.confirmButtonText}
                                    fetching={loading}
                                    disabled={loading}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default GlobalConfirmationPopUp;
