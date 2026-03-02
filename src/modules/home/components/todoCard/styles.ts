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
                    backgroundColor: theme.darkGray,
                    borderRadius: '15@s',
                    padding: '10@s',
                },
                mainRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                mainTitle: {
                    fontFamily: FONT_FAMILY.SemiBold,
                    fontSize: FONT_SIZES.f12,
                    color: theme.secondary,
                    marginLeft: '8@s',
                    flex: 1,
                },
                completedTitle: {
                    color: theme.gray,
                    textDecorationLine: 'line-through',
                },
                subTodosContainer: {
                    marginTop: '10@s',
                    marginLeft: '8@s',
                    paddingLeft: '12@s',
                    borderLeftWidth: 1,
                    borderLeftColor: theme.gray,
                },
                subTodoRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '8@s',
                },
                subTodoTitle: {
                    fontFamily: FONT_FAMILY.Regular,
                    fontSize: FONT_SIZES.f10,
                    color: theme.secondary,
                    marginLeft: '8@s',
                    flex: 1,
                },
            }),
        [theme],
    );
};

export default useStyles;
