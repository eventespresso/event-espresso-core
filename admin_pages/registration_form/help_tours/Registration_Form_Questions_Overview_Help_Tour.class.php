<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Registration_Form_Questions_Overview_Help_Tour
 *
 * This is the help tour object for the Questions Overview page
 *
 *
 * @package		Registration_Form_Questions_Overview_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Form_Questions_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Questions_Overview_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Questions Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'questions-overview-caf-joyride' : 'questions-overview-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			15 => array(
				'id' => 'add-new-question',
				'content' => $this->_add_new_question_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 20
					)
				),
			20 => array(
				'id' => 'event-espresso_page_espresso_registration_form-search-input',
				'content' => $this->_search_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => -15
					)
				),
			30 => array(
				'id' => 'display_text',
				'content' => $this->_display_text_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			40 => array(
				'id' => 'admin_label',
				'content' => $this->_admin_label_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20
					)
				),
			50 => array(
				'id' => 'type',
				'content' => $this->_type_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			55 => array(
				'id' => 'values',
				'content' => $this->_values_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				),
			60 => array(
				'id' => 'required',
				'content' => $this->_required_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -20,
					'tipAdjustmentX' => -15
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Registration Questions', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('Creating the perfect registration form has never been easier. Manage and organize (using drag and drop) your questions and question groups here.', 'event_espresso') . '</p>';
		
		return $content;
	}

	

	protected function _search_stop() {
		return '<p>' . __('Fields that will be searched with the value from the search are: the question name (display text)', 'event_espresso') . '</p>';
	}

	protected function _add_new_question_stop() {
		return '<p>' . __("Click here to add a new question.", 'event_espresso') . '</p>';
	}


	protected function _display_text_stop() {
		return '<p>' . __('This column lists all your available questions. Questions can be reordered by dragging and dropping them to the desired location. The question title is what is seen on your registration form.', 'event_espresso') . '</p>';
	}


	protected function _admin_label_stop() {
		return '<p>' . __('This column shows you the admin name for the question alongside any other pertinent data such as informing you that it is a system question.', 'event_espresso') . '</p>';
	}


	protected function _type_stop() {
		return '<p>' . __('This column will inform you about the type of input field used by the question, such as drop down, text or text area.', 'event_espresso') . '</p>';
	}
	
	protected function _values_stop() {
		return '<p>' . __('This column will display the stored values for checkboxes, radio buttons, and select boxes.', 'event_espresso') . '</p>';
	}

	protected function _required_stop() {
		return '<p>' . __('Here you can see if a question is a required question or not.', 'event_espresso') . '</p>';
	}

}