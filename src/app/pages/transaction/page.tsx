"use client";
import Table from "@/app/components/table/page";

export default function Transaction() {
  // Mock data for the table
  const columns = [
    { label: "Date", field: "date" },
    { label: "Amount", field: "amount" },
    { label: "Status", field: "status" },
  ];

  const data = [
    { date: "2025-01-01", amount: "$100", status: "Completed" },
    { date: "2025-01-02", amount: "$200", status: "Pending" },
    { date: "2025-01-03", amount: "$150", status: "Completed" },
    { date: "2025-01-03", amount: "$0", status: "WTF its test" },
    { date: "2025-01-04", amount: "$300", status: "Failed" },
  ];

  // Optional: Define a children function to render action buttons
  const renderActions = (row: { [key: string]: any }) => (
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded ml-2">
        Delete
      </button>
    </div>
  );

  return (
    <>
      <div className="flex justify-center my-4">
        <h1 className="text-2xl">Transaction</h1>
      </div>

      <Table columns={columns} data={data}></Table>
    </>
  );
}
