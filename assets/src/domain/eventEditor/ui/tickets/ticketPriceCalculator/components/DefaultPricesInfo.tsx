import React from 'react';
import { any } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Box } from '@infraUI/display';
import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';

import { useDataState } from '../data';

const DefaultPricesInfo = () => {
	const { prices } = useDataState();
	const hasDefaultPrice = any(isDefault, prices);
	const link = (
		<a href='/wp-admin/admin.php?page=pricing' target='_blank'>
			{__('Modify default prices.')}
		</a>
	);

	return (
		hasDefaultPrice && (
			<Box textAlign='right'>
				{__('Note:')} {link}
			</Box>
		)
	);
};

export default DefaultPricesInfo;
