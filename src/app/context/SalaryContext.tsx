import { createContext, useContext, useState } from "react";

// the Salary object type
interface Salary {
  id: string;
  salary: number;
  payday: Date | string;
  // TODO: add this to salary, setSalary
  // use this to keep track of the total spent per category
  // spent: {
  //   savings: number;
  //   expenses: number;
  //   other: number;
  // }
}

interface SalaryContextType {
  salary: Salary;
  setSalary: React.Dispatch<React.SetStateAction<Salary>>;
}

// a context with an initial placeholder value (will be overwritten by the provider)
const SalaryContext = createContext<SalaryContextType | undefined>(undefined);

export const SalaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [salary, setSalary] = useState<Salary>({
    id: "",
    salary: 0,
    payday: "NaN",
  });

  return (
    <SalaryContext.Provider value={{ salary, setSalary }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error(
      "SalaryContext: useSalary must be used within a SalaryProvider",
    );
  }
  return context;
};

export default SalaryContext;
