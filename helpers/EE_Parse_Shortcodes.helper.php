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


	/**
	 * holds the template
	 *
	 * @access private
	 * @var mixed (string|array)
	 */
	private $_template;



	/**
	 * holds the incoming data object
	 *
	 * @access private
	 * @var object
	 */
	private $_data; 





	/**
	 * will hold an array of EE_Shortcodes library objects.
	 * @access private
	 * @var array
	 */
	private $_shortcode_objs = array(); 






	/**
	 * will hold the parsed given template that's been replaced with the relevant data and can be accessed by the caller.
	 * @var string
	 * @access public
	 */
	public $parsed; 





	/**
	 * holds the _instance object (utilizaing the singleton method)
	 *
	 * private
	 * @var object
	 */
	private static $_instance = NULL;






	private function __construct() {}





	public static function instance() {
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * This kicks off the parsing of shortcodes in message templates
	 * @param  string $template         This is the incoming string to be parsed
	 * @param  object $data             This is the incoming data object
	 * @param  array $valid_shortcodes  An array of strings that correspond to EE_Shortcode libraries
	 * @return string                   The parsed template string
	 */
	public function parse_message_template( $template, EE_Messages_Addressee $data, $valid_shortcodes) {
		$this->_template = $template;
		$this->_data = $data;
		$this->_set_shortcodes( $valid_shortcodes );
		$this->_parse_message_template($this->_template);
		return $this->parsed;
	}




	/**
	 * takes the given template and parses it with the $_shortcodes property
	 * @param  string $template string containing shortcodes to be parsed.
	 * @return void
	 * @access private
	 */
	private function _parse_message_template( $template, $data = array() ) {
		$event_list_items = $attendee_list_items = '';

		//first we need to know if the template is an array.  If it is then we know we've got some special secondary templates in here that have to be parsed first.
		if ( empty($data) && is_array($this->_template) ) {
			$data['event_list'] = $this->_get_event_list($this->_data->events);
			$data['attendee_list'] = $this->_get_attendee_list($this->_data->attendees);
		}

		//k now let's assemble the different list items (if present)
		if ( !empty($data['event_list'] ) ) {
			$data['event_list'] = $this->_get_list_items($data['event_list']);
		}

		if ( !empty($data['attendee_list'] ) ) {
			$data['attendee_list'] = $this->_get_list_items($data['attendee_list']);
		}

		//we need to figure out what data we're sending.  Secondary templates may be using this method to parse their stuff before the main template (recursively like).
		$data_to_send = empty($data) ? $this->_data : $data;

		//let's set the template to the main template if this is an array processing.
		$this->_template = ( is_array($this->_template) ) ? $this->_template['main'] : $this->_template;
		
		//now let's get a list of shortcodes that are found in the given template
		$possible_shortcodes = preg_match_all( '/\[+?\]/', $this->_template, $matches );
		$shortcodes = (array) $possible_shortcodes[0]; //this should be an array of shortcodes in the template string.

		//now lets go ahead and loop through our parsers for each shortcode and setup the values
		$sc_values = array();

		foreach ( $this->_shortcode_objs as $sc_obj ) {

			//loop through our shortcodes with the current parser
			foreach ( $shortcodes as $shortcode ) {
				if ( $parsed = $sc_obj->parser( $shortcode, $data_to_send ) )
					$sc_values[] = $parsed;
			}
		} 

		//now we've got parsed values for all the shortcodes in the template so we can go ahead and swap the shortcodes out.
		$this->parsed = str_replace(array_values($shortcodes), array_values($sc_values), $template);
	}




	/**
	 * This sets the shortcodes property from the incoming array of valid shortcodes that corresponds to names of various EE_Shortcode library objects
	 *
	 * @access private
	 * @param array $valid_shortcodes an array of strings corresponding to EE_Shortcode Library objects
	 * @return void
	 */
	private function _set_shortcodes( $valid_shortcodes ) {

		foreach ( $valid_shortcodes as $shortcode_ref ) {
			$ref = ucwords( str_replace('_', ' ', $shortcode_ref ) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_Shortcodes';
			if ( $class_exists( $classname ) ) {
				$a = new ReflectionClass( $classname );
				$this->_shortcode_objs[] = $a->newInstance();
			}
		}
	}

	



	protected function _get_event_list($events) {
		$evnts = array();
		//if this is an array then we've got an event array.
		if ( isset($events) && is_array($events) ) {
			foreach ( $events as $event ) {
				//okay we need to get the $attendee list array for this event in case the shortcode is in the template.
				$event['attendee_list'] = $this->_get_attendee_list($event);
				$evnts[] = $this->_parse_message_template($this->_template['event_list'], $event);
			}
		}

		return $evnts;
	}





	protected function _get_attendee_list($attendees) {
		$attnds = array();
		//if this is an array then we've got an attendee array otherwise this is an incoming event so lets skip this one.
		if ( is_array($attendees) ) {
			foreach ( $attendees as $attendee ) {
				//let's get the event list for this $attendee in case the shortcode for event_list is in the template.
				foreach ( $attendee['line_ref'] as $event_ref ) {
					$events[] = $this->_data->events[$event_ref];
				}
				$attendee['event_list'] = $this->_get_event_list($events);
				$this->_set_shortcodes($attendee);
				$attnds = $this->_parse_message_template($this->_template['attendee_list'], $attendee);
			}
		}

		//if $attendees is a string then we've got a single event that we need to get the attendees for JUST that event (called by _get_event_list);
		if ( !is_array($attendees) ) {
			foreach ( $attendees as $attendee ) {
				if ( $event['line_ref'] == $attendee['line_ref'] ) {
					$attnds = $this->_parse_message_template( $this->_template['attendee_list'], $attendee );
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



} //end EE_Parse_Shortcodes

// end of file:	includes/classes/EE_Parse_Shortcodes.class.php