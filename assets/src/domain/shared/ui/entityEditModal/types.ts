import { Entity } from '@dataServices/types';
import { Disclosure } from '@application/services/utilities/types';

export interface BaseProps<E extends Entity> {
	entity: E;
}

export interface EntityEditModalProps extends Omit<Disclosure, 'onOpen'> {
	isOpen: boolean;
	onClose: VoidFunction;
	title?: string;
}

export interface ContainerProps<E extends Entity> extends BaseProps<E>, EntityEditModalProps {
	component: React.ComponentType<BaseProps<E> & Pick<Disclosure, 'onClose'>>;
}
