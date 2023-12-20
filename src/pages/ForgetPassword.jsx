import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            await forgotPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch {
            setError('Failed to reset password');
        }
    };

    return (
        <section className="bg-custom-gradient flex items-center justify-center h-screen font-custom">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 text-center">
                    Reset Password
                </h1>
                {error && <p className="mb-4 text-sm text-red-600" data-testid= "forget-error">{error}</p>}
                {message && <p className="mb-4 text-sm text-green-600" data-testid= "forget-message">{message}</p>}
                <form onSubmit={handleSubmit} data-testid= "forget-form" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            data-testid= "forget-email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" data-testid= "forget-button" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Reset Password</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;

