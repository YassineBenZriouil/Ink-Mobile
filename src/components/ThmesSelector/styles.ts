import { useMemo } from 'react';
import { FONT_FAMILY, FONT_SIZES } from '@/theme';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { useTheme } from '@/contexts/themeContext';

const useStyles = () => {
    const { theme } = useTheme();

    return useMemo(
        () =>
            ScaledSheet.create({
                overlay: {
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                container: {
                    backgroundColor: theme.darkGray,
                    borderRadius: '20@s',
                    paddingHorizontal: '24@s',
                    paddingTop: '20@vs',
                    paddingBottom: '24@vs',
                    alignItems: 'center',
                    width: '300@s',
                },
                closeButton: {
                    position: 'absolute',
                    top: '15@vs',
                    right: '15@s',
                    width: '30@s',
                    height: '30@s',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                closeButtonImage: {
                    width: '16@s',
                    height: '16@s',
                    tintColor: theme.secondary,
                },
                title: {
                    fontSize: FONT_SIZES.f15,
                    fontFamily: FONT_FAMILY.Bold,
                    color: theme.secondary,
                    marginTop: '10@vs',
                    marginBottom: '12@vs',
                    textAlign: 'center',
                },
                message: {
                    fontSize: FONT_SIZES.f10,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                    textAlign: 'center',
                    marginBottom: '24@vs',
                    paddingHorizontal: '10@s',
                },
                buttonsContainer: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '16@s',
                    width: '100%',
                },
                cancelButton: {
                    width: '110@s',
                    height: '40@vs',
                    backgroundColor: theme.primary,
                    borderWidth: 1,
                    borderColor: theme.secondary,
                },
                cancelButtonText: {
                    fontSize: FONT_SIZES.f10,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                },
                confirmButton: {
                    width: '110@s',
                    height: '40@vs',
                    borderWidth: 1,
                    borderColor: theme.primary,
                },
                confirmButtonText: {
                    fontSize: FONT_SIZES.f8,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.primary,
                },
                flatList: {
                    width: '100%',
                    marginTop: '20@vs',
                },
                listContainer: {
                    paddingBottom: '10@vs',
                },
                themeItem: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10@vs',
                    borderRadius: '12@s',
                    backgroundColor: theme.primary, // Contrasts nicely with the darkGray container
                    borderWidth: 1,
                    borderColor: theme.secondary + '15',
                    width: '100%',
                },

                themeName: {
                    fontSize: FONT_SIZES.f12,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                },
            }),
        [theme],
    );
};

export default useStyles;
