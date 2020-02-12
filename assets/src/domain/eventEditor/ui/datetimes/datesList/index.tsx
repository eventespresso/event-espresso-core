import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import List from './List';
import useDatetimes from '../../../services/apollo/queries/datetimes/useDatetimes';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';

import { EmptyState, ErrorIndicator, LoadingIndicator } from '@appDisplay/index';

const DatesList: React.FC = () => {
	const datetimes = useDatetimes();
	const noDatetimes = datetimes.length === 0;
	const { isError, isLoading } = useStatus();
	const error = isError(TypeName.datetimes);
	const loading = isLoading(TypeName.datetimes);

	if (loading) return <LoadingIndicator message={__('loading dates...')} />;

	if (error) return <ErrorIndicator />;

	if (noDatetimes) {
		return (
			<EmptyState description={__('try changing filter settings')} title={__('NO DATES FOR YOU !!!')}>
				<AddNewDateButton />
			</EmptyState>
		);
	}

	return <List datetimes={datetimes} />;
};

export default DatesList;
