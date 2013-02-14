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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * Utility class for parsing EE shortcodes in given data.
 *
 * @package		Event Espresso
 * @subpackage	includes/core
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Parse_Shortcodes {

	private $template;  //this will vary between an array and string.
	private $data; //holds the data object coming in.
	/**
	 * will hold an associative array of existing shortcode values found in the system.
	 * @access private
	 * @var array
	 */
	private $shortcodes = array(); 

	/**
	 * will hold the parsed given template that's been replaced with the relevant data and can be accessed by the caller.
	 * @var string
	 * @access public
	 */
	public $parsed; 

	private static $_instance = NULL;

	private function __construct() {}

	public static function instance() {
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function parse_template( $template, $data) {
		$this->template = $template;
		$this->data = $data;
		$this->_set_shortcodes();
		$this->_parse_template($this->template);
		return $this->parsed;
	}

	/**
	 * takes the given template and parses it with the $shortcodes property
	 * @param  string $template string containing shortcodes to be parsed.
	 * @return void
	 * @access private
	 */
	private function _parse_template($template) {
		$this->parsed = str_replace(array_keys($this->shortcodes), array_values($this->shortcodes), $template);
	}

	/**
	 * takes the given data and sets up the shortcode array with the data into an associative array.  
	 * @todo $wpdb object is being used here to call specific data from EE tables.  Ideally this should be handled by EE database interface instead.
	 * @param object|array $data contains the data that will be attached to a shortcode.
	 */
	private function _set_shortcodes($data=array()) {
		global $wpdb, $org_options;
		$event_list_items = $attendee_list_items = '';
		//TODO this needs to be looked over again... I'm not getting the default data object coming in don't forget.  See 184 of `EE_Payment_message_type` for the format of the data coming in!  We may need to modify that _set_addressees function there so that it includes more info for parsing here.

		//handle any secondary templates (i.e. event_list, attendee_list);
		if ( empty($data) && is_array($this->template) ) {
			$data['event_list'] = $this->_get_event_list($this->data->events);
			$data['attendee_list'] = $this->_get_attendee_list($this->data->attendees);
		}

		//k now let's assemble the different list items (if present)
		if ( !empty($data['event_list'] ) ) {
			$event_list_items = $this->_get_list_items($data['event_list']);
		}

		if ( !empty($data['attendee_list'] ) ) {
			$attendee_list_items = $this->_get_list_items($data['attendee_list']);
		}
		
		//next let's do straight data/shortcode matches.
		$this->shortcodes = array(
			"[EVENT_ID]" => isset($data['ID']) ? $data['ID'] : '',
			"[EVENT_IDENTIFIER]" => isset($data['line_ref']) ? $data['line_ref']: '',
			"[REGISTRATION_ID]" => isset($data['line_ref']) ? $data['line_ref'] : '',
			"[FNAME]" => isset($data['fname']) ? $data['fname'] : '',
			"[LNAME]" => isset($data['lname']) ? $data['lname'] : '',
			"[PHONE]" => isset($data['meta']['venue_phone']) ? $data['meta']['venue_phone'] : '',
			"[EVENT]" => isset($data['name']) ? $data['name'] : '',
			"[EVENT_NAME]" => isset($data['name']) ? $data['name'] : '',
			"[DESCRIPTION]" => isset($data['meta']['event_desc']) ? $data['meta']['event_desc']: '',
			"[EVENT_LINK]" => isset($data['meta']['event_link']) ? $data['meta']['event_link'] : '',
			"[EVENT_URL]" => isset($data['meta']['event_url']) ? $data['meta']['event_url'] : '', //todo need to set this up in message_type
			"[VIRTUAL_URL]" => isset($data['meta']['virtual_url']) ? $data['meta']['virtual_url'] : '', //todo need to set this up in message type.
			"[VIRTUAL_PHONE]" => isset($data['meta']['virtual_phone']) ? $data['meta']['virtual_phone'] : '', //todo need to set this up in message type
			"[VENUE_TITLE]" => isset($data['meta']['venue_title']) ? $data['meta']['venue_title'] : '',
			"[VENUE_URL]" => isset($data['meta']['venue_url']) ? $data['meta']['venue_url'] : '',
			"[VENUE_IMAGE]" => isset($data['meta']['venue_image']) ? $data['meta']['venue_image'] : '',
			"[VENUE_PHONE]" => isset($data['meta']['venue_phone']) ? $data['meta']['venue_phone'] : '',
			"[EVENT_ADDRESS]" => isset($data['meta']['event_address']) ? $data['meta']['event_address'] : '', 
			"[EVENT_ADDRESS2]" => isset($data['meta']['event_address2']) ? $data['meta']['event_address2'] : '', 
			"[EVENT_CITY]" => isset($data['meta']['event_city']) ? $data['meta']['event_city'] : '', 
			"[EVENT_STATE]" => isset($data['meta']['event_state']) ? $data['meta']['event_state'] : '', 
			"[EVENT_COUNTRY]" => isset($data['meta']['event_country']) ? $data['meta']['event_country'] : '', 
			"[EVENT_ZIP]" => isset($data['meta']['event_zip']) ? $data['meta']['event_zip'] : '', 
			"[VENUE_ADDRESS]" => isset($data['meta']['venue_address']) ? $data['meta']['venue_address'] : '', 
			"[VENUE_ADDRESS2]" => isset($data['meta']['venue_address2']) ? $data['meta']['venue_address2'] : '', 
			"[VENUE_CITY]" => isset($data['meta']['venue_city']) ? $data['meta']['venue_city'] : '',
			"[VENUE_STATE]" => isset($data['meta']['venue_state']) ? $data['meta']['venue_state'] : '',
			"[VENUE_COUNTRY]" => isset($data['meta']['venue_country']) ? $data['meta']['venue_country'] : '',
			"[VENUE_ZIP]" => isset($data['meta']['venue_zip']) ? $data['meta']['venue_zip'] : '',
			"[TXN_ID]" => isset($this->data->txn['transaction_id']) ? $this->data->txn['transaction_id'] : '',
			//"[TICKET_TYPE]" => isset($data['price_desc']) ? $data['price_desc'] : '', //todo we need to get this type?
			//"[TICKET_LINK]" => isset($data->ticket_link) ? $data->ticket_link : '', //todo: what the heck is this?
			//"[certificate_link]" => isset($data->certificate_link) ? $data->certificate_link : '', //todo: and what the heck is this too?
			"[CONTACT]" => isset($data['meta']['alt_email']) || $data['meta']['alt_email'] == '' ? $org_options['contact_email'] : $data['meta']['alt_email'], //todo: need to set this up in message_type
			"[COMPANY]" => $org_options['organization'],
			"[CO_ADD1]" => $org_options['organization_street1'],
			"[CO_ADD2]" => $org_options['organization_street2'],
			"[CO_CITY]" => $org_options['organization_city'],
			"[CO_STATE]" => $org_options['organization_state'],
			"[CO_ZIP]" => $org_options['organization_zip'],
			"[PAYMENT_URL]" => isset($this->data->payment_link) ? $this->data->payment_link : '', //todo this needs to be setup via the message type and I'm assuming its for when the payment has not been made yet... this directs to a place to pay.
			"[INVOICE_LINK]" => isset($this->data->invoice_link) ? $this->data->invoice_link : '',
			"[EVENT_START_DATE]" => isset($data['event_start_date']) ? event_date_display($data['event_start_date']) : '', //todo make sure this is setup in payment message type
			"[EVENT_START_TIME]" => isset($data['event_start_time']) ? event_date_display($data['event_start_time'], get_option('time_format')) : '', //todo make sure this is setup in payment message type.
			"[EVENT_END_DATE]" => isset($data['event_end_date']) ? event_date_display($data['event_end_date']) : '', //todo make sure this is setup in payment message type
			"[EVENT_END_TIME]" => isset($data['event_end_time']) ? event_date_display($data['event_end_time'], get_option('time_format')) : '', //todo make sure this is setup in payment message type
			//"[location]" => isset($data->location) ? $data->location : '', //duplication?
			//"[location_phone]" => isset($data->event->venue_phone) ? $data->event->venue_phone : '', //duplication?
			"[GOOGLE_MAP_LINK]" => isset($data['meta']['google_map_link']) ? $data['meta']['google_map_link'] : '',
			"[ATTENDEE_LIST]" => isset($attendee_list_items) ? $attendee_list_items : '', 
			"[EVENT_LIST]" => isset($event_list_items) ? $event_list_items : '', 
			//"[custom_questions]" => isset($data->email_questions) ? $data->email_questions : '', //todo what is this?
			//"[QR_CODE]" => isset($data->qr_code) ? $data->qr_code : '', //I'm assuming that this would get added by the ticketing addon.
			"[EDIT_ATTENDEE_LINK]" => isset($data['edit_attendee_link']) ? $data['edit_attendee_link'] : '', //todo this would be useful for the admin context... so should be setup in message types
			"[TOTAL_COST]" => isset($this->data->billing['total_due']) ? $this->data->billing['total_due'] : '',
			"[EVENT_PRICE]" => isset($data['price']) ? $data['price'] : '',
			"[PAYMENT_STATUS]" => isset($this->data->txn['status']) ? $this->data->txn['status'] : __('Unknown', 'event_espresso'),
			"[PAYMENT_GATEWAY]" => isset($this->data->txn['gateway']) ? $this->data->txn['gateway'] : __('Unknown', 'event_espresso'),
			"[SITE_ADMIN_EMAIL" => $this->_get_site_admin_email(),
			"[ADMIN_EMAIL]" => isset($this->data->attendees['admin']['email']) ? $this->data->attendees['admin']['email'] : '',
			"[ATTENDEE_EMAIL]" => isset($data['email']) ? $data['email'] : '',
			"[PRIMARY_ATTENDEE_EMAIL]" => isset($this->data->attendees['primary_attendee']['email']) ? $this->data->attendees['primary_attendee']['email'] : ''
		);

		//third any additional stuff obtained from the database and data here.
		//todo need to format this properly
		//Get the questions and answers
		if ( isset($data->attendee->id) ) {
			$questions = $wpdb->get_results("select qst.question as question, ans.answer as answer from " . EVENTS_ANSWER_TABLE . " ans inner join " . EVENTS_QUESTION_TABLE . " qst on ans.question_id = qst.id where ans.attendee_id = " . $data->attendee->id, ARRAY_A);
			//echo '<p>'.print_r($questions).'</p>';
			if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->question != NULL) {
				foreach ($questions as $q) {
					$k = $q['question'];
					$v = $q['answer'];
					$this->shortcodes["[question_".$k."]"] = $k;
					$this->shortcodes["[answer_".$v."]"] = $v;
				}
			}
		}

		//Get the event meta
		//echo '<p>'.print_r($data->event->event_meta).'</p>';
		if ( !empty($data->event->event_meta) ) {
			foreach ($data->event->event_meta as $k => $v) {
				if (!empty($k) && !is_array($v)) {
					$this->shortcodes["[".$k."]"] = stripslashes_deep($v);
				}
			}
		}

		$this->shortcodes = apply_filters('filter_hook_espresso_shortcodes_handling', $this->shortcode, $this->data, $this->template);
		//let's set the template to the main template after processing.
		$this->template = ( is_array($this->template) ) ? $this->template['main'] : $this->template;
	}

	protected function _get_event_list($events) {
		$evnts = array();
		//if this is an array then we've got an event array.
		if ( isset($events) && is_array($events) ) {
			foreach ( $events as $event ) {
				//okay we need to get the $attendee list array for this event in case the shortcode is in the template.
				$event['attendee_list'] = $this->_get_attendee_list($event);
				$this->_set_shortcodes($event);
				$evnts[] = $this->_parse_template($this->template['event_list']);
			}
		}

		return $evnts;
	}

	protected function _get_attendee_list($attendees) {
		$attnds = array();
		//if this is an array then we've got an attendee array
		if ( isset($attendees) && is_array($attendees) ) {
			foreach ( $attendees as $attendee ) {
				//let's get the event list for this $attendee in case the shortcode for event_list is in the template.
				foreach ( $attendee['line_ref'] as $event_ref ) {
					$events[] = $this->data->events[$event_ref];
				}
				$attendee['event_list'] = $this->_get_event_list($events);
				$this->_set_shortcodes($attendee);
				$attnds = $this->_parse_template($this->template['attendee_list']);
			}
		}

		//if $attendees is a string then we've got a single event that we need to get the attendees for JUST that event (called by _get_event_list);
		if ( isset($attendees) && !is_array($attendees) ) {
			foreach ( $attendees as $attendee ) {
				if ( $event['line_ref'] == $attendee['line_ref'] ) {
					$this->_set_shortcodes($attendee);
					$attnds = $this->_parse_template($this->template['attendee_list']);
				}
			}
		}

		return $attnds;
	}

	protected function _get_list_items($items) {
		$content = '';
		foreach ( $items as $item ) {
			$content .= $item;
		}
		return $content;
	}


	protected function _get_site_admin_email() {
		return get_bloginfo('admin_email');
	}

} //end EE_Parse_Shortcodes

// end of file:	includes/classes/EE_Parse_Shortcodes.class.php