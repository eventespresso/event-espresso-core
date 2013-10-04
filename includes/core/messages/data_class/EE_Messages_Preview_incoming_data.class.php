<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_Preview_incoming_data
 *
 * This prepares dummy data for all messages previews run in the back end.  The Preview Data is going to use a given event id for the data.  If that event is NOT provided then we'll retrieve the first three published events from the users database as a sample (or whatever is available if there aren't three).
 *
 * To assemble the preview data, I basically used the EE_Single_Page_Checkout class to server as a guide for what data objects are setup etc.  Any place there is input expected from registrants we just setup some dummy inputs.  Remember none of this is actually saved to the database.  It is all one time use for any generated previews.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_Preview_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_Preview_incoming_data extends EE_Messages_incoming_data {

	//some specific properties we need for this class
	private $_events = array();
	private $_attendees = array();
	private $_running_total = 0;


	/**
	 * For the constructor of this special preview class.  We're either looking for an event id or empty data.  If we have an event id (or ids) then we'll use that as the source for the "dummy" data.  If the data is empty then we'll get the first three published events from the users database and use that as a source.
	 * @param array $data
	 */
	public function __construct( $data = array() ) {
		
		$data = empty($data) ? array() : $data['event_ids'];
		$this->_setup_attendees_events();
		parent::__construct($data);
	}



	/**
	 * This will just setup the _events property in the expected format.
	 * @return void
	 */
	private function _setup_attendees_events() {

		//setup some attendee objects
		$attendees = $this->_get_some_attendees();

		//if empty $data we'll do a query to get some events from the server. otherwise we'll retrieve the event data for the given ids.
		$events = empty($this->_data) ? $this->_get_some_events() : $this->_get_some_events($this->_data);

		if ( count( $events ) < 1 ) {
			throw new EE_Error( __('We can\'t generate a preview for you because there are no active events in your database', 'event_espresso' ) );
		}



		//now let's loop and set up the _events property.  At the same time we'll set up attendee properties.
		

		//some variable for tracking things we can use later;
		$running_total = 0;

		//we'll actually use the generated line_item identifiers for our loop
		foreach( $events as $id => $event ) {
			$line_item = $id . '_dummy';
			$this->_events[$line_item]['ID'] = $id;
			$this->_events[$line_item]['line_ref'] = $line_item;
			$this->_events[$line_item]['name'] = $event->get('EVT_name');
			$this->_events[$line_item]['daytime_id'] = $event->primary_datetime()->ID();
			
			//we need to get the price details for this event (including the price objects etc);
			//first get all Ticket Objects for given event and pick the first ticket as the one we'll use.
			$TKT = $event->get_first_related('Datetime')->get_first_related('Ticket');

			//for the purpose of our example we're just going select the first price object as the one we'll use.
			$this->_events[$line_item]['ticket_obj'] = $TKT;
			$this->_events[$line_item]['ticket_price'] = $TKT->get_ticket_subtotal();
			$this->_events[$line_item]['ticket_id'] = $TKT->ID();
			$this->_events[$line_item]['ticket_desc'] = $TKT->get('TKT_description');
			$this->_events[$line_item]['pre_approval'] = 0; //we're going to ignore the event settings for this.
			$this->_events[$line_item]['meta'] = array(); //for now leaving as blank... we'll have the shortcode parser using the get_post_meta function.
			$line_total = count( $attendees ) * $TKT->get_ticket_subtotal();
			$this->_events[$line_item]['line_total'] = $line_total;
			$this->_events[$line_item]['total_attendees'] = count( $attendees );

			$running_total = $running_total + $line_total;

			//let's also setup the dummy attendees property!
			foreach ( $attendees as $att_key => $attendee ) {
				$this->_attendees[$att_key]['line_ref'][] = $line_item;  //so later it can be determined what events this attendee registered for!
				$this->_attendees[$att_key]['att_obj'] = $attendee;
			}
		}

		$this->_running_total = $running_total;

	}



	/**
	 * This just returns an array of dummy attendee objects that we'll use to attach to events for our preview data
	 *
	 * @access private
	 * @return array an array of attendee objects
	 */
	private function _get_some_attendees() {
		//let's just setup a dummy array of various attendee details
		$dummy_attendees = array(
			0 => array(
				'Luke',
				'Skywalker',
				'farfaraway@galaxy.sp',
				'804 Bantha Dr.',
				'',
				'Mos Eisley',
				32,
				'US',
				'f0r3e',
				'',
				'',
				'',
				'',
				FALSE,
				'999999991'
				),
			1 => array(
				'Princess',
				'Leia',
				'buns@fcn.al',
				'1456 Valley Way Boulevard',
				'',
				'Alderaan',
				15,
				'US',
				'c1h2c',
				'',
				'',
				'',
				'',
				FALSE,
				'999999992'
				),
			2 => array(
				'Yoda',
				'I Am',
				'arrivenot@emailbad.fr',
				'4th Tree',
				'',
				'Marsh',
				22,
				'US',
				'l18n',
				'',
				'',
				'',
				'',
				FALSE,
				'999999993'
				),
		);

		//let's generate the attendee objects
		$attendees = array();
		$var_array = array('fname','lname','email','address','address2','city','staid','cntry','zip','phone','social','comments','notes','deleted','attid');

		EE_Registry::instance()->load_class( 'Attendee', array(), FALSE, TRUE, TRUE );
		foreach ( $dummy_attendees as $dummy ) {
			$att = array_combine( $var_array, $dummy );
			extract($att);
			$attendees[] = EE_Attendee::new_instance(
				array(
					'ATT_fname' => $fname,
					'ATT_lname' => $lname,
					'ATT_address' => $address,
					'ATT_address2' => $address2,
					'ATT_city' => $city,
					'STA_ID' => $staid,
					'CNT_ISO' => $cntry,
					'ATT_zip' => $zip,
					'ATT_email' => $email,
					'ATT_phone' => $phone,
					'ATT_social' => $social,
					'ATT_comments' => $comments,
					'ATT_notes' => $notes,
					'ATT_ID' => $attid
				)
			);
		}

		return $attendees;
	}


	/**
	 * Return an array of event objects from the database
	 *
	 * If event ids are not included then we'll just retrieve the first published event from the database.
	 * 
	 * @param  array  $event_ids if set, this will be an array of event ids to obtain events for.
	 * @return array    An array of event objects from the db.
	 */
	private function _get_some_events( $event_ids = array() ) {
		global $wpdb;

		//HEY, if we have an evt_id then we want to make sure we use that for the preview (because a specific event template is being viewed);
		$event_ids = isset( $_REQUEST['evt_id'] ) && !empty($_REQUEST['evt_id'] ) ? array( $_REQUEST['evt_id'] ) : array();

		$limit = !empty( $event_ids ) ? '' : apply_filters( 'FHEE_EE_Messages_Preview_incoming_data_get_some_events_limit', '0,1' );

		$where = !empty($event_ids) ? array('EVT_ID' => array( 'IN', $event_ids ) ) : array();

		$events = EE_Registry::instance()->load_model('Event')->get_all(array($where, 'limit' => $limit ) );
		
		return $events;
	}






	protected function _setup_data() {

		//okay we can now calculate the taxes and setup a "grand_total" we'll use in the dummy txn object
		EE_Registry::instance()->load_class( 'Taxes', array(), FALSE, TRUE, TRUE );
		$this->taxes = EE_Taxes::calculate_taxes( $this->_running_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $this->_running_total );

		//guess what?  The EE_Session now has the grand total object and other stuff!  Why, because EE_Taxes::_calculate_taxes added the info to it.
		$session_data = EE_Registry::instance()->SSN->get_session_data();
		$this->grand_total_price_object = $session_data['grand_total_price_object'];



		//setup billing property
		//todo:  I'm only using this format for the array because its how the gateways currently setup this data.  I HATE IT and it needs fixed but I have no idea how many places in the code this data structure currently touches.  Once its fixed we'll have to fix it here and in the shortcode parsing where this particular property is accessed.  (See https://events.codebasehq.com/projects/event-espresso/tickets/2271) for related ticket.
		$this->billing = array(
			'first name' => 'Luke',
			'last name' => 'Skywalker',
			'email address' => 'farfaraway@galaxy.com',
			'address' => '804 Bantha Dr.',
			'city' => 'Mos Eisley',
			'state' => 'Section 7',
			'country' => 'Tatooine',
			'zip' => 'f0r3e',
			'ccv code' => 'xxx',
			'credit card #' => '999999xxxxxxxx',
			'expiry date' => '12 / 3000',
			'total_due' => $grand_total 
			);



		//setup txn property
		$this->txn = EE_Transaction::new_instance(
			array(
				'TXN_timestamp' => current_time('mysql'), //unix timestamp
				'TXN_total' => $grand_total, //txn_total
				'TXN_paid' => $grand_total, //txn_paid
				'STS_ID' => 'PAP', //sts_id
				'TXN_details' => 'Transaction was approved', //notes regarding transaction
				'TXN_session_data' => NULL, //dump of txn session object (we're just going to leave blank here)
				'TXN_hash_salt' => NULL, //hash salt blank as well
				'TXN_tax_data' => $this->taxes,
				'TXN_ID' => 999999
			)
		);

		//setup reg_objects
		//note we're seting up a reg object for each attendee in each event but ALSO adding to the reg_object array.
		$this->reg_objs = array();
		foreach ( $this->_attendees as $key => $attendee ) {
			//note we need to setup reg_objects for each event this attendee belongs to
			foreach ( $attendee['line_ref'] as $line_ref ) {
				$reg_array = array(
					'EVT_ID' => $this->_events[$line_ref]['ID'],
					'ATT_ID' => $attendee['att_obj']->ID(),
					'TXN_ID' => $this->txn->ID(),
					'TKT_ID' => $this->_events[$line_ref]['ticket_id'],
					'STS_ID' => 'RAP',
					'REG_date' => current_time('mysql'),
					'REG_final_price' => $this->_events[$line_ref]['ticket_price'],
					'REG_session' => 'dummy_session_id',
					'REG_code' => '1-dummy_generated_reg_code',
					'REG_url_link' => 'http://dummyregurllink.com',
					'REG_count' => $key,
					'REG_group_size' => $this->_events[$line_ref]['total_attendees'],
					'REG_att_is_going' => TRUE,
					'REG_ID' => 9999990 + (int) $line_ref
					);
				$REG_OBJ =  EE_Registration::new_instance( $reg_array );
				$this->_attendees[$key]['reg_objs'][$this->_events[$line_ref]['ID']] = $REG_OBJ;
				$this->reg_objs[] = $REG_OBJ;
			}
		}

		//events and attendees
		$this->events = $this->_events;
		$this->attendees = $this->_attendees;

		//setup primary attendee property
		$this->primary_attendee = array(
			'fname' => $this->_attendees[0]['att_obj']->fname(),
			'lname' => $this->_attendees[0]['att_obj']->lname(),
			'email' => $this->_attendees[0]['att_obj']->email()
			);

		//reg_info property
		//note this isn't referenced by any shortcode parsers so we'll ignore for now.
		$this->reg_info = array();


		//the below are just dummy items.
		$this->user_id = 1;
		$this->ip_address = '192.0.2.1';
		$this->user_agent = '';
		$this->init_access = current_time('mysql');
		$this->last_access = current_time('mysql');

	}

} //end EE_Messages_Preview_incoming_data class
