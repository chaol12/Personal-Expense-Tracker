import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {upDateBudget} from '../utils/firebase-config'
import { useAuth } from "../context/AuthContext";

const UpdateBudget = ({showUpdateBudge,setShowUpdateBudge,setMonthlyBudget}) => {

    const {currentUser} = useAuth();
    const [newBudget, setNewBudget] = useState("") 

    const updateNewBudget = (Budget) => {
        if(currentUser){
            upDateBudget(currentUser.uid,Budget)
            setMonthlyBudget(Budget)
        }else{
            alert("You seem to be experiencing connection problems, please log in again!")
        }
    }

    const handleSubmit =() =>{
        setShowUpdateBudge(false)
        if(newBudget && parseFloat(newBudget) < 1000000000){
            const absAmount = Math.abs(parseFloat(newBudget).toFixed(2))
            updateNewBudget(absAmount)
        }else
        {
          alert("The amount you entered was inputted incorrectly, please enter the range between 0 - 1 billion")
        }

    }

    return (
        <Transition.Root show={showUpdateBudge} as={Fragment} >
            <Dialog as="div" className="relative z-10" onClose={() => setShowUpdateBudge(!showUpdateBudge)} >
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full sm:w-auto">
                                <Dialog.Title as="h1" className="text-xl font-bold leading-10 text-green pb-2 ">
                                    Update Budget
                                </Dialog.Title>
                                <div className="flex items-center">
                                    <label htmlFor="income" className="w-1/3 pr-4 text-right text-gray-900">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        name="Income"
                                        id="Income"
                                        data-testid="budget"
                                        value={newBudget}
                                        onChange={(e)=>setNewBudget(e.target.value)}
                                        className="w-2/3 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
                        <button type="button" data-testid="budget-button" className="inline-flex w-full justify-center rounded-md bg-green px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-darkgreen hover:text-white sm:ml-3 sm:w-auto" onClick={handleSubmit}
                        >
                            Update 
                        </button>
                        <button type="button" data-testid="budget-cancel-button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setShowUpdateBudge(false)}>
                            Cancel
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
      )
}

export default UpdateBudget
