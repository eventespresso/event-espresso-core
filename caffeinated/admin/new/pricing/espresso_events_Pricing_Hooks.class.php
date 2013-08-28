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
		$timezone = is_object( $evtobj ) ? $evtobj->tiemzone_string() : NULL;

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		/**
		 * 1. Start with retrieving Datetimes
		 * 2. For each datetime get related tickets
		 * 3. For each ticket get related prices
		 */
		
		$DTM = $this->EE->load_model('Datetime', array($timezone) );
		$times = $DTM->get_all_event_dates( $event_id );

		//do we get related tickets (i.e. is this a brand new event?)
		if ( $times[0]->get('DTT_ID') !== 0 ) {
			$main_template_args['total_dtt_rows'] = count($times);
			foreach ( $times as $time ) {
				$dttid = $time->get('DTT_ID');
				$existing_datetime_ids[] = $dttid;

				//tickets attached
				$related_tickets = $time->get_many_related('Ticket');

				//we can't actually setup rows in this loop yet cause we don't know all the unique tickets for this event yet (tickets are linked through all datetimes). So we're going to temporarily cache some of that information.

				//loop through and setup the ticket rows
				foreach ( $related_tickets as $ticket ) {
					$tktid = $ticket->get('TKT_ID');
					//we only want unique tickets in our final display!!
					if ( !in_array( $tktid, $existing_ticket_ids ) ) {
						$existing_ticket_ids[] = $tktid;
						$all_tickets[] = $ticket;
					}
					
					//temporary cache of this ticket info for this datetime for later processing of datetime rows.
					$datetime_tickets[$dttid][] = $tktid;

					//temporary cache of this datetime info for this ticket for later processing of ticket rows.
					if ( ! in_array( $dtt_id, $ticket_datetimes[$tktid] ) )
						$ticket_datetimes[$tktid][] = $dtt_id;

				}
			}

			$main_template_args['total_ticket_rows'] = count( $existing_ticket_ids );

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
		} else {

			//get default tickets that are use on initial creation.
			$all_tickets = $this->EE->load_model('Ticket')->get_all_default_tickets();
			$main_template_args['datetime_rows'] .= $this->_get_datetime_row( 1, $times[0], $datetime_tickets, $all_tickets, TRUE);

			$tktrow = 1;
			foreach ( $all_tickets as $ticket ) {
				$main_template_args['ticket_rows'] .= $this->_get_ticket_row( $tktrow, $ticket, $ticket_datetimes, $times );
			}
		}

		$main_template_args['ticket_js_structure'] = $this->_get_ticket_js_structure($times, $all_tickets);
		$template = PRICING_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php';
		espresso_display_template( $template, $main_template_args );
		return;
	}



	private function _get_datetime_row( EE_Datetime $dtt, $datetime_tickets, $all_tickets ) {
		//todo
	}



	private function _get_ticket_row( EE_Ticket $ticket, $ticket_datetimes, $all_dtts ) {
		//todo
	}



	private function _get_ticket_js_structure() {
		//todo
	}


	/** experiemental box
	public function pricing_metabox() {
		$template = EVENTS_TEMPLATE_PATH . 'new_price_layout.template.php';
		espresso_display_template($template);
	} /**/



} //end class espresso_events_Pricing_Hooks