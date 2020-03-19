import React from 'react';
import classNames from 'classnames';
import { DescriptionListItemProps } from './types';
import './styles.scss';

const DescriptionListItem: React.FC<DescriptionListItemProps> = ({ description, term, ...props }) => {
	const className = classNames(props.className, 'ee-description-list-item');

	return (
		<div className={className}>
			<dt>{term}</dt>
			<dd>{description}</dd>
		</div>
	);
};

export default DescriptionListItem;
