import React, {
  ChangeEvent, useEffect, useState,
} from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axiosConfig";
import { TextField } from "../../general/text-field/TextField";
import { getDefaultImage } from "../../utils";
import { Modal } from "../../utils/modal/Modal";
import { PanelBook } from "./PanelBook";
import { useStyles } from "./styles";

interface Props {
  name: string;
  categoryId: number;
  capacity: number;
}

interface Category {
  name: string
}

interface Book extends Props {
  totalRents: number;
  category: Category;
  img: string;
}

const getBase64 = (file: File) => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    res(reader.result);
  };
  reader.onerror = () => {
    rej(new Error("error!"));
  };
});

export const BookTab : React.FC = () => {
  const classes = useStyles();

  const [books, setBooks] = useState<Book[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  const [modal, setModal] = useState(false);
  const [state, setState] = useState<Props>({
    categoryId: 0,
    name: '',
    capacity: 0,
  });

  useEffect(() => {
    const get = async () => {
      const res = (await axiosInstance.get('/book')).data;
      setBooks(res.data);
    };
    get();
  }, [refetch]);

  const handleChangeName = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setState({
      ...state,
      name: target.value,
    });
  };

  const handleChangeNumbers = (key: keyof Props) => (event: any) => {
    // @ts-ignore
    setState({ ...state, [key]: Number(event.target.value) });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!imageFile) {
      toast("An image must be provided!");
      return;
    }
    const b64Image = await getBase64(imageFile);
    try {
      await axiosInstance.post("/book", {
        name: state.name,
        categoryId: state.categoryId,
        capacity: state.capacity,
        img: b64Image,
      });
      setRefetch(!refetch);
      setModal(false);
      toast("کتاب با موفقیت اضافه شد.", { type: "success" });
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      toast("درخواست ناموفق", { type: "error" });
      if (err.response.status === 409) toast("شماره قبلا ثبت شده است", { type: "error" });
    }
  };

  return (
    <>
      <Modal show={modal} handleClose={() => setModal(false)}>
        <>
          <div>
            <div className={classes.row}>
              <TextField onChange={handleChangeName} width={200} label="نام" value={state.name} />
            </div>
            <div className={classes.row}>
              <TextField onChange={handleChangeNumbers('capacity')} width={200} label="موجودی" value={state.capacity} />
            </div>
            <div className={classes.row}>
              <TextField onChange={handleChangeNumbers('categoryId')} width={200} label="آیدی کتگوری" value={state.categoryId} />
            </div>
            <div className={classes.row}>
              <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" />
            </div>
          </div>
          <button onClick={handleSubmit} type="submit" className={classes.createBookButton}> ایجاد کتاب  </button>
        </>
      </Modal>
      <button onClick={() => setModal(true)} type="submit" className={classes.createBookButton}> +ایجاد کتاب جدید </button>
      <div className={classes.booksWrapper}>
        {books.map((item, index) => (
          <PanelBook
            categoryTitle={item.category.name}
            img={item.img || getDefaultImage()}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            numOfSales={item.totalRents}
            title={item.name}
          />
        ))}
      </div>
    </>
  );
};
