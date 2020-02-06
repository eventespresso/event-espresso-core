import React, { useMemo } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type voidFn = () => void;

interface PerPageControlProps {
	listId: string;
	perPage: number;
	setPerPage: voidFn;
}

const PerPageControl: React.FC<PerPageControlProps> = ({ listId, perPage, setPerPage }) =>
	useMemo(
		() => (
			<SelectControl
				id={`ee-perPage-select-${listId}`}
				label={__('per page')}
				className='ee-entity-list-filter-bar-perPage-select'
				value={perPage}
				options={[
					{ value: 2, label: 2 },
					{ value: 6, label: 6 },
					{ value: 12, label: 12 },
					{ value: 24, label: 24 },
					{ value: 48, label: 48 },
				]}
				onChange={setPerPage}
			/>
		),
		[listId, perPage, setPerPage]
	);

export default PerPageControl;
