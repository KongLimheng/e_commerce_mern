import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ActivationPage, LoginPage } from './Routes'

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/activation/:activateToken"
                        element={<ActivationPage />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
