import { forwardRef, useId } from "react"


function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            {label && <label className="font-semibold text-primary-dark text-sm lg:text-md mr-1" htmlFor={id}>{label}</label>}
            <select
            className={`${className}`}
            {...props}
            id={id}
            ref={ref}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)
