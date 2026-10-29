import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
    themeMode: 'light',
    toggleTheme: () => {},
})

export function ThemeProvider({children}) {
    const [themeMode, setThemeMode] = useState(() => {
        const savedTheme = localStorage.getItem('themeMode')
        return savedTheme ? savedTheme : 'light'
    })

    

    const toggleTheme = () => {
        setThemeMode((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode)
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(themeMode)
    }, [themeMode])

    return(
        <ThemeContext.Provider value={{themeMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default function useTheme () {
    return useContext(ThemeContext)
}
