/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { __ } from '@eventespresso/i18n';
import { Dashicon, Tooltip } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';

/**
 * DropDownMenu
 *
 * @constructor
 * @param {Object} date  data representing an EE_Datetime object
 * @return {string}    menu
 */

class DropDownMenu extends Component {
	constructor( props ) {
		console.log( '' );
		console.log( 'DropDownMenu', props );
		super( props );
		this.state = {
			menuOpen: props.menuOpen !== undefined ? props.menuOpen : false,
			displayOpenButton: props.displayOpenButton,
			onClickHandler: props.onClick ? props.onClick : this.toggleMenu,
		};
	}

	/**
	 * toggleMenu 	sets the menuOpen state property to the opposite of its previous value
	 *
	 * @function
	 * @param {Object} event
	 */
	toggleMenu = ( event ) => {
		console.log( 'DropDownMenu.toggleMenu()', event );
		event.preventDefault();
		this.setState(
			prevState => ( { menuOpen: ! prevState.menuOpen } )
		);
	};

	/**
	 * renderMenuItem 	creates a list item for the dropdown menu
	 *
	 * @function
	 * @param {Object} menuItem
	 * @param {number} index
	 * @return {string} menu item
	 */
	renderMenuItem = ( menuItem, index ) => {
		let selection = (
			<Fragment>
				{/*<Dashicon icon={ menuItem.dashicon } />*/}
				<span className={ `dashicons dashicons-${ menuItem.dashicon }` }></span>
				<span className="ee-dropdown-menu-item-text"> { menuItem.text }</span>
			</Fragment>
		);
		const tabIndex = menuItem.tabIndex ? menuItem.tabIndex : 999;
		const link = menuItem.link ? menuItem.link : '';
		if ( link ) {
			const title = menuItem.title ? menuItem.title : '';
			selection = (
				<a href={ link } title={ title } target="_blank" rel="noopener noreferrer" tabIndex={ tabIndex }>
					{ selection }
					{/*<Dashicon icon="external" />*/}
					<span className="dashicons dashicons-external"></span>
				</a>
			);
		}
		const clickHandler = menuItem.onClick ?
			menuItem.onClick :
			function() { console.log( ' no clickHandler set for "' + menuItem.text + '" DropDownMenu item' ); };
		const data = menuItem.onClickData ? menuItem.onClickData : {};
		selection = (
			<div
				id={ `ee-dropdown-menu-item-${ menuItem.id }` }
				className="ee-dropdown-menu-item clickable"
				onClick={ ( event ) => clickHandler( event, data ) }
				onKeyPress={ ( event ) => clickHandler( event, data ) }
				role="button"
				tabIndex={ tabIndex }
			>
				{ selection }
			</div>
		);
		const tooltip = menuItem.tooltip ? menuItem.tooltip : '';
		if ( tooltip ) {
			selection = (
				<Tooltip text={ tooltip } position={ 'top center' }>{ selection }</Tooltip>
			);
		}
		return (
			<li key={ index }>{ selection }</li>
		);
	};

	/**
	 * renderToggleMenuButton 	open or close button for the dropdown menu
	 *
	 * @function
	 * @param {string} title
	 * @param {string} openOrClose
	 * @param {string} dashicon
	 * @param {number} tabIndex
	 * @return {string} menu item
	 */
	renderToggleMenuButton = ( title, openOrClose = 'open', dashicon = 'menu', tabIndex = 0 ) => {
		title = openOrClose === 'open' ? title : __( 'close', 'event_espresso' );
		return (
			<Tooltip text={ title } position={ 'top center' }>
				<div
					className={ `ee-toggle-dropdown-menu-${ openOrClose } ee-toggle-dropdown-menu clickable` }
					onClick={ ( event ) => this.state.onClickHandler( event ) }
					onKeyPress={ ( event ) => this.state.onClickHandler( event ) }
					role="button"
					tabIndex={ tabIndex }
				>
					{/*<Dashicon icon={ dashicon }/>*/}
					<span className={ `dashicons dashicons-${ dashicon }` }></span>
				</div>
			</Tooltip>
		);
	};

	render() {
		// console.log( 'DropDownMenu.render()', this.props );
		const { menuID, menuItems, title } = this.props;
		const isMenuOpen = this.state.onClickHandler ? this.state.menuOpen : this.props.menuOpen;
		const menuOpenClass = isMenuOpen ? ' ee-toggle-dropdown-menu-visible' : '';
		const openButton = this.state.displayOpenButton ? this.renderToggleMenuButton( title, 'open', 'menu', 0 ) : null;
		return (
			<div id={ `ee-dropdown-menu-${ menuID }` } className="ee-dropdown-menu-outer-wrapper-div">
				<div className="ee-dropdown-menu-inner-wrapper-div">
					{ openButton }
					<div className={ 'ee-dropdown-menu-div' + menuOpenClass }>
						{ this.renderToggleMenuButton( title, 'close', 'no', 1 ) }
						<ul>{ menuItems.map( this.renderMenuItem, this ) }</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default DropDownMenu;
