import React from 'react'

function Button({
    children,
    // children is only a text that have passed to this compponent
    type = "botton",
    bgHover = "hover:bg-accent-hover",
    bgColor = "bg-accent",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button
    className={`active:translate-y-2 lg:px-3 lg:py-2 py-1 shadow-xl px-2 cursor-pointer font-semibold rounded-lg transition duration-300 ${className} ${bgColor} ${textColor} ${bgHover}`}
    {...props}
    >{children}</button>
  )
}

export default Button
