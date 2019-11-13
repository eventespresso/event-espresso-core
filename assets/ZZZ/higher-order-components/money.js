/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { isFunction, isArray } from 'lodash';
import isShallowEqualArrays from '@wordpress/is-shallow-equal';
import warning from 'warning';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * This validates whether the nextStateResponse is in the expected shape.
 * If any of the validation fails, then a console.error is triggered (via
 * warning)
 *
 * @param {{}} nextStateResponse
 */
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
			' of numbers as the value.'
		);
	}
	warning(
		nextStateResponse && nextStateResponse.hasOwnProperty( 'props' ),
		'The propNameMap callback for the withMoneyHOC should return an' +
		' object with a "props" key.'
	);
};

/**
 * A higher order component that converts any props matching the map provided
 * as an argument to Money value objects and passes them to the WrappedComponent
 *
 * @param {Array|function} propNameMap
 * @return {function(*): EnhancedComponent}  Returns an enhanced component where
 * props that represent money values have been converted to a Money value object
 */
const withMoney = ( propNameMap = [] ) => ( WrappedComponent ) => {
	class EnhancedComponent extends Component {
		state = {
			convertedValues: [],
		};

		/**
		 * This provides the next state on any prop change.
		 *
		 * @param {{}} props
		 * @return {{}} An object representing the nextState for the component.
		 */
		getNextState = ( props ) => {
			let nextStateResponse,
				nextState = {},
				convertedValues = [];
			if ( isFunction( propNameMap ) ) {
				nextStateResponse = propNameMap( props, Money );
				validateNextState( nextStateResponse );
				if ( nextStateResponse && nextStateResponse.props ) {
					nextState = { ...nextStateResponse.props };
				}
				convertedValues = nextStateResponse.convertedValues ||
					convertedValues;
			} else if ( isArray( propNameMap ) ) {
				propNameMap.forEach( ( propName ) => {
					if ( props[ propName ] ) {
						nextState[ propName ] =
							new Money(
								props[ propName ],
								SiteCurrency
							);
						convertedValues.push(
							nextState[ propName ].toNumber()
						);
					}
				} );
			} else {
				warning(
					false,
					'The propNameMap argument provided to withMoney must be either a' +
					' function or an array'
				);
			}
			nextState.convertedValues = convertedValues;
			return nextState;
		};

		/**
		 * Calculates whether the state should be updated using the provided
		 * arguments.
		 *
		 * @param {{}} prevProps
		 * @param {{}} prevState
		 * @param {{}} nextState
		 * @return {boolean}  If a shallow compare of prevState.convertedValues
		 * and nextState.convertedValues is false, then this returns true to
		 * signal state should be updated.
		 */
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
