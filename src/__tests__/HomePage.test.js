import Home from "../pages/Home"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';

let currentUser = {
    uid: "asdasdas"
}
const logout = () => {
    currentUser = null;
}
const navigate = jest.fn()
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser, logout}}>
        <Router>
            <Home/>
        </Router>
        </AuthContext.Provider>
    );
};
jest.mock("../images/addImage.png")
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe("Home page screen", () => {
    describe("Visible components on load", () => {
        test("render Homepage", () => {
            render(<MockLoginScreen/>);

            const intro = screen.getByTestId("intro");
            const features = screen.getByTestId("features");
            const footer = screen.getByTestId("footer");
            const logout = screen.getByTestId("home-logout");
            //const join = screen.getByTestId("home-join");
            expect(intro).toBeInTheDocument();
            expect(features).toBeInTheDocument();
            expect(footer).toBeInTheDocument();
            expect(logout).toBeInTheDocument();
            //expect(join).toBeInTheDocument();
        })
    })

    describe("buttons on home screen", () => {
        test("logout", async () => {
            render(<MockLoginScreen/>);
            const logout = screen.getByTestId("home-logout");
            //logout.onclick = handleLogout;
            fireEvent.click(logout);
            expect(currentUser).toBeNull();
            await act(async () => {
                await navigate;
            })
        })
    })
})