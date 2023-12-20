import UpdateSavingGoal from "../pages/UpdateSavingGoal"
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
const setShowUpdateGoal = jest.fn()
const setSavingGoal = jest.fn()

const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <UpdateSavingGoal showUpdateGoal = {true} setShowUpdateGoal={setShowUpdateGoal} setSavingGoal={setSavingGoal} />
        </Router>
        </AuthContext.Provider>
    );
};
describe("updateSaving box", () =>{
    describe("visible components on load", () => {
        test("render updateSaving component", () => {
            render(<MockLoginScreen/>);
            const savingInput = screen.getByTestId("saving-input")
            const savingButton = screen.getByTestId("saving-button")
            const cancelButton = screen.getByTestId("saving-cancel")

            expect(savingInput).toBeInTheDocument()
            expect(savingButton).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("change saving", () => {
            currentUser =  {
                uid: "asdasdas"
            }
            render(<MockLoginScreen/>);
            const savingInput = screen.getByTestId("saving-input")
            const savingButton = screen.getByTestId("saving-button")
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(savingInput, {target: {value: "1111"}});
            expect(savingInput.value).toBe("1111");
            fireEvent.click(savingButton);
            expect(window.alert).toHaveBeenCalledTimes(0);
        })
        test("change saving when not logged in", () => {
            currentUser = null;
            render(<MockLoginScreen/>);
            const savingInput = screen.getByTestId("saving-input")
            const savingButton = screen.getByTestId("saving-button")
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(savingInput, {target: {value: "1111"}});
            fireEvent.click(savingButton);
            expect(window.alert).toBeCalledWith("You seem to be experiencing connection problems, please log in again!");
        })
        test("change with invalid saving", () => {
            currentUser =  {
                uid: "asdasdas"
            }
            render(<MockLoginScreen/>);
            const savingInput = screen.getByTestId("saving-input")
            const savingButton = screen.getByTestId("saving-button")
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.change(savingInput, {target: {value: ""}});

            fireEvent.click(savingButton);
            expect(window.alert).toBeCalledWith("The amount you entered was inputted incorrectly, please enter the range between 0 - 1 billion");
        })
        test("cancel", () => {
            render(<MockLoginScreen/>);
            const cancelButton = screen.getByTestId("saving-cancel")
            fireEvent.click(cancelButton);
            expect(setShowUpdateGoal).toBeCalledWith(false);
        })
    })

})