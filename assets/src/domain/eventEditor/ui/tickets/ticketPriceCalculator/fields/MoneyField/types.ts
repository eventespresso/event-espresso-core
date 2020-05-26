import { CurrencyProps } from '@application/valueObjects/config/types';

export interface MoneyFieldProps {
	after: string;
	before: string;
	children: React.ReactNode;
	currency?: CurrencyProps;
	isPercent?: boolean;
}
