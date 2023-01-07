import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStyles } from "./styles";
import { Invoice } from "../../../pages/profile/index";
import { axiosInstance } from "../../axiosConfig";
import { TextField } from "../../general/text-field/TextField";

interface Props {
  tableHeaders: string[],
}

const getState = (state: number) => {
  switch (state) {
    case 0:
      return "رزرو شده";
    case 1:
      return "تحویل شده";
    case 2:
      return "کنسل شده";
    case 3:
      return "تمدید شده";
    case 4:
      return "موفقیت آمیز";
    default:
      return "";
  }
};

export const InvoiceTable: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    const get = async () => {
      const res = (await axiosInstance.get('/rent/trace', {
        params: {
          traceNumber: trackingCode,
        },
      })).data;
      setInvoices(res.data);
    };
    get();
  }, [trackingCode]);

  const handleChangeCode = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setTrackingCode(target.value);
  };

  const handleConfirm = (item: Invoice) => async () => {
    try {
      await axiosInstance.post(`/rent/confirm`, {
        bookId: item.book.id,
        rentId: item.id,
      });
      toast("با موفقیت تایید شد", { type: "success" });
    } catch (err) {
      toast("مشکلی پیش آمده است", { type: "error" });
    }
  };

  const handleExtend = (item: Invoice) => async () => {
    try {
      await axiosInstance.post(`/rent/extend`, {
        rentId: item.id,
      });
      toast("با موفقیت تمدید شد", { type: "success" });
    } catch (err) {
      toast("مشکلی پیش آمده است", { type: "error" });
    }
  };

  const handleCancel = (item: Invoice) => async () => {
    try {
      await axiosInstance.post(`/rent/cancel`, {
        rentId: item.id,
      });
      toast("با موفقیت کنسل شد", { type: "success" });
    } catch (err) {
      toast("مشکلی پیش آمده است", { type: "error" });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div style={{ margin: '30px 0' }}>
        <TextField
          onChange={handleChangeCode}
          width={300}
          label="جستجوی کد رهگیری"
          placeholder="کد پیگیری را وارد کنید"
        />
      </div>
      <div className={classes.container}>
        <div className={`${classes.row} ${classes.header}`}>
          {props.tableHeaders.map((header) => (
            <p>
              {header}
            </p>
          ))}
        </div>
        {invoices.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
          <div className={classes.row} key={index}>
            <p>
              {item.traceNumber}
            </p>
            <p>
              {item.book.name}
            </p>
            <p>
              {`${item.user.firstName} ${item.user.lastName}`}
            </p>
            <p>
              {getState(item.state)}
            </p>
            <p>
              {new Intl.DateTimeFormat('fa-IR').format(new Date(item.dateCreated))}
            </p>
            <p>
              {new Intl.DateTimeFormat('fa-IR').format(new Date(item.dueDate))}
            </p>
            <button onClick={handleCancel(item)} type="button">
              کنسل
            </button>
            <button onClick={handleConfirm(item)} type="button">
              تایید
            </button>
            <button onClick={handleExtend(item)} type="button">
              تمدید
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
