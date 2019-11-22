import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATE, GET_DATETIME, GET_DATETIMES } from '../queries/dates';

const useCreateDateMutation = ({ eventId }) => {
	const [createDate] = useMutation(CREATE_DATE, {
		update(cache, { data: { createDate } }) {
			try {
				console.log('%c useCreateDateMutation update()', 'color: #1BE7FF;');
				console.log('%c > createDate: ', 'color: #BCBDAC;', createDate);
				const { datetimes } = cache.readQuery({
					query: GET_DATETIMES,
					variables: {
						where: {
							eventId
						}
					}
				});
				console.log('%c > datetimes: ', 'color: #BCBDAC;', datetimes);
				cache.writeQuery({
					query: GET_DATETIMES,
					variables: {
						where: {
							eventId
						}
					},
					data: { datetimes: datetimes.concat([createDate]) }
				});
				const { datetime } = cache.readQuery({
					query: GET_DATETIME,
					variables: {
						id: 'xyz'
					}
				});
				console.log('%c > datetime: ', 'color: #BCBDAC;', datetime);
				cache.writeQuery({
					query: GET_DATETIME,
					variables: {
						id: 'xyz'
					},
					data: { datetime }
				});
			} catch (error) {
				console.error(error);
			}
		}
	});
	return createDate;
};

export default useCreateDateMutation;
