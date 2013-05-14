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
 * EE_Shortcodes
 * 
 * This is the parent class for the shortcodes libraries.  All common methods, properties are defined in here.
 *
 * The way this library works is a child class would be for defining a logical "grouping" of shortcodes (i.e. 'payment', 'address', 'attendee', 'event' etc.).  The child class extends this parent and then that grouping of shortcodes can be retrieved wherever they are needed. 
 *
 * This library takes care of defining shortcodes and their descriptions and also the parsers for those shortcodes.
 * 
 * @abstract
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Shortcodes extends EE_Base {

	/**
	 * holds label for library
	 * This is used for referencing the library label
	 *
	 * @access public
	 * @var string
	 */
	public $label;


	/**
	 * This property is used for referencing a short description of the library
	 *
	 * @access public
	 * @var string
	 */
	public $description;




	/**
	 * This will hold an array of shortcodes with the key as the shortcode ([shortcode]) and the value as a label/description for the shortcode.
	 *
	 * @access protected
	 * @var array
	 */
	protected $_shortcodes;



	/**
	 * This will hold the incoming data item sent to the parser method
	 *
	 * @access protected
	 * @var mixed (array|object)
	 */
	protected $_data;




	/**
	 * This will hold an instance of the EE_Parse_Shortcodes helper that will be used when handling list type shortcodes
	 * @var object
	 */
	protected $_shortcode_helper;




	public function __construct() {
		$this->_set_defaults();
		$this->_init_props();
	}


	/**
	 * This sets the defaults for the properties.  Child classes will override these properties in their _init_props method
	 */
	private function _set_defaults() {
		$this->name = $this->description = '';
		$this->_shortcodes = array();
	}



	/**
	 * loads an instance of the EE_Shortcode_Parser helper when requested
	 */
	protected function _set_shortcode_helper() {	
		//shortcode helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Parse_Shortcodes.helper.php';
		//get shortcode_replace instance- set when _get_messages is called in child...
		$this->_shortcode_helper = new EE_Parse_Shortcodes();
	}


	/**
	 * This is the public method for kicking of the parser included with each child.  It can be overridden by child classes if necessary (see EE_Questions_Answers for example)
	 * @param  string $shortcode incoming shortcode to be parsed
	 * @param  mixed (object|data) $data      incoming data to be be used for parsing
	 * @return string            parsed shortcode.
	 */
	public function parser($shortcode, $data) {
		//first we want to make sure this is a valid shortcode
		if ( !array_key_exists($shortcode, $this->_shortcodes ) )
			return false; //get out, this parser doesn't handle the incoming shortcode.
		$this->_data = $data;
		return $this->_parser($shortcode);
	}






	/**
	 * This method just returns the shortcodes in the $_shortcodes array property.
	 *
	 * @access public
	 * @return array array of shortcodes => description pairs
	 */
	public function get_shortcodes() {
		return $this->_shortcodes;
	}





	/**
	 * Child classes use this method to set the $name, $description, and $_shortcodes properties.
	 *
	 * @abstract
	 * @access protected
	 * @return void 
	 */
	abstract protected function _init_props();




	/**
	 * This method will give parsing instructions for each shortcode defined in the _shortcodes array.  Child methods will have to take care of handling.
	 *
	 * @abstract
	 * @access protected
	 * @param string $shortcode the shortcode to be parsed.
	 * @param mixed (object|array) $data incoming data for the parser.  The data could be either an object or array because there are some shortcodes that might be replaced by prepared data that has multiple items in a list (i.e. list of attendees in an event and we're showing fname/lname for each attendee).  In this case data will be in an array.  Otherwise the data shoudl be in a properly formatted object.  The EE_Parse_Shortcodes.helper.php describes the data object we're expecting.
	 * @return string parsed shortcode
	 */
	abstract protected function _parser( $shortcode );




	/**
	 * This just validates incoming data for list type shortcode parsers (and they call this method) to make sure it meets their requirements
	 * @return mixed (void|exception) If validation fails we'll throw an exception.
	 */
	protected function _validate_list_requirements() {
		
		//first test to make sure we've got an array!
		if ( !is_array($this->_data) ) {
			throw new EE_Error( sprintf( __('Expecting an array for the data sent to %s', 'event_espresso'), get_class($this) ) );
		}

		//next test to make sure we've got the required template in the index!
		if ( !isset( $this->_data['template'] ) ) {
			throw new EE_Error( sprintf( __('The incoming data does not have the required template (%s) in its array', 'event_espresso'), $req_template ) );
		}

		//next test to make sure we've got got a data index in the incoming data array
		if ( !isset( $this->_data['data'] ) )
			throw new EE_Error( __('The incoming data does not have the required data index in its array', 'event_espresso') );

		//all is well

	}


} //end EE_Shortcodes