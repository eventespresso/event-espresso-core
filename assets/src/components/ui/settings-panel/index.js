/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { WithHoverText } from '../hover-text';

/**
 * Internal dependencies
 */
import './style.css';

const PANEL_OPEN_CLASS = 'ee-settings-panel-open';
const PANEL_CLOSED_CLASS = 'ee-settings-panel-closed';

class SettingsPanel extends Component {
	constructor( props ) {
		super( props );
		this.state = { panelOpen: props.panelOpen };
	}

	togglePanel = ( event ) => {
		event.preventDefault();
		this.setState( prevState => ( { panelOpen: ! prevState.panelOpen } ) );
	};

	render() {
		const { children, hoverText, openPanelDashicon = 'admin-generic', closePanelDashicon = 'no' } = this.props;
		let { htmlId, htmlClass } = this.props;
		htmlId = `${ htmlId }-settings-panel`;
		htmlClass = `${ htmlClass }-settings-panel`;
		const settingsPanelClass = this.state.panelOpen ?
			htmlClass + ' ' + PANEL_OPEN_CLASS :
			htmlClass + ' ' + PANEL_CLOSED_CLASS;
		return this.state.panelOpen ?
			(
				<div id={ htmlId } className={ settingsPanelClass }>
					<WithHoverText
						htmlId={ `${ htmlId }-toggle-close` }
						htmlClass={ `${ htmlClass }-toggle-close` }
						hoverText={ __( 'close ', 'event_espresso' ) + hoverText + __( ' settings', 'event_espresso' ) }
					>
						<div
							id={ `${ htmlId }-toggle-close` }
							className={ `${ htmlClass }-toggle-close ee-settings-panel-toggle-close` }
							onClick={ ( event ) => this.togglePanel( event ) }
							onKeyPress={ ( event ) => this.togglePanel( event ) }
							role={ 'button' }
							tabIndex={ '0' }
						>
							<span className={ `dashicons dashicons-${ closePanelDashicon }` }></span>
						</div>
					</WithHoverText>

					{ children }
				</div>
			) : (
				<WithHoverText
					htmlId={ `${ htmlId }-toggle-open` }
					htmlClass={ `${ htmlClass }-toggle-open` }
					hoverText={ __( 'display ', 'event_espresso' ) + hoverText + __( ' settings', 'event_espresso' ) }
				>
					<div
						id={ `${ htmlId }-toggle-open` }
						className={ `${ htmlClass }-toggle-open ee-settings-panel-toggle-open` }
						onClick={ ( event ) => this.togglePanel( event ) }
						onKeyPress={ ( event ) => this.togglePanel( event ) }
						role={ 'button' }
						tabIndex={ '0' }
					>
						<span className={ `dashicons dashicons-${ openPanelDashicon }` }></span>
					</div>
				</WithHoverText>
			);
	}
}

export default SettingsPanel;
