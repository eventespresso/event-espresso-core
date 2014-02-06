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
		$actions['check_in'] = '
			<a href="'.$check_in_url.'" title="' . __( 'The Check-In List allows you to easily toggle check-in status for this event', 'event_espresso' ) . '">' . __( 'View Check-ins', 'event_espresso' ) . '</a>';
		
		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->get_first_related('Transaction')->ID() ), TXN_ADMIN_URL );	
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">' . $item->reg_date() . '</a>';	

		return sprintf('%1$s %2$s', $REG_date, $this->row_actions($actions) );		

	}




	/**
	 * 		column_default
	*/
   	function column_DTT_EVT_start(EE_Registration $item){
		$datetime_strings = array();
		$remove_defaults = array('default_where_conditions' => 'none');
		$ticket = $item->ticket();
		$datetimes = !empty($ticket) ? $ticket->datetimes($remove_defaults) : array();
		$query_args = array(
			'action'=>'event_registrations',
			'event_id'=>$item->event_ID()
			);
		foreach($datetimes as $datetime){
			$query_args['DTT_ID'] = $datetime->ID();
			$checkin_url = EE_Admin_Page::add_query_args_and_nonce( $query_args, REG_ADMIN_URL );
			$datetime_strings[] = '<a href="' . $checkin_url . '" title="' . __( 'View Checkins for this Event', 'event_espresso' ) . '">' . $datetime->start_date_and_time() . '</a>';
		}
		return implode("<br />",$datetime_strings);
    }



} //end Extend_EE_Registrations_List_Table