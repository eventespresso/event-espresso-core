/**
 * External imports
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { IconButton } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';

/**
 * IconMenuItem
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
		let { htmlClass } = this.props;
		delete otherProps.htmlClass;
		htmlClass = `ee-icon-menu-item-${ htmlClass }`;
		htmlClass += ` ee-icon-menu-item-${ index }`;
		htmlClass += ' ee-icon-menu-item clickable';
		return (
			<Fragment>
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
				{ externalApp }
			</Fragment>
		);
	}
}

export default IconMenuItem;
