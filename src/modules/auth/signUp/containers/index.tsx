import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '@/components/Header';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import ClickableText from '@/components/ClickableText';
import { tr } from '@/locales/i18n';
import { useSignUp } from '@/hook/useSignUp';
import useStyles from './styles';

const SignUp = () => {
    const styles = useStyles();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { signUp, isLoading, error } = useSignUp();

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        const success = await signUp(email, password);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } else if (error) {
            Alert.alert('Sign Up Failed', error);
        }
    };

    return (
        <View style={styles.container}>
            <Header back title={tr('signUp.title')} />

            <View style={styles.formContainer}>
                <Text style={styles.title}>{tr('signUp.title')}</Text>

                <TextInput
                    placeholder={tr('signUp.email')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder={tr('signUp.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    placeholder={tr('signUp.confirmPassword')}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <Button
                    text={tr('signUp.submit')}
                    onPress={handleSignUp}
                    fetching={isLoading}
                    withShadow
                />

                <ClickableText
                    text={tr('signUp.haveAccount')}
                    onPress={() => navigation.navigate('SignIn')}
                />
            </View>
        </View>
    );
};

export default SignUp;
