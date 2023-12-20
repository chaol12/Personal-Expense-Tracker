/* istanbul ignore file */
import { useProtectedRoute } from "../components/useProtectedRoute";
import { useState, useEffect } from "react";
import AddTransactionForm from "./AddTransactionForm";
import { useAuth } from "../context/AuthContext";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { getTransactionFromDB, getIncome, getSavingGoal, getBudget } from '../utils/firebase-config';
import DeleteConfirm from "./DeleteConfirm";
import UpdateIncome from "./UpdateIncome";
import UpdateBudget from "./UpdateBudget";
import UpdateSavingGoal from "./UpdateSavingGoal";
import Contact from "../components/ContactUs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Card Code Template Source: Flowbite https://flowbite.com/docs/components/card/

const TransTable = () => {
    useProtectedRoute();
    const { currentUser } = useAuth();

    useEffect(() => { fetchTransactions() }, [currentUser])

    async function fetchTransactions() {
        if (currentUser) {
            const data = await getTransactionFromDB(currentUser.uid);
            setTransactionList(data);
        }
    }

    const [showTrashIcon, setShowTrashIcon] = useState(false)

    const [transactionList, setTransactionList] = useState([]);

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [deleteID, setDeletID] = useState("")

    // total spending 
    const [monthlySpent, setMonthSpent] = useState("")
    const [lastMonthSpent, setLastMonthSpent] = useState("")
    useEffect(() => {
        const y = new Date().getFullYear().toString(this)
        const m = (new Date().getMonth() + 1).toString(this)
        let sum = 0.0
        transactionList.filter(transcation => {
            if (transcation.date.split('-')[0] === y && transcation.date.split('-')[1] === m) {
                sum = sum + parseFloat(transcation.amount)
            }
        });
        setMonthSpent(sum.toFixed(2))
    }, [transactionList])

    useEffect(() => {
        const y = new Date().getFullYear().toString(this)
        let m = (new Date().getMonth()).toString(this)
        let sum = 0.0
        if (m === '0') {
            m = (new Date().getMonth() + 1).toString(this)
        }
        transactionList.filter(transcation => {
            if (transcation.date.split('-')[0] === y && transcation.date.split('-')[1] === m) {
                sum = sum + parseFloat(transcation.amount)
            }
        });
        setLastMonthSpent(sum.toFixed(2))
    }, [transactionList, currentUser])


    //Income
    const [monthlyIncome, setMonthlyIncome] = useState("")
    const [moneySave, setMoneySave] = useState()
    const [moneySavedPercentage, setMoneySavedPercentage] = useState()
    const [showUpdateIncome, setShowUpdateIncome] = useState(false)

    async function getMonthlyIncome() {
        if (currentUser) {
            const data = await getIncome(currentUser.uid);
            setMonthlyIncome(data);
        }
    }

    useEffect(() => {
        setMoneySave((parseFloat(monthlyIncome) - parseFloat(monthlySpent)).toFixed(2))
    }, [currentUser, monthlySpent, monthlyIncome])

    useEffect(() => { getMonthlyIncome() }, [currentUser])

    useEffect(() => {
        if (parseFloat(moneySave).toFixed(2) >= 0) {
            const percentage = parseFloat(moneySave) / parseFloat(monthlyIncome) * 100
            setMoneySavedPercentage(percentage.toFixed(2))
        } else {
            setMoneySavedPercentage(0)
        }

    })


    //budget
    const [monthlyBudget, setMonthlyBudget] = useState('')
    const [budgetPercentage, setBudgetPercentage] = useState("")
    const [remianingBudget, setRemianingBudget] = useState()
    const [showUpdateBudge, setShowUpdateBudge] = useState(false)
    useEffect(() => { getMonthlyBudget() }, [currentUser])
    async function getMonthlyBudget() {
        if (currentUser) {
            const data = await getBudget(currentUser.uid);
            setMonthlyBudget(data);
        }
    }
    useEffect(() => {
        if (parseFloat(monthlySpent) > parseFloat(monthlyBudget)) {
            setBudgetPercentage("100")
            setRemianingBudget('0')
        }
        else {
            const percentage = parseFloat(monthlySpent) / parseFloat(monthlyBudget)
            const toastifyPercent = (percentage * 100).toFixed(2)
            setRemianingBudget((parseFloat(monthlyBudget) - parseFloat(monthlySpent)).toFixed(2))
            setBudgetPercentage((percentage * 100).toFixed(2))
            if(toastifyPercent > 80.00) {
                let today = new Date().toLocaleString().split(',')[0]; 
                // format the time that can be sorted in firebase
                let [month,day,year] = today.split('/')
                day = day.toString().padStart(2, '0')
                today = `${year}-${month}-${day}`
                if('2023-12-04' === today ){ // if today is the desired notification day
                    toast.warning("You are close to spending your budget.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            }
        }
    }, [monthlySpent, monthlyBudget])

    //saving goal
    const [savingGoal, setSavingGoal] = useState('')
    const [savingsPercentage, setSavingsPercentage] = useState("")
    const [showUpdateGoal, setShowUpdateGoal] = useState(false)

    useEffect(() => { getSaving() }, [currentUser])

    async function getSaving() {
        if (currentUser) {
            const data = await getSavingGoal(currentUser.uid);
            setSavingGoal(data)
        }
    }

    useEffect(() => {
        if (parseFloat(moneySave) > parseFloat(savingGoal)) {
            setSavingsPercentage("100")
            // toast 
            toast("Congratulations! You have met your savings goal.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else if (parseFloat(moneySave) < 0) {
            setSavingsPercentage("0")
        }
        else {
            const percentage = parseFloat(moneySave) / parseFloat(savingGoal)
            setSavingsPercentage((percentage * 100).toFixed(2))
        }
    }, [savingGoal, moneySave])


// Card Code Template Source: Flowbite https://flowbite.com/docs/components/card/
    return (
        <>
            {/* Web Responsiveness - Samira */}
            {/* Responsive Grid Layout: Adjusts from 1 to 4 columns based on screen size */}
            <div className="px-4 md:px-8 pt-4 md:pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <div className="card">
                    {/* From Flowbite, data cards */}
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        onClick={() => setShowUpdateIncome(!showUpdateIncome)}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">Income: ${monthlyIncome} <PencilSquareIcon className="w-5 h-5 inline-block" /></h5>
                        {/* <h6 className="font-normal text-gray-700 dark:text-gray-400 ">Monthly Income </h6> */}
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-normal text-gray-700 dark:text-gray-400">Remaining : ${moneySave}</span>
                            <span className="text-sm font-medium text-darkblue dark:text-white">{moneySavedPercentage}%</span>
                        </div>
                        <div className="w-full bg-lightblue rounded-full h-2.5 dark:bg-gray-900">
                            <div className="bg-darkblue h-2.5 rounded-full dark:bg-green" style={{ width: `${moneySavedPercentage}%` }}></div>
                        </div>
                        {showUpdateIncome &&
                            <UpdateIncome
                                showUpdateIncome={showUpdateIncome}
                                setShowUpdateIncome={setShowUpdateIncome}
                                setMonthlyIncome={setMonthlyIncome}
                            />}
                    </span>
                </div>
                <div className="card">
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">{`$${monthlySpent}`}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Monthly Spent</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Last Month: ${lastMonthSpent}</p>
                    </a>
                </div>
                <div className="card">
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => setShowUpdateBudge(!showUpdateBudge)}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">{`$${remianingBudget}`} <PencilSquareIcon className="w-5 h-5 inline-block" /></h5>
                        {/*                     <p className="font-normal text-gray-700 dark:text-gray-400">Remaining Budget</p> */}
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-normal text-gray-700 dark:text-gray-400">Budget: ${monthlyBudget}</span>
                            <span className="text-sm font-medium text-darkblue dark:text-white">Budget used: {budgetPercentage}%</span>
                        </div>
                        <div className="w-full bg-lightblue rounded-full h-2.5 dark:bg-gray-900">
                            <div className="bg-darkblue h-2.5 rounded-full dark:bg-green" style={{ width: `${budgetPercentage}%` }}></div>
                        </div>
                        {showUpdateBudge && <UpdateBudget
                            showUpdateBudge={showUpdateBudge}
                            setShowUpdateBudge={setShowUpdateBudge}
                            setMonthlyBudget={setMonthlyBudget}
                        />}
                    </span>
                </div>
                <div className="card">

                    <span onClick={() => setShowUpdateGoal(!showUpdateGoal)} className="h-36 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">Goal ${savingGoal} <PencilSquareIcon className="w-5 h-5 inline-block" /></h5>
                        {/* Flowbite Progress Bar from https://flowbite.com/docs/components/progress/ */}
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-normal text-gray-700 dark:text-gray-400">Actual Saving: ${parseFloat(moneySave) > 0 ? moneySave : 0}</span>
                            <span className="text-sm font-medium text-darkblue dark:text-white">{`${savingsPercentage}%`}</span>
                        </div>
                        <div className="w-full bg-lightblue rounded-full h-2.5 dark:bg-gray-900">
                            <div className="bg-darkblue h-2.5 rounded-full dark:bg-green" style={{ width: `${savingsPercentage}%` }}></div>
                        </div>
                        <p className="mt-1 text-right italic font-normal text-gray-400 dark:text-gray-400">{`${savingsPercentage}% to goal`}</p>
                        <UpdateSavingGoal
                            showUpdateGoal={showUpdateGoal}
                            setShowUpdateGoal={setShowUpdateGoal}
                            setSavingGoal={setSavingGoal}
                        />

                    </span>
                </div>
            </div>
            {/* Responsive Table and Form Section */}
            <div className="px-4 md:px-8 py-4 w-full">
                <div className="mb-4 text-2xl font-semibold text-darkblue">Recent Activity</div>
                {/* Grid for Table and Form: Single column layout */}
                <div className="grid grid-cols-1 gap-4 responsive-grid">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse table-auto bg-white rounded-lg shadow">
                            <thead>
                                <tr>
                                    <th className="border p-3 bg-gray-100 text-left">Date</th>
                                    <th className="border p-3 bg-gray-100 text-left">Category</th>
                                    <th className="border p-3 bg-gray-100 text-right">Amount</th>
                                    <th className="border p-3 bg-gray-100 text-right">

                                        {/* feel free to change trash icon color or style */}

                                        <button onClick={() => setShowTrashIcon(!showTrashIcon)} className="p-2  border-green-500 rounded-md">
                                            <TrashIcon data-testid= "trash-icon-toggle" className="w-5 h-5 text-red-400 hover:text-blue-500 hover:bg-yellow-500" />
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionList.map((transaction) => {
                                    const { description, date, amount, id } = transaction;
                                    const Date = date.split('T')[0];
                                    const [year, month, day] = Date.split('-')
                                    const formattedDate = `${month}/${day}/${year}`
                                    return (
                                        <tr
                                            key={id}
                                            className="transition-colors hover:bg-gray-50"
                                        >
                                            <td className="border p-3">{formattedDate}</td>
                                            <td className="border p-3">{description}</td>
                                            <td className="border p-3 text-green font-semibold text-right">
                                                ${parseFloat(amount).toFixed(2)}
                                            </td>
                                            <td className="border p-3" style={{ width: '60px' }}>
                                                {/* feel free to change trash icon color or style */}
                                                {showTrashIcon &&
                                                    <button onClick={() => { setShowConfirmation(!showConfirmation); setDeletID(id); }} className="p-2  border-green-500 rounded-md">
                                                        <TrashIcon className="w-5 h-5 text-red-400 hover:text-blue-500 hover:bg-yellow-500" />
                                                        {showConfirmation &&
                                                            <DeleteConfirm
                                                                setTransactionList={setTransactionList}
                                                                id={deleteID}
                                                                setShowConfirmation={setShowConfirmation}
                                                            />}
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="button-container dialog-container">
                        <AddTransactionForm
                            fetchTransactions={fetchTransactions}
                        />
                    </div>


                </div>
            </div>
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
        </>
    );
}

export default TransTable;