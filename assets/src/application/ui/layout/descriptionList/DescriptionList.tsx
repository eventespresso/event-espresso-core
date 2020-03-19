import React from 'react';

import { DescriptionListProps } from './types';
import DescriptionListItem from './DescriptionListItem';
import './styles.scss';

const DescriptionList: React.FC<DescriptionListProps> = ({ dataSource }) => {
	return (
		<dl className='ee-description-list-grid'>
			{dataSource.map((props, i) => (
				<DescriptionListItem key={i} {...props} />
			))}
		</dl>
	);
};

export default DescriptionList;
