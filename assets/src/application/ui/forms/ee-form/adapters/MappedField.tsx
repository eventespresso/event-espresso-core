import React from 'react';
import { Text, TextArea, Select, Switch, MultiCheck, Number as NumberField } from './';
import { FieldRendererProps } from '../types';

const MappedField: React.FC<FieldRendererProps> = ({ fieldType, ...rest }) => {
	let Component: React.ReactType;
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
		default:
			Component = () => null;
			break;
	}
	return Component && <Component {...rest} />;
};

export default MappedField;
