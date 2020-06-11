import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { useRemoveTaxes } from '../../hooks';

const RemoveTaxesButton: React.FC = () => {
	const removeTaxes = useRemoveTaxes();

	return <Button onClick={removeTaxes} buttonText={__('Remove taxes')} />;
};

export default RemoveTaxesButton;
