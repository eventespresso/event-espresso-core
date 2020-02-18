import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index.css';

import CustomDate from './CustomDate';

const DatePicker = generatePicker<Date>(CustomDate);

export default DatePicker;
