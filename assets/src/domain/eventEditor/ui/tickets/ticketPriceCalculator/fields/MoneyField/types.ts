import { CurrencyProps } from '@application/valueObjects/config/types';

export interface MoneyFieldProps {
	after: string;
	before: string;
	currency: CurrencyProps;
	isPercent?: boolean;
}
