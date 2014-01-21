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
 * Registration_Details_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package		Registration_Details_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Details_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Details_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Registration Details Tour', 'event_espresso');
		$this->_slug = 'registration-view-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'reg-admin-reg-details-reg-date-hdr',
				'content' => $this->_reg_date_title(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)
				),
			30 => array(
				'id' => 'reg-admin-reg-details-reg-status-hdr',
				'content' => $this->_reg_details_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)
				),
			40 => array(
				'id' => 'display-additional-registration-session-info',
				'content' => $this->_reg_details_table(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -225,
					'tipAdjustmentX' => 50
					)
				),
			50 => array(
				'id' => 'display-additional-registration-session-info',
				'content' => $this->_display_additional_info_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -35,
					'tipAdjustmentX' => 45
					)
				),
			60 => array(
				'id' => 'edit-reg-questions-mbox',
				'content' => $this->_edit_reg_question_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 75
					)
				),
			70 => array(
				'id' => 'edit-reg-registrant-mbox',
				'content' => $this->_attendee_details_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => 0,
					'tipAdjustmentX' => 0
					)
				),
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Registration Details', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Registration Details page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _reg_date_title() {
		return '<p>' . __('This is the date that the registration occurred on.') . '</p>';
	}
	
	protected function _reg_details_stop() {
		return '<p>' . __('The buttons below allow you to perform an action with a registration. The options are Approved, Not Approved, Declined, and Cancelled.', 'event_espresso') . '</p>';
	}

	protected function _reg_details_table() {
		return '<p>' . __('The registration items area displays various information including Line Item ID, Event Name, Event Date, Ticket Option, Price, Quantity, Line Total, Sales Tax, and the Grand Total.', 'event_espresso') . '</p>';
	}

	protected function _display_additional_info_stop() {
		return '<p>' . __('You can view additional information about the registration by clicking on the link below. Examples of available information includes Registration ID, IP Address, and User Agent.', 'event_espresso') . '</p>';
	}

	protected function _edit_reg_question_stop() {
		return '<p>' . __('View the answers to your custom questions below.', 'event_espresso') . '</p>';
	}

	protected function _attendee_details_stop() {
		return '<p>' . __('View details on the registrant attached to this registration.', 'event_espresso') . '</p>';
	}
}