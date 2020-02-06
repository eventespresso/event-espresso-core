import { TimezoneProps } from './types';

export const Timezone = ({ city, name, offset }: TimezoneProps): TimezoneProps => {
	return {
		city: city || 'UTC',
		name: name || 'UTC',
		offset: offset || 0,
	};
};
