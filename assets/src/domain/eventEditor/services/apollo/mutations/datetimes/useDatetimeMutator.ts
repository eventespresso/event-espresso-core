import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';
import { Datetime } from '../../types';
import { CreateDatetimeInput, UpdateDatetimeInput, DeleteDatetimeInput } from './types';

interface DatetimeMutator {
	createEntity: MutatorFnGn<CreateDatetimeInput>;
	updateEntity: MutatorFnGn<UpdateDatetimeInput>;
	deleteEntity: MutatorFnGn<DeleteDatetimeInput>;
}

const useDatetimeMutator = (id = ''): DatetimeMutator => {
	return useMutator<Datetime>(TypeName.Datetime, id) as DatetimeMutator;
};

export default useDatetimeMutator;
