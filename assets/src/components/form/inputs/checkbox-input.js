/**
 * External imports
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { OptionCheckedState } from './base/option-checked-state';
import { OptionInputs } from './base/option-inputs';
import { OptionLabelSize } from './base/option-label-size';

/**
 * generates one or more html checkbox inputs
 *
 * @constructor
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} value
 * @param {Array} options
 * @param {Function} onChange
 * @param {boolean} btnGroup
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {string} inputWidth
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export class CheckboxInput extends Component {
	static propTypes = {
		htmlId: PropTypes.string.isRequired,
		htmlClass: PropTypes.string,
		value: PropTypes.oneOfType( [
			PropTypes.array,
			PropTypes.number,
			PropTypes.string,
		] ),
		options: PropTypes.array,
		onChange: PropTypes.func,
		btnGroup: PropTypes.bool,
		inputWidth: PropTypes.string,
		helpTextID: PropTypes.string,
		dataSet: PropTypes.object,
	};

	constructor( props ) {
		super( props );
		this.state = {
			checked: this.resetState(),
		};
	}

	/**
	 * @function
	 * @return {Object} state
	 */
	resetState = () => {
		return OptionCheckedState(
			this.props.htmlId,
			this.props.options,
			this.props.initialValue,
		);
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleChecked = ( event ) => {
		if ( event.target &&
			event.target.id &&
			event.target.checked !== undefined
		) {
			const checked = this.state.checked;
			checked[ event.target.id ] = event.target.checked;
			this.setState( { checked: checked } );
		}
	};

	render() {
		const {
			name,
			htmlId,
			options,
			required,
			helpTextID,
			btnGroup = true,
			inputWidth = '',
			...attributes
		} = this.props;
		let { htmlClass } = this.props;

		htmlClass = required ?
			`${ htmlClass } ee-checkbox-group-required` :
			htmlClass;
		const labelClass = btnGroup ?
			'btn btn-primary' :
			'ee-checkbox-label-after' + OptionLabelSize( options );
		let divClass = btnGroup ? 'btn-group' : 'ee-checkbox-group';
		divClass = inputWidth ?
			`${ divClass } ee-input-width-${ inputWidth }` :
			divClass;
		return (
			<div className={ divClass }>
				<OptionInputs
					type="checkbox"
					name={ name }
					checkedState={ this.state.checked }
					htmlId={ htmlId }
					htmlClass={ htmlClass }
					labelClass={ labelClass }
					options={ options }
					onClick={ this.toggleChecked }
					helpTextID={ helpTextID }
					{ ...attributes }
				/>
			</div>
		);
	}
}
