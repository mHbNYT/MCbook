import { useRef, useEffect } from 'react';
import { useStyles } from './styles';

interface Props {
  show: boolean;
  children: React.ReactElement;
  handleClose: () => void;
}
export const Modal: React.FC<Props> = ({ handleClose, show, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const classes = useStyles();
  return (
    <div className={`${show ? classes.show : classes.hide} ${classes.modal}`}>
      <section ref={ref} className={classes.modalMain}>
        <button
          type="button"
          onClick={handleClose}
          className={classes.closeButton}
        >
          X
        </button>
        {children}
      </section>
    </div>
  );
};
