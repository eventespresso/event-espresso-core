import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { useAddDefaultTaxes } from '../../hooks';

const AddDefaultTaxesButton: React.FC = () => {
	const addDefaultTaxes = useAddDefaultTaxes();

	return <Button onClick={addDefaultTaxes} buttonText={__('Add default taxes')} />;
};

export default AddDefaultTaxesButton;
