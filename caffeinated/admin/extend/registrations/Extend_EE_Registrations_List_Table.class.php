<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link			{@link http://www.eventespresso.com}
 * @ since		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extend_EE_Registrations_List_Table
 *
 * @package			Event Espresso
 * @subpackage		caffeinated/admin/extend/registrations/Extend_EE_Registrations_List_Table.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */


class Extend_EE_Registrations_List_Table extends EE_Registrations_List_Table {




	/**
	 * 		REG_date
	*/
	function column_REG_date(EE_Registration $item){

		//Build row actions
		$actions = array();

		//Build row actions
		$check_in_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'event_registrations', 'event_id'=>$item->event_ID() ), REG_ADMIN_URL );
		$actions['check_in'] = EE_Registry::instance()->CAP->current_user_can( 'ee_read_checkin', 'espresso_registrations_registration_checkins', $item->ID() ) ? '
			<a href="'.$check_in_url.'" title="' . esc_attr__( 'The Check-In List allows you to easily toggle check-in status for this event', 'event_espresso' ) . '">' . __( 'View Check-ins', 'event_espresso' ) . '</a>' : __( 'View Check-ins', 'event_espresso' );

		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->transaction()->ID() ), TXN_ADMIN_URL );
		$REG_date = EE_Regisry::instance()->CAP->current_user_can( 'ee_read_transaction', 'espresso_transactions_view_transaction' ) ?  '<a href="'.$view_lnk_url.'" title="' . esc_attr__( 'View Transaction Details', 'event_espresso' ) . '">' . $item->get_i18n_datetime( 'REG_date' ) . '</a>' : $item->get_i18n_datetime( 'REG_date' );

		return sprintf('%1$s %2$s', $REG_date, $this->row_actions($actions) );

	}



	/**
	 *        column_default
	 *
	 * @param \EE_Registration $item
	 * @return string
	 */
   	public function column_DTT_EVT_start(EE_Registration $item){
		$remove_defaults = array('default_where_conditions' => 'none');
		$ticket = $item->ticket();
		$datetimes = $ticket instanceof EE_Ticket ? $ticket->datetimes($remove_defaults) : array();
	    $EVT_ID = $item->event_ID();
	    $datetime_string = '';
	    foreach( $datetimes as $datetime ){
		    if (
			    EE_Registry::instance()->CAP->current_user_can(
				    'ee_read_checkin',
				    'espresso_registrations_registration_checkins',
				    $item->ID()
			    )
		    ) {
			    // open "a" tag and "href"
			    $datetime_string .= '<a href="';
			    // checkin URL
			    $datetime_string .= EE_Admin_Page::add_query_args_and_nonce(
				    array(
					    'action'   => 'event_registrations',
					    'event_id' => $EVT_ID,
					    'DTT_ID'   => $datetime->ID(),
				    ),
				    REG_ADMIN_URL
			    );
			    // close "href"
			    $datetime_string .= '"';
			    // open "title" tag
			    $datetime_string .= ' title="';
			    // link title text
			    $datetime_string .= esc_attr__( 'View Checkins for this Event', 'event_espresso' );
			    // close "title" tag and end of "a" tag opening
			    $datetime_string .= '">';
			    // link text
			    $datetime_string .= $datetime->get_i18n_datetime( 'DTT_EVT_start' );
			    // close "a" tag
			    $datetime_string .= '</a>';
		    } else {
			    $datetime_string .= $datetime->get_i18n_datetime( 'DTT_EVT_start' );
		    }
		    // add a "View Registrations" link that filters list by event AND datetime
		    $datetime_string .= $this->row_actions(
			    array(
				    'event_datetime_filter' => '<a href="' . EE_Admin_Page::add_query_args_and_nonce(
						    array( 'event_id' => $EVT_ID, 'datetime_id' => $datetime->ID() ),
						    REG_ADMIN_URL
					    ) . '" title="' . sprintf(
						    esc_attr__(
							    'Filter this list to only show registrations for this datetime %s',
							    'event_espresso'
						    ),
						    $datetime->name()
					    ) . '">' . __( 'View Registrations', 'event_espresso' ) . '</a>'
			    )
		    );
		}
		return $datetime_string;
    }



} //end Extend_EE_Registrations_List_Table
