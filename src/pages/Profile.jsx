/* istanbul ignore file */
import React, { useState, useEffect } from 'react';
import { firestore } from '../utils/firebase-config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from "../context/AuthContext";
import Contact from '../components/ContactUs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// profile page frontend is from the template from tailwind UI code: https://tailwindui.com/components/application-ui/forms/form-layouts)

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        college: '',
        graduationDate: '',
        email: '',
    });
    const [surveyDocId, setSurveyDocId] = useState(''); // State to store the document ID
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const surveysCol = collection(firestore, "surveys");
                const q = query(surveysCol, where("userId", "==", currentUser.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const docData = querySnapshot.docs[0].data();
                        // Set the email from currentUser if it's not in the document data
                        const userEmail = docData.email ? docData.email : currentUser.email;
                        setUserData({ ...docData, email: userEmail });
                        setSurveyDocId(querySnapshot.docs[0].id); // Store the document ID
                    } else {
                        // Set only the email if there's no survey data
                        setUserData(prevData => ({ ...prevData, email: currentUser.email }));
                    }
                } catch (error) {
                    console.error("Error fetching user survey data: ", error);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        if (!surveyDocId) return; // Check if the document ID is available
        const surveyDocRef = doc(firestore, "surveys", surveyDocId);

        try {
            await updateDoc(surveyDocRef, userData);
            //location.reload(true);
            toast.success("Your changes have been saved!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            // Handle success scenario (e.g., navigate back or show a success message)
        } catch (error) {
            console.error("Error updating survey data: ", error);
            toast.error("Your changes were not saved. Please try again.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            // Handle error scenario (e.g., show an error message)
        }
    };
    return (
        // Code taken from Tailwind Component library: forms and data display
        <div>
            <form data-testid="profile-form">
                <div className="md:px-60 pt-10 sm:px-20">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Review your user information and make any changes here.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="first-name"
                                        data-testid="profile-fn"
                                        value={userData.firstName || ''}
                                        onChange={handleInputChange}
                                        autoComplete="given-name"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="last-name"
                                        data-testid="profile-ln"
                                        autoComplete="family-name"
                                        value={userData.lastName || ''}
                                        onChange={handleInputChange}
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email            </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        data-testid="profile-email"
                                        autoComplete="email"
                                        value={userData.email || ''}
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        disabled />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phone-number"
                                        data-testid="profile-phone"
                                        autoComplete="phone-number"
                                        value={userData.phoneNumber || ""}
                                        onChange={handleInputChange}
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>



                            <div className="col-span-4">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    College
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="college"
                                        id="street-address"
                                        data-testid="profile-college"
                                        autoComplete="street-address"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={userData.college || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="graduation-date" className="block text-sm font-medium leading-6 text-gray-900">
                                    Graduation date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="graduation-date"
                                        data-testid="profile-graduate"
                                        id="graduation-date"
                                        value={userData.graduationDate || ''}
                                        onChange={handleInputChange}
                                        autoComplete="graduation-date"
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* for a later implementation if time was allotted */}
{/* 
                    <div className="border-b border-gray-900/10 py-10">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Customize what you want to be notified about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input checked
                                                id="comments"
                                                data-testid="profile-budget-noti"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Budget
                                            </label>
                                            <p className="text-gray-500">Get notified when you are reaching your allocated budget.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                data-testid="profile-reminder"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Reminders
                                            </label>
                                            <p className="text-gray-500">Get a reminder notification every three days to update your transactions list.</p>
                                        </div>
                                    </div>

                                </div>
                            </fieldset> */}
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input checked
                                            id="push-everything"
                                            name="push-notifications"
                                            data-testid="profile-push-everything"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            data-testid="profile-push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            data-testid="profile-push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing"  className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset> */}
                        {/* </div>
                    </div> */}



                    <div className="mt-6 mb-10 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-darkgreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>

                </div>
            </form>
            <footer className="mt-10 bg-slate-300" data-testid="footer">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-16 text-center">
                        <span className="mx-auto h-10 w-auto font-medium text-darkblue">Contact Wise Wallet</span>
                        <div className="my-1 flex justify-center gap-x-6">
                        </div>
                    </div>
                    <Contact />
                    <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
                    </div>
                </div>
            </footer>
        </div>

    );
}
export default Profile;