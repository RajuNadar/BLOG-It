import Button from './Button'
import useTheme from '../context/ThemeContext'
import { BiSun } from 'react-icons/bi'
import { BiSolidMoon } from 'react-icons/bi'


function ThemeToggleBtn({className = ''}) {
    const {themeMode, toggleTheme} = useTheme()
  return (
    <Button 
    bgHover=''
    bgColor=''
    textColor='text-primary-text'
    className="text-center text-xl border border-base-border shadow-[inset_0_-5px_0_0_var(--color-base-border)]"
    onClick={toggleTheme}
    >{themeMode === 'light' ? <BiSolidMoon /> : themeMode === 'dark' ? <BiSun /> : ''}</Button>
  )
}

export default ThemeToggleBtn
