import React from 'react';

import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Switch from './Switch';
import MultiCheck from './MultiCheck';
import Radio from './Radio';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Hidden from './Hidden';
import NumberField from './Number';
import { FieldRendererProps } from '../types';

const MappedField: React.FC<FieldRendererProps> = ({ fieldType, ...rest }) => {
	let Component: React.ComponentType<Omit<FieldRendererProps, 'fieldType'>>;
	switch (fieldType) {
		case 'text':
			Component = Text;
			break;
		case 'number':
			Component = NumberField;
			break;
		case 'textarea':
			Component = TextArea;
			break;
		case 'select':
			Component = Select;
			break;
		case 'switch':
			Component = Switch;
			break;
		case 'multicheck':
			Component = MultiCheck;
			break;
		case 'radio':
			Component = Radio;
			break;
		case 'datepicker':
			Component = DatePicker;
			break;
		case 'timepicker':
			Component = TimePicker;
			break;
		case 'hidden':
			Component = Hidden;
			break;
		default:
			Component = () => null;
			break;
	}
	return Component && <Component {...rest} />;
};

export default MappedField;
