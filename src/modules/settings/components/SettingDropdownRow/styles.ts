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
                rightSection: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
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
                selectedText: {
                    fontSize: FONT_SIZES.f13,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.gray,
                },
                chevron: {
                    fontSize: FONT_SIZES.f18,
                    color: theme.gray,
                },
                // Modal
                modalOverlay: {
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                modalContent: {
                    width: '80%',
                    backgroundColor: theme.primary,
                    borderRadius: '12@s',
                    padding: '20@s',
                    borderWidth: 1,
                    borderColor: theme.darkGray,
                },
                modalTitle: {
                    fontSize: FONT_SIZES.f16,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                    marginBottom: '16@vs',
                    textAlign: 'center',
                },
                optionRow: {
                    paddingVertical: '12@vs',
                    paddingHorizontal: '12@s',
                    borderRadius: '8@s',
                },
                optionRowSelected: {
                    backgroundColor: theme.darkGray,
                },
                optionText: {
                    fontSize: FONT_SIZES.f14,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                },
                optionTextSelected: {
                    fontFamily: FONT_FAMILY.SemiBold,
                },
            }),
        [theme],
    );
};

export default useStyles;
