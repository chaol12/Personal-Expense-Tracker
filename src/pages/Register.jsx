import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

const Register = () => {
    const navigate = useNavigate();

    const { register } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await register(email, password);
            // send welcome email
            const templateParameters = { // these parameters are outlined in the template
                recipient: email,
            };
            // send welcome email trigger
            e.preventDefault();
            emailjs.send('service_vcya2vm', 'welcome_1ywtamz', templateParameters, 'xZBCwlq2NxOnENizZ') // 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY'
                .then(() => {
                    alert("Your account has been created!")
                }, () => {
                    alert("Your account could not be created.")
                });

            navigate("/register-survey"); // Navigate to the home page or desired page after successful registration
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <section className=" flex items-center justify-center mt-32">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 text-center">
                    Register
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" required="" />
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-green rounded-md hover:bg-darkgreen focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? "Registering..." : "Register"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;