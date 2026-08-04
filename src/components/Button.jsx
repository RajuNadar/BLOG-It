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
    className={`px-4 py-2 cursor-pointer font-semibold rounded-lg transition duration-300 ${className} ${bgColor} ${textColor} ${bgHover}`}
    {...props}
    >{children}</button>
  )
}

export default Button
