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
                    flex: 1,
                    backgroundColor: theme.primary,
                    paddingHorizontal: '20@s',
                    paddingTop: '10@vs',
                },
                scrollContainer: {
                    flex: 1,
                    marginTop: '10@vs',
                },
                scrollContent: {
                    paddingBottom: '40@vs',
                },
            }),
        [theme],
    );
};

export default useStyles;
