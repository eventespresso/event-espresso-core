/**
 * External imports
 */
import Select from 'react-select';
import { Component, Fragment } from '@wordpress/element';
import { isEmpty, uniqueId, find, isUndefined, isFunction, isMap } from 'lodash';
import PropTypes from 'prop-types';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * WP dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal imports
 */
import buildOptions from './build-options';
import { MODEL_NAMES } from '../../../../data/model/index';
import {
	REACT_SELECT_DEFAULTS,
	REACT_SELECT_TYPES,
} from './default-select-configuration';
import {
	ALLOWED_ORDER_VALUES,
	QUERY_ORDER_DESC,
} from '../../../../data/model/base';

/**
 * ModelSelect component.
 * This is a component that will generate a react-select input for a given
 * model and its entities (provided via props).
 *
 * @see https://deploy-preview-2289--react-select.netlify.com/props#prop-types
 *   for options that can be passed through via the selectConfiguration prop.
 *
 * @param { Object } selectConfiguration 	An object containing options for the
 *                                          react-select component.
 * @param { Array } modelEntities          	Array of model entities
 * @param { string } modelName              The name of the Model the entities
 *                                          belong to.
 * @param { function } mapOptionsCallback  	This function will receive by default
 * 											the modelEntities and optionsEntityMap,
 * 											and is expected to return an array of options
 * 											to be used for the react-select component.
 * @param { Object } optionsEntityMap    	Object of key value pairs where values are the
 *                                        	'label:value' pairings used by `mapOptionsCallback`
 * @param { string } mapSelection        	Determines which optionEntityMap pairing to use
 */
export class ModelSelect extends Component {
	state = {};

	static propTypes = {
		selectConfiguration: PropTypes.shape( {
			...REACT_SELECT_TYPES,
		} ),
		modelEntities: PropTypes.array,
		modelName: PropTypes.oneOf( MODEL_NAMES ).isRequired,
		mapOptionsCallback: PropTypes.func,
		optionsEntityMap: PropTypes.object,
		mapSelection: PropTypes.string,
		queryData: PropTypes.shape( {
			limit: PropTypes.number,
			orderBy: PropTypes.string,
			order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
		} ),
		getQueryString: PropTypes.func,
		label: PropTypes.string,
	};

	static defaultProps = {
		selectConfiguration: {
			...REACT_SELECT_DEFAULTS,
			name: uniqueId( 'model-select-' ),
		},
		modelEntities: [],
		mapOptionsCallback: buildOptions,
		mapSelection: 'default',
		queryData: {
			limit: 100,
			order: QUERY_ORDER_DESC,
		},
		label: '',
		getQueryString: () => '',
	};

	constructor( props ) {
		super( props );
		this.state = ModelSelect.setStateFromProps( props );
	}

	/**
	 * Sets the state from provided props
	 * @param {Object} props
	 * @return {{
	 * isClearable,
	 * isLoading,
	 * placeholder,
	 * options: (*|Array),
	 * value: *
	 * }}
	 * Object to replace state.
	 */
	static setStateFromProps( props ) {
		const { selectConfiguration } = props;
		const options = ModelSelect.getOptions( props );
		const selectedValue = ModelSelect.getOptionObjectForValue(
			selectConfiguration.defaultValue, options
		);
		const updated = {
			options,
			value: selectedValue,
		};

		return {
			...REACT_SELECT_DEFAULTS,
			...selectConfiguration,
			...updated,
		};
	}

	/**
	 * Sets up options for the select control from the incoming props.
	 * @param {Object} props
	 * @return {Array<Object>} Array of options for select control
	 */
	static getOptions( props ) {
		const {
			mapOptionsCallback,
			modelEntities,
			optionsEntityMap,
			mapSelection,
		} = props;
		if ( isFunction( mapOptionsCallback ) && ! isEmpty( modelEntities ) ) {
			return mapOptionsCallback(
				modelEntities,
				optionsEntityMap,
				mapSelection
			);
		}
		return [];
	}

	/**
	 * Given a value, returns the corresponding option object.
	 * @param {*} value
	 * @param {Array<Object>} options
	 * @return {Object|null} The option object for the given value or null.
	 */
	static getOptionObjectForValue( value, options ) {
		if ( ! isEmpty( options ) ) {
			const match = find( options, function( option ) {
				return option.value === value;
			} );
			return ! isUndefined( match ) ?
				match :
				null;
		}
		return null;
	}

	/**
	 * Helper method for determining whether state should be updated.
	 * Criteria is whether the keys from the incoming entities are equivalent
	 * (equivalency means in same order as well)
	 *
	 * @param {Object} prevProps
	 * @param {Object} nextProps
	 * @return {boolean} True means state should be updated.
	 */
	static shouldUpdateState( prevProps, nextProps ) {
		if ( prevProps === nextProps ) {
			return false;
		}

		const { selectConfiguration: prevConfiguration } = prevProps;
		const { selectConfiguration: nextConfiguration } = nextProps;

		// if defaultValue has changed (selected value) then update state
		if (
			prevConfiguration.defaultValue !== nextConfiguration.defaultValue
		) {
			return true;
		}

		if ( prevConfiguration.isLoading !== nextConfiguration.isLoading ) {
			return true;
		}

		// shallow compare of keys but only if we can
		if (
			! isMap( prevProps.modelEntities ) ||
			! isMap( nextProps.modelEntities )
		) {
			return true;
		}

		if (
			! isShallowEqual(
				Array.from( prevProps.modelEntities.keys() ),
				Array.from( nextProps.modelEntities.keys() )
			)
		) {
			return true;
		}
	}

	componentDidMount() {
		this.setState(
			ModelSelect.setStateFromProps( this.props )
		);
	}

	componentDidUpdate( prevProps ) {
		if ( ModelSelect.shouldUpdateState( prevProps, this.props ) ) {
			this.setState(
				ModelSelect.setStateFromProps( this.props )
			);
		}
	}

	/**
	 * Returns the label for the select control
	 *
	 * @return {string} The label to use.
	 */
	getSelectLabel() {
		const { label, selectConfiguration } = this.props;
		return label ?
			<label htmlFor={ selectConfiguration.name }>{ label }</label> :
			'';
	}

	render() {
		return (
			<Fragment>
				{ this.getSelectLabel() }
				<Select { ...this.state } />
			</Fragment>
		);
	}
}

/**
 * The ModelSelect Component wrapped in the `withSelect` higher order component.
 * This subscribes the ModelSelect component to the state maintained via the
 * eventespresso/lists store.
 */
export default withSelect( ( select, ownProps ) => {
	const { getQueryString, modelName, selectConfiguration } = ownProps;
	const queryString = getQueryString( ownProps.queryData );
	const { getEntities, isRequestingEntities } = select( 'eventespresso/lists' );
	return {
		...ModelSelect.defaultProps,
		...ownProps,
		modelEntities: getEntities( modelName, queryString ),
		selectConfiguration: {
			...ModelSelect.defaultProps.selectConfiguration,
			...selectConfiguration,
			isLoading: isRequestingEntities( modelName, queryString ),
		},
	};
} )( ModelSelect );
