import { useEffect } from "react";
import * as react from "react";
import { axiosInstance } from "../../axiosConfig";
import { useStyles } from "./styles";

interface Props {
  value: number;
  onChange: (id: number) => void;
}

export const ByCategory: React.FC<Props> = (props) => {
  const [categories, setCategories] = react.useState<{id: number; name: string}[]>([]);

  useEffect(() => {
    const get = async () => {
      const res = await axiosInstance.get('/category');
      setCategories(res.data.data);
    };
    get();
  }, []);
  const classes = useStyles();

  const handleChange = (val: number) => () => props.onChange(val);
  return (
    <div className={classes.categoryFilterContainer}>
      <p> دسته‌بندی‌ها </p>
      <div className={classes.separator} />
      {categories.map(((cat) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label>
          <input
            type="checkbox"
            checked={props.value === cat.id}
            onChange={handleChange(cat.id)}
          />
          {cat.name}
        </label>
      )))}
    </div>
  );
};
