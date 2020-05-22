import React from 'react';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

const PriceIdInput: React.FC<PriceModifierProps> = ({ price }) => {
	return <PriceField component={'input'} disabled field='dbId' price={price} type={'text'} />;
};

export default PriceIdInput;
