import React, { CSSProperties } from 'react';

import AddPriceModifierButton from './AddPriceModifierButtonData';
import DeletePriceModifierButton from './DeletePriceModifierButton';
import { PriceModifierProps } from '../types';

// just temporary
const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};

const PriceModifierActions: React.FC<PriceModifierProps> = ({ index, price }) => {
	const actions = [];

	actions.push(<AddPriceModifierButton key={'add'} index={index} />);

	if (!price.isBasePrice) {
		actions.push(<DeletePriceModifierButton key={'delete'} price={price} />);
	}
	return (
		<div className='modifier-actions' style={style}>
			{actions}
		</div>
	);
};
export default PriceModifierActions;
