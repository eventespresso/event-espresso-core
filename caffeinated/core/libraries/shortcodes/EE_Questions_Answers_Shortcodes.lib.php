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
 * EE_Question_Answers_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Question_Answers_Shortcodes handles all shortcodes for custom questions and answers. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Question_Answers_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Questions_Answers_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Questions and Answers Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes related to custom questions and answers', 'event_espresso');
		$this->_shortcodes = array(
			'[CUSTOM_Q_A]' => __('This is used to output the custom questions and answers as a list for an attendee', 'event_espresso'),
			'[ANSWER_*]' => __('To output a specific answer, replace the "*" in the example shortcode with the exact text from the Question Text field for which you want the answer displayed.', 'event_espresso')
			);
	}


	/**
	 * We have to overload the parent parser method because of the dynamic nature of custom questions/answers shortcodes
	 * @param  string $shortcode Incoming shortcode
	 * @param  mixed (array|object) $data      incoming data object/array
	 * @return string            parsed code.
	 */
	public function parser( $shortcode, $data, $extra_data = array() ) {
		$match = TRUE;

		//note we're matching on whether the shortcode contains "question" or "answer" 
		if ( !stristr($shortcode, 'answer') )
			$match = FALSE; 

		//but wait a minute, maybe the shortcode is in the _shortcodes property array
		if ( array_key_exists($shortcode, $this->_shortcodes ) )
			$match = TRUE;

		//now we should know whether to proceed or not
		if ( !$match ) return FALSE;

		
		$this->_data = $data;
		$this->_extra_data = $extra_data;
		return $this->_parser($shortcode);
		
	}


	protected function _parser( $shortcode ) {


		if ( $shortcode == '[CUSTOM_Q_A]' ) {
			return $this->_custom_question_answer_list();
		}

		//custom dynamic answer shortcodes
		if ( stristr( $shortcode, 'answer_' ) ) {
			return $this->_parse_custom_answer( $shortcode );
		}

		return ''; //if no matches
	}



	/**
	 * parses the [CUSTOM_Q_A] shortcode and sets up the questions and answers for the incoming attendee.
	 * @return string - the parsed list.
	 */
	private function _custom_question_answer_list() {
		d($this->_extra_data);
		return 'parsed';
	}




	/**
	 * Used to parse a custom answer shortcode
	 * @param  string $shortcode The shortcode being parsed
	 * @return [type]            [description]
	 */
	private function _parse_custom_answer( $shortcode ) {


		$answer_text = str_replace('ANSWER_', '', $shortcode);
		$answer_text = str_replace('[', '', $shortcode);
		$answer_text = str_replace(']', '', $shortcode);

	}


} //end EE_Question_Answers_Shortcodes class