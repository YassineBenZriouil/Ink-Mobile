import { FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export const authStyles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: '10@s',
    },
    logoContainer: {
        marginBottom: '60@vs',
        alignItems: 'center',
    },
    logo: {
        width: '150@s',
        height: '150@s',
        resizeMode: 'contain',
    },
    title: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.f24,
        fontWeight: '700',
        marginTop: '20@vs',
        letterSpacing: 1,
    },
    subtitle: {
        color: '#888888',
        fontSize: FONT_SIZES.f16,
        marginTop: '10@vs',
        textAlign: 'center',
    },
    plusButton: {
        position: 'absolute',
        bottom: '20@vs',
        right: '20@s',
    },
    scrollContainer: {
        flex: 1,
        marginTop: '20@vs',
    },
    scrollContent: {
        paddingBottom: '100@vs',
        gap: '10@vs',
    },
});
