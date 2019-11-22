import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATE } from './dates';

const useCreateDateMutation = () => {
	const [createDate] = useMutation(CREATE_DATE);
	return createDate;
};

export default useCreateDateMutation;
