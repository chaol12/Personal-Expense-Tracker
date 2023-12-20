import RegisterSurvey from "../pages/RegisterSurvey"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
jest.mock("../utils/firebase-config")
jest.mock('../components/useProtectedRoute')
let currentUser = { uid: "asdasdas"}
const setIsSurveyCompleted = jest.fn()
const logSpy = jest.spyOn(console, 'log');
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser, setIsSurveyCompleted}}>
        <Router>
            <RegisterSurvey/>
        </Router>
        </AuthContext.Provider>
    );
};

describe("survey page", () => {
    describe("visible components on load", () => {
        test("render update survey", () => {
            render(<MockLoginScreen/>);
            const fnameInput = screen.getByTestId("survey-fname")
            const lnameInput = screen.getByTestId("survey-lname")
            const collegeInput = screen.getByTestId("survey-college")
            const graduationDateInput = screen.getByTestId("survey-graduationDate")

            expect(fnameInput).toBeInTheDocument()
            expect(lnameInput).toBeInTheDocument()
            expect(collegeInput).toBeInTheDocument()
            expect(graduationDateInput).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("input all field", async () => {
            const user = userEvent.setup();
            render(<MockLoginScreen/>);
            const fnameInput = screen.getByTestId("survey-fname")
            const lnameInput = screen.getByTestId("survey-lname")
            const collegeInput = screen.getByTestId("survey-college")
            const graduationDateInput = screen.getByTestId("survey-graduationDate")
            const monthlyIncomeInput = screen.getByTestId("survey-monthlyIncome")
            const savingsGoalInput = screen.getByTestId("survey-savingsGoal")
            const moneySavedInput = screen.getByTestId("survey-moneySaved")
            const RentInput = screen.getByTestId("survey-Rent/Mortgage")
            const UtilitiesInput = screen.getByTestId("survey-Utilities")
            const GroceriesInput = screen.getByTestId("survey-Groceries")
            const dineOutInput = screen.getByTestId("survey-Dining Out")
            const EntertainmentInput = screen.getByTestId("survey-Entertainment")
            const TransportationInput = screen.getByTestId("survey-Transportation")
            const EducationInput = screen.getByTestId("survey-Education Supplies")
            const InsuranceInput = screen.getByTestId("survey-Insurance")
            const OtherInput = screen.getByTestId("survey-Other")
            const maximumBudgetInput = screen.getByTestId("survey-maximumBudget")
            const phoneNumberInput = screen.getByTestId("survey-phoneNumber")
            const submitButton = screen.getByTestId("survey-submit");


            fireEvent.change(fnameInput, {target: {value: "first"}});
            fireEvent.change(lnameInput, {target: {value: "last"}});
            fireEvent.change(collegeInput, {target: {value: "college"}});
            fireEvent.change(graduationDateInput, {target: {value: "2023-12-21"}});
            fireEvent.change(monthlyIncomeInput, {target: {value: "111"}});
            fireEvent.change(savingsGoalInput, {target: {value: "111"}});
            fireEvent.change(moneySavedInput, {target: {value: "111"}});
            fireEvent.click(RentInput)
            fireEvent.click(RentInput)
            fireEvent.click(UtilitiesInput)
            fireEvent.click(GroceriesInput)
            fireEvent.click(dineOutInput)
            fireEvent.click(EntertainmentInput)
            fireEvent.click(TransportationInput)
            fireEvent.click(EducationInput)
            fireEvent.click(InsuranceInput)
            fireEvent.click(OtherInput)
            fireEvent.change(maximumBudgetInput, {target: {value: "111"}});
            fireEvent.change(phoneNumberInput, {target: {value: "222"}});
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.click(submitButton)
            await act( async () => render(<MockLoginScreen/>));
            //await act( async () => render(<MockLoginScreen/>));
            expect(fnameInput.value).toBe("first")
            expect(lnameInput.value).toBe("last")
            expect(collegeInput.value).toBe("college")
            expect(graduationDateInput.value).toBe("2023-12-21")
            expect(savingsGoalInput.value).toBe("111")
            expect(monthlyIncomeInput.value).toBe("111")
            expect(moneySavedInput.value).toBe("111")
            expect(RentInput).not.toBeChecked()
            expect(UtilitiesInput).toBeChecked()
            expect(GroceriesInput).toBeChecked()
            expect(dineOutInput).toBeChecked()
            expect(EntertainmentInput).toBeChecked()
            expect(TransportationInput).toBeChecked()
            expect(EducationInput).toBeChecked()
            expect(InsuranceInput).toBeChecked()
            expect(OtherInput).toBeChecked()
            expect(maximumBudgetInput.value).toBe("111")
            expect(phoneNumberInput.value).toBe("222")

            expect(logSpy).toHaveBeenCalled();
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            expect(window.alert).toHaveBeenCalledTimes(0);
        })
        test("not completed survey", () => {
            render(<MockLoginScreen/>);
            const submitButton = screen.getByTestId("survey-submit");
            
            fireEvent.click(submitButton)
            
            expect(window.alert).toHaveBeenCalledWith("Please complete all fields before submitting.");
        })
    })
})