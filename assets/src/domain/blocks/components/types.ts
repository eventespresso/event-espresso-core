import { SelectControl } from '@wordpress/components';

export type SelectControlProps = Partial<Omit<React.ComponentProps<typeof SelectControl>, 'multiple'>>;
