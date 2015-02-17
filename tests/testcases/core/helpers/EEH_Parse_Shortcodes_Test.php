<?php
/**
 * Contains test class for /core/helpers/EEH_Parse_Shortcodes.helper.php
 *
 * @since  		4.6
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the EEH_Parse_Shortcodes class.
 * The tests here are more integration type tests than pure unit tests due to the nature of the
 * messages system.
 *
 * @since 		4.6
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group messages
 * @group agg
 */
class EEH_Parse_Shortcodes_Test extends EE_UnitTestCase {


	/**
	 * This will hold the created event object on setup, which can then be used to grab expected
	 * data from.
	 *
	 * @var EE_Event
	 */
	protected $_event = null;



	/**
	 * This will hold the created datetime object on setup which can then be used to grab
	 * expected data from.
	 *
	 * @var EE_Datetime
	 */
	protected $_datetime = null;



	/**
	 * This will hold the created ticket object on setup which can then be used to grab expected
	 * data from.
	 *
	 * @var null
	 */
	protected $_ticket = null;



	public function setUp() {
		parent::setUp();

		//all shortcode parse tests will require a full event to be setup with some datetimes and tickets.
		$price = $this->factory->price_chained->create_object( array('PRC_name' => 'Not Free Price', 'PRC_amount' => '125.00' ) );
		$this->_ticket = $this->factory->ticket_chained->create_object( array( 'PRC_ID' => $price->ID() ) );
		//update ticket price
		$this->_ticket->set( 'TKT_price', '125.00' );
		$this->_datetime = $this->_ticket->first_datetime();
		$this->_event = $this->_datetime->event();
	}




	/**
	 * This grabs an EE_Messages_Addressee object for the Preview data handler.
	 *
	 * @return EE_Messages_Addressee
	 */
	protected function _get_addressee( $context = 'primary_attendee' ) {
		$data = new EE_Messages_Preview_incoming_data( array( 'event_ids' => array( $this->_event->ID() ) ) );

		/**
		 * @see EE_message_type::_init_data()
		 */
		$addressee_data = array(
			'billing' => $data->billing,
			'taxes' => $data->taxes,
			'tax_line_items' => $data->tax_line_items,
			'additional_line_items' => $data->additional_line_items,
			'grand_total_line_item' => $data->grand_total_line_item,
			'txn' => $data->txn,
			'payments' => $data->payments,
			'payment' => isset($data->payment) ? $data->payment : NULL,
			'reg_objs' => $data->reg_objs,
			'registrations' => $data->registrations,
			'datetimes' => $data->datetimes,
			'tickets' => $data->tickets,
			'line_items_with_children' => $data->line_items_with_children,
			'questions' => $data->questions,
			'answers' => $data->answers,
			'txn_status' => $data->txn_status,
			'total_ticket_count' => $data->total_ticket_count
			);

		if ( is_array( $data->primary_attendee_data ) ) {
			$addressee_data = array_merge( $addressee_data, $data->primary_attendee_data );
			$addressee_data['primary_att_obj'] = $data->primary_attendee_data['att_obj'];
			$addressee_data['primary_reg_obj'] = $data->primary_attendee_data['reg_obj'];
		}

		/**
		 * @see EE_message_type::_process_data()
		 */
		switch ( $context ) {
			case 'primary_attendee'  :
				$aee = $addressee_data;
				$aee['events'] = $data->events;
				$aee['attendees'] = $data->attendees;
				return new EE_Messages_Addressee( $aee );
				break;
			case 'attendee' :
				//for the purpose of testing we're just going to do ONE attendee
				$attendee = reset( $data->attendees );
				foreach ( $attendee as $item => $value ) {
					$aee[$item] = $value;
					if ( $item == 'line_ref' ) {
						foreach( $value as $event_id ) {
							$aee['events'][$event_id] = $data->events[$event_id];
						}
					}
				}
				$aee['reg_obj'] = array_shift( $attendee['reg_objs'] );
				$aee['attendees'] = $data->attendees;
				return new EE_Messages_Addressee( $aee );
				break;
			case 'admin' :
				//for the purpose of testing we're only setting up for the event we have active for testing.
				$aee['user_id'] = $this->_event->get( 'EVT_wp_user' );
				$aee['events'] = $data->events;
				$aee['attendees'] = $data->attendees;
				return new EE_Messages_Addressee( $aee );
		}

	}



	/**
	 * Tests parsing the message template for email messenger, payment received message
	 * type.
	 *
	 * @group 7585
	 * @since 4.6
	 */
	public function test_parsing_email_payment_received() {
		//grab the correct template  @see EE_message_type::_get_templates()
		$mtpg = EEM_Message_Template_Group::instance()->get_one( array( array(
			'MTP_messenger' => 'email',
			'MTP_message_type' => 'payment',
			'MTP_is_global' => true
			)));
		$all_templates = $mtpg->context_templates();

		foreach ( $all_templates as $context => $template_fields ) {
			foreach( $template_fields as $template_field=> $template_obj ) {
				$templates[$template_field][$context] = $template_obj->get('MTP_content');
			}
		}

		//instantiate messenger and message type objects
		$messenger = new EE_Email_messenger();
		$message_type = new EE_Payment_message_type();

		//grab valid shortcodes and setup for parser.
		$m_shortcodes = $messenger->get_valid_shortcodes();
		$mt_shortcodes = $message_type->get_valid_shortcodes();

		//just sending in the content field and primary_attendee context/data for testing.
		$template = $templates['content']['primary_attendee'];
		$valid_shortcodes = isset( $m_shortcodes['content'] ) ? $m_shortcodes['content'] : $mt_shortcodes['primary_attendee'];
		$data = $this->_get_addressee();

		EE_Registry::instance()->load_helper('Parse_Shortcodes');
		$parser = new EEH_Parse_Shortcodes();
		$parsed = $parser->parse_message_template( $template, $data, $valid_shortcodes, $message_type, $messenger, 'primary_attendee', $mtpg->ID() );

		//now that we have parsed let's test the results.

		//testing [TKT_QTY_PURCHASED]
		$expected = '<strong>Quantity Purchased:</strong> 3';
		$this->assertContains( $expected, $parsed, '[TKT_QTY_PURCHASED] shortcode was not parsed correctly to the expected value which is 3' );

	}



} //end class EEH_Parse_Shortcodes_Test
