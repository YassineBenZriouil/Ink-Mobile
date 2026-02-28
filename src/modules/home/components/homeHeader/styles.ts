import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import COLORS from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '20@s',
        paddingVertical: '12@vs',
        backgroundColor: COLORS.primary,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6@s',
    },
    title: {
        fontSize: FONT_SIZES.f13,
        fontFamily: FONT_FAMILY.SemiBold,
        color: COLORS.secondary,
    },
    downIcon: {
        width: '22@s',
        height: '22@s',
        tintColor: COLORS.secondary,
    },
    burgerIcon: {
        width: '22@s',
        height: '22@s',
        tintColor: COLORS.secondary,
    },
});
