import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import COLORS from '@/theme';

import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
    button: {
        width: '50@s',
        height: '50@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '25@s',
        backgroundColor: theme.secondary,
        color: theme.secondary,
    },

    icon: {
        width: '30@s',
        height: '30@s',
    },
});
