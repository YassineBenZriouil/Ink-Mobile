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
                secondary: {
                    width: '300@s',
                    height: '50@vs',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8@ms',
                    backgroundColor: theme.primary,
                    borderWidth: '1@ms',
                    borderColor: theme.secondary,
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
                    fontSize: FONT_SIZES.f12,
                    color: theme.primary,
                    fontFamily: FONT_FAMILY.SemiBold,
                },
                secondaryText: {
                    fontSize: FONT_SIZES.f12,
                    color: theme.secondary,
                    fontFamily: FONT_FAMILY.SemiBold,
                },
                icon: {
                    width: '24@s',
                    height: '26@vs',
                },
            }),
        [theme],
    );
};

export default useStyles;
