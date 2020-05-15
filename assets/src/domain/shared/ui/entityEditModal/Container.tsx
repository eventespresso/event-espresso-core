import React from 'react';

import { ContainerProps } from './types';
import { Entity } from '@dataServices/types';
import EntityEditModal from './EntityEditModal';

const Container = <E extends Entity>({
	component: Component,
	entity,
	isOpen,
	onClose,
	title,
}: ContainerProps<E>): React.ReactElement => {
	return (
		isOpen && (
			<EntityEditModal isOpen={isOpen} onClose={onClose} title={title}>
				<Component entity={entity} onClose={onClose} />
			</EntityEditModal>
		)
	);
};

export default Container;
