import { CreateDatetimeInput, UpdateDatetimeInput, DeleteDatetimeInput } from './types';
import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';

interface DatetimeMutator {
	createEntity: MutatorFnGn<CreateDatetimeInput>;
	updateEntity: MutatorFnGn<UpdateDatetimeInput>;
	deleteEntity: MutatorFnGn<DeleteDatetimeInput>;
}

const useDatetimeMutator = (id = ''): DatetimeMutator => {
	return useMutator(TypeName.Datetime, id) as DatetimeMutator;
};

export default useDatetimeMutator;
