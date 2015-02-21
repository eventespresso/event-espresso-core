<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * espresso_events_Pricing_Hooks_Test
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 *
 */
class espresso_events_Pricing_Hooks_Test extends EE_UnitTestCase {


	/**
	 * This will hold the pricing hooks mock
	 *
	 * @var espresso_events_Pricing_Hooks_mock
	 */
	protected $_pricingMock;


	/**
	 * This is used to hold an initial event object that saved data will be added to.
	 *
	 * @var EE_Event
	 */
	protected $_event;



	/**
	 * This will hold an array of default dates.
	 *
	 * @var array
	 */
	protected $_default_dates;



	public function setUp() {
		parent::setUp();
		$this->loadAdminMocks();
	}




	/**
	 * loads the pricing mock object for tests
	 * @since 4.6
	 */
	protected function _load_pricing_mock() {
		$this->_pricingMock = new espresso_events_Pricing_Hooks_mock();
		$this->_event = $this->factory->event->create();
		$timezone = new DateTimeZone( 'America/Vancouver' );
		$this->_default_dates = array(
			'DTT_start' => new DateTime( '2015-02-20 11:30 am', $timezone ),
			'DTT_end' => new DateTime( '2015-02-20 2:00 pm', $timezone ),
			'TKT_start' => new DateTime( '2015-01-30 8:00 am', $timezone ),
			'TKT_end' => new DateTime( '2015-02-20 8:00 am', $timezone )
			);
	}


	/**
	 * This sets up some save data for use in testing updates and saves.
	 *
	 * @param string $format The format used for incoming date strings.
	 * @param string $prefix  A string to prefix the fields being assembled.  Used as a way of
	 *                        	    differentiating between multiple calls.
	 * @param string $row     Equals the value we want to give for row.
	 * @param bool|array $existing  Indicate whether you want data to be for existing tickets/
	 * datetimes.  If you want to use existing tickets and datetimes, then send an array in this format:
	 * array(
	 * 	'tickets' => array( EE_Ticket, EE_Ticket ),
	 * 	'datetimes' => array( EE_Datetime, EE_Datetime ),
	 * )
	 *
	 * @return array of data in post format from the save action.
	 */
	protected function _get_save_data( $format = 'Y-m-d h:i a', $prefix = '', $row = '1', $existing = false ) {
		$data = array(
			'starting_ticket_datetime_rows' => array(
				$row => ''
				),
			'ticket_datetime_rows' => array(
				$row => '1'
				),
			'datetime_IDs' => '',
			'edit_event_datetimes' => array(
				$row => array(
					'DTT_EVT_end' => $this->_default_dates['DTT_end']->format( $format ),
					'DTT_EVT_start' => $this->_default_dates['DTT_start']->format( $format ),
					'DTT_ID' => '0',
					'DTT_name' => $prefix . ' Datetime A',
					'DTT_description' => $prefix . ' Lorem Ipsum Emitetad',
					'DTT_reg_limit' => '',
					'DTT_order' => $row
					)
				),
			'edit_tickets' => array(
				$row => array(
					'TKT_ID' => '0',
					'TKT_base_price' => '0',
					'TKT_base_price_ID' => '1',
					'TTM_ID' => '0',
					'TKT_name' => $prefix . ' Ticket A',
					'TKT_description' => $prefix . ' Lorem Ipsum Tekcit',
					'TKT_start_date' => $this->_default_dates['TKT_start']->format( $format ),
					'TKT_end_date' => $this->_default_dates['TKT_end']->format( $format ),
					'TKT_qty' => '',
					'TKT_uses' => '',
					'TKT_min' => '',
					'TKT_max' => '',
					'TKT_row' => '',
					'TKT_order' => $row,
					'TKT_taxable' => '0',
					'TKT_required' => '0',
					'TKT_price' => '0',
					'TKT_is_default' => '0'
					)
				),
			'edit_prices' => array(
				$row => array(
					'PRT_ID' => '1',
					'PRC_ID' => '0',
					'PRC_amount' => '0',
					'PRC_name' => $prefix . ' Price A',
					'PRC_desc' => $prefix . ' Lorem Ipsum Ecirp',
					'PRC_is_default' => '1',
					'PRC_order' => $row
					)
				),
			'timezone_string' => 'America/Vancouver'
			);
		return $data;
	}






	/**
	 * Contains tests for the update_dtts method
	 * @since 4.6
	 */
	public function test_update_dtts() {
		$this->_load_pricing_mock();
		$formats_to_test = $this->date_formats_to_test();

		$saved_dtts_for_tickets = array();

		//test each date and time format combination for creating datetime objects
		foreach( $formats_to_test['date'] as $date_format ) {
			foreach( $formats_to_test['time'] as $time_format ) {
				$full_format = $date_format . ' ' . $time_format;
				$this->_pricingMock->set_date_format_strings( array( 'date' => $date_format, 'time' => $time_format ) );
				$data = $this->_get_save_data( $full_format );
				$dtts = $this->_pricingMock->update_dtts( $this->_event, $data );

				foreach ( $dtts as $dtt ) {
					$this->assertInstanceof( 'EE_Datetime', $dtt );

					//verify start and date
					$this->assertEquals( $dtt->start_date_and_time(), $this->_default_dates['DTT_start']->format( $full_format ), sprintf( 'Start Date Format Tested: %s', $full_format ) );
					$this->assertEquals( $dtt->end_date_and_time(), $this->_default_dates['DTT_end']->format( $full_format ), sprintf( 'End Date Format Tested: %s', $full_format ) );
				}

				$saved_dtts_for_tickets[$full_format] = $dtt;
			}
		}



		//test each date and time format combination for creating ticket objects
		foreach( $formats_to_test['date'] as $date_format ) {
			foreach( $formats_to_test['time'] as $time_format ) {
				$full_format = $date_format . ' ' . $time_format;
				$this->_pricingMock->set_date_format_strings( array( 'date' => $date_format, 'time' => $time_format ) );
				$data = $this->_get_save_data( $full_format );

				$dtt_for_ticket['1'] = $saved_dtts_for_tickets[$full_format];
				$tkts = $this->_pricingMock->update_tkts( $this->_event, $dtt_for_ticket, $data );

				foreach ( $tkts as $tkt ) {
					$this->assertInstanceof( 'EE_Ticket', $tkt );

					//verify start and date
					$this->assertEquals( $tkt->start_date(), $this->_default_dates['TKT_start']->format( $full_format ), sprintf( 'Start Date Format Tested: %s', $full_format ) );
					$this->assertEquals( $tkt->end_date(), $this->_default_dates['TKT_end']->format( $full_format ), sprintf( 'End Date Format Tested: %s', $full_format ) );
				}
			}
		}

	}


} //end class espresso_events_Pricing_Hooks_Test
