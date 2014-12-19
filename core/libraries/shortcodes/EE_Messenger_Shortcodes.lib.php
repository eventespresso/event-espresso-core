<?php
/**
 * This file contains the shortcode parser for messenger shortcodes.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage shortcodes library
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EE_Messenger_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Messenger_Shortcodes contains shortcode parsers for shortcodes that are messenger specific.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @since 4.5.0
 *
 * @package		Event Espresso
 * @subpackage	core/libraries/shortcodes/EE_Messenger_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messenger_Shortcodes extends EE_Shortcodes {


	/**
	 * Hold array of active messengers indexed by messenger name.
	 *
	 * @since 4.5.0
	 *
	 * @var EE_messenger[]
	 */
	protected $_active_messengers = array();




	protected function _init_props() {
		$this->label = __('Messenger Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes that are messenger specific.', 'event_espresso');

		//add messages about what happens  when the messenger is active.
		$this->_active_messengers = EE_Registry::instance()->load_lib('messages')->get_active_messengers();

		$this->_shortcodes['[DISPLAY_HTML_URL]'] =__('This will return a link to view the template in a browser if the html messenger is active.', 'event_espresso');
		$this->_shortcodes['[DISPLAY_PDF_URL]'] = __('This will return a link to generate a pdf for the template if the pdf messenger is active.', 'event_espresso' );
		$this->_shortcodes['[DISPLAY_PDF_BUTTON]'] = __('This will return html for a download pdf button trigger if the pdf messenger is active.', 'event_espresso');

		//show error message about buttons/urls not working as expected if messenger deactivated.
		if ( is_admin() && isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'update_message_template' ) {
			if ( ! isset( $this->_active_messengers['pdf'] ) ) {
				EE_Error::add_attention( __('Be aware that the pdf messenger is inactive.  This means that any pdf related shortcodes will parse to an empty string.', 'event_espresso' ) );
			}

			if ( !isset( $this->_active_messengers['html'] ) ) {
				EE_Error::add_attention( __('Be aware that the html messenger is inactive. This means that any html related shortcodes will parse to an empty string.', 'event_espresso' ) );
			}
		}

	}



	protected function _parser( $shortcode ) {
		//make sure we end up with a copy of the EE_Messages_Addressee object
		$recipient = $this->_data instanceof EE_Messages_Addressee ? $this->_data : NULL;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && is_array($this->_data) && isset( $this->_data['data'] ) && $this->_data['data'] instanceof EE_Messages_Addressee ? $this->_data['data'] : $recipient;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && !empty( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : $recipient;

		if ( ! $recipient instanceof EE_Messages_Addressee )
			return '';

		switch ( $shortcode ) {
			case '[DISPLAY_HTML_URL]' :
				return  isset( $this->_active_messengers['html'] ) ? $this->_get_url( $recipient, 'html' ) : '';
				break;
			case '[DISPLAY_PDF_URL]' :
				return  isset( $this->_active_messengers['pdf'] ) ? $this->_get_url( $recipient, 'pdf' ) : '';
				break;
			case '[DISPLAY_PDF_BUTTON]' :
				return  isset( $this->_active_messengers['pdf'] ) ? $this->_get_button( $recipient, 'pdf' ) : '';
				break;
		}
		return '';
	}



	/**
	 * This method takes the incomign data and figures out from it what the message type is and evt_id/grp_id and uses that to generate the html for a button in the template.
	 *
	 * @since 4.5.0
	 *
	 * @param EE_Messages_Addressee $recipient
	 * @param string                $type      'html' or 'pdf'
	 *
	 * @return string                Generated html
	 */
	private function _get_button( EE_Messages_Addressee $recipient, $type ) {
		$download_text = $type == 'pdf' ? __('Download PDF', 'event_espresso') : __('Show HTML', 'event_espresso' );
		$content = '
<form method="post" action="' . $this->_get_url( $recipient, $type ) . '" >
	<input class="print_button" type="submit" value="' . $download_text . '" />
</form>
		';
		return $content;
	}



	/**
	 * This method takes the incoming data and figures out from it what the message type is and
	 * evt_id/grp_id and uses that to generate the url for displaying the template in a browser.
	 *
	 * @since 4.5.0
	 *
	 * @return string The generated url for displaying the link.
	 */
	private function _get_url( EE_Messages_Addressee $recipient, $type ) {

		//get out early if the given messenger is not active!
		if ( ! isset( $this->_active_messengers[$type]) ) {
			return '';
		}

		$reg = $recipient->reg_obj;
		$reg = ! $reg instanceof EE_Registration ? $recipient->primary_reg_obj : $reg;

		//if no reg object then we really can't do anything at this point.
		if ( ! $reg instanceof EE_Registration ) {
			return '';
		}

		if ( $this->_message_type instanceof EE_message_type ) {
			return $this->_message_type->get_url_trigger( $this->_context, $type, $reg );
		}

		return '';
	}


} // end EE_Recipient_List_Shortcodes class
