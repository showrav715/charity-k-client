

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


const SelectDate = ({ style, setEndDate, values }) => {

  return (
    <div>
      <DatePicker  className={style} onChange={setEndDate} value={values} />
    </div>
  );
};

export default SelectDate;
