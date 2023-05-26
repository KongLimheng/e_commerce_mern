import clsx from 'clsx'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const InputField = ({
    id,
    placeholder,
    type,
    autoComplete,
    required,
    value,
    onChange,
    label,
}) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1 relative">
                <input
                    id={id}
                    type={isVisible ? 'text' : type}
                    autoComplete={autoComplete}
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={clsx(`appearance-none block w-full px-2 py-2 border rounded-md border-gray-300 shadow-sm focus:outline-none
                    placeholder-gray-400 focus:border-blue-400 sm:text-sm`)}
                />
                {type === 'password' && (
                    <div
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? (
                            <AiOutlineEye size={25} />
                        ) : (
                            <AiOutlineEyeInvisible size={25} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputField
