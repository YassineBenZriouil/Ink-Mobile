import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import COLORS from '@/theme';

import { ScaledSheet } from 'react-native-size-matters/extend';

export default ScaledSheet.create({
  primary: {
    width: '300@s',
    height: '50@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@ms',
    backgroundColor: COLORS.white,
    color: COLORS.white,
    flexDirection: 'row',
    gap: '20@s',
  },
  disabled: {
    width: '300@s',
    height: '50@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@ms',
    backgroundColor: COLORS.gray,
    color: COLORS.white,
    flexDirection: 'row',
    gap: '20@s',
  },
  primaryText: {
    fontSize: FONT_SIZES.f10,
    alignSelf: 'center',
    color: COLORS.gray,
    fontFamily: FONT_FAMILY.Regular,
  },

});
