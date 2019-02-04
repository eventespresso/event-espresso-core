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
 * generates one or more html radio inputs
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
export class RadioInput extends Component {
	static propTypes = {
		htmlId: PropTypes.string.isRequired,
		htmlClass: PropTypes.string,
		value: PropTypes.oneOfType( [
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
			checked: OptionCheckedState(
				props.htmlId,
				props.options,
				props.initialValue,
			),
		};
	}

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleChecked = ( event ) => {
		if ( event.target &&
			event.target.id &&
			event.target.checked !== undefined
		) {
			const checked = OptionCheckedState(
				this.props.htmlId,
				this.props.options,
				this.props.initialValue,
				false
			);
			checked[ event.target.id ] = event.target.checked;
			this.setState( { checked: checked } );
		}
	};

	render() {
		const {
			name,
			htmlId,
			htmlClass,
			options,
			helpTextID,
			btnGroup = true,
			inputWidth = '',
			...attributes
		} = this.props;

		const labelClass = btnGroup ?
			'btn btn-primary' :
			'ee-radio-label-after' + OptionLabelSize( options );
		let divClass = btnGroup ? 'btn-group' : 'ee-checkbox-group';
		divClass = inputWidth ?
			`${ divClass } ee-input-width-${ inputWidth }` :
			divClass;
		return (
			<div className={ divClass }>
				<OptionInputs
					type="radio"
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
