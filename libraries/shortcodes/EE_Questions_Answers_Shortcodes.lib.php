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
class EE_Question_Answers_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Questions and Answers Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes related to custom questions and answers', 'event_espresso');
		$this->_shortcodes = array(
			'[CUSTOM_Q_A]' => __('Use this if you want a list of all the custom Questions and Answers attached to an attendee listed. If you want just the specific Question and Answer then you must use the shortcode listed with on the Questions admin page.', 'event_espresso');
			);
	}


	/**
	 * We have to overload the parent parser method because of the dynamic nature of custom questions/answers shortcodes
	 * @param  string $shortcode Incoming shortcode
	 * @param  mixed (array|object) $data      incoming data object/array
	 * @return string            parsed code.
	 */
	public function parser( $shortcode, $data ) {
		$match = TRUE;

		//note we're matching on whether the shortcode contains "question" or "answer" 
		if ( !stristr($shortcode, 'question') || !stristr($shortcode, 'answer') )
			$match = FALSE; 

		//but wait a minute, maybe the shortcode is in the _shortcodes property array
		if ( array_key_exists($shortcode, $this->_shortcodes ) )
			$match = TRUE;

		//now we should no whether to proceed or not
		if ( !$match ) return FALSE;
		
		$this->_data = $data;
		return $this->_parser($shortcode);
		
	}


	protected function _parser( $shortcode ) {

		//first let's check for the custom q a thing
		if ( $shortcode == '[CUSTOM_Q_A]' ) {
			return $this->_custom_questions_answers();
		}

		//todo parse the custom shortcodes for "questions" or "answers";
		if ( isset( $this->_data->attendee->id ) ) {
			$questions = $this->_get_questions( $this->_data->attendee->id );

			if ( $questions ) {
				foreach ($questions as $q) {
					$k = $q['question'];
					$v = $q['answer'];

					$question = '[question_' . $k . ']';

					if ( $shortcode == $question )
						return $v; //we'll return the answer for the given question shortcode.
				}
			}
		}
	}


	/**
	 * Will return a list of custom questions and answers for the given attendee_id
	 *
	 * @access private
	 * @return string a formatted list of questions and answers.
	 */
	private function _custom_questions_answers() {
		//todo, we need to actually do this dude!
		return 'This is a coming feature. Stay tuned';
	}



	/**
	 * Used to retrieve custom questions from the database that have been answered by the given attendee id.
	 *
	 * @todo: this should be replaced with the Questions model when its ready.
	 * @access private
	 * @return array  an array of questions 
	 */
	private function _get_questions( $attendee_id ) {
		global $wpdb;

		$questions = $wpdb->get_results("select qst.question as question, ans.answer as answer from " . EVENTS_ANSWER_TABLE . " ans inner join " . EVENTS_QUESTION_TABLE . " qst on ans.question_id = qst.id where ans.attendee_id = " . $attendee_id, ARRAY_A);

		if ( $wpdb->num_rows > 0 && $wpdb->last_result[0]->question != NULL )
			return $questions;
		else
			return FALSE;
	}


} //end EE_Question_Answers_Shortcodes class