import Register from "../pages/Register"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom'
import { AuthContext} from '../context/AuthContext';

//mock function in provider
const register = jest.fn();
const setIsSubmitting = jest.fn()

const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{register, setIsSubmitting}}>
            <Router>
                <Register/>
            </Router>
        </AuthContext.Provider>
    );
};

describe("register screen", () => {
    describe("Visible components on load", () => {
        test("renders register screen", () => {
            render(<MockLoginScreen/>);

            const registerButton = screen.getByRole("button", {name: /Register/i });
            const emailInput = screen.getByPlaceholderText(/name@company.com/i);
            const passwordInput = screen.getByPlaceholderText(/••••••••/i);
            expect(registerButton).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        })
    })

    describe("functionality", () => {
        const fillAndSubmit = (email, password, button) => {
            const emailInput = screen.getByPlaceholderText(/name@company.com/i);
            const passwordInput = screen.getByPlaceholderText(/••••••••/i);
            fireEvent.change(emailInput, {target: {value: email}});
            fireEvent.change(passwordInput, {target: {value: password}});
            fireEvent.click(button);
        }

        test("register is called", async () => {
            render(<MockLoginScreen/>);
            const registerButton = screen.getByRole("button", {name: /Register/i });
            fillAndSubmit("asdasd@gmail.com", "Zhou123123", registerButton);
            expect(register).toHaveBeenCalledTimes(1);

            await act(async () => {
                await setIsSubmitting;
            })
        })
    })

})