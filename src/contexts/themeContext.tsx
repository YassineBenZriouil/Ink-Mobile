import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DARK_THEME, LIGHT_THEME } from '@/theme/colors';

type ThemeType = typeof DARK_THEME;

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: DARK_THEME,
    setTheme: () => {}, 
    toggleTheme: () => {}, 
    isDarkTheme: true,
});

export const ThemeProvider = ({ children, initialTheme = DARK_THEME }: { children: ReactNode, initialTheme?: ThemeType }) => {
    const [theme, setThemeState] = useState<ThemeType>(initialTheme);

    const isDarkTheme = theme.primary === DARK_THEME.primary;

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? LIGHT_THEME : DARK_THEME;
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme: setThemeState, toggleTheme, isDarkTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
