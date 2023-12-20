import ForgotPassword from "../pages/ForgetPassword";
import { render, screen, fireEvent, act } from "@testing-library/react"
import { cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
jest.mock("../utils/firebase-config")
// let currentUser = { uid: "asdasdas"}
const forgotPassword = jest.fn()
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{forgotPassword}}>
        <Router>
            <ForgotPassword/>
        </Router>
        </AuthContext.Provider>
    );
};
describe("forgetpassword page", () => {
    describe("Visible components on load on screen", () => {
        test("render page", () => {
            render(<MockLoginScreen/>);
            const emailInput = screen.getByTestId("forget-email");
            const button = screen.getByTestId("forget-button");

            expect(emailInput).toBeInTheDocument();
            expect(button).toBeInTheDocument();

        })
    })

    describe("functionality", () => {
        test("input and submit", async () => {
            render(<MockLoginScreen/>);
            const emailInput = screen.getByTestId("forget-email");
            const button = screen.getByTestId("forget-button");
            // const form = screen.getByTestId("forget-form");
            //await userEvent.type(emailInput, 'hello{enter}');
            await userEvent.type(emailInput, 'asdasa@sda.com{enter}');
            await userEvent.click(button)
            await act( async () => {
                render(<MockLoginScreen/>)
            });
            // const button = screen.getByTestId("forget-button");
            // fireEvent.click(button)
            expect(screen.getByTestId("forget-message")).toBeInTheDocument();
        })
    })
})