import AddTransactionForm from "../pages/AddTransactionForm"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
import { toast } from 'react-toastify'
import 'jspdf';
import 'jspdf-autotable';
jest.mock("../utils/firebase-config")
jest.mock("../components/PdfReport")
jest.mock("jspdf")
jest.mock("jspdf-autotable")
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
// jest.mock('react-toastify', () => ({
//     toast: {
//       error: jest.fn(),
//     },
//   }))
let currentUser = {
    uid: "asdasdas"
}
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <AddTransactionForm fetchTransactions = {jest.fn()}/>
        </Router>
        </AuthContext.Provider>
    );
};

describe("addtrans page screen", () => {
    describe("Visible components on load", () => {
        test("render addtrans", async () => {
            render(<MockLoginScreen/>);

            const addButton = screen.getByTestId("add-trans-button");
            expect(addButton).toBeInTheDocument();
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            expect(screen.getByTestId("add-trans-date")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-descrip")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-descrip-list")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-amount")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-submit")).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("add trans today", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.click(submit)
            await act( async () => render(<MockLoginScreen/>));
            expect(amountInput.value).toBe("")
            expect(descripInput.value).toBe("")
        })
        test("add trans in future", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")

            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "3333-12-03"}});
            jest.spyOn(toast, 'error').mockImplementation(() => {});
            fireEvent.click(submit)
            await act( async () => render(<MockLoginScreen/>));
            expect(toast.error).toHaveBeenCalled()
        })
        test("add trans that is too old", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")
            jest.spyOn(toast, 'error').mockImplementation(() => {});
            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "2000-11-03"}});

            fireEvent.click(submit)
            await act( async () => render(<MockLoginScreen/>));
            // let today = new Date().toLocaleString().split(',')[0];
            // let [month,day,year] = today.split('/')
            // day = day.toString().padStart(2, '0')
            // today = `${year}-${month}-${day}`
            expect(toast.error).toHaveBeenCalled()
        })
        test("add trans that not too old, not today", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")

            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "2023-10-03"}});
            expect(dateInput.value).toBe("2023-10-03")
            jest.spyOn(toast, 'error').mockImplementation(() => {});
            fireEvent.click(submit)
            await act( async () => render(<MockLoginScreen/>));
            expect(amountInput.value).toBe("")
            expect(descripInput.value).toBe("")
          
        })
        test("add trans with too long description", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")


            fireEvent.change(descripInput, {target: {value: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"}});
            fireEvent.change(amountInput, {target: {value: "33"}});

            fireEvent.click(submit)
            await act( async () => render(<MockLoginScreen/>));
            expect(toast.error).toHaveBeenCalled()
        })
        test("add trans with no description", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")

            fireEvent.change(descripInput, {target: {value: ""}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            jest.spyOn(toast, 'error').mockImplementation(() => {});
            fireEvent.click(submit)
            expect(toast.error).toHaveBeenCalled()   
        })
        test("add trans with incorrect amount", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")


            fireEvent.change(descripInput, {target: {value: "asdasd"}});
            fireEvent.change(amountInput, {target: {value: ""}});
            jest.spyOn(toast, 'error').mockImplementation(() => {});
            fireEvent.click(submit)
            expect(toast.error).toHaveBeenCalled()
        })
    })

})