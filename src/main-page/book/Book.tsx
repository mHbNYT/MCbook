import { useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import TwitterHeart from "./Heart";
import { useStyles } from "./styles";

export enum BookStatus {
  Available,
  OutOfStock,
}

export interface BookType {
  id: number;
  title: string;
  img: string;
  status: BookStatus;
  categoryTitle: string;
  liked: boolean;
  totalLikes: number;
  totalRents: number;
  handleRent: () => void;
}

export const Book : React.FC<BookType> = (props) => {
  const classes = useStyles();
  const [likes, setLikes] = useState(props.totalLikes);
  const [liked, setLiked] = useState(props.liked);

  const like = async () => {
    if (!liked) {
      try {
        await axiosInstance.post(`/like/${props.id}`);
        setLiked(true);
        setLikes(likes + 1);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axiosInstance.post(`like/unlike/${props.id}`);
        setLiked(false);
        setLikes(likes - 1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={classes.container}>
      <img width={150} height={150} src={props.img} alt={props.title} />
      <p>
        {props.title}
      </p>
      <p style={{ marginTop: "-10px" }}>
        {props.categoryTitle}
      </p>
      <div className={classes.separator} />
      <div className={classes.buttonContainer}>
        <div className={classes.firstRow}>
          <div
            className={props.status === BookStatus.Available
              ? classes.availableTag : classes.outTag}
            title={props.status === BookStatus.OutOfStock ? "12 روز دیگر موجود می‌شود." : undefined}
          >
            {props.status === BookStatus.Available ? "موجود" : "ناموجود"}
          </div>
          <div className={classes.heartContainer}>
            <TwitterHeart onHeartClick={like} isLiked={liked} />
            <p className={classes.likes}>
              {likes}
            </p>
          </div>
        </div>
        <div title={`این کتاب تا به حال ${props.totalRents} بار قرض گرفته شده‌است.`} className={classes.secondRow}>
          <img
            alt="book icon"
            src="/assets/images/book.png"
            width={25}
            height={25}
          />
          <p>
            {props.totalRents}
          </p>
        </div>
        <button onClick={props.handleRent} type="submit" className={classes.buyButton}>
          قرض کتاب
        </button>
      </div>
    </div>
  );
};
