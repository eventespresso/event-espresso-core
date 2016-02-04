<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Event_Author_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Event_Author_Shortcodes lists all shortcodes related to event author specific information.  It's important to note that if used in 'TO', 'FROM', 'SUBJECT', or 'main_content' fields, it parses to the event_admin recipient. If used in the [EVENT_LIST] field, then it parses as the author for each event in the list.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Event_Author_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Author_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Event Author Details Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to event_author data', 'event_espresso');
		$this->_shortcodes = array(
			'[EVENT_AUTHOR_FNAME]' => __('Parses to the first name of the event author.', 'event_espresso'),
			'[EVENT_AUTHOR_LNAME]' => __('Parses to the last name of the event author.', 'event_espresso'),
			'[EVENT_AUTHOR_FORMATTED_EMAIL]' => __('Parses to a formatted email address of the event author (fname lname &lt;email@address.com&gt;).  <strong>NOTE:</strong> If the event author has not filled out their WordPress user profile then the organization name will be used as the "From" name.', 'event_espresso'),
			'[EVENT_AUTHOR_EMAIL]' => __('Parses to the unformatted email address of the event author', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		//make sure we end up with a copy of the EE_Messages_Addressee object
		$recipient = $this->_data instanceof EE_Messages_Addressee ? $this->_data : NULL;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && is_array($this->_data) && isset( $this->_data['data'] ) && $this->_data['data'] instanceof EE_Messages_Addressee ? $this->_data['data'] : $recipient;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && !empty( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : $recipient;

		//now it's possible that $recipient is not an instance of EE_Messages_Addressee in which case we need to see if $this->_data is an instance of $event.
		$event = $this->_data instanceof EE_Event ? $this->_data : NULL;

		if ( ! $recipient instanceof EE_Messages_Addressee && ! $event instanceof EE_Event )
			return '';

		switch ( $shortcode ) {
			case '[EVENT_AUTHOR_FNAME]' :
				$fname =  !empty( $recipient ) ? $recipient->fname : NULL;
				if ( empty( $fname ) && !empty( $event ) ) {
					$user = $this->_get_author_for_event( $event );
					$fname = $user->first_name;
				}
				return $fname;
				break;

			case '[EVENT_AUTHOR_LNAME]' :
				$lname =  !empty( $recipient ) ? $recipient->lname : NULL;
				if ( empty( $lname ) && !empty( $event ) ) {
					$user = $this->_get_author_for_event( $event );
					$lname = $user->last_name;
				}
				return $lname;
				break;

			case '[EVENT_AUTHOR_FORMATTED_EMAIL]' :
				if ( !empty( $recipient ) ) {
					$email =  !empty( $recipient->fname ) ? $recipient->fname . ' ' . $recipient->lname . '<' . $recipient->admin_email . '>' : EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) . '<' . $recipient->admin_email . '>';
				} else {
					$email = NULL;
				}
				if ( empty( $email ) && ! empty( $event ) ) {
					$user = $this->_get_author_for_event( $event );
					$email = ! empty( $user->first_name ) ? $user->first_name . ' ' . $user->last_name . '<' . $user->user_email . '>' : EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) . '<' . $user->user_email . '>';
				}
				return $email;
				break;

			case '[EVENT_AUTHOR_EMAIL]' :
				$email = ! empty( $recipient ) ? $recipient->admin_email : NULL;
				if ( empty( $email ) && !empty( $event ) ) {
					$user = $this->_get_author_for_event( $event );
					$email = $user->user_email;
				}
				return $email;
				break;

			default :
				return '';
				break;
		}
	}



	/**
	 * Helper method to return the user object for the author of the given EE_Event
	 *
	 * @param EE_Event $event
	 *
	 * @return WP_User
	 */
	private function _get_author_for_event( EE_Event $event ) {
		$author_id = $event->wp_user();
		$user_data = get_userdata( (int) $author_id );
		return $user_data;
	}


} // end EE_Registration_Shortcodes class
