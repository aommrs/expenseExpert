import React from "react";

interface TableProps {
  columns: { label: string; field: string }[];
  data: { [key: string]: any }[];
  children?: (row: { [key: string]: any }) => React.ReactNode;
}

enum Type {
  INCOME = "01",
  EXPENSE = "02",
  SAVING = "03",
  INVESTMENT = "04",
  TAX = "05",
}

function getColorTextByType(typeCode: string) {
  return typeCode === Type.INCOME || typeCode === Type.SAVING
    ? "text-[#17DB21]"
    : "text-[#FF0000]";
}

function getSignByType(typeCode: string) {
  return typeCode === Type.INCOME || typeCode === Type.SAVING ? "+" : "-";
}

export default function Table({ columns, data, children }: TableProps) {
  const groupedData = data.reduce((acc, row) => {
    const date = row.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {} as { [date: string]: { [key: string]: any }[] });

  return (
    <div className="flex justify-center px-[2rem]">
      <table className="w-[50rem] text-sm text-gray-700 bg-white">
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} className="text-center py-4">
                No records found.
              </td>
            </tr>
          ) : (
            Object.entries(groupedData).map(([date, rows], groupIndex) => (
              <React.Fragment key={groupIndex}>
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-3 py-2 text-start text-sm text-[#8D8D8D] font-medium border-b-[2px] border-[#BFBFBF]"
                  >
                    {date}
                  </td>
                </tr>
                {rows.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((col, colIndex) => {
                      const isAmount = col.field === "amount";
                      const isTransDesc = col.field === "transactionDesc";
                      const colorText = getColorTextByType(row.typeCode);
                      const sign = getSignByType(row.typeCode);
                      return (
                        <td
                          key={colIndex}
                          className={`px-3 py-2 text-center text-sm ${
                            isAmount ? colorText : "text-black"
                          } `}
                        >
                          {isAmount && sign}
                          {row[col.field]}
                        </td>
                      );
                    })}
                    <td className="py-2 text-center text-base">
                      {children && children(row)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
