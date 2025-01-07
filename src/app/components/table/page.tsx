import React from "react";

interface TableProps {
  columns: { label: string; field: string }[];
  data: { [key: string]: any }[];
  children?: (row: { [key: string]: any }) => React.ReactNode;
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
      <div className="overflow-x-auto">
        <table
          className="w-[50rem] text-sm text-gray-700 bg-white shadow-lg rounded-lg overflow-hidden"
          style={{ tableLayout: "auto" }}
        >
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-2 text-center"
                  style={{ textAlign: "center", whiteSpace: "nowrap" }}
                >
                  {col.label}
                </th>
              ))}
              <th
                scope="col"
                colSpan={2}
                className="px-3 py-2 text-center"
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-4"
                  style={{ textAlign: "center" }}
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              Object.entries(groupedData).map(([date, rows], groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="px-3 py-2 text-center font-bold bg-gray-200"
                    >
                      {date}
                    </td>
                  </tr>
                  {rows.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-3 py-2 text-center"
                          style={{
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row[col.field]}
                        </td>
                      ))}
                      <td className="py-2 text-center" colSpan={2}>
                        {children && children(row)}{" "}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
