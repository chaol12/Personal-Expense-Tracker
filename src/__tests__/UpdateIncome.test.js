import UpdateIncome from "../pages/UpdateIncome"
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
let currentUser = null;
const setMonthlyIncome = jest.fn()
const setShowUpdateIncome = jest.fn()

const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <UpdateIncome showUpdateIncome = {true} setShowUpdateIncome={setShowUpdateIncome} setMonthlyIncome={setMonthlyIncome} />
        </Router>
        </AuthContext.Provider>
    );
};
describe("updateIncome box", () =>{
    describe("visible components on load", () => {
        test("render updateIncome component", () => {
            render(<MockLoginScreen/>);
            const inComeInput = screen.getByTestId("income-input")
            const incometButton = screen.getByTestId("income-button")
            const cancelButton = screen.getByTestId("income-cancel-button")

            expect(inComeInput).toBeInTheDocument()
            expect(incometButton).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("change income", () => {
            currentUser =  {
                uid: "asdasdas"
            }
            render(<MockLoginScreen/>);
            const inComeInput = screen.getByTestId("income-input")
            const incometButton = screen.getByTestId("income-button");
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(inComeInput, {target: {value: "1111"}});
            expect(inComeInput.value).toBe("1111");
            fireEvent.click(incometButton);
            expect(window.alert).toHaveBeenCalledTimes(0);
        })
        test("change income with user not loigin", () => {
            currentUser =  null;
            render(<MockLoginScreen/>);
            const inComeInput = screen.getByTestId("income-input")
            const incometButton = screen.getByTestId("income-button");
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(inComeInput, {target: {value: "1111"}});
            fireEvent.click(incometButton);
            expect(window.alert).toBeCalledWith("You seem to be experiencing connection problems, please log in again!");
        })
        test("change invalid income", () => {
            currentUser =  null;
            render(<MockLoginScreen/>);
            const inComeInput = screen.getByTestId("income-input")
            const incometButton = screen.getByTestId("income-button");
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(inComeInput, {target: {value: ""}});
            fireEvent.click(incometButton);
            expect(window.alert).toBeCalledWith("The amount you entered was inputted incorrectly, please enter the range between 0 - 1 billion");
        })
        test("cancel update", () => {
            currentUser =  null;
            render(<MockLoginScreen/>);
            const cancelButton = screen.getByTestId("income-cancel-button")
            fireEvent.click(cancelButton);
            expect(setShowUpdateIncome).toBeCalledWith(false);
        })
    })
})