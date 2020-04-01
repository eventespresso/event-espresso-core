import React, { CSSProperties } from 'react';

import AddPriceModifierButton from '../AddPriceModifierButtonData';
import DeletePriceModifierButton from '../DeletePriceModifierButton';
import { PriceModifierProps } from '../../types';
import './styles.scss';

// just temporary
const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};

const PriceModifierActions: React.FC<PriceModifierProps> = ({ index, price }) => {
	return (
		<div className='ee-price-modifier-actions' style={style}>
			<AddPriceModifierButton key={'add'} index={index} />
			{!price.isBasePrice && <DeletePriceModifierButton key={'delete'} price={price} />}
		</div>
	);
};

export default PriceModifierActions;
