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


	/**
	 * Will hold the EE_Event if available
	 *
	 * @var EE_Event
	 */
	protected $_event;


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Event Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to event related data', 'event_espresso');
		$this->_shortcodes = array(
			'[EVENT_ID]' => __('Will be replaced by the event ID of an event', 'event_espresso'),
			'[EVENT]' => __('The name of the event', 'event_espresso'),
			'[EVENT_NAME]' => __("This also can be used for the name of the event", 'event_espresso'),
			'[EVENT_PHONE]' => __('The phone number for the event (usually an info number)', 'event_espresso'),
			'[EVENT_DESCRIPTION]' => __('The description of the event', 'event_espresso'),
			'[EVENT_EXCERPT]' => __( 'This gets parsed to the value for the excerpt field in the event or blank if there is no excerpt.', 'event_espresso' ),
			'[EVENT_LINK]' => __('A link associated with the event', 'event_espresso'),
			'[EVENT_URL]' => __('A link to the event set up on the host site.', 'event_espresso'),
			'[VIRTUAL_URL]' => __('What was used for the "URL of Event" field in the Venue settings', 'event_espresso'),
			'[VIRTUAL_PHONE]' => __('An alternate phone number for the event. Typically used as a "call-in" number', 'event_espresso'),
			'[EVENT_IMAGE]' => __('This will parse to the Feature image for the event.', 'event_espresso'),
			'[EVENT_IMAGE_*]' => sprintf(
				__( 'This will parse to the Feature image for the event, %1$ssize%2$s can be set to determine the size of the image loaded by the shortcode. The %1$swidth%2$s and/or %1$sheight%2$s can also be set to determine the width and height of the image when output. By default the shortcode will load the %1$sthumbnail%2$s image size.', 'event_espresso' ),
				'<code>',
				'</code>'
				),
			'[EVENT_TOTAL_AVAILABLE_SPACES_*]' => sprintf(
				__( 'This will parse to the total available spaces for an event. Calculating total spaces is approximate because it is dependent on the complexity of limits on your event.  There are two methods of calculation (which can be indicated by the %1$smethod%2$s param on the shortcode).  %1$scurrent%2$s which will do a more accurate calculation of total available spaces based on current sales, and %1$sfull%2$s which will be the maximum total available spaces that is on the event in optimal conditions. The shortcode will default to current.', 'event_espresso' ),
				'<code>',
				'</code>'
				),
			'[EVENT_TOTAL_SPOTS_TAKEN]' => __( 'This shortcode will parse to the output the total approved registrations for this event', 'event_espresso' ),
			'[EVENT_FACEBOOK_URL]' => __('This will return the Facebook URL for the event if you have it set via custom field in your event, otherwise it will use the Facebook URL set in "Your Organization Settings". To set the facebook url in your event, add a custom field with the key as <code>event_facebook</code> and the value as your facebook url.', 'event_espresso'),
			'[EVENT_TWITTER_URL]' => __('This will return the Twitter URL for the event if you have it set via custom field in your event, otherwise it will use the Twitter URL set in "Your Organization Settings". To set the facebook url in your event, add a custom field with the key as <code>event_twitter</code> and the value as your facebook url', 'event_espresso'),
			'[EVENT_META_*]' => __('This is a special dynamic shortcode. After the "*", add the exact name for your custom field, if there is a value set for that custom field within the event then it will be output in place of this shortcode.', 'event_espresso'),
			'[REGISTRATION_LIST_TABLE_FOR_EVENT_URL]' => __( 'This parses to the url for the registration list table filtered by registrations for this event.', 'event_espresso' ),
			);
	}


	protected function _parser( $shortcode ) {


		$this->_event = $this->_data instanceof EE_Event ? $this->_data : null;

		//if no event, then let's see if there is a reg_obj.  If there IS, then we'll try and grab the event from the reg_obj instead.
		if ( empty( $this->_event ) ) {
			$aee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : NULL;
			$aee = $this->_extra_data instanceof EE_Messages_Addressee ? $this->_extra_data : $aee;

			$this->_event = $aee instanceof EE_Messages_Addressee && $aee->reg_obj instanceof EE_Registration ? $aee->reg_obj->event() : NULL;
		}


		//If there is no event objecdt by now then get out.
		if ( ! $this->_event instanceof EE_Event )
			return '';

		switch ( $shortcode ) {

			case '[EVENT_ID]' :
				return $this->_event->ID();
				break;

			case '[EVENT]' :
			case '[EVENT_NAME]' :
				return $this->_event->get('EVT_name');
				break;

			case '[EVENT_PHONE]' :
				return $this->_event->get('EVT_phone');
				break;

			case '[EVENT_DESCRIPTION]' :
				return $this->_event->get('EVT_desc');
				break;

			case '[EVENT_EXCERPT]' :
				return $this->_event->get('EVT_short_desc');
				break;

			case '[EVENT_LINK]' :
				return $this->_get_event_link($this->_event);
				break;

			case '[EVENT_URL]' :
				return $this->_get_event_link($this->_event, FALSE);
				break;

			case '[VIRTUAL_URL]' :
				$venue = $this->_event->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_url');

			case '[VIRTUAL_PHONE]' :
				$venue = $this->_event->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_phone');
				break;

			case '[EVENT_IMAGE]' :
				$image = $this->_event->feature_image_url(array(600,300) );
				// @todo: eventually we should make this an attribute shortcode so that em can send along what size they want returned.
				return ! empty( $image ) ? '<img src="' . $image . '" alt="' . sprintf( esc_attr__( '%s Feature Image', 'event_espresso'), $this->_event->get('EVT_name') ) . '" />' : '';
				break;

			case '[EVENT_FACEBOOK_URL]' :
				$facebook_url = $this->_event->get_post_meta('event_facebook', true );
				return empty( $facebook_url ) ? EE_Registry::instance()->CFG->organization->get_pretty( 'facebook' ) : $facebook_url;
				break;

			case '[EVENT_TWITTER_URL]' :
				$twitter_url = $this->_event->get_post_meta('event_twitter', true);
				return empty( $twitter_url ) ? EE_Registry::instance()->CFG->organization->get_pretty( 'twitter' ) : $twitter_url;
				break;

			case '[EVENT_AUTHOR_EMAIL]' :
				$author_id = $this->_event->get('EVT_wp_user');
				$user_data = get_userdata( (int) $author_id );
				return $user_data->user_email;
				break;

			case '[EVENT_TOTAL_SPOTS_TAKEN]' :
				return EEM_Registration::instance()->count( array( array( 'EVT_ID' => $this->_event->ID(), 'STS_ID' => EEM_Registration::status_id_approved ) ), 'REG_ID', true );
				break;

			case '[REGISTRATION_LIST_TABLE_FOR_EVENT_URL]' :
				return EEH_URL::add_query_args_and_nonce(
					array(
						'event_id' => $this->_event->ID(),
						'page' => 'espresso_registrations',
						'action' => 'default'
					),
					admin_url( 'admin.php' ),
					true
				);
				break;
		}

		if ( strpos( $shortcode, '[EVENT_META_*' ) !== false ) {
			$shortcode = str_replace( '[EVENT_META_*', '', $shortcode );
			$shortcode = trim( str_replace( ']', '', $shortcode ) );

			//pull the meta value from the event post
			$event_meta = $this->_event->get_post_meta( $shortcode, true );

			return ! empty( $event_meta ) ? $this->_event->get_post_meta( $shortcode, true ) : '';

		}

		if ( strpos( $shortcode, '[EVENT_TOTAL_AVAILABLE_SPACES_*' ) !== false ) {
			$attrs = $this->_get_shortcode_attrs( $shortcode );
			$method = empty( $attrs['method'] ) ? 'current' : $attrs['method'];
			$method = $method === 'current';
			$available = $this->_event->total_available_spaces($method);
			return $available === EE_INF ? '&infin;' : $available;
		}

		if ( strpos( $shortcode, '[EVENT_IMAGE_*' ) !== false ) {
			$attrs = $this->_get_shortcode_attrs( $shortcode );
			$width = empty( $attrs['width'] ) ? '' : ' width="' . $attrs['width'] . '"'; 
			$height = empty( $attrs['height'] ) ? '' : ' height="'. $attrs['height'] .'"'; 

			//Size may be set to a string such as 'tumbnail' or "width, height" eg - '200,200'
			if ( ! empty( $attrs['size'] ) ) {
				$size = explode( ',', $attrs['size'] );
				if ( count($size) === 1 ) {
					$size = $size[0];
				}
			} else {
				$size = 'thumbnail';
			}

			$image = $this->_event->feature_image_url( $size );

			return ! empty( $image ) ? '<img src="' . $image . '" alt="' . sprintf( esc_attr__( '%s Feature Image', 'event_espresso'), $this->_event->get('EVT_name') ) . '"' . $width . $height . '/>' : '';
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