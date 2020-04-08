import generatePicker from 'antd/lib/date-picker/generatePicker';
import 'antd/lib/date-picker/style/index.css';

import CustomDate from './CustomDate';

const DatePickerBase = generatePicker<Date>(CustomDate);

export default DatePickerBase;
