import UpdateBudget from "../pages/UpdateBudget"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
jest.mock("../utils/firebase-config")
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
let currentUser = null
const setShowUpdateBudge = jest.fn()
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <UpdateBudget showUpdateBudge = {true} setShowUpdateBudge={setShowUpdateBudge} setMonthlyBudget={jest.fn()} />
        </Router>
        </AuthContext.Provider>
    );
};

describe("updateBudget box", () => {
    describe("visible components on load", () => {
        test("render update budget", () => {
            render(<MockLoginScreen/>);
            const budgetInput = screen.getByTestId("budget")
            const budgetButton = screen.getByTestId("budget-button")
            const cancelButton = screen.getByTestId("budget-cancel-button")

            expect(budgetInput).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
            expect(budgetButton).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("change budget", () => {
            currentUser =  {
                uid: "asdasdas"
            }
            render(<MockLoginScreen/>);
            const budgetInput = screen.getByTestId("budget")
            const budgetButton = screen.getByTestId("budget-button")

            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(budgetInput, {target: {value: "1111"}});
            expect(budgetInput.value).toBe("1111")
            fireEvent.click(budgetButton);
            expect(window.alert).toHaveBeenCalledTimes(0);
            
        })
        test("change budget with user not loigin", () => {
            currentUser = null;
            render(<MockLoginScreen/>);
            const budgetInput = screen.getByTestId("budget")
            const budgetButton = screen.getByTestId("budget-button")

            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(budgetInput, {target: {value: "1111"}});
            fireEvent.click(budgetButton);
            expect(window.alert).toBeCalledWith("You seem to be experiencing connection problems, please log in again!");
            
        })
        test("invalid budget", () => {

            render(<MockLoginScreen/>);
            const budgetInput = screen.getByTestId("budget")
            const budgetButton = screen.getByTestId("budget-button")

            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(budgetInput, {target: {value: "1000000001"}});
            fireEvent.click(budgetButton);
            expect(window.alert).toBeCalledWith("The amount you entered was inputted incorrectly, please enter the range between 0 - 1 billion");
            
        })
        test("cancel update", () => {

            render(<MockLoginScreen/>);
            const cancelButton = screen.getByTestId("budget-cancel-button");
            fireEvent.click(cancelButton);
            expect(setShowUpdateBudge).toBeCalledWith(false);
            
        })
    })
})