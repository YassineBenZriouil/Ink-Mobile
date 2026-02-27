import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { authStyles as styles } from './styles';
import LOGO from '@/assets/images/logo.png'
import Button from '@/components/Button';

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
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.logoContainer}>
                <Image
                    source={LOGO}
                    style={styles.logo}
                />
                <Text style={styles.title}>INK</Text>
                <Text style={styles.subtitle}>Hoooooooooooooooooooooooome</Text>
            </View>


        </View>
    );
};

export default PreAuth;





