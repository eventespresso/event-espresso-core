import React from 'react';

import { DescriptionListProps } from './types';
import './styles.scss';

const DescriptionList: React.FC<DescriptionListProps> = ({ dataSource }) => {
	return <dl className='ee-description-list-grid'>{dataSource}</dl>;
};

export default DescriptionList;
