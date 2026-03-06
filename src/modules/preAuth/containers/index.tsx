import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LOGO from '@/assets/images/logo.png';
import Button from '@/components/Button';
import { tr } from '@/locales/i18n';
import ClickableText from '@/components/ClickableText';
import useStyles from './styles';
import { navigate } from '@/tools/navigation';

const PreAuth = () => {
    const styles = useStyles();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.subtitle}>{tr('preauth.title')}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Text style={styles.subtitle2}>{tr('preauth.subtitle')}</Text>
                <Button
                    text={tr('preauth.login')}
                    onPress={() => navigation.navigate('SignIn')}
                    withShadow
                />

                <Button
                    text={tr('preauth.signin')}
                    onPress={() => navigation.navigate('SignUp')}
                    variante="secondary"
                    withShadow
                />
                <ClickableText
                    text={tr('preauth.guest')}
                    onPress={() => {
                        navigate('Home');
                    }}
                />
            </View>
        </View>
    );
};

export default PreAuth;
