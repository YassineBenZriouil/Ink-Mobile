import React, { memo } from 'react';
import {
    TextInput as RNTextInput,
    StyleProp,
    ViewStyle,
    KeyboardTypeOptions,
} from 'react-native';

//styles
import useStyles from './styles';
import { useTheme } from '@/contexts/themeContext';

interface TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    additionalStyle?: StyleProp<ViewStyle>;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: KeyboardTypeOptions;
}

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    additionalStyle,
    autoCapitalize = 'none',
    keyboardType,
}) => {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
        <RNTextInput
            style={[styles.input, additionalStyle]}
            placeholder={placeholder}
            placeholderTextColor={theme.gray}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
        />
    );
};

export default memo(TextInput);
