# Wise Wallet Live Link: https://wise-wallet-h65n.onrender.com/
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Ensure to do an `npm install` before `npm run dev` to run the application.
  
# Some Frontend Resources Used (mentioned in files and PR #120):
### Discussed/confirmed general approval of use with Professor Avteniev 
1. https://tailwindui.com/templates/salient
2. https://flowbite.com/docs/components/progress/
3. https://flowbite.com/docs/plugins/charts/ (Area, Pie, and Line Chart)
4. https://blog.logrocket.com/using-react-toastify-style-toast-messages/
5. https://flowbite.com/docs/components/card/
6. https://tailwindui.com/components/application-ui/forms/form-layouts
7. Color Palette: https://coolors.co/d3f6db-5b8266-182825-1f2937-d6ebff
8. Backend Resource: https://www.emailjs.com/docs/examples/reactjs/

# Product Requirements Document
## Problem

We are addressing the issue of individuals struggling to effectively manage and track their personal finances. Many college students struggle with budgeting, expense tracking, and financial goal setting, which leads to financial stress, overspending, and poor financial health. Therefore, we built this application for college students. Students can learn valuable financial management skills by using this application to budget their income.

## Issue and Occurrence
Inefficient Budgeting: Students often find it challenging to create and stick to a budget, resulting in overspending and financial instability.
Expense Tracking: Many retirees struggle to keep track of their daily expenses, leading to uncertainty about where their money is going.
Financial Goal Setting: The lack of effective tools for setting and tracking financial goals prevents individuals from achieving their savings and investment goals.
## Urgency and Importance
Financial management: Effective personal expense tracking and budgeting are crucial for achieving financial well-being and reducing financial stress.
Overspending Prevention: Helping individuals track their spending and alerting them when they are about to exceed their budget can assist individuals in staying within their budgets and improving their financial management skills.
## Proposal
We are solving the problem by developing a friendly, intuitive, and feature-rich Personal Expense Tracker application. We ensure that the application is simple enough to keep track of the user's expenses with just one click, provides versatility to help users categorize their expenses, and is friendly enough to display a dashboard for quick viewing.
### Approaches and Strategies
_User-Centered Design: We prioritize a user-centered design approach. We ensure that the application is intuitive, easy to use, and aligned with user needs by gathering users’ feedback and extensive testing._

_Comprehensive: The application will provide the ability to track various categories of expenses, such as daily expenses, bills, and subscriptions. Users can input expenses manually.
Budgeting: The application will allow users to set budgets and saving goals. It will provide a visual representation of progress towards these goals and a reminder that you are about to over budget._

_Accessibility and Availability: The solution will be accessible via web (PWA) applications, ensuring users can track their expenses anytime, anywhere._

### Why We Chose This Approach
Existing Apps: There are many personal finance apps in the market. However, we found that some of them are overly complex, lacking in certain features, or requiring subscription fees. Our application is to provide a simplified and comprehensive solution to address these points.

Spreadsheet Tools: Some users rely on spreadsheet software for expense tracking. However, spreadsheet software can be effective, but it can also be time-consuming. Our application offers automation and a more user-friendly interface.

## Plan
### Features
We are building a user-friendly and comprehensive Personal Expense Tracker application. This application will help individuals manage their personal finances by
1.     Tracking Expenses: Users can input and categorize their daily expenses manually.
2.     Saving Goals: The application will enable users to set saving goals and track their progress towards achieving them.
           Setting Budgets: Users can create and manage budgets for different spending categories.
           The user will initially state their "savings goal" in the sign-up process, and as they will later customize
           what budgets they want to set, it can accumulate to show how much they are saving in total and if certain budgets are met.
4.     Reminder: Users can set up an alert when they are about to exceed their budget 
           Ex: Send SMS text ideally send email otherwise
5.     Showing monthly reports and insights: The application will generate a report and visual graphs for users
       with a clear view of their spending
           Ex: dynamic chart on change of purchase or generating on the click of a button and accessible data visualization
### User Stories 
As a college student user
* I want to sign up for an account so that I can save all my information in one place
* I want to save my login information so that I save time on logging in
* I want to be able to edit my account information so that I can update my information in the case of changes
* I want to have the dashboard include: total spending, button recording entering spent, graph / visualization on spent, button for account information, button for updating/setting account information and changing budget/income so that I can navigate through the app easily and reach my goals
* I want to set a savings goal, so that I can better budget what I can spend on
* I want to be alerted through email when I spend 80% of my budget, so that I can refinance what I spend on
* I want to see how much I spend in a month through categories so that I can track or update my budget
* I want to manually enter my expenses and select a predetermined category so that I can track I am spending monthly
* I want receive a monthly email summarizing my spending and progress so that I can visualize my expenses as a whole
* I want to see a quarterly report of my spending in my insights dashboard so that I can review my long-term spending goals and forecast for the future
* [Enhancement] I want to connect my bank account/card so that I can automatically track my expenses (Bank Account API - Plaid)
* [Enhancement] I want to receive suggestions on how to better delegate my budget so I can save more money
## Technical Design
### Frontend (ReactJS)
Landing page:
* Home page (overview of the application)
* NavBar (signup, login, logout options)
* Dashboard – Visual graphs to show user expenses, budget, and saving goals. We will be using chartsJS to parse data into a bar graph.
* Expense Tracker Page – Form to add new expenses (amount, date, category), and list of recent expenses.Budget Page – Form to set and update budgets, visual representation of the current budget.
* Progress bar to indicate track how close user is to their budget
* Insight Page – Monthly reports, expense analysis, and insights
* Settings/Profile Page
### Backend (Express.js)
* User Authentication – Handling signup, login, logout, and validation.
* Expenses – Handles CRUD operations for expenses.
* Budgets – CRUD operations for saving goals.
* Reports and Insights – Generates reports, and insights based on the user’s data
### Database (Firebase)
* User Collection – Will store user's information and authentication information.
* Expenses Collection – Storing expenses linked to the user’s profile.
* Budget Collection – User’s budget, linked to their profile.
* Goals Collection – Saves user’s goals.
### Logic Flow
* Users will interact with the React frontend, which will communicate with the Express backend.
* The backend will handle all the business logic and error handling. It will also interact with the database to fetch the data stored and collected.
* The frontend will update dynamically based on the user interaction and what data is received from the backend
### Development Plan
Phase 1: Set up the basic project structure, initialize repositories, set up databases, and implement user authentication.

Phase 2: Develop core features (Expense Tracking, Budget Settings, Saving Goals, etc.)

Phase 3: Implement additional features (Reminders, Monthly Reports, etc.)

Phase 4: Conduct testing, gather feedback, and make improvements.

Phase 5: Launch application

### Development Protocol
* Prior to each major product change, the team will gather to discuss the necessity of the change and the impact the change will have. The team will then incorporate the anticipated change in the timeline and adjust as necessary. 
* To communicate the launch to the audience, the team will present biweekly updates and demos on larger updates to show E2E flow. At the start of development, we will try to have smoke tests.
* The Technical Program Manager will work alongside the Product Manager to form a contingency plan if there are issues with the launch.
* All notes will be outlined on GitHub Projects or the working Google Document.
