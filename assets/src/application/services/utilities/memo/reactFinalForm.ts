import { FieldRenderProps, FormRenderProps } from 'react-final-form';

export const reactFinalFormState = (prevProps: FormRenderProps, nextProps: FormRenderProps): boolean => {
	const prevValue = JSON.stringify(prevProps.form?.getState());
	const nextValue = JSON.stringify(nextProps.form?.getState());
	return prevValue === nextValue;
};

export const reactFinalFormField = (prevProps: FieldRenderProps<any>, nextProps: FieldRenderProps<any>): boolean => {
	const prevInputValue = JSON.stringify(prevProps.input);
	const nextInputValue = JSON.stringify(nextProps.input);
	if (prevInputValue !== nextInputValue) {
		return false;
	}
	const prevMetaValue = JSON.stringify(prevProps.meta);
	const nextMetaValue = JSON.stringify(nextProps.meta);
	return prevMetaValue === nextMetaValue;
};
