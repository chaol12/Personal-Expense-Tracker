import Login from "../pages/Login"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom'
import { AuthContext} from '../context/AuthContext';
//mock function in provider
const login = jest.fn();
const setIsSubmitting = jest.fn()

const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{login, setIsSubmitting}}>
        <Router>
            <Login/>
        </Router>
        </AuthContext.Provider>
    );
};

describe("login screen", () => {
    describe("Visible components on load", () => {
        test("renders login screen", () => {
            render(<MockLoginScreen/>);

            const loginText = screen.getAllByText(/Login/i).length;
            const loginButton = screen.getByRole("button", {name: /login/i });
            const emailInput = screen.getByPlaceholderText(/name@company.com/i);
            const passwordInput = screen.getByPlaceholderText(/••••••••/i);
            expect(loginText).toBe(2);
            expect(loginButton).toBeInTheDocument();
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

        test("login is called", async () => {
            render(<MockLoginScreen/>);
            const loginButton = screen.getByRole("button", {name: /login/i });
            fillAndSubmit("asdasd@gmail.com", "Zhou123123", loginButton);
            expect(login).toHaveBeenCalledTimes(1);

            await act(async () => {
                await setIsSubmitting;
            })
        })
    })
})
