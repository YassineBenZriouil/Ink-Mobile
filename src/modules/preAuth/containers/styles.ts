import COLORS, { FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export const authStyles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '30@s',
    },
    logoContainer: {
        marginBottom: '60@s',
        alignItems: 'center',
    },
    logo: {
        width: '150@s',
        height: '150@s',
        resizeMode: 'contain',
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: FONT_SIZES.f16,
        marginTop: '10@s',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        gap: '15@s',
    },
});
