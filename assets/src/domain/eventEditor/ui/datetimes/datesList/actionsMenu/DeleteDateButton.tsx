import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EntityListItemProps } from '@appLayout/entityList';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { ConfirmDelete } from '@application/ui/input/confirm';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

const DeleteDateButton: React.FC<EntityListItemProps> = ({ id }) => {
	const { deleteEntity } = useDatetimeMutator(id);
	const tooltipProps = { placement: 'right' };

	return (
		<ConfirmDelete onConfirm={() => deleteEntity({ id })}>
			<EspressoButton icon={Icon.TRASH} tooltip={__('delete datetime')} tooltipProps={tooltipProps} />
		</ConfirmDelete>
	);
};

export default withIsLoaded<EntityListItemProps>(TypeName.tickets, ({ loaded, id }) => {
	/* Delete button should be hidden to avoid relational inconsistencies */
	return loaded && <DeleteDateButton id={id} />;
});
