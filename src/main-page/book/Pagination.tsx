/* eslint-disable @next/next/no-img-element */
import { numberWithCommas } from "../../utils"
import { useStyles } from "./styles"

interface Props {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = (props) => {

  const classes = useStyles()

  return (
    <div className={`${classes.paginationButton} ${classes.resultPagination}`}>
      <button onClick={() => props.onPageChange(props.page + 1)}>
        {"بعدی"}
      </button>
      <div className={classes.paginationNumbers}>
        <p>
          {props.pageCount}
          /
          {props.page}
        </p>
      </div>
      <button onClick={() => props.onPageChange(props.page - 1)}>
        {"قبلی"}
      </button>
    </div>
  )
}