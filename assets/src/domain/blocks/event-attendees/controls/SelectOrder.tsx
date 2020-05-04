import React from 'react';

import { AttendeesEditProps } from '../types';
import SortOrderControl from '../../components/SortOrderControl';

const SelectOrder: React.FC<AttendeesEditProps> = ({ attributes, setAttributes }) => {
	const { order } = attributes;

	return <SortOrderControl order={order} setOrder={(order): void => setAttributes({ order })} />;
};

export default SelectOrder;
