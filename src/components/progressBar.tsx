interface ProgressBarProps {
  cash: number;
  credit: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ cash, credit }) => {
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const total = cash + credit;
  const percentage = total > 0 ? (cash / total) * 100 : 0;

  return (
    <div className="progress-bar-wrapper">
      {cash == 0 && credit == 0 ? (
        <p className="text-center">There are no assets.</p>
      ) : (
        <div>
          <div
            id="progress-bar"
            className="cash-wrapper h-4 w-full overflow-hidden rounded-xl bg-slate-400 transition-all ease-in-out"
          >
            <div
              className="credit-wrapper h-4 overflow-hidden rounded-xl bg-green-600 transition-all ease-in-out"
              style={{ width: `${percentage.toFixed(1)}%` }}
            ></div>
          </div>

          <div className="legend-wrapper my-2">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <div className="circle mx-2 h-3 w-3 rounded-[100000px] bg-green-600"></div>
                <p className="font-bold">Total Cash:</p>
              </div>
              <p>${number_formatter.format(cash)}</p>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <div className="circle mx-2 h-3 w-3 rounded-[100000px] bg-slate-400"></div>
                <p className="font-bold">Total Credit:</p>
              </div>
              <p>-${number_formatter.format(credit)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
