import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import Router from './src/router';

function App() {
    return (
        <SafeAreaProvider>
            <MenuProvider>
                <View style={styles.container}>
                    <Router />
                </View>
            </MenuProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default App;
