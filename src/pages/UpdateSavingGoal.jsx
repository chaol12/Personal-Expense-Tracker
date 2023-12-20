import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {upDateSavingGoal} from '../utils/firebase-config'
import { useAuth } from "../context/AuthContext";

const UpdateSavingGoal = ({showUpdateGoal,setShowUpdateGoal,setSavingGoal}) => {

    const {currentUser} = useAuth();
    const [newGoal, setNewGoal] = useState("") 

    const updateGoal = (goal) => {
        if(currentUser){
            upDateSavingGoal(currentUser.uid,goal)
            setSavingGoal(goal)
        }else{
            alert("You seem to be experiencing connection problems, please log in again!")
        }
    }

    const handleSubmit =() =>{
        setShowUpdateGoal(false)
        if(newGoal && parseFloat(newGoal) < 1000000000){
            const absAmount = Math.abs(parseFloat(newGoal).toFixed(2))
            updateGoal(absAmount)
        }else
        {
          alert("The amount you entered was inputted incorrectly, please enter the range between 0 - 1 billion")
        }

    }

    return (
        <Transition.Root show={showUpdateGoal} as={Fragment} >
            <Dialog as="div" className="relative z-10" onClose={() => setShowUpdateGoal(!showUpdateGoal)} >
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
                                    Update Saving Goal
                                </Dialog.Title>
                                <div className="flex items-center">
                                    <label htmlFor="SvaingGoal" className="w-1/3 pr-3 text-right text-gray-900">
                                        Your Goal
                                    </label>
                                    <input
                                        type="number"
                                        name="SavingGoal"
                                        id="SavingGoal"
                                        data-testid="saving-input"
                                        value={newGoal}
                                        onChange={(e)=>setNewGoal(e.target.value)}
                                        className="w-2/3 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
                        <button type="button" data-testid="saving-button" className="inline-flex w-full justify-center rounded-md bg-green px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-darkgreen hover:text-white sm:ml-3 sm:w-auto" onClick={handleSubmit}
                        >
                            Update 
                        </button>
                        <button type="button" data-testid="saving-cancel" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setShowUpdateGoal(false)}>
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

export default UpdateSavingGoal
