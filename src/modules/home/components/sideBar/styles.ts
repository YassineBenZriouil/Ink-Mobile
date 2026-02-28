import COLORS, { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkGray,
        paddingTop: '10@vs',
        borderRadius: '20@s',
    },
    header: {
        paddingHorizontal: '20@s',
        marginBottom: '20@vs',
    },
    headerTitle: {
        fontSize: FONT_SIZES.f20,
        fontFamily: FONT_FAMILY.Bold,
        color: COLORS.secondary,
    },
    itemsContainer: {
        flex: 1,
        paddingHorizontal: '10@s',
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '15@vs',
        paddingHorizontal: '10@s',
        borderRadius: '8@s',
    },
    itemIcon: {
        width: '20@s',
        height: '20@s',
        tintColor: COLORS.secondary,
        marginRight: '15@s',
    },
    itemText: {
        fontSize: FONT_SIZES.f12,
        fontFamily: FONT_FAMILY.Regular,
        color: COLORS.secondary,
    },
});
