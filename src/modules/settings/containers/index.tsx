import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/Header';
import SettingToggleRow from '@/modules/settings/components/SettingToggleRow';
import SettingDropdownRow from '@/modules/settings/components/SettingDropdownRow';
import { useTheme } from '@/contexts/themeContext';
import { DARK_THEME, LIGHT_THEME } from '@/theme/colors';
import { tr } from '@/locales/i18n';
import useStyles from './styles';

const Settings = () => {
    const styles = useStyles();
    const { theme, setTheme } = useTheme();

    // Hard-coded local state
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('en');
    const [fontSize, setFontSize] = useState('medium');

    const isDarkMode = theme.primary === DARK_THEME.primary;

    const handleDarkModeToggle = (value: boolean) => {
        setTheme(value ? DARK_THEME : LIGHT_THEME);
    };

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' },
        { label: 'العربية', value: 'ar' },
    ];

    const fontSizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
    ];

    return (
        <View style={styles.container}>
            <Header back title={tr('settings.title')} />
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SettingToggleRow
                    label={tr('settings.notifications')}
                    value={notifications}
                    onValueChange={setNotifications}
                />
                <SettingToggleRow
                    label={tr('settings.darkMode')}
                    value={isDarkMode}
                    onValueChange={handleDarkModeToggle}
                />
                <SettingDropdownRow
                    label={tr('settings.language')}
                    selectedValue={language}
                    options={languageOptions}
                    onSelect={setLanguage}
                />
                {/* <SettingDropdownRow
                    label={tr('settings.fontSize')}
                    selectedValue={fontSize}
                    options={fontSizeOptions}
                    onSelect={setFontSize}
                /> */}
            </ScrollView>
        </View>
    );
};

export default Settings;
