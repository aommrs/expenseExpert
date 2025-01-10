"use client";
import ActionButton from "@/app/components/action-button/page";
import Logo from "@/app/components/logo/page";
import Navbar from "@/app/components/navbar/page";
import Table from "@/app/components/table/page";
import { useEffect, useState } from "react";
import {
  addTransaction,
  deleteTransaction,
  getCategoryDropdown,
  getTransaction,
} from "./service";
import Modal from "@/app/components/modal/page";
import Textbox from "@/app/components/textbox/page";
import { useForm } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/page";
import { DropDown } from "@/app/interfaces/page";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.min.css";

export default function Transaction() {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [transaction, setTransaction] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [id, setId] = useState(null);
  const [generateCode, setGenerateCode] = useState("00");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<DropDown>({
    value: 0,
    text: "เลือกหมวดหมู่",
  });
  const [errorSelectedCategory, setErrorSelectedCategory] = useState("");
  const [errorSelectedDate, setErrorSelectedDate] = useState("");
  const [fetchData, setFetchData] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  interface FormData {
    transactionDesc: string;
    amount: number;
    transDate: Date;
    selectedCategory: string;
  }

  const columns = [
    { label: "Amount", field: "amount" },
    { label: "Transaction Description", field: "transactionDesc" },
  ];

  enum Type {
    INCOME = "01",
    EXPENSE = "02",
    SAVING = "03",
    INVESTMENT = "04",
    TAX = "05",
  }

  function getColorByTypeCode(typeCode: string) {
    switch (typeCode) {
      case Type.INCOME:
        return "bg-[#68E46E]";
      case Type.EXPENSE:
        return "bg-[#FF9696]";
      case Type.SAVING:
        return "bg-[#FFD562]";
      case Type.INVESTMENT:
        return "bg-[#739DFF]";
      case Type.TAX:
        return "bg-[#D57CFF]";
      default:
        return "bg-gray-200";
    }
  }

  function handleEditTransaction(editTransData: any) {
    setId(editTransData.id);
    setSelectedCategory({
      value: editTransData.categoryId,
      text: editTransData.categoryName,
    });
    setSelectedDate(new Date(editTransData.transDate));
    reset({
      transactionDesc: editTransData.transactionDesc,
      amount: editTransData.amount,
    });

    setIsOpenModalEdit(true);
  }

  async function handleDeleteTransaction(id: number) {
    try {
      const responseDeleteTransaction = await deleteTransaction(id);
      console.log("Response Data==>", responseDeleteTransaction);
      setIsOpenModalDelete(false);
      if ([200, 201].includes(responseDeleteTransaction.status)) {
        setFetchData(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onSubmit(data: FormData) {
    const maxCode =
      transaction.length > 0
        ? transaction.reduce((max, trans) => {
            const code = parseInt(
              trans.transactionCode.replace("transac", ""),
              10
            );
            return code > max ? code : max;
          }, 0)
        : 0;

    const newCode = maxCode + 1;
    setGenerateCode(newCode.toString().padStart(2, "0"));
    const transSaveData = {
      id: id,
      categoryId: selectedCategory.value,
      amount: Number(data.amount),
      transactionCode: `transac${generateCode}`,
      transactionDesc: data.transactionDesc,
      transDate: selectedDate ? new Date(selectedDate) : null,
    };
    try {
      const responseAddTransaction = await addTransaction(transSaveData);
      if ([200, 201].includes(responseAddTransaction.status)) {
        setFetchData(true);
        setIsOpenModalEdit(false);
        setSelectedCategory({ value: 0, text: "เลือกหมวดหมู่" });
        setErrorSelectedCategory("");
        setErrorSelectedDate("");
        setId(null);
        reset({
          amount: undefined,
          transactionDesc: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        if (fetchData) {
          const transactionData = await getTransaction();
          setTransaction(transactionData);
          setFetchData(false);
        } else {
          const [transactionData, categoryData] = await Promise.all([
            getTransaction(),
            getCategoryDropdown(),
          ]);
          setTransaction(transactionData);
          setCategory(categoryData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataAsync();
  }, [fetchData]);

  return (
    <>
      <div className="mt-[4rem] ms-[2rem] md:ms-[4rem]">
        <Logo />
      </div>
      <div className="mt-[5rem] mb-[2rem] ps-[2rem] md:ps-[4rem]">
        <button
          onClick={() => {
            setIsOpenModalEdit(true);
          }}
          className="flex items-center w-auto h-[2.5rem] rounded-[15px] text-sm md:text-base font-medium bg-[#F2F2F2] hover:bg-[#d2d2d2] p-[0.8rem]"
        >
          เพิ่มรายการ
        </button>
      </div>

      <Table columns={columns} data={transaction}>
        {(row: any) => {
          const color = getColorByTypeCode(row.typeCode);
          return (
            <div className="flex justify-end items-center gap-[2rem]">
              <span
                className={`text-sm ${color} px-[10px] py-[2px] rounded-[20px]`}
              >
                {row.emoji} {row.categoryName}
              </span>
              <ActionButton bgPosition="left-[-4rem]">
                {(toggleVisibility, isVisible) => (
                  <>
                    <button
                      className="relative z-50 w-full flex justify-start bg-[#FFFFFF] hover:bg-[#e1e1e1] text-sm px-[1.5rem] py-[0.5rem]"
                      onClick={() => {
                        toggleVisibility();
                        handleEditTransaction(row);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="relative z-50 w-full flex justify-start bg-[#F2F2F2] hover:bg-[#d9d9d9] text-sm px-[1.5rem] py-[0.5rem]"
                      onClick={() => {
                        toggleVisibility();
                        setIsOpenModalDelete(true);
                        setId(row.id);
                      }}
                    >
                      ลบ
                    </button>
                  </>
                )}
              </ActionButton>
            </div>
          );
        }}
      </Table>

      <div className="fixed bottom-[2rem] left-[50%] transform -translate-x-1/2">
        <Navbar />
      </div>

      <Modal isOpen={isOpenModalEdit}>
        <h2 className="text-lg font-bold">กรอกข้อมูลรายการ</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col-reverse items-center mt-[2rem] lg:flex-row md:justify-center lg:items-end lg:gap-[2rem] lg:mt-0">
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-end lg:gap-[2rem]">
              <Textbox
                placeholder="รายละเอียดรายการ"
                name="transactionDesc"
                register={register}
                requiredMessage="กรุณากรอกรายละเอียดรายการ"
              />
              <Textbox
                placeholder="จำนวนเงิน"
                name="amount"
                register={register}
                type="number"
                step={0.01}
                requiredMessage="กรุณากรอกจำนวนเงิน"
              />
            </div>

            <DatePicker
              className="z-50 lg:mt-0 mt-[2rem]"
              value={selectedDate}
              onChange={(date) => (date ? setSelectedDate(date) : null)}
              format="dd/MM/yyyy"
            />
            <Dropdown
              data={category}
              onSelect={(item) => {
                setSelectedCategory(item);
              }}
              dataSelected={selectedCategory}
            />
          </div>
          {errors.transactionDesc && (
            <p className="text-red-500 text-sm mt-2">
              {errors.transactionDesc.message}
            </p>
          )}
          {errors.amount && (
            <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>
          )}
          {errorSelectedCategory != "" && (
            <p className="text-red-500 text-sm mt-2">{errorSelectedCategory}</p>
          )}
          {errorSelectedDate != "" && (
            <p className="text-red-500 text-sm mt-2">{errorSelectedDate}</p>
          )}

          <div className="flex justify-center mt-[2rem] lg:mt-[2rem] gap-[0.5rem]">
            <button
              type="submit"
              onClick={() => {
                selectedCategory.value === 0
                  ? setErrorSelectedCategory("กรุณากรอกหมวดหมู่")
                  : null;
                selectedDate ?? setErrorSelectedDate("กรุณากรอกวันที่");
              }}
              className="rounded-[10px] bg-[#A4C2A6] hover:bg-[#91ac93] px-[0.8rem] py-[0.2rem] w-auto"
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={() => {
                reset({
                  transactionDesc: "",
                  amount: undefined,
                });
                setSelectedCategory({ value: 0, text: "เลือกหมวดหมู่" });
                setIsOpenModalEdit(false);
                setErrorSelectedCategory("");
                setErrorSelectedDate("");
              }}
              className="rounded-[10px] bg-[#DCDCDC] hover:bg-[#afafaf] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isOpenModalDelete}>
        <div className="md:px-[3rem]">
          <h2 className="text-lg font-bold">ยืนยันการลบหรือไม่</h2>
          <div className="flex justify-center gap-[1rem] mt-[1rem]">
            <button
              onClick={() => {
                id !== null && handleDeleteTransaction(id);
              }}
              className="rounded-[10px] bg-[#ff9d9d] hover:bg-[#ff7e7e] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ลบ
            </button>
            <button
              type="button"
              onClick={() => {
                setId(null);
                setIsOpenModalDelete(false);
              }}
              className="rounded-[10px] bg-[#DCDCDC] hover:bg-[#afafaf] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
