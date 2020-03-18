import React from 'react';

import { DescriptionListProps } from './types';
import './styles.scss';

const DescriptionList: React.FC<DescriptionListProps> = ({ dataSource }) => {
	return (
		<dl className='ee-description-list-grid'>
			{dataSource.map(({ description, term }) => {
				return (
					<div>
						<dt>{term}</dt>
						<dd>{description}</dd>
					</div>
				);
			})}
		</dl>
	);
};

export default DescriptionList;
