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
                    paddingVertical: '50@vs',
                    paddingHorizontal: '30@s',
                },
                formContainer: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15@s',
                },
                title: {
                    color: theme.secondary,
                    fontSize: FONT_SIZES.f24,
                    fontFamily: FONT_FAMILY.SemiBold,
                    marginBottom: '30@s',
                    alignSelf: 'center',
                },
            }),
        [theme],
    );
};

export default useStyles;
