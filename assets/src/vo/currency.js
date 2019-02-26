/**
 * External imports
 */
import {
	isEmpty,
	isString,
	isNumber,
	isBoolean,
	isUndefined,
} from 'lodash';
import { Exception, CURRENCY_CONFIG } from '@eventespresso/eejs';
import warning from 'warning';

/**
 * A value object representing currency values
 */
export class Currency {
	/**
	 * The ISO 4217 code identifying the currency (eg. 'USD')
	 * @type {string}
	 */
	code = '';

	/**
	 * The singular label for the currency (eg. 'Dollar');
	 * @type {string}
	 */
	singularLabel = '';

	/**
	 * The plural label for the currency (eg. 'Dollars');
	 * @type {string}
	 */
	pluralLabel = '';

	/**
	 * The currency symbol (eg. '$');
	 * @type {string}
	 */
	sign = '';

	/**
	 * Whether the currency symbol is displayed before or after the value.
	 * @type {boolean}
	 */
	signB4 = true;

	/**
	 * The precision for the value (eg. 10.02 is 2, 10.123 is 3). The number of
	 * decimal places can be used to calculate the number of subunits for the
	 * currency - subunits = pow( 10, decimalPlaces).
	 * @type {number}
	 */
	decimalPlaces = 2;

	/**
	 * The symbol used for the decimal mark (eg. '.')
	 * @type {string}
	 */
	decimalMark = '.';

	/**
	 * The symbol used to split up thousands in the value (eg. ',')
	 * @type {string}
	 */
	thousandsSeparator = ',';

	/**
	 * The number of fractional divisions of a currency's main unit.  If not
	 * provided, then it is automatically calculated from the decimalPlaces
	 * value.
	 * @type {number}
	 */
	subunits = 100;

	/**
	 * Constructor
	 * @param {{}} currencyConfig An object containing the configuration for
	 * this currency value object.  On construction, the Currency object is
	 * frozen so that it becomes immutable.
	 */
	constructor( currencyConfig ) {
		Currency.validateCurrencyConfig( currencyConfig );
		this.code = currencyConfig.code;
		this.singularLabel = currencyConfig.singularLabel || '';
		this.pluralLabel = currencyConfig.pluralLabel || '';
		this.sign = currencyConfig.sign;
		this.signB4 = isUndefined( currencyConfig.signB4) ?
			this.signBr :
			currencyConfig.signB4;
		this.decimalPlaces = isUndefined( currencyConfig.decimalPlaces ) ?
			this.decimalPlaces :
			currencyConfig.decimalPlaces;
		this.decimalMark = currencyConfig.decimalMark || this.decimalMark;
		this.thousandsSeparator = currencyConfig.thousandsSeparator || this.thousandsSeparator;
		this.subunits = currencyConfig.subunits ||
			Math.pow( 10, this.decimalPlaces );
		Object.freeze( this );
	}

	/**
	 * Returns the currency properties as an object formatted for the
	 * accounting-js library configuration.
	 * @return {{}}  An object shaped for what the accounting-js library expects
	 */
	toAccountingSettings() {
		const decimalInfo = {
			decimal: this.decimalMark,
			thousand: this.thousandsSeparator,
			precision: this.decimalPlaces,
		};
		return {
			currency: {
				symbol: this.sign,
				format: {
					pos: this.signB4 ? '%s%v' : '%v%s',
					neg: this.signB4 ? '- $s%v' : '- %v%s',
					zero: this.signB4 ? '%s--' : '--%s',
				},
				...decimalInfo,
			},
			number: decimalInfo,
		};
	}

	/**
	 * Returns JSON representation of this object.
	 * @return {Object} Function returning the object to be serialized by
	 * JSON.stringify
	 */
	toJSON() {
		return {
			code: this.code,
			singularLabel: this.singularLabel,
			pluralLabel: this.pluralLabel,
			sign: this.sign,
			signB4: this.signB4,
			decimalMark: this.decimalMark,
			thousandsSeparator: this.thousandsSeparator,
			subunits: this.subunits,
			decimalPlaces: this.decimalPlaces,
		};
	}

	/**
	 * This validates whether the passed in config has the required properties
	 * (and correct types) for constructing a Currency object.
	 *
	 * @param {{}} config
	 * @throws {Exception}
	 * @throws {TypeError}
	 */
	static validateCurrencyConfig = ( config ) => {
		if ( isEmpty( config ) ) {
			throw new Exception(
				'The configuration object provided to Currency must not' +
				' be empty'
			);
		}
		if ( ! config.code || ! isString( config.code ) ) {
			throw new TypeError(
				'The configuration object provided to Currency must have ' +
				'a "code" property that is a string.'
			);
		}

		if ( ! config.sign || ! isString( config.sign ) ) {
			throw new TypeError(
				'The configuration object provided to Currency must have a ' +
				'"sign" property that is a string.'
			);
		}

		if ( config.singularLabel && ! isString( config.singularLabel ) ) {
			throw new TypeError(
				'The singularLabel property on the configuration object ' +
				'must be a string primitive.'
			);
		}

		if ( config.pluralLabel && ! isString( config.pluralLabel ) ) {
			throw new TypeError(
				'The pluralLabel property on the configuration object ' +
				'must be a string primitive.'
			);
		}

		if ( config.signB4 && ! isBoolean( config.signB4 ) ) {
			throw new TypeError(
				'The signB4 property on the configuration object ' +
				'must be a boolean primitive.'
			);
		}

		if ( config.decimalPlaces && ! isNumber( config.decimalPlaces ) ) {
			throw new TypeError(
				'The decimalPlaces property on the configuration object ' +
				'must be a number primitive'
			);
		}

		if ( config.decimalMark && ! isString( config.decimalMark ) ) {
			throw new TypeError(
				'The decimalMark property on the configuration object ' +
				'must be a string primitive.'
			);
		}

		if ( config.thousandsSeparator &&
			! isString( config.thousandsSeparator ) ) {
			throw new TypeError(
				'The thousandsSeparator property on the configuration object ' +
				'must be a string primitive.'
			);
		}

		if ( config.subunits && ! isNumber( config.subunits ) ) {
			throw new TypeError(
				'The subunits property on the configuration object ' +
				'must be a number primitive.'
			);
		}
	}
}

/**
 * Export of a Currency Value object created from a currency config provided.
 * This catches any exception and triggers a console error.
 *
 * @param {{}} config
 * @return {Currency|{}} If there's a problem constructing the currency object
 * an empty object is returned.
 */
export const SiteCurrency = ( config = {} ) => {
	let currency;
	try {
		currency = new Currency( config );
	} catch ( e ) {
		currency = {};
		warning(
			false,
			'The Site Currency object could not be created because ' +
			'of this error: ' + e.message
		);
	}
	return currency;
};

export default SiteCurrency( CURRENCY_CONFIG );
