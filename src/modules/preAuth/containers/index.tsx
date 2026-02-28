import React from 'react';
import { View, Text, Image } from 'react-native';
import { authStyles as styles } from './styles';
import LOGO from '@/assets/images/logo.png';
import Button from '@/components/Button';
import { tr } from '@/locales/i18n';
import ClickableText from '@/components/ClickableText';

const PreAuth = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.subtitle}>{tr('preauth.title')}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text={tr('preauth.login')}
                    onPress={() => {}}
                    withShadow
                />

                <Button
                    text={tr('preauth.signin')}
                    onPress={() => {}}
                    variante="secondary"
                    withShadow
                />
                <ClickableText
                    text="Proceed WithOut Syncing Notes"
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

export default PreAuth;
