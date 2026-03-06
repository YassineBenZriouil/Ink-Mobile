import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
                row: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: '14@vs',
                    paddingHorizontal: '5@s',
                    borderBottomWidth: 0.5,
                    borderBottomColor: theme.darkGray,
                },
                leftSection: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                },
                icon: {
                    width: '18@s',
                    height: '18@s',
                },
                label: {
                    fontSize: FONT_SIZES.f14,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                },
            }),
        [theme],
    );
};

export default useStyles;
