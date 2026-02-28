import COLORS, { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        height: '35@vs',
        borderRadius: '8@s',
        alignItems: 'center',
        position: 'relative',
    },
    rightContainer: {
        flexDirection: 'row',
        height: '35@vs',
        borderRadius: '8@s',
        alignItems: 'center',
        position: 'relative',
    },
    icon: {
        width: '20@s',
        height: '20@s',
        marginRight: '20@s',
        tintColor: COLORS.secondary,
    },
    moreIcon: {
        width: '25@s',
        height: '25@s',
        tintColor: COLORS.secondary,
    },
    title: {
        fontSize: FONT_SIZES.f13,
        fontFamily: FONT_FAMILY.Regular,
        color: COLORS.secondary,
    },
    menuOptionsContainer: {
        backgroundColor: COLORS.darkGray, // standard dark menu background
        borderRadius: '5@s',
        width: '150@s',
        marginTop: '10@s',
    },
    menuOptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: '15@s',
        height: '15@s',
        marginRight: '10@s',
        tintColor: COLORS.secondary,
    },
    menuOptionText: {
        fontSize: FONT_SIZES.f10,
        fontFamily: FONT_FAMILY.Regular,
        color: COLORS.secondary,
    },
});
