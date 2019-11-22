import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATE, GET_DATETIME, GET_DATETIMES } from '../queries/dates';

const useCreateDateMutation = ({ eventId }) => {
	const [createDate] = useMutation(CREATE_DATE);
	return createDate;
};

export default useCreateDateMutation;
