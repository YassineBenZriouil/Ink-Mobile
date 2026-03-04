import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '@/components/Header';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import ClickableText from '@/components/ClickableText';
import { tr } from '@/locales/i18n';
import { useLogin } from '@/hook/useLogin';
import useStyles from './styles';

const SignIn = () => {
    const styles = useStyles();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, error } = useLogin();

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } else if (error) {
            Alert.alert('Login Failed', error);
        }
    };

    return (
        <View style={styles.container}>
            <Header back title={tr('signIn.title')} />

            <View style={styles.formContainer}>
                <Text style={styles.title}>{tr('signIn.title')}</Text>

                <TextInput
                    placeholder={tr('signIn.email')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder={tr('signIn.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Button
                    text={tr('signIn.submit')}
                    onPress={handleSignIn}
                    fetching={isLoading}
                    withShadow
                />

                <ClickableText
                    text={tr('signIn.noAccount')}
                    onPress={() => navigation.navigate('SignUp')}
                />
            </View>
        </View>
    );
};

export default SignIn;
