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
                modalContentWrapper: {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                container: {
                    backgroundColor: theme.primary, // Black background like NoteDetails
                    borderRadius: '20@s',
                    paddingHorizontal: '24@s',
                    paddingTop: '20@vs',
                    paddingBottom: '24@vs',
                    alignItems: 'flex-start',
                    width: '320@s',
                    minHeight: '200@vs',
                    maxHeight: '500@vs', // prevent it from growing off screen
                },
                closeButton: {
                    position: 'absolute',
                    top: '15@vs',
                    right: '15@s',
                    width: '30@s',
                    height: '30@s',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                },
                closeButtonImage: {
                    width: '16@s',
                    height: '16@s',
                    tintColor: theme.secondary,
                },
                selectionContainer: {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20@vs',
                },
                selectionTitle: {
                    fontSize: FONT_SIZES.f14,
                    fontFamily: FONT_FAMILY.Bold,
                    color: theme.secondary,
                    marginBottom: '30@vs',
                },
                modeButton: {
                    width: '100%',
                    paddingVertical: '15@vs',
                    borderRadius: '10@s',
                    backgroundColor: theme.darkGray,
                    marginBottom: '15@vs',
                    alignItems: 'center',
                },
                modeButtonText: {
                    fontSize: FONT_SIZES.f12,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                },
                contentContainer: {
                    width: '100%',
                    marginTop: '20@vs',
                    flex: 1,
                },
                // SINGLE TODO STYLES
                singleRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                singleInput: {
                    flex: 1,
                    marginLeft: '10@s',
                    fontSize: FONT_SIZES.f12,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                    borderWidth: 0, // completely submerged
                    paddingVertical: '10@vs',
                },
                // LIST TODO STYLES
                listTitleInput: {
                    fontSize: FONT_SIZES.f14,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                    borderWidth: 0,
                    marginBottom: '20@vs',
                },
                listTitleLabel: {
                    fontSize: FONT_SIZES.f14,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.secondary,
                    marginBottom: '20@vs',
                },
                subTodosScroll: {
                    width: '100%',
                    flex: 1,
                },
                subTodoRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10@vs',
                },
                subTodoInput: {
                    flex: 1,
                    marginLeft: '10@s',
                    fontSize: FONT_SIZES.f10,
                    fontFamily: FONT_FAMILY.Regular,
                    color: theme.secondary,
                    borderWidth: 0,
                    paddingVertical: '8@vs',
                },
                addRowButton: {
                    width: '24@s',
                    height: '24@s',
                    borderRadius: '12@s',
                    backgroundColor: theme.darkGray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5@vs',
                    marginLeft: '28@s', // Aligning under the text inputs
                },
                addRowButtonDisabled: {
                    opacity: 0.3,
                },
                addRowPlus: {
                    fontSize: FONT_SIZES.f12,
                    color: theme.secondary,
                    lineHeight: FONT_SIZES.f16,
                },
                // COMMON FOOTER
                createButton: {
                    width: '100%',
                    paddingVertical: '12@vs',
                    borderRadius: '10@s',
                    backgroundColor: theme.secondary,
                    alignItems: 'center',
                    marginTop: '20@vs',
                },
                createButtonDisabled: {
                    opacity: 0.3,
                },
                createButtonText: {
                    fontSize: FONT_SIZES.f12,
                    fontFamily: FONT_FAMILY.SemiBold,
                    color: theme.primary,
                },
            }),
        [theme],
    );
};

export default useStyles;
