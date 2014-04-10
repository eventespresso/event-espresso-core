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
 * EEH_Parse_Shortcodes
 * Utility class for parsing EE shortcodes in given data.
 *
 * @package		Event Espresso
 * @subpackage	includes/core
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEH_Parse_Shortcodes {


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







	public function __construct() {}






	/**
	 * This kicks off the parsing of shortcodes in message templates
	 * @param  string 				 $template         This is the incoming string to be parsed
	 * @param  EE_Messages_Addressee $data             This is the incoming data object
	 * @param  array 				 $valid_shortcodes  An array of strings that correspond to EE_Shortcode libraries
	 * @return string                   The parsed template string
	 */
	public function parse_message_template( $template, EE_Messages_Addressee $data, $valid_shortcodes) {
		$this->_init_data( $template, $data, $valid_shortcodes );


		$this->_template = is_array($template) ? $template['main'] : $template;


		$parsed = $this->_parse_message_template();
		return $parsed;
	}


	public function parse_attendee_list_template( $template, EE_Registration $registration, $valid_shortcodes, $extra_data = array() ) {

		$this->_init_data( $template, $registration, $valid_shortcodes, $extra_data );

		$this->_template = is_array($template) ? $template['attendee_list'] : $template;

		$parsed = $this->_parse_message_template();
		return $parsed;
	}

	public function parse_event_list_template( $template, EE_Event $event, $valid_shortcodes, $extra_data = array() ) {
		$this->_init_data( $template, $event, $valid_shortcodes, $extra_data );

		$this->_template = is_array($template) ? $template['event_list'] : $template;

		$parsed = $this->_parse_message_template();
		return $parsed;
	}


	public function parse_ticket_list_template( $template, EE_Ticket $ticket, $valid_shortcodes, $extra_data = array() ) {
		$this->_init_data( $template, $ticket, $valid_shortcodes, $extra_data );

		$this->_template = is_array($template) ? $template['ticket_list'] : $template;

		$parsed = $this->_parse_message_template();
		return $parsed;
	}


	public function parse_datetime_list_template( $template, EE_Datetime $datetime, $valid_shortcodes, $extra_data = array() ) {
		$this->_init_data( $template, $datetime, $valid_shortcodes, $extra_data );

		$this->_template = is_array($template) ? $template['datetime_list'] : $template;

		$parsed = $this->_parse_message_template();
		return $parsed;
	}


	public function parse_question_list_template( $template, EE_Answer $answer, $valid_shortcodes, $extra_data = array() ) {
		$this->_init_data( $template, $answer, $valid_shortcodes, $extra_data );

		$this->_template = is_array($template) ? $template['question_list'] : $template;

		$parsed = $this->_parse_message_template();
		return $parsed;
	}


	private function _init_data( $template, $data, $valid_shortcodes, $extra_data = array() ) {
		$this->_reset_props();
		$this->_data['template'] = $template;
		$this->_data['data'] = $data;
		$this->_data['extra_data'] = $extra_data;

		$this->_set_shortcodes( $valid_shortcodes );
	}


	private function _reset_props() {
		$this->_template = $this->_data = NULL;
		$this->_shortcode_objs = array();
	}


	/**
	 * takes the given template and parses it with the $_shortcodes property
	 * @return void
	 * @access private
	 */
	private function _parse_message_template() {


		//now let's get a list of shortcodes that are found in the given template
		$possible_shortcodes = preg_match_all( '/(\[.+?\])/', $this->_template, $matches );
		$shortcodes = (array) $matches[0]; //this should be an array of shortcodes in the template string.

		$matched_code = array();
		$sc_values = array();

		$list_type_shortcodes = array(
			'[ATTENDEE_LIST]',
			'[EVENT_LIST]',
			'[TICKET_LIST]',
			'[DATETIME_LIST]',
			'[QUESTION_LIST]',
			'[RECIPIENT_QUESTION_LIST]',
			'[PRIMARY_REGISTRANT_QUESTION_LIST]',
			'[RECIPIENT_TICKET_LIST]',
			'[PRIMARY_REGISTRANT_TICKET_LIST]',
			'[RECIPIENT_DATETIME_LIST]',
			'[PRIMARY_REGISTRANT_DATETIME_LIST]'
			);

		$list_type_shortcodes = apply_filters( 'FHEE__EEH_Parse_Shortcodes___parse_message_template__list_type_shortcodes', $list_type_shortcodes );

		//now lets go ahead and loop through our parsers for each shortcode and setup the values
		foreach ( $shortcodes as $shortcode ) {


			foreach ( $this->_shortcode_objs as $sc_obj ) {
				$data_send = '';

				//we need to setup any dynamic shortcodes so that they work with the array_key_exists
				$sc = preg_match_all( '/(\[[A-Za-z0-9]+_\*)/', $shortcode, $matches );
				$sc_to_verify = !empty($matches[0] ) ? $matches[0][0] . ']' : $shortcode;

				if ( !array_key_exists( $sc_to_verify, $sc_obj->get_shortcodes() ) ) {
					continue; //the given shortcode isn't in this object
				}



				//if this isn't  a "list" type shortcode then we'll send along the data vanilla instead of in an array.
				if ( ! in_array( $shortcode, $list_type_shortcodes ) ) {
					$data_send = !is_object($this->_data) && isset($this->_data['data']) ? $this->_data['data'] : $this->_data;
				} else {
					$data_send = $this->_data;
				}


				if ( $parsed = $sc_obj->parser( $shortcode, $data_send, $this->_data['extra_data'] ) ) {
					$matched_code[] = $shortcode;
					$sc_values[] = $parsed;
				} else {
					//let's just strip the ugly code. (usually in the case of list templates)
					$matched_code[] = $shortcode;
					$sc_values[] = '';
				}
			}
		}

		//now we've got parsed values for all the shortcodes in the template so we can go ahead and swap the shortcodes out.
		$parsed = str_replace(array_values($matched_code), array_values($sc_values), $this->_template);
		return $parsed;
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
			if ( class_exists( $classname ) ) {
				$a = new ReflectionClass( $classname );
				$this->_shortcode_objs[] = $a->newInstance();
			}
		}
	}



} //end EEH_Parse_Shortcodes

// end of file:	includes/classes/EEH_Parse_Shortcodes.class.php
