# Intelligent Expense Management System

The **Expense Management System ** is a production-ready, enterprise-grade solution built on the Node.js/Express stack with MongoDB. It goes beyond simple expense tracking by incorporating advanced Role-Based Access Control (RBAC), configurable multi-level approval workflows, and an innovative **Intelligent Budget Co-Pilot** designed to provide proactive financial intelligence to department managers.

## Key Features & Value Proposition

### 1. The Intelligent Budget Co-Pilot (Predictive Financial Strategy)

This core module transforms managers from passive reporters into strategic financial leaders by solving the pain points of manual budget tracking and reactive decision-making.

| **AI-Powered Budget Forecasting** : Uses historical burn rate and trend analysis to predict the total budget utilization by the period end date. Issues clear text alerts based on *spending pace* (Too Fast/Too Slow). Avoids end-of-quarter surprises (overspending) and ensures full utilization of allocated funds (underspending).
| **Interactive "What-If" Planning** : A client-side simulation tool that instantly and temporarily updates the dashboard UI (progress bars, forecast line) when a manager enters a hypothetical expense. Enables fast, agile decision-making and allows managers (like Rohan) to vet high-ROI opportunities and assess trade-offs before formal submission.
| **Granular Sub-Budgets by Category** : Breaks the main departmental budget (e.g., ₹10,00,000) into dedicated, color-coded pools for categories (Travel, Software, Events). Includes functionality for **Internal Budget Transfer**. Provides granular control, instant visual health status, and grants managers the autonomy to reallocate funds between categories without engaging Finance for every adjustment.
### 2. Enterprise Workflow & Compliance

  * **Multi-Level & Conditional Approvals:** Supports sequential approval routing (Manager $\rightarrow$ Finance $\rightarrow$ Director) and conditional rules (e.g., if expense amount \> ₹1,00,000, requires CFO approval).[1]
  * **Role-Based Access Control (RBAC):** Authentication uses JWTs stored in secure HTTP-only cookies. Authorization is enforced via `roleCheck` middleware, distinguishing between broad roles (`Admin`, `Manager`) and granular authority (`position` like 'CFO').[2, 3]
  * **Immutable Audit Trail:** Every approval or rejection action is logged in the `Expense.approvalHistory` sub-document, ensuring non-repudiation and compliance.[4]
  * **Currency Awareness:** Tracks expenses in the employee's `originalCurrency` while calculating and locking in the `companyAmount` based on the real-time `exchangeRate` for accurate accounting.[1]

### 3. Efficiency

  * **OCR Receipt Scanning (Mock):** Employees can upload receipts to automatically populate submission forms, reducing manual data entry errors and speeding up the reimbursement process.[5, 1]

## Project Structure

The project follows a modular, scalable architecture, separating configuration, models, controllers, middleware, and routes.

```
/Root
├──.env                  # Environment Variables (MONGO_URI, JWT_SECRET, API keys)
├── package.json          # Dependencies
├── app.js                # Main Express application entry point
├── seed.js               # Database initialization (creates Admin, Rohan, default budget)
├── /config
│   └── db.js             # MongoDB connection logic (Mongoose)
├── /controllers          # Business Logic & Data Handling
│   ├── authController.js
│   ├── userController.js 
│   ├── expenseController.js
│   ├── ocrController.js  
│   └── adminController.js # NEW: Handles Admin Budget creation (US-001)
├── /middleware           # Authorization & Utility Helpers
│   ├── auth.js           # JWT verification
│   ├── roleCheck.js      # RBAC and Manager Hierarchy checks
│   └── upload.js         # Multer configuration for file uploads
├── /models               # Mongoose Schemas (Data Fabric)
│   ├── User.js           # Includes Role, Position, and ManagerId
│   ├── Company.js        # Includes ApprovalSequence and NEW: BudgetPeriod/SubBudgets
│   └── Expense.js        # Transactional data, audit trail, multi-currency
├── /public
│   └── styles.css        # Aurelia Theme + Animations
├── /routes               # API Endpoint Definitions
│   ├── auth.js
│   ├── users.js          # Dashboards & Admin Hierarchy updates
│   ├── expenses.js       # Submission & Approval/Rejection
│   ├── ocr.js            
│   └── admin.js          # NEW: Budget configuration routes
└── /utils                # Helper Functions
    ├── countryCurrency.js
    ├── currencyConverter.js
    ├── approvalLogic.js  # Dynamic Workflow Engine
    └── budgetForecast.js # NEW: AI/Pacing logic for Feature 3
```

## Setup and Installation

### Prerequisites

1.  Node.js (v18+) and npm
2.  MongoDB instance (local or hosted)

### Installation Steps

1.  **Clone the Project:**

    ```bash
    # Assuming you have the files in a folder
    cd aurelia-expense-management
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a file named `.env` in the root directory and populate it:

    ```
    MONGO_URI=mongodb://localhost:27017/aurelia_expense_db
    JWT_SECRET=your_very_secure_jwt_secret_key_12345
    EXCHANGE_RATE_API_KEY=YOUR_EXCHANGE_RATE_API_KEY
    OCR_API_ENDPOINT=http://mock.ocr.api/scan
    ```

4.  **Seed the Database:**
    This command initializes the database with the default Company, Admin, Rohan (Marketing Manager), an Employee, and Rohan's initial Q4 Budget for immediate testing.

    ```bash
    npm run seed
    ```

5.  **Start the Server:**

    ```bash
    npm start
    ```

The application will be running at `http://localhost:3000`.

## Testing Credentials

Use the following credentials to test the RBAC and the **Intelligent Budget Co-Pilot** features.

| Role | Email | Password | Primary Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@aurelia.com` | `Admin@123` | User/Hierarchy Management, Workflow Config |
| **Manager (Rohan)** | `rohan@aurelia.com` | `Rohan@123` | Intelligent Budget Co-Pilot Dashboard, Approval Queue |
| **Employee** | `employee1@aurelia.com` | `Emp@123` | Expense Submission, Expense History |
