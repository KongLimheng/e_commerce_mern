import clsx from 'clsx'
import { useState } from 'react'
import styles from '../../styles/styles.js'
import InputField from '../InputField'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [avarta, setAvarta] = useState(null)

    /**
     *
     * @param {import('react').ChangeEvent<HTMLInputElement>} e
     */
    const handleFileChange = (e) => {
        let file = e.target.files[0]
        const mxSize = 2 * 1024 * 1024 //2MB

        if (file) {
            file.size < mxSize ? setAvarta(file) : console.log('too large')
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md px-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isRegister ? 'Sign Up' : 'Login'} to your account
                </h2>
                <div className="py-8 shadow-xl sm:rounded-lg px-8 mt-6">
                    <form
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {isRegister && (
                            <InputField
                                id="fullname"
                                placeholder="FullName"
                                type="text"
                                value={fullName}
                                label="Full Name"
                                required
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        )}

                        <InputField
                            id="email"
                            placeholder="email"
                            type="email"
                            value={email}
                            required
                            label="Email Address"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputField
                            id="password"
                            placeholder="password"
                            type="password"
                            value={password}
                            required
                            label="Password"
                            autoComplete="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div
                            className={clsx(
                                `justify-between`,
                                styles.noramlFlex
                            )}
                        >
                            {isRegister ? (
                                <>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full ">
                                        <div className="col-span-full">
                                            <label
                                                htmlFor="avarta"
                                                className="flex justify-center rounded-lg border border-dashed border-gray-900/25 p-4 cursor-pointer max-h-40"
                                            >
                                                <div className="text-center w-full">
                                                    {avarta ? (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                avarta
                                                            )}
                                                            alt="avarta"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <>
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-300"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                                <div className="relative cursor-pointer rounded-md bg-white font-semibold">
                                                                    <span>
                                                                        Upload a
                                                                        file
                                                                    </span>
                                                                </div>
                                                                <p className="pl-1">
                                                                    or drag and
                                                                    drop
                                                                </p>
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-600">
                                                                PNG, JPG, GIF up
                                                                to 10MB
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    id="avarta"
                                                    name="avarta"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                    accept=".jpg,.png"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={clsx(styles.noramlFlex)}>
                                        <input
                                            type="checkbox"
                                            name="remember-me"
                                            id="remember"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 border rounded"
                                        />
                                        <label
                                            className="ml-2 block text-gray-900"
                                            htmlFor="remember"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a
                                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                        href="/"
                                    >
                                        Forget your password?
                                    </a>
                                </>
                            )}
                        </div>

                        <div className={clsx(`justify-end`, styles.noramlFlex)}>
                            <button
                                className="group relative w-full h-[40px] flex justify-center py-2
                                bg-blue-600 px-4 border border-transparent text-sm font-medium  text-white
                                rounded-md hover:bg-blue-700 dai-btn"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>

                        <div>
                            Not have any account?
                            <span
                                className="cursor-pointer text-blue-500 hover:underline ml-2"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? 'Sign In' : 'Sign Up'}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
