import { forwardRef, useId } from "react"

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="flex flex-col gap-1">
            {label &&
                <label
                    className="font-semibold text-primary-dark text-md"
                    htmlFor={id}>
                    {label}
                </label>
            }
            <input
                type={type}
                className={`${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input