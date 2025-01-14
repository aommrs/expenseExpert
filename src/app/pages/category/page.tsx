"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ActionButton from "../../components/action-button/page";
import CategoryCard from "../../components/category-card/page";
import CategoryColor from "../../components/category-color/page";
import Logo from "../../components/logo/page";
import { addCategory, deleteCategory, getCategory, getType } from "./service";
import Navbar from "@/app/components/navbar/page";
import Modal from "@/app/components/modal/page";
import Textbox from "@/app/components/textbox/page";
import Dropdown from "@/app/components/dropdown/page";
import EmojiInput from "@/app/components/emoji-input/page";
import { DropDown } from "@/app/interfaces/page";
import { LiaTimesCircle } from "react-icons/lia";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface FormData {
  emoji: string;
  categoryName: string;
}

export default function Category() {
  const [category, setCategory] = useState<any[]>([]);
  const [type, setType] = useState<DropDown[]>([]);
  const [selectedType, setSelectedType] = useState<DropDown>({
    value: 0,
    text: "เลือกประเภท",
  });
  const [isModalNotiOpen, setIsModalNotiOpen] = useState(false);
  const [isModalSaveDataOpen, setIsModalSaveDataOpen] = useState(false);
  const [isModalDeleteDataOpen, setIsModalDeleteDataOpen] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [responseMessageSuccess, setResponseMessageSuccess] = useState("");
  const [responseMessageFail, setResponseMessageFail] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  enum Type {
    INCOME = "01",
    EXPENSE = "02",
    SAVING = "03",
    INVESTMENT = "04",
    TAX = "05",
  }

  function getColorByTypeCode(typeCode: Type): string {
    switch (typeCode) {
      case Type.INCOME:
        return "bg-green-500";
      case Type.EXPENSE:
        return "bg-red-500";
      case Type.SAVING:
        return "bg-yellow-500";
      case Type.INVESTMENT:
        return "bg-blue-500";
      case Type.TAX:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  }

  function handleAddCategory() {
    setIsModalSaveDataOpen(true);
  }

  async function handleEditCategory(editCategoryData: any) {
    setEditId(editCategoryData.id);
    setSelectedType({
      value: editCategoryData.typeId,
      text: editCategoryData.typeName,
    });

    reset({
      emoji: editCategoryData.emoji,
      categoryName: editCategoryData.categoryName,
    });

    setIsModalSaveDataOpen(true);
  }

  async function handleDeleteCategory(deleteCategoryId: number) {
    try {
      const responseDeleteCategory = await deleteCategory(deleteCategoryId);
      setIsModalDeleteDataOpen(false);
      if ([200, 201].includes(responseDeleteCategory.status)) {
        setResponseMessageSuccess("ลบข้อมูลสำเร็จ");
        setIsModalNotiOpen(true);
        setFetchData(true);
      } else {
        console.log(
          "Response Data==>",
          responseDeleteCategory.response.data.error
        );
        setResponseMessageFail(responseDeleteCategory.response.data.error);
        setIsModalNotiOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleTypeSelect(type: DropDown) {
    setSelectedType(type);
    console.log("Selected type: ", type.value);
  }

  async function onSubmit(data: FormData) {
    const categorySaveData = {
      id: editId,
      typeId: selectedType.value,
      ...data,
    };
    console.log("Form data==>", categorySaveData);
    try {
      const responseAddCategory = await addCategory(categorySaveData);
      setIsModalSaveDataOpen(false);
      setSelectedType({ value: 0, text: "เลือกประเภท" });
      reset({
        emoji: "",
        categoryName: "",
      });

      if ([200, 201].includes(responseAddCategory.status)) {
        setFetchData(true);
        setResponseMessageSuccess("บันทึกข้อมูลสำเร็จ");
        setIsModalNotiOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        if (fetchData) {
          const categoryData = await getCategory();
          setCategory(categoryData);
          setFetchData(false);
        } else {
          const [categoryData, typeData] = await Promise.all([
            getCategory(),
            getType(),
          ]);
          setCategory(categoryData);
          setType(typeData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex flex-col">
          <div className="mt-[4rem]">
            <Logo />
          </div>
          <div className="mt-[5rem] mb-[2rem] ps-[2rem] md:ps-[4rem]">
            <button
              onClick={handleAddCategory}
              className="flex items-center w-auto h-[2.5rem] rounded-[15px] text-sm md:text-base font-medium bg-[#F2F2F2] hover:bg-[#d2d2d2] p-[0.8rem]"
            >
              เพิ่มหมวดหมู่
            </button>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 px-[4rem] mt-[2rem]">
            {category.map((item, index) => {
              const color = getColorByTypeCode(item.typeCode);
              return (
                <CategoryCard key={index}>
                  <div className="flex flex-col gap-[0.2rem]">
                    <div className="flex items-center gap-[0.5rem] md:gap-[1rem] lg:gap-[2rem]">
                      <h2 className="font-bold text-base lg:text-lg">
                        {item.emoji} {item.categoryName}
                      </h2>
                      <ActionButton>
                        {(toggleVisibility, isVisible) => (
                          <>
                            <button
                              className="w-full flex justify-start bg-[#FFFFFF] hover:bg-[#e1e1e1] text-sm px-[1.5rem] py-[0.5rem]"
                              onClick={() => {
                                handleEditCategory(item);
                                toggleVisibility();
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full flex justify-start bg-[#F2F2F2] hover:bg-[#d9d9d9] text-sm px-[1.5rem] py-[0.5rem]"
                              onClick={() => {
                                setIsModalDeleteDataOpen(true);
                                setDeleteId(item.id);
                                toggleVisibility();
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </ActionButton>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <CategoryColor color={color} />
                      <p className="text-[0.8rem] md:text-base">
                        {item.typeName}
                      </p>
                    </div>
                  </div>
                </CategoryCard>
              );
            })}
          </div>
        </div>
        <div className="fixed bottom-[2rem] left-[50%] transform -translate-x-1/2">
          <Navbar />
        </div>
      </div>

      <Modal isOpen={isModalSaveDataOpen}>
        <h2 className="text-lg font-bold">กรอกข้อมูลหมวดหมู่</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-[2rem] items-center lg:flex-row md:justify-center lg:items-end lg:gap-[2rem] lg:mt-0">
            <Dropdown
              data={type}
              onSelect={handleTypeSelect}
              dataSelected={selectedType}
            />

            <Controller
              name="emoji"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <EmojiInput
                  placeholder="เลือกอีโมจิ"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Textbox
              placeholder="ชื่อหมวดหมู่"
              name="categoryName"
              register={register}
              requiredMessage="กรุณากรอกชื่อหมวดหมู่"
            />
          </div>
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.categoryName.message}
            </p>
          )}
          <div className="flex justify-center mt-[2rem] lg:mt-[2rem] gap-[0.5rem] ">
            <button
              type="submit"
              className="rounded-[10px] bg-[#A4C2A6] hover:bg-[#91ac93] px-[0.8rem] py-[0.2rem] w-auto"
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={() => {
                setIsModalSaveDataOpen(false);
                setSelectedType({
                  value: 0,
                  text: "เลือกประเภท",
                });
                reset({
                  emoji: "",
                  categoryName: "",
                });
              }}
              className="rounded-[10px] bg-[#DCDCDC] hover:bg-[#afafaf] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isModalDeleteDataOpen}>
        <div className="md:px-[3rem]">
          <h2 className="text-lg font-bold">ยืนยันการลบหรือไม่</h2>
          <div className="flex justify-center gap-[1rem] mt-[1rem]">
            <button
              onClick={() => {
                deleteId !== null && handleDeleteCategory(deleteId);
              }}
              className="rounded-[10px] bg-[#ff9d9d] hover:bg-[#ff7e7e] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ลบ
            </button>
            <button
              type="button"
              onClick={() => {
                setIsModalDeleteDataOpen(false);
              }}
              className="rounded-[10px] bg-[#DCDCDC] hover:bg-[#afafaf] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalNotiOpen}>
        <div className="md:px-[3rem]">
          {responseMessageFail != "" && (
            <div className="flex flex-col items-center">
              <LiaTimesCircle className="text-4xl text-red-500 text-center" />
              <h2 className="text-lg text-center font-bold mt-[1rem]">
                {responseMessageFail}
              </h2>
            </div>
          )}
          {responseMessageSuccess != "" && (
            <div className="flex flex-col items-center">
              <IoIosCheckmarkCircleOutline className="text-4xl text-green-500 text-center" />
              <h2 className="text-lg text-center font-bold">
                {responseMessageSuccess}
              </h2>
            </div>
          )}
          <div className="flex justify-center mt-[1rem]">
            <button
              type="button"
              onClick={() => {
                setIsModalNotiOpen(false);
                setResponseMessageFail("");
                setResponseMessageSuccess("");
              }}
              className="rounded-[10px] bg-[#DCDCDC] hover:bg-[#afafaf] px-[0.8rem] py-[0.2rem] w-auto"
            >
              ตกลง
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
