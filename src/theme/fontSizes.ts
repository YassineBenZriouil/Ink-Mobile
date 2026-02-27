import { RFValue } from 'react-native-responsive-fontsize';
import { SIZE_MATTERS_BASE_HEIGHT } from '@env';

const BASE_HEIGHT = Number(SIZE_MATTERS_BASE_HEIGHT) || 430;

const FONT_SIZES = {
  f50: RFValue(50, BASE_HEIGHT),
  f45: RFValue(45, BASE_HEIGHT),
  f40: RFValue(40, BASE_HEIGHT),
  f35: RFValue(35, BASE_HEIGHT),
  f30: RFValue(30, BASE_HEIGHT),
  f29: RFValue(29, BASE_HEIGHT),
  f28: RFValue(28, BASE_HEIGHT),
  f27: RFValue(27, BASE_HEIGHT),
  f26: RFValue(26, BASE_HEIGHT),
  f24: RFValue(24, BASE_HEIGHT),
  f22: RFValue(22, BASE_HEIGHT),
  f20: RFValue(20, BASE_HEIGHT),
  f19: RFValue(19, BASE_HEIGHT),
  f18: RFValue(18, BASE_HEIGHT),
  f17: RFValue(17, BASE_HEIGHT),
  f16: RFValue(16, BASE_HEIGHT),
  f15: RFValue(15, BASE_HEIGHT),
  f14: RFValue(14, BASE_HEIGHT),
  f13: RFValue(13, BASE_HEIGHT),
  f12: RFValue(12, BASE_HEIGHT),
  f11: RFValue(11, BASE_HEIGHT),
  f10: RFValue(10, BASE_HEIGHT),
  f9: RFValue(9, BASE_HEIGHT),
  f8: RFValue(8, BASE_HEIGHT),
};

export default FONT_SIZES;
