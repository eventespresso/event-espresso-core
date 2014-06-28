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
	 * some shortcodes may require extra data to parse.  This property is provided for that.
	 * @var array
	 */
	protected $_extra_data;




	/**
	 * This will hold an instance of the EEH_Parse_Shortcodes helper that will be used when handling list type shortcodes
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
		EE_Registry::instance()->load_helper( 'Parse_Shortcodes' );
		//get shortcode_replace instance- set when _get_messages is called in child...
		$this->_shortcode_helper = new EEH_Parse_Shortcodes();
	}



	public function get_shortcode_helper() {
		if ( ! $this->_shortcode_helper instanceof EEH_Parse_Shortcodes )
			$this->_set_shortcode_helper();
		return $this->_shortcode_helper;
	}


	/**
	 * This is the public method for kicking of the parser included with each child.  It can be overridden by child classes if necessary (see EE_Questions_Answers for example)
	 * @param  string $shortcode incoming shortcode to be parsed
	 * @param  mixed (object|array) $data      incoming data to be be used for parsing
	 * @param  mixed (object|array) $extra_data extra incoming data (usually EE_Messages_Addressee)
	 * @return string            parsed shortcode.
	 */
	public function parser($shortcode, $data, $extra_data = array() ) {

		//filter setup shortcodes
		$this->_shortcodes = $this->get_shortcodes();

		//we need to setup any dynamic shortcodes so that they work with the array_key_exists
		$sc = preg_match_all( '/(\[[A-Za-z0-9]+_\*)/', $shortcode, $matches );
		$sc_to_verify = !empty($matches[0] ) ? $matches[0][0] . ']' : $shortcode;

		//first we want to make sure this is a valid shortcode
		if ( !array_key_exists($sc_to_verify, $this->_shortcodes ) )
			return false; //get out, this parser doesn't handle the incoming shortcode.
		$this->_data = $data;
		$this->_extra_data = $extra_data;
		$parsed = apply_filters( 'FHEE__' . get_class($this) . '__parser_after', $this->_parser($shortcode), $shortcode, $data, $extra_data, $this );

		//note the below filter applies to ALL shortcode parsers... be careful!
		$parsed = apply_filters( 'FHEE__EE_Shortcodes__parser_after', $parsed, $shortcode, $data, $extra_data, $this );
		return $parsed;
	}






	/**
	 * This method just returns the shortcodes in the $_shortcodes array property.
	 *
	 * @access public
	 * @return array array of shortcodes => description pairs
	 */
	public function get_shortcodes() {
		$this->_shortcodes = apply_filters( 'FHEE__' . get_class($this) . '__shortcodes', $this->_shortcodes, $this );

		//note the below filter applies to ALL shortcode parsers... be careful!
		$this->_shortcodes = apply_filters( 'FHEE__EE_Shortcodes__shortcodes', $this->_shortcodes, $this );

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
	 * @param mixed (object|array) $data incoming data for the parser.  The data could be either an object or array because there are some shortcodes that might be replaced by prepared data that has multiple items in a list (i.e. list of attendees in an event and we're showing fname/lname for each attendee).  In this case data will be in an array.  Otherwise the data shoudl be in a properly formatted object.  The EEH_Parse_Shortcodes.helper.php describes the data object we're expecting.
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
			throw new EE_Error( sprintf( __('The incoming data does not have the required template index in its array', 'event_espresso') ) );
		}

		//next test to make sure we've got got a data index in the incoming data array
		if ( !isset( $this->_data['data'] ) )
			throw new EE_Error( __('The incoming data does not have the required data index in its array', 'event_espresso') );

		//all is well let's just reformat the _extra_data() array if present
		//let's make sure that extra_data includes all templates (for later parsing if necessary)
		if ( !empty( $this->_extra_data ) && is_object($this->_extra_data ) ) {
			$this->_extra_data['data'] = $this->_extra_data;
			$this->_extra_data['templates'] = $this->_data['template'];
		}

	}


} //end EE_Shortcodes
