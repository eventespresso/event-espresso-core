<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Event_Editor_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_Editor_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Editor_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'about-taxable-toggle',
				'target' => '.TKT-taxable-checkbox',
				'content' => $this->_get_taxable_info_content(),
				'options' => array(
					'show_only_once' => true,
					'content' => array(
						'title' => __('Taxable Ticket Toggle', 'event_espresso'),
						'button' => true
						),
					'show' => array(
						'event' => 'click'
						),
					'hide' => array(
						'event' => false
						),
					'style' => array(
						'classes' => ''
						)
				 	)//defaults
				),
			1 => array(
				'content_id' => 'ticket-icon-help',
				'target' => '.ticket-icon',
				'content' => '<p>' . __('Assigned Tickets', 'event_espresso') . '</p>'
				),
			2 => array(
				'content_id' => 'clone-icon-help',
				'target' => '.clone-icon',
				'content' => '<p>' . __('Duplicate this Item', 'event_espresso') . '</p>'
				),
			3 => array(
				'content_id' => 'trash-datetime-help',
				'target' => '.datetime-edit-table .trash-icon',
				'content' => '<p>' . __('Trash Datetime', 'event_espresso') . '</p>'
				),
			4 => array(
				'content_id' => 'trash-ticket-help',
				'target' => '.ticket-row .trash-icon',
				'content' => '<p>' . __('Trash Ticket', 'event_espresso') . '</p>'
				),
			5 => array(
				'content_id' => 'trash-price-modifier-help',
				'target' => '.ticket-price-rows .trash-icon',
				'content' => '<p>' . __('Trash Price Modifier', 'event_espresso') . '</p>'
				),
			6 => array(
				'content_id' => 'gear-icon-help',
				'target' => '.gear-icon',
				'content' => '<p>' . __('Advanced Settings', 'event_espresso') . '</p>'
				)
			);
	}



	private function _get_taxable_info_content() {
		$price_admin_link = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'default'), PRICING_ADMIN_URL );
		return '<p>' . sprintf( __('Clicking the taxable ticket toggle checkbox has enabled taxes for this ticket. What this means is that when a person purchases this ticket, the tax will be applied to all prices on this ticket. You can edit the existing tax price modifier that was setup in Event Espresso by going to  %sDefault Pricing Admin Page%s (labelled "Pricing" in the Event Espresso Menu)', 'event_espresso'), '<a href="' . $price_admin_link . '" title="' . __('Pricing Admin Page', 'event_espresso') . '">', '</a>' ) . '</p>';
	}
}