
import COLORS, { FONT_SIZES } from '@/theme';
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
    titleInput: {
        color: COLORS.secondary,
        fontSize: FONT_SIZES.f18,
        fontWeight: 'bold',
        paddingVertical: '10@vs',
    },
    bodyInput: {
        flex: 1,
        color: COLORS.secondary,
        fontSize: FONT_SIZES.f13,
        paddingTop: '10@vs',
    },
    dateText: {
        color: COLORS.darkGray,
        fontSize: FONT_SIZES.f11,
        marginBottom: '5@vs',
    },
});
