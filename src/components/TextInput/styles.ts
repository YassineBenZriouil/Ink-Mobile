import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
                input: {
                    width: '300@s',
                    height: '50@vs',
                    borderRadius: '8@ms',
                    borderWidth: '1@ms',
                    borderColor: theme.darkGray,
                    backgroundColor: theme.primary,
                    color: theme.secondary,
                    fontFamily: FONT_FAMILY.Regular,
                    fontSize: FONT_SIZES.f12,
                    paddingHorizontal: '15@s',
                },
            }),
        [theme],
    );
};

export default useStyles;
