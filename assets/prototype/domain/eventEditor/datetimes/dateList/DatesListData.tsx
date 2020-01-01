/**
 * Internal dependencies
 */
import AddNewDateButton from './AddNewDateButton';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import DatesList from './DateList';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';

const DatesListData = () => {
	const datetimes = useDatetimes();
	const { isLoading, isError } = useStatus();

	const loading = isLoading(TypeName.datetimes);
	if (loading) return <LoadingIndicator message='loading dates...' />;

	const error = isError(TypeName.datetimes);
	if (error) return <ErrorIndicator error={error} />;

	if (!datetimes.length) {
		return (
			<EmptyState description={'try changing filter settings'} title={'NO DATES FOR YOU !!!'}>
				<AddNewDateButton />
			</EmptyState>
		);
	}

	return <DatesList datetimes={datetimes} />;
};

export default DatesListData;
