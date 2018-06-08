/**
 * External imports
 */
import Select from 'react-select';
import { Component, Fragment } from '@wordpress/element';
import { isEmpty, uniqueId, find, isUndefined } from 'lodash';
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
 * @param { Object } selectConfiguration  An object containing options for the
 *                                          react-select component.
 * @param { Array } modelEntities          Array of model entities
 * @param { string } modelName              The name of the Model the entities
 *                                          belong to.
 * @param { function } mapOptionsCallback  This function will receive by
 *   default the modelEntities, the modelName (and any custom Map provided) and
 *   is expected to return an array of options to be used for the react-select
 *   component.
 * @param { Object } optionsEntityMap    If provided, it is expected to be a
 *   map of modelName fields to `label` and `value` keys used by
 *   `mapOptionsCallback`.
 */
export class ModelSelect extends Component {

	static propTypes = {
		selectConfiguration: PropTypes.shape( {
			...REACT_SELECT_TYPES,
		} ),
		modelEntities: PropTypes.array,
		modelName: PropTypes.oneOf( MODEL_NAMES ),
		mapOptionsCallback: PropTypes.func,
		optionsEntityMap: PropTypes.object,
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
		modelName: '',
		mapOptionsCallback: buildOptions,
		optionsEntityMap: null,
		queryData: {
			limit: 100,
			order: 'desc',
		},
		selectLabel: '',
	};

	static getDerivedStateFromProps( props ) {
		const { selectConfiguration } = props;
		const options = ModelSelect.getOptions( props );
		const updated = {
			options,
			value: ModelSelect.getOptionObjectForValue(
				selectConfiguration.defaultValue, options
			),
		};
		return {
			...REACT_SELECT_DEFAULTS,
			...selectConfiguration,
			...updated,
		};
	}

	static getOptions( props ) {
		const {
			modelEntities,
			modelName,
			optionsEntityMap,
			mapOptionsCallback,
		} = props;
		if ( ! isEmpty( modelEntities ) ) {
			return optionsEntityMap !== null ?
				mapOptionsCallback(
					modelEntities,
					modelName,
					optionsEntityMap,
				) :
				mapOptionsCallback(
					modelEntities,
					modelName,
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
		return {};
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
