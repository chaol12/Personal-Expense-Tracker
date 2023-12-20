// Code Template Source: Flowbite https://flowbite.com/docs/components/card/
// Current: Displays four cards
// For reference
const DashboardCards = () => {
    return (
        <>
            <div className="p-8 grid grid-cols-4 gap-5">
                <div data-testid="income">
                    {/* From Flowbite, data cards */}
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$ 1,000</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Income</p>
                    </a>
                </div>
                <div data-testid="budget-save">
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$ 300</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Budget Spent</p>
                    </a>
                </div>
                <div data-testid="saving">
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$ 100</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Budget Savings</p>
                    </a>
                </div>
                <div data-testid="total-save">
                    <a href="#" className="h-36 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$ 400</h5>
                        {/* Flowbite Progress Bar */}
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-normal text-gray-700 dark:text-gray-400">Total Savings</span>
                            <span className="text-sm font-medium text-darkblue dark:text-white">80%</span>
                        </div>
                        <div className="w-full bg-lightblue rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-darkblue h-2.5 rounded-full w-4/5"></div>
                        </div>
                        <p className="mt-1 text-right italic font-normal text-gray-400 dark:text-gray-400">$100 to goal!</p>

                    </a>
                </div>
            </div>

        </>
    );
}

export default DashboardCards;