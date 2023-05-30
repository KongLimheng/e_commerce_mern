import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server'

const ActivationPage = () => {
    const { activateToken } = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (activateToken) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, {
                        token: activateToken,
                    })
                    console.log(res)
                    setError(false)
                } catch (err) {
                    console.log(err)
                    setError(true)
                }
            }

            activationEmail()
        }
    }, [activateToken])
    console.log(activateToken)
    return (
        <div>
            {error ? (
                <p>Your token is expired</p>
            ) : (
                <p>Your account has been created successfully</p>
            )}
        </div>
    )
}

export default ActivationPage
