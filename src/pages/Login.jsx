import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
import { useEffect } from "react";
const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await login(email, password);
            navigate("/"); // Navigate to the home page or desired page after successful login
        } catch (err) {
            setError(err.message);
        } finally {
            mounted.current && setIsSubmitting(false);
        }
    }

    return (
        <section className=" flex items-center justify-center mt-32">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="mr-2 w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" required=""/>
                            <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
                        </div>
                        <a href="/forget-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-green rounded-md hover:bg-darkgreen focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;