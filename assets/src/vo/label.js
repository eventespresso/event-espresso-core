/**
 * External imports
 */
import { startCase, isString } from 'lodash';
import warning from 'warning';

/**
 * A value object for representing a label with singular and plural string
 * values.
 */
export default class Label {
	static FORMAT_LOWERCASE = 'lower';
	static FORMAT_UPPERCASE = 'upper';
	static FORMAT_SENTENCE_CASE = 'sentence';

	/**
	 * The string representing the singular form of the label.
	 * @type {string}
	 */
	singular = '';

	/**
	 * The string representing the plural form of the label.
	 * @type {string}
	 */
	plural = '';

	/**
	 * Constructor
	 * @param {string} singular
	 * @param {string} plural
	 */
	constructor( singular, plural ) {
		this.setSingular( singular ).setPlural( plural );
		Object.freeze( this );
	}

	/**
	 * Fluid setter for setting the singular property.
	 *
	 * If the singular property has already been set, this will return a new
	 * instance of Label
	 * @param {string} singular
	 * @return {Label}  An instance of Label
	 */
	setSingular( singular ) {
		Label.assertString( singular );
		if ( this.singular !== '' ) {
			return new Label( singular, this.plural );
		}
		this.singular = singular;
		return this;
	}

	/**
	 * Fluid setter for setting the plural property
	 *
	 * If the plural property has already been set, this will return a new
	 * instance of label.
	 *
	 * @param {string} plural
	 * @return {Label} An instance of Label
	 */
	setPlural( plural ) {
		Label.assertString( plural );
		if ( this.plural !== '' ) {
			return new Label( this.singular, plural );
		}
		this.plural = plural;
		return this;
	}

	/**
	 * Return the value for the property formatted in sentence case.
	 *
	 * Note, this strips any `-` in dashed labels.  So for instance if your
	 * label value was `something-else`, the value returned would be
	 * `Something Else`
	 *
	 * @param {boolean} singular  If true, return the formatted value of the
	 * singular property otherwise return the formatted value of the plural
	 * property.
	 * @return {string} The string in sentence case
	 */
	asSentenceCase( singular = true ) {
		return singular === true ?
			startCase( this.singular.toLowerCase() ) :
			startCase( this.plural.toLowerCase() );
	}

	/**
	 * Return the value for the property formatted in lower case.
	 *
	 * @param {boolean} singular  If true, return the formatted value of the
	 * singular property otherwise return the formatted value of the plural
	 * property.
	 * @return {string} The string in lower case
	 */
	asLowerCase( singular = true ) {
		return singular ?
			this.singular.toLowerCase() :
			this.plural.toLowerCase();
	}

	/**
	 * Return the value for the property formatted in upper case.
	 *
	 * @param {boolean} singular  If true, return the formatted value of the
	 * singular property otherwise return the formatted value of the plural
	 * property.
	 * @return {string} The string in upper case
	 */
	asUpperCase( singular = true ) {
		return singular ?
			this.singular.toUpperCase() :
			this.plural.toUpperCase();
	}

	/**
	 * Return the value for the property formatted according to the provided
	 * formatType.
	 *
	 * @param {boolean} singular If true, return the formatted value of the
	 * singular property otherwise return the formatted value of the plural
	 * property.
	 * @param {('sentence'|'lower'|'upper')} formatType
	 * @return {string} The string formatted according to formatType
	 */
	asFormatted( singular = true, formatType = Label.FORMAT_SENTENCE_CASE ) {
		switch ( formatType ) {
			case Label.FORMAT_SENTENCE_CASE:
				return this.asSentenceCase( singular );
			case Label.FORMAT_LOWERCASE:
				return this.asLowerCase( singular );
			case Label.FORMAT_UPPERCASE:
				return this.asUpperCase( singular );
			default:
				warning( false, 'Format type must be one of ' +
					'Label.FORMAT_SENTENCE_CASE, Label.FORMAT_UPPERCASE, ' +
					'or Label.FORMAT_LOWERCASE' );
				return this.asSentenceCase( singular );
		}
	}

	/**
	 * Asserts whether the provided value is a string or not.
	 *
	 * @param {*} value
	 * @throws TypeError
	 */
	static assertString( value ) {
		if ( ! isString( value ) ) {
			throw new TypeError( 'Incoming label value (' + value + ') must' +
				' be a string' );
		}
	}

	/**
	 * Creates an instance of Label that has the same value for singluar and
	 * plural properties for the provided argument.
	 *
	 * @param {string} label
	 * @return {Label}  A Label instance
	 */
	static fromSameSingleAndPlural = ( label ) => {
		return new Label( label, label );
	}
}
