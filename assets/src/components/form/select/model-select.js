/**
 * External imports
 */
import Select from 'react-select';
import { Component, Fragment } from '@wordpress/element';
import { isEmpty, uniqueId, find, isUndefined, isFunction } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WP dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal imports
 */
import buildOptions from './build-options';
import { MODEL_NAMES } from '../../../data/model';
import {
	REACT_SELECT_DEFAULTS,
	REACT_SELECT_TYPES,
} from './default-select-configuration';

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
			order: PropTypes.oneOf( [ 'asc', 'desc' ] ),
		} ),
		getQueryString: PropTypes.func,
		selectLabel: PropTypes.string,
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
			order: 'desc',
		},
		selectLabel: '',
		getQueryString: () => '',
	};

	static getDerivedStateFromProps( props ) {
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

	getSelectLabel() {
		const { selectLabel, selectConfiguration } = this.props;
		return selectLabel ?
			<label htmlFor={ selectConfiguration.name }>{ selectLabel }</label> :
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
	const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
	return {
		...ModelSelect.defaultProps,
		...ownProps,
		modelEntities: getItems( modelName, queryString ),
		selectConfiguration: {
			...ModelSelect.defaultProps.selectConfiguration,
			...selectConfiguration,
			isLoading: isRequestingItems( modelName, queryString ),
		},
	};
} )( ModelSelect );
