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
 * espresso_events_Pricing_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Pricing_Hooks
 * @subpackage	caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Pricing_Hooks extends EE_Admin_Hooks {

	protected function _set_hooks_properties() {
		$this->_name = 'pricing';
		//if we were going to add our own metaboxes we'd use the below.
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit','create_new'),
				'func' => 'pricing_metabox',
				'label' => __('Event Tickets & Datetimes (experimental)', 'event_espresso'),
				'priority' => 'high',
				'context' => 'normal'
				),

			);/**/

		$this->_remove_metaboxes = array(
			0 => array(
				'page_route' => array('edit', 'create_new'),
				'id' => 'espresso_event_editor_tickets',
				'context' => 'normal'
				)
			);

		$this->_scripts_styles = array(
			'registers' => array(
				'ee-tickets-datetimes-css' => array(
					'url' => EVENTS_ASSETS_URL . 'event-tickets-datetimes.css',
					'type' => 'css'
					),
				'ee-xp-ticket-metabox' => array(
					'url' => EVENTS_ASSETS_URL . 'xp-ticket-metabox.js',
					'depends' => array('jquery', 'ee-moment')
					)
				),
			'enqueues' => array(
				'ee-tickets-datetimes-css' => array( 'edit', 'create_new' ),
				'ee-xp-ticket-metabox' => array( 'edit', 'create_new' )
				),
			/*'localize' => array(
				'ee-prices-event-editor' => array(
					'PRICE_METABOX_ITEMS' => array(
						'adding_price_error' => __('There was a problem with adding the price.  No new price was generated', 'event_espresso')
						)
					)
				)/**/
			);

		add_action('AHEE__EE_Admin_Page_CPT_core_do_extra_autosave_stuff_Extend_Events_Admin_Page', array( $this, 'autosave_handling' ), 10 );

	}


	public function autosave_handling( $event_admin_obj ) {
		//todo when I get to this remember that I need to set the template args on the $event_admin_obj (use the set_template_args() method)
		
		/**
		 * need to remember to handle TICKET DEFAULT saves correctly:  I've got two input fields in the dom:
		 *
		 * 1. TKT_is_default_selector (visible)
		 * 2. TKT_is_default (hidden)
		 *
		 * I think we'll use the TKT_is_default for recording whether the ticket displayed IS a default ticket (on new event creations). Whereas the TKT_is_default_selector is for the user to indicate they want this ticket to be saved as a default.
		 *
		 * The tricky part is, on an initial display on create or edit (or after manually updating), the TKT_is_default_selector will always be unselected and the TKT_is_default will only be true if this is a create.  However, after an autosave, users will want some sort of indicator that the TKT HAS been saved as a default.. in other words we don't want to remove the check on TKT_is_default_selector. So here's what I'm thinking.
		 * On Autosave:
		 * 1. If TKT_is_default is true: we create a new TKT, send back the new id and add id to related elements, then set the TKT_is_default to false.
		 * 2. If TKT_is_default_selector is true: we create/edit existing ticket (following conditions above as well).  We do NOT create a new default ticket.  The checkbox stays selected after autosave.
		 * 3. only on MANUAL update do we check for the selection and if selected create the new default ticket. 
		 */
	}




	public function pricing_metabox() {
		$existing_datetime_ids = $existing_ticket_ids = $datetime_tickets = $ticket_datetimes = array();
		$has_related_tickets = FALSE;

		$evtobj = $this->_adminpage_obj->get_cpt_model_obj();

		//default main template args
		$main_template_args = array(
			'event_datetime_help_link' => EE_Template::get_help_tab_link('event_date_info', $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), FALSE, FALSE ), //todo need to add a filter to the template for the help text in the Events_Admin_Page core file so we can add further help
			'existing_datetime_ids' => '',
			'total_dtt_rows' => 1,
			'add_new_dtt_help_link' => EE_Template::get_help_tab_link('add_new_dtt_info', $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), FALSE, FALSE ), //todo need to add this help info id to the Events_Admin_Page core file so we can access it here.
			'datetime_rows' => '',
			'show_tickets_container' => ' style="display:none;"',
			'ticket_rows' => '',
			'existing_ticket_ids' => '',
			'total_ticket_rows' => 1,
			'ticket_js_structure' => ''
			);

		$event_id = is_object( $evtobj ) ? $evtobj->ID() : NULL;
		$timezone = is_object( $evtobj ) ? $evtobj->timezone_string() : NULL;

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		/**
		 * 1. Start with retrieving Datetimes
		 * 2. For each datetime get related tickets
		 * 3. For each ticket get related prices
		 */
		
		$DTM = $this->EE->load_model('Datetime', array($timezone) );
		$times = $DTM->get_all_event_dates( $event_id );

		
		
		$main_template_args['total_dtt_rows'] = count($times);
		foreach ( $times as $time ) {
			$dttid = $time->get('DTT_ID');
			$existing_datetime_ids[] = $dttid;

			//tickets attached
			$related_tickets = $time->ID() > 0 ? $time->get_many_related('Ticket') : array();

			//if there are no related tickets this is likely a new event so we need to generate the default tickets
			if ( empty ( $related_tickets ) ) {
				$has_related_tickets = TRUE;
				$related_tickets = $this->EE->load_model('Ticket')->get_all_default_tickets();
			}


			//we can't actually setup rows in this loop yet cause we don't know all the unique tickets for this event yet (tickets are linked through all datetimes). So we're going to temporarily cache some of that information.

			//loop through and setup the ticket rows
			foreach ( $related_tickets as $ticket ) {
				$tktid = $ticket->get('TKT_ID');
				//we only want unique tickets in our final display!!
				if ( !in_array( $tktid, $existing_ticket_ids ) ) {
					$existing_ticket_ids[] = $tktid;
					$all_tickets[] = $ticket;
				}
				
				
				if ( ! $has_related_tickets ) { 
					//temporary cache of this ticket info for this datetime for later processing of datetime rows.
					$datetime_tickets[$dttid][] = $tktid;

					//temporary cache of this datetime info for this ticket for later processing of ticket rows.
					if ( ! in_array( $dtt_id, $ticket_datetimes[$tktid] ) )
						$ticket_datetimes[$tktid][] = $dtt_id;
				}

			}
		}

		$main_template_args['total_ticket_rows'] = count( $existing_ticket_ids );
		$main_template_args['show_tickets_container'] = '';

		//k NOW we have all the data we need for setting up the dtt rows and ticket rows so we start our dtt loop again.
		$dttrow = 1;
		foreach ( $times as $time ) {
			$main_template_args['datetime_rows'] .= $this->_get_datetime_row( $dttrow, $time, $datetime_tickets, $all_tickets );
			$dttrow++;
		}

		//then loop through all tickets for the ticket rows.
		$tktrow = 1;
		foreach ( $all_tickets as $ticket ) {
			$main_template_args['ticket_rows'] .= $this->_get_ticket_row( $tktrow, $ticket, $ticket_datetimes, $times );
			$tktrow++;
		}

		$main_template_args['ticket_js_structure'] = $this->_get_ticket_js_structure($times, $all_tickets);
		$template = PRICING_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php';
		espresso_display_template( $template, $main_template_args );
		return;
	}



	private function _get_datetime_row( $dttrow, EE_Datetime $dtt, $datetime_tickets, $all_tickets, $default = FALSE ) {

		$dtt_display_template_args = array(
			'dtt_display_row' => $this->_get_dtt_display_row( $dttrow, $dtt, $default ),
			'dtt_edit_row' => $this->_get_dtt_edit_row( $dttrow, $dtt, $default ),
			'dtt_attached_tickets_row' => $this->_get_dtt_attached_tickets_row( $dttrow, $dtt, $datetime_tickets, $all_tickets, $default ),
			'dtt_row' => $default ? 'DTTNUM' : $dttrow
			);
		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_row_wrapper.template.php';
		return espresso_display_template( $template, $dtt_display_template_args, TRUE);
	}	


	private function _get_dtt_display_row( $dttrow, $dtt, $default = FALSE ) {
		$template_args = array(
			'dtt_row' => $default ? 'DTTNUM' : $dttrow,
			'dtt_name' => $default ? '' : $dtt->get_dtt_display_name(),
			'dtt_sold' => $default ? '0' : $dtt->get('DTT_sold')
			);
		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_display_row.template.php';
		return espresso_display_template( $template, $template_args, TRUE);
	}


	private function _get_dtt_edit_row( $dttrow, $dtt, $default ) {
		$template_args = array(
			'dtt_row' => $default ? 'DTTNUM' : $dttrow,
			'display_dtt_edit_row' => 'style="display:none;"',
			'DTT_ID' => $default ? '' : $dtt->ID(),
			'DTT_is_primary' => $default ? '' : $dtt->get('DTT_is_primary'),
			'DTT_EVT_start' => $default ? '' : $dtt->start_date( 'Y-m-d h:i a'),
			'DTT_EVT_end' => $default ? '' : $dtt->end_date( 'Y-m-d h:i a'),
			'DTT_reg_limit' => $default ? '' : $dtt->get('DTT_reg_limit')
			);

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_edit_row.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}


	private function _get_dtt_attached_tickets_row( $dttrow, $dtt, $datetime_tickets, $all_tickets, $default ) {
		$template_args = array(
			'dtt_row' => $default ? 'DTTNUM' : $dttrow,
			'datetime_tickets_list' => $default ? '<li class="hidden"></li>' : '',
			'add_new_datetime_ticket_help_link' => EE_Template::get_help_tab_link('add_new_ticket_via_datetime', $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), FALSE, FALSE ), //todo need to add this help info id to the Events_Admin_Page core file so we can access it here.
			);

		//need to setup the list items (but only if this isnt' a default skeleton setup)
		if ( !$default ) {
			$tktrow = 1;
			foreach ( $all_tickets as $ticket ) {
				$template_args['datetime_tickets_list'] .= $this->_get_datetime_tickets_list_item( $dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default );
				$tktrow++;
			}
		}

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_attached_tickets_row.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}



	private function _get_datetime_tickets_list_item( $dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default ) {
		$tktid = !empty( $ticket ) ? $ticket->ID() : 0;
		$template_args = array(
			'dtt_row' => $default ? 'DTTNUM' : $dttrow,
			'tkt_row' => $default && empty( $dtt ) ? 'TKTNUM' : $tktrow,
			'datetime_ticket_checked' => in_array($tktid, (array) $datetime_tickets) ? ' checked="checked"' : '',
			'ticket_selected' => in_array($tktid, (array) $datetime_tickets) ? ' ticket-selected' : '',
			'TKT_name' => $default && empty( $dtt ) ? 'TKTNAME' : $ticket->get('TKT_name')
			);

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_dtt_tickets_list.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}




	private function _get_ticket_row( $tktrow, $ticket, $ticket_datetimes, $all_dtts, $default = FALSE ) {
		$prices = !empty($ticket) ? $ticket->get_many_related('Price') : $this->EE->load_model('Price')->get_all( array( array('PRC_is_default' => 1 ) ) );
		
		$template_args = array(
			'tkt_row' => $default ? 'TICKETNUM' : $tktrow,
			'TKT_name' => $default ? '' : $ticket->get('TKT_name'),
			'TKT_start_date' => $default ? '' : $ticket->get_date('TKT_start_date', 'Y-m-d h:i a'),
			'TKT_end_date' => $default ? '' : $ticket->get_date('TKT_end_date', 'Y-m-d h:i a' ),
			'TKT_status' => $default ? '' : $ticket->ticket_status(TRUE),
			'TKT_price' => $default ? '' : $ticket->get_pretty('TKT_price'),
			'TKT_qty' => $default ? '' : $ticket->get('TKT_qty'),
			'TKT_uses' => $default ? '' : $ticket->get('TKT_uses'),
			'TKT_min' => $default ? '' : $ticket->get('TKT_min'),
			'TKT_max' => $default ? '' : $ticket->get('TKT_max'),
			'TKT_sold' => $default ? 0 : $ticket->tickets_sold('ticket'),
			'TKT_ID' => $default ? 0 : $ticket->get('TKT_ID'),
			'TKT_description' => $default ? '' : $ticket->get('TKT_description'),
			'TKT_is_default' => $default ? 0 : $ticket->get('TKT_is_default'),
			'TKT_is_default_selector' => '',
			'ticket_price_rows' => $default ? '<tr class="hidden"><td colspan="4"></td></tr>' : '',
			'total_price_rows' => count($prices),
			'ticket_datetimes_list' => $default ? '<li class="hidden"></li>' : '',
			'starting_ticket_datetime_ids' => implode(',', (array) $ticket_datetimes),
			'existing_ticket_price_ids' => $default, '', implode(',', array_keys( $prices) ),
			'ticket_template_id' => $default ? 1 : $ticket->get('TTM_ID')
			);

		//generate ticket_datetime items
		if ( ! $default ) {
			$dttrow = 1;
			foreach ( $all_dtts as $dtt ) {
				$template_args['ticket_datetimes_list'] .= $this->_get_ticket_datetime_list_item( $dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default );
				$dttrow++;
			}

			//generate all price rows
			$prcrow = 1;
			foreach ( $prices as $price ) {
				$show_trash = ( count( $prices ) > 1 && $prcrow === 1 ) || count( $prices === 1 ) ? FALSE : TRUE;
				$show_create = count( $prices ) > 1 && count( $prices ) !== $prcrow ? FALSE : TRUE;
				$template_args['ticket_price_rows'] .= $this->_get_ticket_price_row( $tktrow, $prcrow, $price, $default, $show_trash, $show_create );
				$prcrow++;
			}
		}

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_row.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}




	private function _get_ticket_price_row( $tktrow, $prcrow, $price, $default, $show_trash = TRUE, $show_create = TRUE ) {
		$template_args = array(
			'tkt_row' => $default ? 'TICKETNUM' : $tktrow,
			'prc_row' => $default ? 'PRICENUM' : $prcrow,
			'price_type_selector' => $default ? $this->_get_base_price_template( $tktrow, $prcrow, $price, $default ) : $this->_get_price_type_selector( $tktrow, $prcrow, $price, $default ),
			'PRC_ID' => $default ? 0 : $price->ID(),
			'PRC_is_default' => $default ? 0 : $price->get('PRC_is_default'),
			'PRC_name' => $default ? '' : $price->get('PRC_name'),
			'price_currency_symbol' => $this->EE->CFG->currency->sign,
			'show_plus_or_minus' => $default ? '' : ' style="display:none;"',
			'show_plus' => $default ? ' style="display:none;"' : ( $price->is_discount() ? ' style="display:none;"' : ''),
			'show_minus' => $default ? ' style="display:none;"' : ($price->is_discount() ? '' : ' style="display:none;"'),
			'show_currency_symbol' => $default ? ' style="display:none"' : ($price->is_percent() ? ' style="display:none"' : '' ),
			'PRC_amount' => $default ? 0 : $price->get('PRC_amount'),
			'show_percentage' => $default ? ' style="display:none;"' : ( $price->is_percent() ? '' : ' style="display:none;"' ),
			'show_trash_icon' => $show_trash ? '' : ' style="display:none;"',
			'show_create_button' => $show_create ? '' : ' style="display:none;"',
			'PRC_desc' => $default ? '' : $price->get('PRC_desc')
			);

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_price_row.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}


	private function _get_price_type_selector( $tktrow, $prcrow, $price, $default ) {
		if ( $price->is_base_price() ) {
			return $this->_get_base_price_template( $tktrow, $prcrow, $price, $default );
		} else {
			return $this->_get_price_modifier_template( $tktrow, $prcrow, $price, $default );
		}

	}


	private function _get_base_price_template( $tktrow, $prcrow, $price, $default ) {
		$template_args = array(
				'tkt_row' => $default ? 'TICKETNUM' : $tktrow,
				'prc_row' => $default ? 'PRICENUM' : $prcrow,
				'PRT_ID' => $default ? 1 : $price->get('PRT_ID'),
				'PRT_name' => __('Base Price', 'event_espresso'),
				'price_selected_operator' => '+',
				'price_selected_is_percent' => 0
			);
		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_type_base.template.php';

		return espresso_display_template( $template, $template_args, TRUE );
	}



	private function _get_price_modifier_template( $tktrow, $prcrow, $price, $default ) {
		$select_name = $default ? 'edit_prices[TICKETNUM][PRICENUM][PRT_ID]' : 'edit_prices[' . $tktrow . '][' . $prcrow . '][PRT_ID]';
		$price_types = $this->EE->load_model('Price_Type')->get_all(array( array('OR' => array('PBT_ID' => '2', 'PBT_ID*' => '3' ) ) ) );
		$price_option_span_template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_option_span.template.php';
		$all_price_types = $default ? array(array('id' => 0, 'text' => __('Select Modifier', 'event_espresso')) ) : array();
		$selected_price_type_id = $default ? 0 : $price->type();
		//setup pricetypes for selector
		foreach ( $price_types as $price_type ) {
			$all_price_types[] = array(
				'id' => $price_type->ID(),
				'text' => $price_type->get('PRT_name'),
				);
			$price_option_spans = '';

			//while we're in the loop let's setup the option spans used by js
			$spanargs = array(
				'PRT_ID' => $price_type->ID(),
				'PRT_operator' => $price_type->is_discount() ? '-' : '+',
				'PRT_is_percent' => $price_type->get('PRT_is_percent') ? 1 : 0
				);
			$price_option_spans .= espresso_display_template($price_option_span_template, $spanargs, TRUE );
		}

		$template_args = array(
			'tkt_row' => $default ? 'TICKETNUM' : $tktrow,
			'prc_row' => $default ? 'PRICENUM' : $prcrow,
			'price_modifier_selector' => EE_Form_Fields::select_input( $select_name, $all_price_types, $selected_price_type_id, 'style="width:auto;"', 'edit-price-PRT_ID' ),
			'price_option_spans' => $price_option_spans,
			'price_selected_operator' => $default ? '' : ( $price->is_discount() ? '-' : '+' ),
			'price_selected_is_percent' => $default ? '' : ( $price->is_percent() ? 1 : 0 )
			);

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_modifier_selector.template.php';

		return espresso_display_template( $template, $template_args, TRUE );
	}



	private function _get_ticket_datetime_list_item( $dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default ) {
		$dttid = !empty($dtt) ? $dtt->ID() : 0;
		$template_args = array(
			'dtt_row' => $default && empty( $ticket ) ? 'DTTNUM' : $dttrow,
			'tkt_row' => $default ? 'TICKETNUM' : $tktrow,
			'ticket_datetime_selected' => in_array( $dttid, (array) $ticket_datetimes ) ? ' ticket-selected' : '',
			'ticket_datetime_checked' => in_array( $dttid, (array) $ticket_datetimes ) ? ' checked="checked"' : '',
			'DTT_name' => $default && empty( $ticket ) ? 'DTTNAME' : $dtt->get_dtt_display_name()
			);

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_datetimes_list_item.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}



	private function _get_ticket_js_structure($all_dtts, $all_tickets) {
		$template_args = array(
			'default_datetime_edit_row' => $this->_get_dtt_edit_row('DTTNUM', NULL, TRUE),
			'default_ticket_row' => $this->_get_ticket_row( 'TICKETNUM', NULL, array(), array(), TRUE ),
			'default_price_row' => $this->_get_ticket_price_row( 'TICKETNUM', 'PRICENUM', NULL, TRUE ),
			'default_price_modifier_selector_row' => $this->_get_price_modifier_template( 'TICKETNUM', 'PRICENUM', NULL, TRUE ),
			'default_available_tickets_for_datetime' => $this->_get_dtt_attached_tickets_row( 'DTTNUM', NULL, array(), array(), TRUE ),
			'default_datetime_display_row' => $this->_get_dtt_display_row( 'DTTNUM', NULL, TRUE ),
			'existing_available_datetime_tickets_list' => '',
			'existing_available_ticket_datetimes_list' => '',
			'new_available_datetime_ticket_list_item' => $this->_get_datetime_tickets_list_item( 'DTTNUM', 'TICKETNUM', NULL, NULL, array(), TRUE ),
			'new_available_ticket_datetime_list_item' => $this->_get_ticket_datetime_list_item( 'DTTNUM', 'TICKETNUM', NULL, NULL, array(), TRUE )
			);

		$tktrow = 1;
		foreach ( $all_tickets as $ticket ) {
			$template_args['existing_available_datetime_tickets_list'] .= $this->_get_datetime_tickets_list_item( 'DTTNUM', $tktrow, NULL, $ticket, array(), TRUE );
			$tktrow++;
		}

		$dttrow = 1;
		foreach ( $all_dtts as $dtt ) {
			$template_args['existing_available_ticket_datetimes_list'] .= $this->_get_ticket_datetime_list_item( $dttrow, 'TICKETNUM', $dtt, NULL, array(), TRUE );
			$dttrow++;
		}

		$template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_js_structure.template.php';
		return espresso_display_template( $template, $template_args, TRUE );
	}


	/** experiemental box
	public function pricing_metabox() {
		$template = EVENTS_TEMPLATE_PATH . 'new_price_layout.template.php';
		espresso_display_template($template);
	} /**/



} //end class espresso_events_Pricing_Hooks