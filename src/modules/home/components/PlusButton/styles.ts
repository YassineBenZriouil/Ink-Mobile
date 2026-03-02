import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
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
            }),
        [theme],
    );
};

export default useStyles;
