/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import PropTypes from 'prop-types'
import { IconButton } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';

/**
 * IconMenuItem
 * wrapper for WP IconButton that adds EE styles and defaults
 *
 * @param {number} index
 * @param {string} id
 * @param {string} htmlClass
 * @param {object|string} dashicon
 * @param {string} tooltip
 * @param {string} tooltipPosition
 * @param {Function} onClick
 * @param {Object} externalApp
 * @return {string} rendered IconMenuItem
 */
class IconMenuItem extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		htmlClass: PropTypes.string.isRequired,
		dashicon: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.string,
		] ).isRequired,
		tooltip: PropTypes.string.isRequired,
		tooltipPosition: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		externalApp: PropTypes.object,
	};

	render() {
		const {
			index,
			id,
			tooltip,
			dashicon,
			onClick,
			tooltipPosition = 'top left',
			externalApp = null,
			...otherProps
		} = this.props;
		let { htmlClass, itemCount = null } = this.props;
		delete otherProps.htmlClass;
		delete otherProps.itemCount;
		htmlClass = `ee-icon-menu-item-${ htmlClass }`;
		htmlClass += ` ee-icon-menu-item-${ index }`;
		htmlClass += ' ee-icon-menu-item clickable';
		if ( itemCount !== null ) {
			itemCount = parseInt( itemCount );
			const itemCountClass = itemCount > 0 ?
				'ee-icon-menu-item-count ee-tiny-shadow ee-has-items' :
				'ee-icon-menu-item-count ee-tiny-shadow ee-no-items';
			itemCount = (
				<div className={ itemCountClass }>
					{ itemCount > 0 ? itemCount : '?' }
				</div>
			);
		}

		return (
			<div className={ 'ee-icon-menu-item-wrapper' }>
				<IconButton
					id={ `ee-icon-menu-item-${ id }` }
					className={ htmlClass }
					onClick={ ( event ) => onClick( event ) }
					onKeyPress={ ( event ) => onClick( event ) }
					tooltip={ tooltip }
					labelPosition={ tooltipPosition }
					icon={ dashicon }
					{ ...otherProps }
				/>
				{ itemCount }
				{ externalApp }
			</div>
		);
	}
}

export default IconMenuItem;
