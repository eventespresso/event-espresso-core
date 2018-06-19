/**
 * Internal imports
 */
import * as modelSelect from '../model-select';

/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { BaseControl, withInstanceId } from '@wordpress/components';

/**
 * ModelSelect Component wrapped in a BaseControl component.
 */
class EditorSelect extends Component {
	render() {
		const { selectLabel, instanceId, className, help, children } = this.props;
		const id = `inspector-status-select-control-${ instanceId }`;
		this.props.selectLabel = null;
		if ( help ) {
			this.props[ 'aria-describedby' ] = id + '__help';
		}
		return (
			<BaseControl
				label={ selectLabel }
				id={ id }
				help={ help }
				className={ className }
			>
				{ children }
			</BaseControl>
		);
	}
}

export default withInstanceId( EditorSelect );

export function getEditorSelectProps() {
	const args = arguments[ 0 ];
	const editorProps = {
		selectLabel: args.selectLabel,
		className: args.className,
		help: args.help,
	};
	args.selectLabel = modelSelect.MODEL_SELECT_LABEL_NONE;
	delete args.help;
	return { editorProps, ...args };
}
