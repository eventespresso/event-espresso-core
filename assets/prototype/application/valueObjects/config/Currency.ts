export type CurrencyProps = {
    code: string;
    singularLabel: string;
    pluralLabel: string;
    sign: string;
    signB4: boolean;
    decimalPlaces: number;
    decimalMark: string;
    thousandsSeparator: string;
    subunits?: number;
}

export const Currency = (config: CurrencyProps): CurrencyProps => {
    return {
        code:               config.code || 'USD',
        singularLabel:      config.singularLabel || 'Dollar',
        pluralLabel:        config.pluralLabel || 'Dollars',
        sign:               config.sign || '$',
        signB4:             config.signB4,
        decimalPlaces:      config.decimalPlaces >= 0 ? config.decimalPlaces : 2,
        decimalMark:        config.decimalMark || '.',
        thousandsSeparator: config.thousandsSeparator || ',',
        subunits:           config.subunits >= 0 ?
            config.subunits :
            Math.pow(10, config.decimalPlaces),
    }
};
