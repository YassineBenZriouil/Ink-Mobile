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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: '30@s',
                },
                logoContainer: {
                    marginBottom: '60@s',
                    alignItems: 'center',
                },
                logo: {
                    width: '150@s',
                    height: '150@s',
                    resizeMode: 'contain',
                },
                subtitle: {
                    color: theme.gray,
                    fontSize: FONT_SIZES.f16,
                    fontFamily: FONT_FAMILY.Special,
                    marginTop: '10@s',
                    textAlign: 'center',
                },
                buttonContainer: {
                    width: '100%',
                    gap: '15@s',
                },
                asGuest: {
                    color: theme.gray,
                    fontSize: FONT_SIZES.f12,
                    fontFamily: FONT_FAMILY.Regular,
                    marginTop: '10@s',
                    textAlign: 'center',
                },
            }),
        [theme],
    );
};

export default useStyles;
