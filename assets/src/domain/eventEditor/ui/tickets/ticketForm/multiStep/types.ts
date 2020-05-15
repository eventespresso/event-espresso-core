import { Disclosure } from '@application/services/utilities/types';
import { EntityId } from '@dataServices/types';
import { Ticket } from '@blocksServices/apollo/types';
import { FormRenderProps } from 'react-final-form';

export interface ContainerProps extends Omit<Disclosure, 'onOpen'> {
	ticketId?: EntityId;
}

export interface ContentProps {
	entity: Ticket;
	onClose: VoidFunction;
}

export interface ContentWrapperProps extends FormRenderProps {}
