import { Fragment, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { addTransactionToDb } from '../utils/firebase-config';
import { useAuth } from "../context/AuthContext";
import { getTransactionFromDB } from '../utils/firebase-config';
import { v4 as uuidv4 } from 'uuid';


export default function AddTransactionForm({setTransactionList}) {

    const {currentUser} = useAuth();

    useEffect(() => {fetchTransactions()},[currentUser])

    const [open, setOpen] = useState(false)

    const [newDescription,setNewDescription] = useState('')
    const [newAmount, setAmount] = useState("")


    const addTransactions = (newDescription,newAmount) => {
        const currentDate = new Date().toLocaleDateString();
        const transactionUUID =  uuidv4()

        const newTransaction = {
          date : currentDate, 
          description : newDescription,
          amount: newAmount, 
          transactionID: transactionUUID, 
          userID: currentUser?.uid
        }
        //setTransactionList([newTransaction,...transactionList])
        addTransactionToDb(newTransaction) 
        fetchTransactions()
        setNewDescription("")
        setAmount("")
    }

    const handleSubmit = () => {
      setOpen(false);
      if(newAmount){
        addTransactions(newDescription,newAmount)
      }else
      {
        alert("fail to add new transaction, you didn't enter the new amount")
      }
    }

    async function fetchTransactions() {
      if(currentUser){
        const data = await getTransactionFromDB(currentUser.uid);
        setTransactionList(data);
        console.log(12345)
      }
    }


  
    return (
      <>
      <button className="w-100 h-20 bg-green hover:bg-darkgreen text-white font-bold py-2 px-4 rounded" onClick={()=> setOpen(!open)}>
      New Transaction
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10"  onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h1" className="text-lg font-bold leading-10 text-green pb-2 ">
                          New Transaction
                        </Dialog.Title>
                        <form >
                        <div className="flex items-center space-x-4">
                          <div className="w-1/3 pr-4 text-right text-gray-900">
                            <label htmlFor="description">Description</label>
                          </div>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            value={newDescription}
                            onChange={(e)=>setNewDescription(e.target.value)}
                            className="w-2/3 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Description"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-1/3 pr-4 text-right text-gray-900">
                            <label htmlFor="amount">Amount </label>
                          </div>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            value={newAmount}
                            onChange={(e)=>setAmount(e.target.value)}
                            className="w-2/3 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Amount"
                            required
                          />
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-darkgreen hover:text-white sm:ml-3 sm:w-auto"
                      onClick={handleSubmit}
                    >
                      Add Transaction
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </>
    )
}