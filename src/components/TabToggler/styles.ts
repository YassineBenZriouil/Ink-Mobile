import COLORS, { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        borderRadius: '10@s',
        height: '40@vs',
        paddingHorizontal: '3@s',
    },
    container: {
        flexDirection: 'row',
        height: '35@vs',
        borderRadius: '8@s',
        alignItems: 'center',
        position: 'relative',
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: '8@s',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        zIndex: 1,
    },
    icon: {
        width: '18@s',
        height: '18@s',
        marginRight: '8@s',
    },
    text: {
        fontSize: FONT_SIZES.f13,
        fontFamily: FONT_FAMILY.Regular,
    },
});
