import DeleteConfirm from "../pages/DeleteConfirm";
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
jest.mock("../utils/firebase-config")
let currentUser = {
    uid: "asdasdas"
}
const mockSet = jest.fn()
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <DeleteConfirm 
            setTransactionList = {jest.fn()}
            id = {1}
            setShowConfirmation = {mockSet}
            />
        </Router>
        </AuthContext.Provider>
    );
};

describe("addtrans page screen", () => {
    describe("Visible components on load", () => {
        test("render addtrans button", async () => {
            render(<MockLoginScreen/>);

            const deleteConfirm = screen.getByTestId("delete-confirm");
            const deletButton = screen.getByTestId("delete-confirm-button");
            const cancelButton = screen.getByTestId("delete-cancel-button");
            expect(cancelButton).toBeInTheDocument();
            expect(deleteConfirm).toBeInTheDocument();
            expect(deletButton).toBeInTheDocument();
            console.log = jest.fn();
            fireEvent.click(deletButton);
            expect(console.log).toHaveBeenCalledWith('Transaction successfully deleted!');
            fireEvent.click(cancelButton);
            expect(mockSet).toHaveBeenCalledWith(false);
        })
    })

})