import React from "react";

interface TableProps {
  columns: { label: string; field: string }[];
  data: Array<Record<string, string | number | Date>>;
  children?: (row: Record<string, string | number | Date>) => React.ReactNode;
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

function formatDate(date: Date | string | number): string {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  return date.toString();
}

export function Table({ columns, data, children }: TableProps) {
  const groupedData = data.reduce((acc, row) => {
    const date = row.date as string;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {} as Record<string, Array<Record<string, string | number | Date>>>);

  return (
    <div className="flex justify-center px-[2rem] mb-[8rem]">
      <table className="w-[50rem] text-sm text-gray-700 bg-white">
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} className="text-center py-4">
                ไม่พบข้อมูล
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
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((col, colIndex) => {
                      const isAmount = col.field === "amount";
                      const colorText = getColorTextByType(
                        row.typeCode as string
                      );
                      const sign = getSignByType(row.typeCode as string);
                      return (
                        <td
                          key={colIndex}
                          className={`px-3 py-2 text-center text-sm ${
                            isAmount ? colorText : "text-black"
                          } `}
                        >
                          {isAmount && sign}
                          {formatDate(row[col.field as keyof typeof row])}{" "}
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
