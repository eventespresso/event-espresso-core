import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import List from './List';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';

const DatesList: React.FC = (): JSX.Element => {
	const datetimes = useDatetimes();
	const noDatetimes = datetimes.length === 0;
	const { isError, isLoading } = useStatus();
	const error = isError(TypeName.datetimes);
	const loading = isLoading(TypeName.datetimes);

	if (loading) return <LoadingIndicator message={__('loading dates...', 'event_espresso')} />;

	if (error) return <ErrorIndicator />;

	if (noDatetimes) {
		return (
			<EmptyState
				description={__('try changing filter settings', 'event_espresso')}
				title={__('NO DATES FOR YOU !!!', 'event_espresso')}
			>
				<AddNewDateButton />
			</EmptyState>
		);
	}

	return <List datetimes={datetimes} />;
};

export default DatesList;
