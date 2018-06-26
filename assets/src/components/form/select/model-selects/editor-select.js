/**
 * Internal imports
 */
import * as modelSelect from '../model-select';

/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { BaseControl, withInstanceId } from '@wordpress/components';
import { PropTypes } from 'prop-types';

/**
 * ModelSelect Component wrapped in a BaseControl component.
 */
class EditorSelect extends Component {
	static propTypes = {
		modelName: PropTypes.string,
		selectLabel: PropTypes.string,
		instanceId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		className: PropTypes.string,
		help: PropTypes.string,
	};
	render() {
		const { modelName, selectLabel, instanceId, className, help, children } = this.props;
		const id = `inspector-${ modelName }-select-control-${ instanceId }`;
		if ( help ) {
			this.props[ 'aria-describedby' ] = id + '__help';
		}
		return (
			<BaseControl
				label={ selectLabel }
				id={ id }
				className={ className }
				help={ help }
			>
				{ children }
			</BaseControl>
		);
	}
}

export default withInstanceId( EditorSelect );

export const getEditorSelectProps = ( selectProps ) => {
	const editorProps = {
		modelName: selectProps.modelName,
		selectLabel: selectProps.selectLabel,
		className: selectProps.className,
		help: selectProps.help,
	};
	selectProps.selectLabel = modelSelect.MODEL_SELECT_LABEL_NONE;
	delete selectProps.help;
	return { editorProps, selectProps };
};
