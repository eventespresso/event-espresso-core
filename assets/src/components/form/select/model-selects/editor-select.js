/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { BaseControl, withInstanceId } from '@wordpress/components';
import { isFunction } from 'lodash';

/**
 * ModelSelect Component wrapped in a BaseControl component.
 */
class EditorSelect extends Component {
	render() {
		const { children, selectLabel, checked, help, instanceId } = this.props;
		const id = `inspector-status-select-control-${ instanceId }`;
		let helpLabel;
		this.props.selectLabel = null;

		if ( help ) {
			this.props[ 'aria-describedby' ] = id + '__help';
			helpLabel = isFunction( help ) ? help( checked ) : help;
		}

		return (
			<BaseControl
				label={ selectLabel }
				id={ id }
				help={ helpLabel }
				className="components-select-control"
			>
				{ children }
			</BaseControl>
		);
	}
}

export default withInstanceId( EditorSelect );

export function getProps() {
	const selectProps = arguments;
	const editorProps = {
		selectLabel: selectProps.selectLabel,
		checked: selectProps.checked,
		help: selectProps.help,
	};
	delete selectProps.selectLabel;
	delete selectProps.checked;
	delete selectProps.help;
	return { selectProps, editorProps };
}
