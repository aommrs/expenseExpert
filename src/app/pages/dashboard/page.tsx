"use client";
import Navbar from "@/app/components/navbar/page";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import {
  getBalance,
  getExpenseInYear,
  getMostExpenseCategory,
  getMostExpenseType,
  getMostIncomeCategory,
} from "./service";
import Logo from "@/app/components/logo/page";
import DatePicker from "rsuite/esm/DatePicker";
import "rsuite/dist/rsuite.min.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const income = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const expense = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const invest = [1200, 140, 5000, 2552, 7686, 202, 4856];
const tax = [120, 140, 752, 245, 864, 535, 674];
const saving = [5000, 3800, 1890, 2552, 3490, 9800, 3000];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const chartSetting = {
  yAxis: [
    {
      label: "amount",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function Dashboard() {
  const [pieData, setPieData] = useState<any[]>([]);
  const [expenseBarInMonth, setExpenseBarInMonth] = useState<any[]>([]);
  const [expenseBarSeries, setExpenseBarSeries] = useState<any[]>([]);
  const [incomeBarInMonth, setIncomeBarInMonth] = useState<any[]>([]);
  const [incomeBarSeries, setIncomeBarSeries] = useState<any[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [dateFormat, setDateFormat] = useState<string>("");
  const [year, setYear] = useState<number>(0);

  const [incomeLine, setIncomeLine] = useState<any[]>([]);
  const [expenseLine, setExpenseLine] = useState<any[]>([]);
  const [investLine, setInvestLine] = useState<any[]>([]);
  const [taxLine, setTaxLine] = useState<any[]>([]);
  const [savingLine, setSavingLine] = useState<any[]>([]);
  const [monthLine, setMonthLine] = useState<any[]>([]);

  const [balance, setBalance] = useState<any>();

  const handleSelectDate = (date?: Date | null) => {
    let selectedDate: string;
    let formattedYear: number;
    if (date) {
      const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      formattedYear = date.getFullYear();
      selectedDate = `${formattedMonth}/${formattedYear}`;
    } else {
      const currentDate = new Date();
      const formattedMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      formattedYear = currentDate.getFullYear();
      selectedDate = `${formattedMonth}/${year}`;
    }
    setDateFormat(selectedDate);
    setYear(formattedYear);
  };

  useEffect(() => {
    handleSelectDate(new Date());
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const mostExpenseTypeData = await getMostExpenseType(dateFormat);
        const mostExpenseCategoryData = await getMostExpenseCategory(
          dateFormat
        );
        const mostIncomeCategoryData = await getMostIncomeCategory(dateFormat);
        const expenseInYear = await getExpenseInYear(year);
        const balance = await getBalance();

        setBalance(balance[0].balance);

        setPieData(mostExpenseTypeData);

        setExpenseBarInMonth(
          mostExpenseCategoryData.mostExpenseCategoryBarArray
        );
        setExpenseBarSeries(mostExpenseCategoryData.series);

        setIncomeBarInMonth(mostIncomeCategoryData.mostIncomeCategoryBarArray);
        setIncomeBarSeries(mostIncomeCategoryData.series);

        setIncomeLine(expenseInYear.income);
        setExpenseLine(expenseInYear.expense);
        setInvestLine(expenseInYear.invest);
        setTaxLine(expenseInYear.tax);
        setSavingLine(expenseInYear.saving);
        setMonthLine(expenseInYear.month);
      } catch (err) {
        console.error(err);
      }
    };

    if (dateFormat) {
      fetchDataAsync();
    }
  }, [dateFormat]);

  return (
    <>
      <div className="mt-[4rem]">
        <Logo />
      </div>
      <div className="mt-[5rem] flex justify-center md:ms-[4rem] md:justify-start">
        <DatePicker
          format="MM/yyyy"
          value={date}
          onChange={(value: Date | null) => {
            setDate(value);
            handleSelectDate(value);
          }}
          placeholder="เลือกเดือนและปี"
          oneTap
        />
      </div>
      <div>
        <div className="flex flex-col lg:flex-row justify-center items-center mt-[2rem] lg:mt-0 lg:gap-[5rem]">
          <div className="flex flex-col justify-center rounded-[20px] w-auto max-w-[20rem] h-[6rem] shadow-lg px-[2rem] cursor-pointer hover:bg-slate-100">
            <p className="text-base font-medium">balance</p>
            <p className="text-xl font-bold">{balance}</p>
          </div>

          <div>
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={360}
              height={170}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center items-center mt-[2rem] md:gap-[4rem]">
        <div>
          <BarChart
            dataset={expenseBarInMonth}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={expenseBarSeries}
            {...chartSetting}
            width={260}
            height={200}
          />
        </div>
        <div>
          <BarChart
            dataset={incomeBarInMonth}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={incomeBarSeries}
            {...chartSetting}
            width={260}
            height={200}
          />
        </div>
      </div>
      <div className="flex justify-center lg:px-0 px-[2rem] mb-[8rem]">
        <LineChart
          width={600}
          height={300}
          series={[
            { data: incomeLine, label: "income", color: "#4caf50" },
            { data: expenseLine, label: "expense", color: "#f44336" },
            { data: investLine, label: "investment", color: "#2196f3" },
            { data: taxLine, label: "tax", color: "#9c27b0" },
            { data: savingLine, label: "saving", color: "#ff9800" },
          ]}
          xAxis={[{ scaleType: "point", data: monthLine }]}
          sx={{
            [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
              strokeWidth: 1,
            },
            ".MuiLineElement-series-pvId": {
              strokeDasharray: "5 5",
            },
            ".MuiLineElement-series-uvId": {
              strokeDasharray: "3 4 5 2",
            },
            [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
              {
                fill: "#fff",
              },
            [`& .${markElementClasses.highlighted}`]: {
              stroke: "none",
            },
          }}
        />
      </div>

      <div className="fixed bottom-[2rem] left-[50%] transform -translate-x-1/2">
        <Navbar />
      </div>
    </>
  );
}
