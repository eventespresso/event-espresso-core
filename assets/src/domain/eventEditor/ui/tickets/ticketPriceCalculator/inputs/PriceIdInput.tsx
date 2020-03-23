import React from 'react';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

const PriceIdInput: React.FC<PriceModifierProps> = ({ price }) => {
	return <PriceField field='dbId' price={price} type={'text'} component={'input'} disabled />;
};

export default PriceIdInput;
