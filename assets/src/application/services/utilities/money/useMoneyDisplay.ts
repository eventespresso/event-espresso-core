import formatAmount, { FormatAmountFunction } from './formatAmount';
import useConfig from '@appServices/config/useConfig';
import { CurrencyProps } from '../../../valueObjects/config/types';

export type MoneyDisplay = {
	// the currency sign if the currency displays it before the amount (or '')
	afterAmount: string;
	// the currency sign if the currency displays it before the amount (or '')
	beforeAmount: string;
	// the full currency config object
	currency: CurrencyProps;
	// function for formatting the amount using the correct number of decimal places for the currency
	formatAmount: FormatAmountFunction;
};

const useMoneyDisplay = (): MoneyDisplay => {
	const config = useConfig();
	const afterAmount = config.currency.signB4 ? '' : config.currency.sign;
	const beforeAmount = config.currency.signB4 ? config.currency.sign : '';
	const formatMoney = formatAmount(config.currency.decimalPlaces);

	return {
		afterAmount,
		beforeAmount,
		currency: config.currency,
		formatAmount: formatMoney,
	};
};

export default useMoneyDisplay;
