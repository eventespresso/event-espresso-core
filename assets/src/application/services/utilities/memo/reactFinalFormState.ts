import { FormRenderProps } from 'react-final-form';

const reactFinalFormState = (prevProps: FormRenderProps, nextProps: FormRenderProps): boolean => {
	const prevValue = JSON.stringify(prevProps.form?.getState());
	const nextValue = JSON.stringify(nextProps.form?.getState());
	return prevValue === nextValue;
};

export default reactFinalFormState;
