import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useProtectedRoute } from '../components/useProtectedRoute';
import { saveSurveyData } from '../utils/firebase-config';
import { useAuth } from "../context/AuthContext";

const RegisterSurvey = () => {
    useProtectedRoute();

    const navigate = useNavigate();
    const { currentUser, isSurveyCompleted, setIsSurveyCompleted } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [college, setCollege] = useState('');
    const [graduationDate, setGraduationDate] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [moneySaved, setMoneySaved] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');
    const [budgetCategories, setBudgetCategories] = useState([]);
    const [maximumBudget, setMaximumBudget] = useState('');
    // const [notificationPreferences, setNotificationPreferences] = useState('');
    // const [notificationMethod, setNotificationMethod] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCheckboxChange = (e, setterFunction, value) => {
        if (e.target.checked) {
            setterFunction(prev => [...prev, value]);
        } else {
            setterFunction(prev => prev.filter(item => item !== value));
        }
    };

    if (!currentUser) {
        // If there is no current user, return early or redirect to login
        navigate('/login');
        return null;
    }

    if (isSurveyCompleted) {
        // If the survey is completed, display a message
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-white">You have already completed the survey. Thank you!</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !college || !graduationDate || !monthlyIncome || !moneySaved || !savingsGoal || budgetCategories.length === 0 || !maximumBudget || !phoneNumber) {
            alert('Please complete all fields before submitting.');
            return;
        }

        const surveyData = {
            userId: currentUser.uid,
            firstName,
            lastName,
            college,
            graduationDate,
            monthlyIncome,
            moneySaved,
            savingsGoal,
            budgetCategories,
            maximumBudget,
            phoneNumber
        };

        try {
            const docId = await saveSurveyData(surveyData);
            console.log("Document written with ID: ", docId);
            // Update the survey completion status in the context
            setIsSurveyCompleted(true); // You should pass true directly if the survey is completed
            navigate('/transtable'); // Redirect after successful submission
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-10 pb-10" data-testid= "survey-page">
            <form data-testid= "survey" onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                <label htmlFor="fname">First Name</label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    data-testid= "survey-fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="fname">Last Name</label><br />
                <input
                    type="text"
                    id="fname"
                    data-testid= "survey-lname"
                    name="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor='college'>College/University</label><br />
                <input
                    type="text"
                    id="college"
                    data-testid= "survey-college"
                    name="college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="graduationDate">Expected Graduation Date:</label><br />
                <input
                    type="date"
                    id="graduationDate"
                    data-testid= "survey-graduationDate"
                    name="graduationDate"
                    value={graduationDate}
                    onChange={(e) => setGraduationDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="monthlyIncome">What is your estimated monthly income?</label><br />
                <input
                    type="number"
                    id="monthlyIncome"
                    data-testid= "survey-monthlyIncome"
                    name="monthlyIncome"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="moneySaved">How much money do you currently have saved?</label><br />
                <input
                    type="number"
                    id="moneySaved"
                    data-testid= "survey-moneySaved"
                    name="moneySaved"
                    value={moneySaved}
                    onChange={(e) => setMoneySaved(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="savingsGoal">How much more do you want to save?</label><br />
                <input
                    type="number"
                    id="savingsGoal"
                    data-testid= "survey-savingsGoal"
                    name="savingsGoal"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label>Which of the following categories do you spend money on regularly? (Select all that apply)</label><br />
                <div className="flex flex-col">
                    {['Rent/Mortgage', 'Utilities', 'Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Education Supplies', 'Insurance', 'Other'].map((category) => (
                        <label key={category} className="inline-flex items-center mt-3">
                            <input
                                type="checkbox"
                                data-testid={"survey-"+category}
                                value={category}
                                checked={budgetCategories.includes(category)}
                                onChange={(e) => handleCheckboxChange(e, setBudgetCategories, category)}
                                className="rounded"
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>

                <br />
                <label htmlFor="maximumBudget">What is the maximum amount you can spend in a month?</label><br />
                <input
                    type="number"
                    id="maximumBudget"
                    data-testid="survey-maximumBudget"
                    name="maximumBudget"
                    value={maximumBudget}
                    onChange={(e) => setMaximumBudget(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="maximumBudget">Phone Number</label><br />
                <input
                    type="tel"
                    data-testid="survey-phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />

                {/* <label>Notification Preferences</label><br />
                <select id="notifications" data-testid="notifications" name="notifications" onChange={(e) => setNotificationPreferences(e.target.value)} className="mt-1 p-2 w-full border rounded-md mb-4">
                    <option value="">--Please choose an option--</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Never">Never</option>
                </select>
                <br />
                {notificationPreferences !== "Never" && (
                    <>
                        <label>Notification Method</label><br />
                        <select
                            id="notificationMethod"
                            data-testid="survey-notificationMethod"
                            name="notificationMethod"
                            value={notificationMethod}
                            onChange={(e) => setNotificationMethod(e.target.value === "None" ? false : e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md mb-4"
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="Email" data-testid="survey-email">Email</option>
                            <option value="Phone">Phone</option>
                            <option value="Both">Both</option>
                            <option value="None">None</option>
                        </select>
                        <br />
                    </>
                )} */}


                <br />
                <button type="submit" data-testid="survey-submit" className="bg-green text-white px-4 py-2 rounded-md mt-4">Submit</button>
            </form>
        </div>
    );
}

export default RegisterSurvey;
