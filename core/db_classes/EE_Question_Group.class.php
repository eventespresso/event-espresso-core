<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_Question_Group class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Answer.class.php
 * @author 				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Question_Group extends EE_Soft_Delete_Base_Class {

	/**
	 * @param array $props_n_values
	 * @return EE_Question_Group|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Question_Group
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * gets the question group's name
	 * @access public
	 * @param bool $pretty
	 * @return string
	 */
	public function name( $pretty = FALSE ) {
		return $pretty ? $this->get_pretty( 'QSG_name' ) : $this->get( 'QSG_name' );
	}




	/**
	 * Gets the question group's internal name
	 * @access public
	 * @return string
	 */
	public function identifier() {
		return $this->get( 'QSG_identifier' );
	}



	/**
	 * Gets the question group's description
	 * @access public
	 * @param bool $pretty
	 * @return string
	 */
	public function desc( $pretty = FALSE ) {
		return $pretty ? $this->get_pretty( 'QSG_desc' ) : $this->get( 'QSG_desc' );
	}



	/**
	 * Gets the question group's order number in a sequence
	 * of other question groups
	 * @access public
	 * @return int
	 */
	public function order() {
		return $this->get( 'QSG_order' );
	}



	/**
	 * Returns whether to show the group's name on the frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_name() {
		return $this->get( 'QSG_show_group_name' );
	}



	/**
	 * Returns whether to show the group's description
	 * on the frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_desc() {
		return $this->get( 'QSG_show_group_desc' );
	}



	/**
	 * Returns whether this is a 'system group' (meaning
	 * a question group integral to the system, whose questions
	 * relate to the attendee table)
	 * @access public
	 * @return boolean
	 */
	public function system_group() {
		return $this->get( 'QSG_system' );
	}



	/**
	 * get the author of the question group.
	 *
	 * @since 4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		return $this->get('QSG_wp_user');
	}



	/**
	 * Returns whether this question group has
	 * been deleted
	 * @access public
	 * @return boolean
	 */
	public function deleted() {
		return $this->get( 'QST_deleted' );
	}



	/**
	 * Gets an array of questions with questions IN the group at the start of the array and questions NOT in the group at the end of the array.  Questions in the group are ordered by Question_Group_Question.QGQ_order and questions NOT in the group are ordered by Question.QGQ_order
	 * @return EE_Question[]
	 */
	public function questions_in_and_not_in_group() {
		$questions_in_group = $this->questions();
		$exclude_question_ids = ! empty( $questions_in_group ) ? array_keys( $questions_in_group ) : array();
		$questions_not_in_group = $this->questions_not_in_group( $exclude_question_ids );
		return $questions_in_group + $questions_not_in_group;
	}



	/**
	 * Gets all the questions which are part of this question group (ordered Question_Group_Question.QGQ_order)
	 * @param array $query_params
	 * @return EE_Question[]
	 */
	public function questions( $query_params = array() ) {
		$query_params = ! empty( $query_params ) ? $query_params : array( 'order_by' => array( 'Question_Group_Question.QGQ_order' => 'ASC' ) );
		return $this->ID() ? $this->get_many_related( 'Question', $query_params ) : array();
	}



	/**
	 * Gets all the questions which are NOT part of this question group.
	 * @param  mixed $question_IDS_in_group if empty array then all questions returned.  if FALSE then we first get questions in this group and exclude them from questions get all. IF empty array then we just return all questions.
	 * @return EE_Question[]
	 */
	public function questions_not_in_group( $question_IDS_in_group = FALSE ) {
		if ( $question_IDS_in_group === FALSE ) {
			$questions = $this->questions();
			$question_IDS_in_group = ! empty( $questions ) ? array_keys( $questions ) : array();
		}
		$_where = ! empty( $question_IDS_in_group ) ? array( 'QST_ID' => array( 'not_in', $question_IDS_in_group ) ) : array();

		return EEM_Question::instance()->get_all( array( $_where, 'order_by' => array( 'QST_ID' => 'ASC' ) ) );
	}



	/**
	 * Gets all events which are related to this question group
	 * @return EE_Event[]
	 */
	public function events() {
		return $this->get_many_related( 'Event' );
	}



	/**
	 * Adds the question to this question group
	 * @param EE_Question || int $question object or ID
	 * @return boolean if successful
	 */
	public function add_question( $questionObjectOrID ) {
		return $this->_add_relation_to( $questionObjectOrID, 'Question' );
	}



	/**
	 * Removes the question from this question group
	 * @param EE_Question || int $question object or ID
	 * @return boolean of success
	 */
	public function remove_question( $questionObjectOrID ) {
		return $this->_remove_relation_to( $questionObjectOrID, 'Question' );
	}



	/**
	 * @param $questionObjectOrID
	 * @param $qst_order
	 * @return int
	 */
	public function update_question_order( $questionObjectOrID, $qst_order ) {
		$qst_ID = $questionObjectOrID instanceof EE_Question ? $questionObjectOrID->ID() : (int)$questionObjectOrID;
		return EEM_Question_Group_Question::instance()->update( array( 'QGQ_order' => $qst_order ), array( array( 'QST_ID' => $qst_ID, 'QSG_ID' => $this->ID() ) ) );
	}



	/**
	 * Basically this is method just returns whether the question group has any questions with answers.  This is used by the admin currently to determine whether we should display the ui for deleting permanently or not b/c question groups with questions that have answers should not be possible to delete permanently
	 * @return boolean true if has questions with answers, false if not.
	 */
	public function has_questions_with_answers() {
		$has_answers = FALSE;
		$questions = $this->get_many_related( 'Question' );
		foreach ( $questions as $question ) {
			if ( $question->count_related( 'Answer' ) > 0 )
				$has_answers = TRUE;
		}
		return $has_answers;
	}



	/**
	 * The purpose of this method is set the question group order for this question group to be the max out of all question groups
	 *
	 * @access public
	 * @return void
	 */
	public function set_order_to_latest() {
		$latest_order = $this->get_model()->get_latest_question_group_order();
		$latest_order ++;
		$this->set( 'QSG_order', $latest_order );
	}
}
