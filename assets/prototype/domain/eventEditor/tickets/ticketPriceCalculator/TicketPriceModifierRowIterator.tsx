import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import TicketPriceModifierRow from './TicketPriceModifierRow';
import { FieldArrayProps, WithRevCalc } from './types';

const TicketPriceModifierRowIterator: React.FC<WithRevCalc> = ({ reverseCalculate }): JSX.Element => (
	<FieldArray name={'prices'}>
		{(props: FieldArrayProps): JSX.Element[] => {
			const { fields } = props;
			return fields.map(
				(name: string, index: number): JSX.Element => {
					const price = fields.value[index];
					return price ? (
						<TicketPriceModifierRow
							key={`${price.id}:${index}`}
							index={index}
							name={name}
							fields={fields}
							price={price}
							reverseCalculate={reverseCalculate}
						/>
					) : null;
				}
			);
		}}
	</FieldArray>
);

export default TicketPriceModifierRowIterator;
