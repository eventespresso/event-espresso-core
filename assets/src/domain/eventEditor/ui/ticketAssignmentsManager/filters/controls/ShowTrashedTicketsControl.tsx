import React from 'react';
import { __ } from '@wordpress/i18n';

import { SwitchInput } from '@appInputs/SwitchInput';
import { FilterStateManager } from '../filterState';

type ShowTrashedTicketsControlProps = Pick<FilterStateManager, 'showTrashedTickets' | 'setShowTrashedTickets'>;

const ShowTrashedTicketsControl: React.FC<ShowTrashedTicketsControlProps> = React.memo(
	({ showTrashedTickets, setShowTrashedTickets }) => {
		return (
			<SwitchInput
				label={__('show trashed tickets')}
				checked={showTrashedTickets}
				onChange={setShowTrashedTickets}
			/>
		);
	}
);

export default ShowTrashedTicketsControl;
