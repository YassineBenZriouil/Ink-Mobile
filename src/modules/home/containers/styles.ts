import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        marginBottom: 60,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
        marginTop: 20,
        letterSpacing: 1,
    },
    subtitle: {
        color: '#888888',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});
