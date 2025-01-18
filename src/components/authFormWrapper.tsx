import { Paper } from "@mui/material";

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode; // allows for any valid react child
}
export const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <section className="col-span-4 flex h-[90vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12">
      <div className="form-wrapper w-full p-4 md:w-[50vw] lg:w-[30vw]">
        <h1 className="mb-6 text-center">Expense Tracker</h1>
        <Paper elevation={3} className="p-6">
          <h2 className="mb-4 capitalize">{title}</h2>
          {children}
        </Paper>
      </div>
    </section>
  );
};
