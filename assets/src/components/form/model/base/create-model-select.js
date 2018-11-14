/**
 * External imports
 */
import { Component } from '@wordpress/element';

/**
 * Internal imports
 */
import ModelSelect from './model-select';
import { modelSelectName } from './utils';
import PropTypes from 'prop-types';

const defaultPropTypes = {
	selected: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	onSelect: PropTypes.func,
	label: PropTypes.string,
};

/**
 * Creates a Model Select component using the given arguments.
 *
 * @param {string} modelName
 * @param {Object} defaultProps
 * @param {Object} propTypes
 * @return {ModelSelectComponent} A model select component.
 */
const createModelSelect = ( modelName, defaultProps = {}, propTypes = {} ) => {
	class ModelSelectComponent extends Component {
		/**
		 * @type {string}
		 */
		static modelName = modelName;

		/**
		 * @type {Object}
		 */
		static defaultProps = defaultProps;

		/**
		 * @type {Object}
		 */
		static propTypes = {
			...defaultPropTypes,
			...propTypes,
		};

		render() {
			const { selected, onSelect } = this.props;
			let { queryData } = this.props;
			const selectOptions = {
				selectConfiguration: {
					defaultValue: selected,
					onChange: onSelect,
					...this.props.selectConfiguration,
				},
			};

			if ( defaultProps.queryData && queryData ) {
				queryData = {
					...defaultProps.queryData,
					...queryData,
				};
			}

			const props = {
				...this.props,
				...selectOptions,
				queryData,
				modelName: this.constructor.modelName,
			};
			return <ModelSelect { ...props } />;
		}
	}
	ModelSelectComponent.displayName = modelSelectName( modelName );
	return ModelSelectComponent;
};

export default createModelSelect;
