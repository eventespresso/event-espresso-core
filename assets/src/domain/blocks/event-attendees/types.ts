import { BlockEditProps } from '@wordpress/blocks';

export interface EventAttendeesAttributes {
	event: string; // GUID
	datetime: string; // GUID
	ticket: string; // GUID
	status: string;
	limit: number;
	order: string;
	orderBy: string;
	showGravatar: boolean;
	avatarClass: string;
	avatarSize: number;
	displayOnArchives: boolean;
}

export type AttendeesEditProps = BlockEditProps<EventAttendeesAttributes>;
