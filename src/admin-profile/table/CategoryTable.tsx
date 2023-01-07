/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axiosConfig";
import { TextField } from "../../general/text-field/TextField";
import { Modal } from "../../utils/modal/Modal";
import { useStyles } from "./styles";

interface Props {
  tableHeaders: string[],
  // data: object[],
}

export const CategoryTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const get = async () => {
      const res = (await axiosInstance.get('/category')).data;
      setCategories(res.data);
    };
    get();
  }, [refetch]);

  const handleChangeName = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };

  const removeCategory = (category: {id: number}) => async () => {
    try {
      await axiosInstance.delete(`/category/${category.id}`);
      setRefetch(!refetch);
      toast("دسته‌بندی با موفقیت حذف شد", { type: "success" });
    } catch (err) {
      toast("حذف ناموفق", { type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/category", {
        name,
      });
      setRefetch(!refetch);
      setModal(false);
      toast("دسته‌بندی با موفقیت اضافه شد", { type: "success" });
    } catch (err: any) {
      toast("اضافه کردن ناموفق", { type: "success" });
    }
  };

  return (
    <div className={classes.container}>
      <Modal show={modal} handleClose={() => setModal(false)}>
        <div>
          <div className={classes.row}>
            <TextField onChange={handleChangeName} width={200} label="نام" value={name} />
          </div>
          <button onClick={handleSubmit} type="submit" className={classes.createBookButton}> ایجاد دسته بندی  </button>
        </div>
      </Modal>
      <button onClick={() => setModal(true)} type="submit" className={classes.createBookButton}> +ایجاد دسته‌بندی جدید </button>
      <div className={`${classes.row} ${classes.header}`}>
        {props.tableHeaders.map((header) => (
          <p>
            {header}
          </p>
        ))}
        <p style={{ textAlign: 'center', marginRight: -45 }}>
          عملیات
        </p>
      </div>
      {categories.map((item) => (
        <div className={classes.row} key={item.id}>
          <p>
            {item.id}
          </p>
          <p>
            {item.name}
          </p>
          <p
            onClick={removeCategory(item)}
            className={classes.categoryOperation}
          >
            ✕ حذف دسته‌بندی
          </p>
        </div>
      ))}
    </div>
  );
};
