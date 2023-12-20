/* istanbul ignore file */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config"; // only import auth
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // import getFirestore from firebase/firestore


// Function to check survey completion
const checkSurveyCompletion = async (userId) => {
    const db = getFirestore();
    const collectionRef = collection(db, 'surveys');
    try {
        const q = query(collectionRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Return true if survey documents exist for the user
    } catch (error) {
        console.error("Error checking survey completion: ", error);
        return false; // Assume not completed in case of error
    }
};

// Create the context
export const AuthContext = createContext({
    currentUser: null,
    isSurveyCompleted: false,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    loading: true,
    forgotPassword: () => Promise,
    setIsSurveyCompleted: () => {},
});

// Hook to use the context
export const useAuth = () => useContext(AuthContext);

// Context provider component
export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

    useEffect(() => {
        let isSubscribed = true; // Flag to handle async operations safely

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (isSubscribed) {
                setCurrentUser(user);
                setLoading(false);
                if (user) {
                    const surveyCompleted = await checkSurveyCompletion(user.uid);
                    setIsSurveyCompleted(surveyCompleted);
                } else {
                    setIsSurveyCompleted(false); // Reset on logout
                }
            }
        });

        // Cleanup function to unsubscribe and set isSubscribed to false
        return () => {
            isSubscribed = false;
            unsubscribe();
        };
    }, []);

    // User registration function
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // User login function
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // User logout function
    const logout = () => {
        return signOut(auth).then(() => setIsSurveyCompleted(false)); // Reset survey status on logout
    };

    // Password reset function
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: "http://localhost:5175/login" });
    };

    // The context value that will be passed down to the consumers
    const value = {
        currentUser,
        isSurveyCompleted,
        setIsSurveyCompleted,
        register,
        login,
        logout,
        loading,
        forgotPassword,
    };

    // Return the provider with the passed down value
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

