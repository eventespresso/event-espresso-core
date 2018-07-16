/**
 * External imports
 */
import { MONEY_SETTINGS } from '@eventespresso/eejs';
import { settings, formatMoney } from 'accounting-js';
import { Component } from 'react';
import { isFunction, isArray } from 'lodash';
import isShallowEqualArrays from '@wordpress/is-shallow-equal';
import warning from 'warning';

//initialize settings
const options = { ...settings, ...MONEY_SETTINGS };

const validateNextState = ( nextStateResponse ) => {
	warning(
		nextStateResponse &&
		nextStateResponse.hasOwnProperty( 'convertedValues' ),
		'The propNameMap callback for the withMoney HOC should return an' +
		' object with a "convertedValues" key.'
	);
	if ( nextStateResponse &&
		nextStateResponse.hasOwnProperty( 'convertedValues' ) ) {
		warning(
			isArray( nextStateResponse.convertedValues ),
			'The propNameMap callback for the withMoney HOC should return an ' +
			'object with a "convertedValues" key that has an array' +
			' of values as value.'
		);
	}
	warning(
		nextStateResponse && nextStateResponse.hasOwnProperty( 'props' ),
		'The propNameMap callback for the withMoneyHOC should return an' +
		' object with a "props" key.'
	);
};

const validatePropNameMap = ( propNameMap ) => {
	warning(
		isFunction( propNameMap ) || isArray( propNameMap ),
		'The propNameMap argument provided to withMoney must be either a' +
		' function or an array'
	);
};

const withMoney = ( propNameMap = [] ) => ( WrappedComponent ) => {
	class EnhancedComponent extends Component {
		state = {
			convertedValues: [],
		};

		formatMoney = ( value ) => {
			return formatMoney( value, options );
		};

		getNextState = ( props ) => {
			let nextStateResponse,
				nextState = {};
			const convertedValues = [];
			if ( isFunction( propNameMap ) ) {
				nextStateResponse = propNameMap( props, this.formatMoney );
				validateNextState( nextStateResponse );
				if ( nextStateResponse && nextStateResponse.props ) {
					nextState = { ...nextStateResponse.props };
				}
				nextState.convertedValues = nextStateResponse.convertedValues ||
					convertedValues;
			} else {
				validatePropNameMap( propNameMap );
				if ( isArray( propNameMap ) ) {
					propNameMap.forEach( ( propName ) => {
						if ( props[ propName ] ) {
							nextState[ propName ] =
								formatMoney( props[ propName ] );
							convertedValues.push( nextState[ propName ] );
						}
					} );
				}
				nextState.convertedValues = convertedValues;
			}
			return nextState;
		};

		shouldUpdateStateWithConvertedValues = (
			prevProps,
			prevState,
			nextState
		) => {
			return ! isShallowEqualArrays(
				nextState.convertedValues,
				prevState.convertedValues
			) &&
				nextState.convertedValues[ 0 ] !==
				prevState.convertedValues[ 0 ];
		};

		componentDidMount() {
			this.setState( this.getNextState( this.props ) );
		}

		componentDidUpdate( prevProps, prevState ) {
			const nextState = this.getNextState( this.props );
			if ( this.shouldUpdateStateWithConvertedValues(
				prevProps,
				prevState,
				nextState
			) ) {
				this.setState( nextState );
			}
		}

		render() {
			return <WrappedComponent { ...this.props } { ...this.state } />;
		}
	}

	return EnhancedComponent;
};

export default withMoney;
