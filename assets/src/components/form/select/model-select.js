/**
 * External imports
 */
import Select from 'react-select';
import { Component, Fragment } from '@wordpress/element';
import { isEmpty } from 'lodash';
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
	};

	static defaultProps = {
		selectConfiguration: {
			...REACT_SELECT_DEFAULTS,
		},
		modelEntities: [],
		modelName: '',
		mapOptionsCallback: buildOptions,
		optionsEntityMap: null,
		queryData: {
			limit: 100,
			order: 'desc',
		},
	};

	getSelectConfiguration() {
		const {
			selectConfiguration,
			modelEntities,
			modelName,
			mapOptionsCallback,
			optionsEntityMap,
		} = this.props;
		if ( ! isEmpty( modelEntities ) ) {
			selectConfiguration.options = optionsEntityMap !== null ?
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
		return selectConfiguration;
	}

	render() {
		return (
			<Fragment>
				<Select { ...this.getSelectConfiguration() } />
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
	const { getQueryString, modelName } = ownProps;
	const queryString = getQueryString( ownProps.queryData );
	const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
	return {
		entities: getItems( modelName, queryString ),
		isLoading: isRequestingItems( modelName, queryString ),
	};
} )( ModelSelect );
