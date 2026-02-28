import { FONT_FAMILY, FONT_SIZES, COLORS } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    container: {
        backgroundColor: COLORS.darkGray,
        borderRadius: '15@s',
        padding: '10@s',
    },
    title: {
        fontFamily: FONT_FAMILY.SemiBold,
        fontSize: FONT_SIZES.f12,
        color: COLORS.secondary,
    },
    body: {
        fontFamily: FONT_FAMILY.Regular,
        fontSize: FONT_SIZES.f10,
        color: COLORS.gray,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: FONT_FAMILY.Light,
        fontSize: FONT_SIZES.f8,
        color: COLORS.gray,
    },
});
