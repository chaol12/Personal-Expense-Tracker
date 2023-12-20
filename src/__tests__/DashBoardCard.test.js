import DashboardCards from "../pages/DashboardCards"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
const MockLoginScreen = () => {
    return (
            <DashboardCards/>
    );
};
describe("dashboardcard render", () => {
    describe("Visible components on load", () => {
        test("renders dashboardcard", () => {
            render(<MockLoginScreen/>);

            const income = screen.getByTestId("income");
            const budget = screen.getByTestId("budget-save");
            const saving = screen.getByTestId("saving");
            const totalSave = screen.getByTestId("total-save");
            expect(income).toBeInTheDocument();
            expect(budget).toBeInTheDocument();
            expect(saving).toBeInTheDocument();
            expect(totalSave).toBeInTheDocument();

        })
    })
})