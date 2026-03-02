import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
                container: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: '20@s',
                    paddingVertical: '12@vs',
                    backgroundColor: theme.primary,
                },
                leftSection: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6@s',
                },
                title: {
                    fontSize: FONT_SIZES.f13,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                },
                downIcon: {
                    width: '22@s',
                    height: '22@s',
                    tintColor: theme.secondary,
                },
                burgerIcon: {
                    width: '22@s',
                    height: '22@s',
                    tintColor: theme.secondary,
                },
            }),
        [theme],
    );
};

export default useStyles;
