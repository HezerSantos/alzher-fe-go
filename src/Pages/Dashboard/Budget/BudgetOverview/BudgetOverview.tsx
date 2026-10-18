import BudgetItem, {
  CreateBudgetItem,
} from "../../../../components/Dashboard/Budget/BudgetItem/BudgetItem";
import "./BudgetOverview.scss";

const BudgetOverview = () => {
  return (
    <>
      <div className="budget-overview">
        {mockBudgets.map((budget) => {
          return (
            <BudgetItem
              id={budget.id}
              name={budget.name}
              grossIncome={budget.grossIncome}
              isActive={budget.isActive}
            />
          );
        })}
        <CreateBudgetItem />
      </div>
    </>
  );
};
const mockBudgets = [
  {
    id: "budget-1",
    name: "2026 Primary Budget",
    userId: "user-123",
    grossIncome: 75000,
    isActive: true, // Only this budget is active
    budgetSections: [
      {
        id: "section-1",
        name: "Pre-Tax Deductions",
        budgetId: "budget-1",
        isDeductions: true, // Only one section per budget can be true
        budgetSectionItems: [
          {
            id: "item-1",
            budgetSectionId: "section-1",
            categoryName: "Federal & State Tax",
            amount: 15000,
          },
          {
            id: "item-2",
            budgetSectionId: "section-1",
            categoryName: "Health Insurance",
            amount: 4500,
          },
        ],
      },
      {
        id: "section-2",
        name: "Living Expenses",
        budgetId: "budget-1",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-3",
            budgetSectionId: "section-2",
            categoryName: "Rent",
            amount: 18000,
          },
          {
            id: "item-4",
            budgetSectionId: "section-2",
            categoryName: "Groceries",
            amount: 6000,
          },
        ],
      },
      {
        id: "section-3",
        name: "Savings & Investments",
        budgetId: "budget-1",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-5",
            budgetSectionId: "section-3",
            categoryName: "Emergency Fund",
            amount: 5000,
          },
        ],
      },
    ],
  },
  {
    id: "budget-2",
    name: "Freelance / Side-Hustle Budget",
    userId: "user-123",
    grossIncome: 30000,
    isActive: false, // Inactive budget
    budgetSections: [
      {
        id: "section-4",
        name: "Business Expenses & Taxes",
        budgetId: "budget-2",
        isDeductions: true, // Only one section per budget can be true here as well
        budgetSectionItems: [
          {
            id: "item-6",
            budgetSectionId: "section-4",
            categoryName: "Self-Employment Tax",
            amount: 4500,
          },
          {
            id: "item-7",
            budgetSectionId: "section-4",
            categoryName: "Software Subscriptions",
            amount: 1200,
          },
        ],
      },
      {
        id: "section-5",
        name: "Reinvestment",
        budgetId: "budget-2",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-8",
            budgetSectionId: "section-5",
            categoryName: "Marketing & Ads",
            amount: 2500,
          },
        ],
      },
    ],
  },
  {
    id: "budget-3",
    name: "Minimalist / Solo Living",
    userId: "user-123",
    grossIncome: 55000,
    isActive: false,
    budgetSections: [
      {
        id: "section-6",
        name: "Standard Deductions",
        budgetId: "budget-3",
        isDeductions: true, // Exactly one deduction section
        budgetSectionItems: [
          {
            id: "item-9",
            budgetSectionId: "section-6",
            categoryName: "Income Tax",
            amount: 10000,
          },
        ],
      },
      {
        id: "section-7",
        name: "Core Needs",
        budgetId: "budget-3",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-10",
            budgetSectionId: "section-7",
            categoryName: "Studio Rent",
            amount: 14000,
          },
          {
            id: "item-11",
            budgetSectionId: "section-7",
            categoryName: "Utilities",
            amount: 2400,
          },
        ],
      },
    ],
  },
  {
    id: "budget-4",
    name: "Family Household Budget",
    userId: "user-456",
    grossIncome: 120000,
    isActive: false,
    budgetSections: [
      {
        id: "section-8",
        name: "Payroll Deductions & Benefits",
        budgetId: "budget-4",
        isDeductions: true, // Exactly one deduction section
        budgetSectionItems: [
          {
            id: "item-12",
            budgetSectionId: "section-8",
            categoryName: "Federal Tax",
            amount: 24000,
          },
          {
            id: "item-13",
            budgetSectionId: "section-8",
            categoryName: "Family Health & Dental",
            amount: 7200,
          },
          {
            id: "item-14",
            budgetSectionId: "section-8",
            categoryName: "401(k) Contribution",
            amount: 6000,
          },
        ],
      },
      {
        id: "section-9",
        name: "Household Expenses",
        budgetId: "budget-4",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-15",
            budgetSectionId: "section-9",
            categoryName: "Mortgage",
            amount: 28000,
          },
          {
            id: "item-16",
            budgetSectionId: "section-9",
            categoryName: "Groceries & Supplies",
            amount: 9600,
          },
        ],
      },
      {
        id: "section-10",
        name: "Education & Kids",
        budgetId: "budget-4",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-17",
            budgetSectionId: "section-10",
            categoryName: "College Savings (529)",
            amount: 4000,
          },
        ],
      },
    ],
  },
  {
    id: "budget-5",
    name: "Student Budget",
    userId: "user-789",
    grossIncome: 18000,
    isActive: false,
    budgetSections: [
      {
        id: "section-11",
        name: "Tax Withholdings",
        budgetId: "budget-5",
        isDeductions: true, // Exactly one deduction section
        budgetSectionItems: [
          {
            id: "item-18",
            budgetSectionId: "section-11",
            categoryName: "Part-time Job Tax",
            amount: 1200,
          },
        ],
      },
      {
        id: "section-12",
        name: "School & Living",
        budgetId: "budget-5",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-19",
            budgetSectionId: "section-12",
            categoryName: "Dorm / Housing",
            amount: 8000,
          },
          {
            id: "item-20",
            budgetSectionId: "section-12",
            categoryName: "Textbooks & Supplies",
            amount: 1000,
          },
        ],
      },
    ],
  },
  {
    id: "budget-6",
    name: "Aggressive Debt Payoff Budget",
    userId: "user-123",
    grossIncome: 85000,
    isActive: false,
    budgetSections: [
      {
        id: "section-13",
        name: "Mandatory Deductions",
        budgetId: "budget-6",
        isDeductions: true, // Exactly one deduction section
        budgetSectionItems: [
          {
            id: "item-21",
            budgetSectionId: "section-13",
            categoryName: "Taxes",
            amount: 17000,
          },
        ],
      },
      {
        id: "section-14",
        name: "Debt Elimination",
        budgetId: "budget-6",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-22",
            budgetSectionId: "section-14",
            categoryName: "Student Loans",
            amount: 15000,
          },
          {
            id: "item-23",
            budgetSectionId: "section-14",
            categoryName: "Credit Card Balances",
            amount: 6000,
          },
        ],
      },
      {
        id: "section-15",
        name: "Bare Essentials",
        budgetId: "budget-6",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-24",
            budgetSectionId: "section-15",
            categoryName: "Food & Shelter",
            amount: 18000,
          },
        ],
      },
    ],
  },
  {
    id: "budget-7",
    name: "Retirement / Downsized Budget",
    userId: "user-999",
    grossIncome: 45000,
    isActive: false,
    budgetSections: [
      {
        id: "section-16",
        name: "Pension & Healthcare Deductions",
        budgetId: "budget-7",
        isDeductions: true, // Exactly one deduction section
        budgetSectionItems: [
          {
            id: "item-25",
            budgetSectionId: "section-16",
            categoryName: "Medicare / Taxes",
            amount: 5000,
          },
          {
            id: "item-26",
            budgetSectionId: "section-16",
            categoryName: "Supplemental Insurance",
            amount: 3600,
          },
        ],
      },
      {
        id: "section-17",
        name: "Lifestyle & Leisure",
        budgetId: "budget-7",
        isDeductions: false,
        budgetSectionItems: [
          {
            id: "item-27",
            budgetSectionId: "section-17",
            categoryName: "Travel & Hobbies",
            amount: 8000,
          },
          {
            id: "item-28",
            budgetSectionId: "section-17",
            categoryName: "Groceries",
            amount: 5000,
          },
        ],
      },
    ],
  },
];
export default BudgetOverview;
