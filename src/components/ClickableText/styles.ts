import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
                primary: {
                    width: '300@s',
                    height: '50@vs',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8@ms',
                    backgroundColor: theme.secondary,
                    color: theme.secondary,
                    flexDirection: 'row',
                    gap: '20@s',
                },
                disabled: {
                    width: '300@s',
                    height: '50@vs',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8@ms',
                    backgroundColor: theme.gray,
                    color: theme.secondary,
                    flexDirection: 'row',
                    gap: '20@s',
                },
                primaryText: {
                    fontSize: FONT_SIZES.f10,
                    alignSelf: 'center',
                    color: theme.gray,
                    fontFamily: FONT_FAMILY.Regular,
                },
            }),
        [theme],
    );
};

export default useStyles;
