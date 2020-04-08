import React from 'react';
import { __ } from '@wordpress/i18n';

import { SwitchInput } from '@appInputs/SwitchInput';
import { FilterStateManager } from '../filterState';

type ShowExpiredTicketsControlProps = Pick<FilterStateManager, 'showExpiredTickets' | 'setShowExpiredTickets'>;

const ShowExpiredTicketsControl: React.FC<ShowExpiredTicketsControlProps> = React.memo(
	({ showExpiredTickets, setShowExpiredTickets }) => {
		return (
			<SwitchInput
				label={__('show expired tickets')}
				isChecked={showExpiredTickets}
				onChangeValue={setShowExpiredTickets}
			/>
		);
	}
);

export default ShowExpiredTicketsControl;
