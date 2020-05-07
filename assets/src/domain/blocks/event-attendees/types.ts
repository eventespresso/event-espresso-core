import { BlockEditProps } from '@wordpress/blocks';
import { RegistrationStatus } from '@dataServices/apollo/queries/registrations/types';
import { EntityId } from '@dataServices/types';
import { Order, AttendeesOrderByFields } from '@dataServices/apollo/queries';

export interface EventAttendeesAttributes {
	event: EntityId;
	datetime: EntityId;
	ticket: EntityId;
	status: RegistrationStatus;
	limit: number;
	order: Order;
	orderBy: AttendeesOrderByFields | 'FIRST_THEN_LAST_NAME' | 'LAST_THEN_FIRST_NAME';
	showGravatar: boolean;
	avatarClass: string;
	avatarSize: number;
	displayOnArchives: boolean;
}

export type AttendeesEditProps = BlockEditProps<EventAttendeesAttributes>;
