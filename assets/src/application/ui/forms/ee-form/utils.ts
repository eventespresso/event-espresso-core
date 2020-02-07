import { FieldMetaState } from 'react-final-form';

export const getValidateStatus = (meta: FieldMetaState<any>) => {
	if (meta.touched) {
		if (!(meta.error || meta.submitError)) {
			return 'success';
		}
		if (meta.submitError) {
			return 'error';
		}
		if (meta.error) {
			return 'error';
		}
	}
	return '';
};
