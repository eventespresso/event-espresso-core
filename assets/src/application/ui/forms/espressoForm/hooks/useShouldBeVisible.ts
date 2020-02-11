import { useMemo } from 'react';
import { useForm } from 'react-final-form';

import { evalFieldConditions } from '../utils';
import { FieldConditions } from '../types';

const useShouldBeVisible = (conditions: FieldConditions, fieldName: string): boolean => {
	const { getState } = useForm();
	const formValues = getState().values;
	return useMemo<boolean>(() => evalFieldConditions(conditions, formValues, fieldName), [conditions, formValues]);
};

export default useShouldBeVisible;
