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
  secondary: {
    width: '300@s',
    height: '50@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@ms',
    backgroundColor: COLORS.primary,
    borderWidth: '1@ms',
    borderColor: COLORS.white,
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
    fontSize: FONT_SIZES.f12,
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.InterSemiBold,
  },
  secondaryText: {
    fontSize: FONT_SIZES.f12,
    color: COLORS.white,
    fontFamily: FONT_FAMILY.InterSemiBold,
  },
  icon: {
    width: '24@s',
    height: '26@vs',
  },
});
