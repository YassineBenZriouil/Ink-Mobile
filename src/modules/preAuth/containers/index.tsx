import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import LOGO from '@/assets/images/logo.png'
import Button from '@/components/Button';
import WritingFeatherAnim from '@/components/WritingFeatherAnim';
import { tr } from '@/locales/i18n';
import ClickableText from '@/components/ClickableText';

const PreAuth = () => {

    useEffect(() => {
        // Hide the splash screen once the component is mounted
        const init = async () => {
            try {
                await RNBootSplash.hide({ fade: true });
                console.log('Bootsplash hidden successfully');
            } catch (error) {
                console.warn('Bootsplash hide error:', error);
            }
        };

        init();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.subtitle}>{tr('preauth.title')}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text={tr('preauth.login')}
                    onPress={() => { }}
                    withShadow
                />

                <Button
                    text={tr('preauth.signin')}
                    onPress={() => { }}
                    variante='secondary'
                    withShadow
                />
                <ClickableText text="Proceed WithOut Syncing Notes" onPress={() => { }} />
            </View>
        </View>
    );
};

export default PreAuth;





