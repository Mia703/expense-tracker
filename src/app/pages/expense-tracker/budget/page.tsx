import GoalsTable from "@/components/goals";
import SalaryTable from "@/components/salary";
import SavingsTable from "@/components/savings";
import Welcome from "@/components/welcome";

export default function Budget() {

  return (
    <section
      id="budget"
      className="col-span-4 grid grid-cols-4 gap-4 md:col-span-6 md:grid-cols-6 lg:col-span-12 lg:grid-cols-12"
    >
      <Welcome />
      <div className="navigation col-span-4 bg-green-300 md:col-span-6 lg:col-span-2">
        navigation
      </div>

      <main className="col-span-4 md:col-span-4 lg:col-span-8">
        center content
        <div className="date-wrapper">date</div>
        <SalaryTable />
        <GoalsTable />
        <SavingsTable />
      </main>
      <div className="col-span-4 bg-blue-300 md:col-span-2 lg:col-span-2">
        right side content
      </div>
    </section>
  );
}
