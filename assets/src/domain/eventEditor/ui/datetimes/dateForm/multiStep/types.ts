import { Disclosure } from '@application/services/utilities/types';
import { EntityId } from '@dataServices/types';
import { Datetime } from '@edtrServices/apollo/types';
import { FormRenderProps } from 'react-final-form';

export interface ContainerProps extends Omit<Disclosure, 'onOpen'> {
	datetimeId?: EntityId;
}

export interface ContentProps {
	entity: Datetime;
	onClose: VoidFunction;
}

export interface ContentWrapperProps extends FormRenderProps {}
