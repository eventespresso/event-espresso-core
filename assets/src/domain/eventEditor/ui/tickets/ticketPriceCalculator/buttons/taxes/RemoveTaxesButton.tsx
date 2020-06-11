import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { useRemoveAllTaxes } from '../../hooks';

const RemoveTaxesButton: React.FC = () => {
	const removeAllTaxes = useRemoveAllTaxes();

	return <Button onClick={removeAllTaxes} buttonText={__('Remove taxes')} />;
};

export default RemoveTaxesButton;
