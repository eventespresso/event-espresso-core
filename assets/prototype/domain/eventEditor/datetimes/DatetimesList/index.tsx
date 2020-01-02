/**
 * External dependencies
 */
import * as React from 'react';

/**
 * Internal dependencies
 */
import AddNewDatetimeButton from './AddNewDatetimeButton';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import List from './List';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';

const DatetimesList = () => {
	const datetimes = useDatetimes();
	const noDatetimes = datetimes.length === 0;
	const { isError, isLoading } = useStatus();
	const error = isError(TypeName.datetimes);
	const loading = isLoading(TypeName.datetimes);

	if (loading) return <LoadingIndicator message='loading dates...' />;

	if (error) return <ErrorIndicator />;

	if (noDatetimes) {
		return (
			<EmptyState description='try changing filter settings' title='NO DATES FOR YOU !!!'>
				<AddNewDatetimeButton />
			</EmptyState>
		);
	}

	return <List datetimes={datetimes} />;
};

export default DatetimesList;
