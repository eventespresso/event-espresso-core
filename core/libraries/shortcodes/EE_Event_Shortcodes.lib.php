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
 * EE_Event_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Event_Shortcodes lists all shortcodes related to event specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Event_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Event Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to event related data', 'event_espresso');
		$this->_shortcodes = array(
			'[EVENT_ID]' => __('Will be replaced by the event ID of an event', 'event_espresso'),
			'[EVENT_IDENTIFIER]' => __('Will be replaced with the event identifier of an event', 'event_espresso'),
			'[EVENT]' => __('The name of the event', 'event_espresso'),
			'[EVENT_NAME]' => __("This also can be used for the name of the event", 'event_espresso'),
			'[EVENT_PHONE]' => __('The phone number for the event (usually an info number)', 'event_espresso'),
			'[EVENT_DESCRIPTION]' => __('The description of the event', 'event_espresso'),
			'[EVENT_LINK]' => __('A link associated with the event', 'event_espresso'),
			'[EVENT_URL]' => __('A link to the event set up on the host site.', 'event_espresso'),
			'[VIRTUAL_URL]' => __('What was used for the "URL of Event" field in the Venue settings', 'event_espresso'),
			'[VIRTUAL_PHONE]' => __('An alternate phone number for the event. Typically used as a "call-in" number', 'event_espresso'),
			'[EVENT_IMAGE]' => __('This will parse to the Feature image for the event.', 'event_espresso'),
			'[EVENT_FACEBOOK_URL]' => __('This will return the Facebook URL for the event if you have it set via custom field in your event, otherwise it will use the Facebook URL set in "Your Organization Settings". To set the facebook url in your event, add a custom field with the key as <code>event_facebook</code> and the value as your facebook url.', 'event_espresso'),
			'[EVENT_TWITTER_URL]' => __('This will return the Twitter URL for the event if you have it set via custom field in your event, otherwise it will use the Twitter URL set in "Your Organization Settings". To set the facebook url in your event, add a custom field with the key as <code>event_twitter</code> and the value as your facebook url', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Formatter' );

		$event = $this->_data instanceof EE_Event ? $this->_data : null;
		if ( empty( $event ) )
			return '';

		switch ( $shortcode ) {

			case '[EVENT_ID]' :
				return $event->ID();
				break;

			case '[EVENT_IDENTIFIER]' :
				return isset($this->_data['line_ref']) ? $this->_data['line_ref']: '';
				break;

			case '[EVENT]' :
			case '[EVENT_NAME]' :
				return $event->get('EVT_name');
				break;

			case '[EVENT_PHONE]' :
				return $event->get('EVT_phone');
				break;

			case '[EVENT_DESCRIPTION]' :
				return $event->get('EVT_desc');
				break;

			case '[EVENT_LINK]' :
				return $this->_get_event_link($event);
				break;

			case '[EVENT_URL]' :
				return $this->_get_event_link($event, FALSE);
				break;

			case '[VIRTUAL_URL]' :
				$venue = $this->_data->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_url');

			case '[VIRTUAL_PHONE]' :
				$venue = $this->_data->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_phone');
				break;

			case '[EVENT_IMAGE]' :
				$image = $this->_data->feature_image_url(array(600,300) );
				// @todo: eventually we should make this an attribute shortcode so that em can send along what size they want returned.
				return !empty( $image ) ? '<img src="' . $image . '" alt="' . $this->_data->get('EVT_name') . ' Feature Image" />' : '';
				break;

			case '[EVENT_FACEBOOK_URL]' :
				$facebook_url = $this->_data->get_post_meta('event_facebook', true );
				return empty( $facebook_url ) ? EE_Registry::instance()->CFG->organization->facebook : $facebook_url;
				break;

			case '[EVENT_TWITTER_URL]' :
				$twitter_url = $this->_data->get_post_meta('event_twitter', true);
				return empty( $twitter_url ) ? EE_Registry::instance()->CFG->organization->twitter : $twitter_url;
				break;

			case '[EVENT_AUTHOR_EMAIL]' :
				$author_id = $this->_data->get('EVT_wp_user');
				$user_data = get_userdata( (int) $author_id );
				return $user_data->user_email;
				break;

		}
		return '';
	}



	/**
	 * returns the link to the event
	 * @param  boolean $full_link if TRUE (default) we return the html for the name of the event linked to the event.  Otherwise we just return the url of the event.
	 * @return string
	 */
	private function _get_event_link( $event, $full_link = TRUE ) {
		$url = get_permalink($event->ID());

		return $full_link ? '<a href="' . $url . '">' . $event->get('EVT_name') . '</a>' : $url;
	}


} //end EE_Event_Shortcodes class
