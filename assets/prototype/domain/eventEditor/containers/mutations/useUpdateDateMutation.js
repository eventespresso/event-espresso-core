import { useMutation } from '@apollo/react-hooks';
import { UPDATE_DATE } from './dates';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useUpdateDateMutation = () => {
	const toaster = useToaster();
	const id = 0;
	const toasterMessage = `updating datetime ${id}`;
	const [updateDate, { loading, error }] = useMutation(UPDATE_DATE, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`datetime ${id} successfully updated`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		}
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	return { updateDate, loading, error };
};

export default useUpdateDateMutation;
