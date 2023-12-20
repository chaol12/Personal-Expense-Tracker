import { render, screen, fireEvent, act } from "@testing-library/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom'
import { AuthContext} from '../context/AuthContext';
import NavBar from "../components/NavBar";

let currentUser = null
const logout = jest.fn()
const navigate = jest.fn()
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser, logout}}>
        <Router>
            <NavBar/>
        </Router>
        </AuthContext.Provider>
    );
};
  

describe("navbar component", () => {
    describe("Visible components on load on screen", () => {
        test("render navBar when not login", () => {
            render(<MockLoginScreen/>);
            //when not login
            const home = screen.getByTestId("home");
            const signin = screen.getByTestId("signin");
            const signup = screen.getByTestId("signup");
            expect(home).toBeInTheDocument();
            expect(signin).toBeInTheDocument();
            expect(signup).toBeInTheDocument();
        })
        test("render navBar when login", () => {
            currentUser = { uid: "asdasdas"};
            render(<MockLoginScreen/>);
            const dashboard = screen.getByTestId("dashboard");
            const profile = screen.getByTestId("profile")
            const logout = screen.getByTestId("logout");
            expect(logout).toBeInTheDocument();
            expect(dashboard).toBeInTheDocument();
            expect(profile).toBeInTheDocument();
            expect(
                ()=>screen.getByTestId("signin")
             ).toThrow()
             expect(
                ()=>screen.getByTestId("signup")
             ).toThrow()
        })
    })

    describe("functionality", () => {
        test("navigation when not login", () => {
            currentUser = null
            render(<MockLoginScreen/>);
            const home = screen.getByTestId("home");
            const signin = screen.getByTestId("signin");
            const signup = screen.getByTestId("signup");
            fireEvent.click(home);
            expect(window.location.href).toBe("http://localhost/");
            fireEvent.click(signin);
            expect(window.location.href).toBe("http://localhost/login");
            fireEvent.click(signup);
            expect(window.location.href).toBe("http://localhost/register");
        })
        test("navigation when login", async () => {
            currentUser = { uid: "asdasdas"};
            render(<MockLoginScreen/>);
            const dashboard = screen.getByTestId("dashboard");
            const data = screen.getByTestId("data");
            const profile = screen.getByTestId("profile");
            const logout = screen.getByTestId("logout");
            fireEvent.click(dashboard);
            expect(window.location.href).toBe("http://localhost/transtable");
            fireEvent.click(data);
            expect(window.location.href).toBe("http://localhost/data");
            fireEvent.click(profile);
            expect(window.location.href).toBe("http://localhost/profile");

            const handleLogout = jest.fn(() => {
                currentUser = null;
            });
            logout.onclick = handleLogout;
            fireEvent.click(logout);
            expect(currentUser).toBeNull()
            await act(async () => {
                await navigate;
            })
        })
    })
})