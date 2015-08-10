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
				'content' => __('Assigned Tickets', 'event_espresso')
				),
			2 => array(
				'content_id' => 'clone-icon-help',
				'target' => '.clone-icon',
				'content' => __('Duplicate this Item', 'event_espresso')
				),
			3 => array(
				'content_id' => 'trash-datetime-help',
				'target' => '.datetime-edit-table .trash-icon',
				'content' => __('Trash Datetime', 'event_espresso')
				),
			4 => array(
				'content_id' => 'trash-ticket-help',
				'target' => '.ticket-row .trash-icon',
				'content' => __('Trash Ticket', 'event_espresso')
				),
			5 => array(
				'content_id' => 'trash-price-modifier-help',
				'target' => '.ticket-price-rows .trash-icon',
				'content' => __('Trash Price Modifier', 'event_espresso')
				),
			6 => array(
				'content_id' => 'gear-icon-help',
				'target' => '.gear-icon',
				'content' =>  __('Advanced Settings', 'event_espresso')
				),
			7 => array(
				'content_id' => 'tkt-status-archived',
				'target' => '.ticket-row .tkt-status-' . EE_Ticket::archived,
				'content' => $this->_ticket_status_legend(EE_Ticket::archived),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						'adjust' => array(
							'mouse' => false
							)
						)
					)
				),
			8 => array(
				'content_id' => 'tkt-status-expired',
				'target' => '.ticket-row .tkt-status-' . EE_Ticket::expired,
				'content' => $this->_ticket_status_legend(EE_Ticket::expired),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						'adjust' => array(
							'mouse' => false
							)
						)
					)
				),
			9 => array(
				'content_id' => 'tkt-status-sold_out',
				'target' => '.ticket-row .tkt-status-' . EE_Ticket::sold_out,
				'content' => $this->_ticket_status_legend(EE_Ticket::sold_out),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						'adjust' => array(
							'mouse' => false
							)
						)
					)
				),
			10 => array(
				'content_id' => 'tkt-status-pending',
				'target' => '.ticket-row .tkt-status-' . EE_Ticket::pending,
				'content' => $this->_ticket_status_legend(EE_Ticket::pending),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						'adjust' => array(
							'mouse' => false
							)
						)
					)
				),
			11 => array(
				'content_id' => 'tkt-status-onsale',
				'target' => '.ticket-row .tkt-status-' . EE_Ticket::onsale,
				'content' => $this->_ticket_status_legend(EE_Ticket::onsale),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						'adjust' => array(
							'mouse' => false
							)
						)
					)
				),
			12 => array(
				'content_id' => 'sortable-tkt-drag-handle-tip',
				'target' => '.ee-ticket-sortable .sortable-drag-handle',
				'content' => __('Click and drag-n-drop to reorder tickets.', 'event_espresso'),
				'options' => array(
					'position' => array(
						'adjust' => array(
							'mouse' => false,
							'y' => 5
							)
						)
					)
				),
			13 => array(
				'content_id' => 'sortable-dtt-drag-handle-tip',
				'target' => '.ee-dtt-sortable .sortable-drag-handle',
				'content' => __('Click and drag-n-drop to reorder datetimes.', 'event_espresso'),
				'options' => array(
					'position' => array(
						'adjust' => array(
							'mouse' => false,
							'y' => 5
							)
						)
					)
				)
			);
	}



	private function _get_taxable_info_content() {
		$price_admin_link = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'default'), PRICING_ADMIN_URL );
		return '<p>' . sprintf( __('Clicking the taxable ticket toggle checkbox has enabled taxes for this ticket. What this means is that when a person purchases this ticket, the tax will be applied to all prices on this ticket. You can edit the existing tax price modifier that was setup in Event Espresso by going to  %sDefault Pricing Admin Page%s (labelled "Pricing" in the Event Espresso Menu)', 'event_espresso'), '<a href="' . $price_admin_link . '" title="' . esc_attr__('Pricing Admin Page', 'event_espresso') . '">', '</a>' ) . '</p>';
	}

	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EE_Ticket constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _ticket_status_legend( $status ) {

		$status_array = array(
			'archived' => EE_Ticket::archived,
			'expired' => EE_Ticket::expired,
			'sold_out' => EE_Ticket::sold_out,
			'pending' => EE_Ticket::pending,
			'onsale' => EE_Ticket::onsale
			);

		return EEH_Template::status_legend( $status_array, $status );
	}
}
