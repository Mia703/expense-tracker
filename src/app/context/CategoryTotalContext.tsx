import { createContext, useContext, useState } from "react";

interface CategoryTotal {
  id: string;
  type: string;
  category: string;
  spent: number;
}

interface CategoryTotalType {
  categoryTotals: CategoryTotal[];
  setCategoryTotals: React.Dispatch<React.SetStateAction<CategoryTotal[]>>;
}

const CategoryTotalContext = createContext<CategoryTotalType | undefined>(
  undefined,
);

export const CategoryTotalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);

  return (
    <CategoryTotalContext.Provider
      value={{
        categoryTotals,
        setCategoryTotals,
      }}
    >
      {children}
    </CategoryTotalContext.Provider>
  );
};

export const useCategoryTotal = () => {
  const context = useContext(CategoryTotalContext);
  if (!context) {
    throw new Error(
      "CategoryTotalContext: useCategoryTotal must be used within a CategoryTotalProvider",
    );
  }
  return context;
};
