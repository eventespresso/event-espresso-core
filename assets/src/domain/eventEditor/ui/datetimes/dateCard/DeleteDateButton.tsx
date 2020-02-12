import * as React from 'react';

import { EspressoButton } from '@application/ui/input';
import { useEntityMutator, EntityType, MutationResult } from '../../../../../application/services/apollo/mutations';
import { ListItemProps } from '../../../interfaces/types';

const DeleteDateButton: React.FC<ListItemProps> = ({ id, ...rest }) => {
	const { deleteEntity } = useEntityMutator(EntityType.Datetime, id);

	return <EspressoButton icon='delete' onClick={(): MutationResult => deleteEntity()} {...rest} />;
};

export default DeleteDateButton;
