<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * Events_Admin_Page_Decaf_Test
 * This class contains all tests for the decaf version of the Events Admin Page.
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 * @since 4.6
 * @group decaf
 *
 */
class Events_Admin_Page_Decaf_Test extends EE_UnitTestCase {


	/**
	 * This holds the Events_Admin_Page_Mock class
	 *
	 * @var Events_Admin_Page_Mock
	 */
	protected $_admin_page;


	/**
	 * This holds the EE_Event object for testing with.
	 *
	 * @var EE_Event
	 */
	protected $_event;


	/**
	 * @var boolean
	 */
	protected $useAdvancedEditor;




	public function setUp() {
		parent::setUp();
		$this->delayedAdminPageMocks( 'decaf_events' );
        $this->setupRequest();
        $this->useAdvancedEditor= EE_Registry::instance()->CFG->admin->useAdvancedEditor();
        EE_Registry::instance()->CFG->admin->setUseAdvancedEditor(false);
	}

	public function tearDown() {
		parent::tearDown();
        EE_Registry::instance()->CFG->admin->setUseAdvancedEditor($this->useAdvancedEditor);
	}


    /**
     * loader for setting the $_admin_page_property
     *
     * @param string $timezone Timezone string to initialize the times in.
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.6
     */
	protected function _load_requirements( $timezone = 'America/Vancouver' ) {
        $this->loadFactories();
		$this->_admin_page = new Events_Admin_Page_Mock();
		$this->_event = $this->factory->event->create();
		$this->_event->set_timezone( $timezone );
		$this->_event->save();
		$this->_set_default_dates( $timezone );
	}




	/**
	 * tests the decaf datetime and tickets update method for Events Admin Page with default data.
	 *
	 *@since 4.6
	 */
	public function test_tickets_update_with_default_data() {
		$this->_load_requirements();
		$this->_testing_updates( "Tests with Default Data\n" );
	}




	/**
	 * tests the decaf datetime and tickets update method for Events Admin Page.
	 *
	 *@since 4.6
	 */
	public function test_tickets_update() {
		$this->_load_requirements();

		//next test is with empty TKT_start and TKT_end dates.
		$replacement['edit_tickets']['1']['TKT_start_date'] = null;
		$replacement['edit_tickets']['1']['TKT_end_date'] = null;

        update_option('timezone_string', 'America/Vancouver');
        $tz = new DateTimeZone('America/Vancouver');

        //override _default_dates because we expect something different.
		$this->_default_dates['TKT_start'] = new DateTime( 'now', $tz );
		/**
		 *  TKT_start is set in the decaf ticket saves without seconds, so we need to set the seconds to zero as well for comparison.
		 */
		$this->_default_dates['TKT_start']->setTime(
		    $this->_default_dates['TKT_start']->format( 'H' ),
            $this->_default_dates['TKT_start']->format( 'i' )
        );
		/**
		 * tkt end date is the same as start date because here's the code execution in Events_Admin_page::default_tickets_update:
		 * 1. If no TKT_end_date, then set to DTT_EVT_start.
		 * 2. However, this means that DTT_EVT_start (because its static) will always be earlier than what the value for TKT_start_date is.
		 * 3. So later the code changes TKT_end_date to be the SAME as TKT_start_date and then sets it forward by a day.  So that's what our expected value will be.
		 */
		$this->_default_dates['TKT_end'] = clone $this->_default_dates['TKT_start'];
		$this->_default_dates['TKT_end'] = $this->_default_dates['TKT_end']->add( new DateInterval( 'P1D' ) );
		$this->_testing_updates( "Tests with unset tkt start and end date\n", $replacement );
	}


    protected function prepareSaveData(array $data_to_replace, $decaf_date_format)
    {
        $data = $this->_get_save_data($decaf_date_format);

        //is there any data to unset/replace?
        if (! empty($data_to_replace)) {
            //any data to unset?
            foreach ($data_to_replace as $top_level => $second_level) {
                if (is_array($second_level)) {
                    foreach ($second_level as $third_level => $fourth_level) {
                        if (is_array($fourth_level)) {
                            foreach ($fourth_level as $fifth_level => $sixth_level) {
                                if (is_null($sixth_level)) {
                                    unset($data_to_replace[ $top_level ][ $third_level ][ $fifth_level ]);
                                    unset($data[ $top_level ][ $third_level ][ $fifth_level ]);
                                }
                            }
                        } elseif (is_null($fourth_level)) {
                            unset($data_to_replace[ $top_level ][ $third_level ]);
                            unset($data[ $top_level ][ $third_level ]);
                        }
                    }
                } else {
                    if (is_null($second_level)) {
                        unset($data_to_replace[ $top_level ]);
                        unset($data[ $top_level ]);
                    }
                }
            }
            //moige
            $data = array_merge($data, $data_to_replace);
        }
        return $data;
	}


    /**
     * This is a common looped to test saves of ticket and datetime data.
     *
     * @param string $context_for_error_messages Used this to add context to any failed tests so
     *                                           you can easily verify what triggered it.
     * @param array  $data_to_replace            An array of replacements for the default data.
     *                                           Use null to indicate you want the key unset.
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.6
     */
	protected function _testing_updates( $context_for_error_messages, $data_to_replace = array() ) {

        $decaf_date_format = 'Y-m-d h:i a';
        $data = $this->prepareSaveData($data_to_replace, $decaf_date_format);

        $formats_to_test = $this->date_formats_to_test();

		$saved_dtts_for_tickets = $formats_for_compare = $saved_tkts = array();

		/**
		 * Note: Keep in mind, decaf does NOT provide the ability to choose the format that the dates are
		 * displayed in for the event editor.  So when we test comparing formats, it is important to set the
		 * format on the objects before retrieval.  Also important is that only the 'Y-m-d h:i a' format is used
		 * on the decaf editor form.  So we make sure the all the dates going in for the data are in the same format.
		 */

        foreach ($formats_to_test['date'] as $date_format) {
            foreach ($formats_to_test['time'] as $time_format) {
                $full_format = $date_format . ' ' . $time_format;
                $saved_data = $this->_admin_page->default_tickets_update($this->_event, $data);
                /** @var EE_Datetime $dtt */
                $dtt  = $saved_data[0];

                //verify datetime.
                $this->assertInstanceof('EE_Datetime', $dtt);
                //verify start and date
                $this->assertEquals(
                    $dtt->start_date_and_time($date_format, $time_format),
                    $this->_default_dates['DTT_start']->format($full_format),
                    $context_for_error_messages . sprintf('Start Date Format Tested: %s', $full_format)
                );
                $this->assertEquals(
                    $dtt->end_date_and_time($date_format, $time_format),
                    $this->_default_dates['DTT_end']->format($full_format),
                    $context_for_error_messages . sprintf('End Date Format Tested: %s', $full_format)
                );

                $saved_dtts_for_tickets[ $full_format ] = $dtt;
                $formats_for_compare[ $dtt->ID() ]      = [$date_format, $time_format];

                //verify tkts
                /** @var EE_Ticket[] $tkts */
                $tkts = $saved_data[1];
                foreach ($tkts as $tkt) {
                    $this->assertInstanceof(
                        'EE_Ticket',
                        $tkt,
                        $context_for_error_messages . sprintf('Format: %s', $full_format)
                    );

                    //verify start and date
                    //Note: currently this test sometimes fails depending on the timing of when it happens and how fast
                    // the server is. Whenever I've seen this fail its been off by 1 minute and that's because when the
                    // default dates for testing were created, they likely happened at the second turnover.
                    $this->assertDateWithinOneMinute(
                        $tkt->start_date($date_format, $time_format),
                        $this->_default_dates['TKT_start']->format($full_format),
                        $full_format,
                        $context_for_error_messages . sprintf(
                            'Start Ticket DateFormat Tested: %s',
                            $full_format
                        )
                    );
                    $this->assertDateWithinOneMinute(
                        $tkt->end_date($date_format, $time_format),
                        $this->_default_dates['TKT_end']->format($full_format),
                        $full_format,
                        $context_for_error_messages . sprintf(
                            'End Ticket Date Format Tested: %s',
                            $full_format
                        )
                    );

                    $saved_tkts[ $full_format ] = $tkt;
                }
            }
        }


        //now let's verify these items were saved corectly in the db.
		/*$new_tkts = $new_dtts = array();
		foreach ( $tkt as $format => $tkt ) {
			$new_tkts[$format] = EEM_Ticket::instance()->refresh_entity_map_from_db( $tkt->ID() );
		}

		foreach ( $saved_dtts_for_tickets[$full_format] as $format => $dtt ) {
			$new_dtts[$format] = EEM_Datetime::instance()->refresh_entity_map_from_db( $dtt->ID() );
		}/**/

		$new_event = EEM_Event::instance()->refresh_entity_map_from_db( $this->_event->ID() );
		$new_event->set_timezone( 'America/Vancouver' );

		$evt_dtts = $new_event->datetimes_ordered();

        //now let's do comparisons.
        foreach ($evt_dtts as $edtt) {
            $this->assertInstanceOf('EE_Datetime', $edtt);
            $formats = $formats_for_compare[ $edtt->ID() ];
            $format  = $formats[0] . ' ' . $formats[1];
            $this->assertEquals(
                $edtt->start_date_and_time($formats[0], $formats[1]),
                $this->_default_dates['DTT_start']->format($format),
                $context_for_error_messages . sprintf(
                    'DB DTT/Default DTT Start Date Format Checked: %s',
                    $format
                )
            );
            $this->assertEquals(
                $edtt->end_date_and_time($formats[0], $formats[1]),
                $this->_default_dates['DTT_end']->format($format),
                $context_for_error_messages . sprintf(
                    'DB DTT/Default DTT End Date Format Checked: %s',
                    $format
                )
            );
            $this->assertEquals(
                $edtt->start_date_and_time($formats[0], $formats[1]),
                $saved_dtts_for_tickets[ $format ]->start_date_and_time($formats[0], $formats[1]),
                $context_for_error_messages . sprintf(
                    'DB DTT/Orig DTT Start Date Format Checked: %s',
                    $format
                )
            );
            $this->assertEquals(
                $edtt->end_date_and_time($formats[0], $formats[1]),
                $saved_dtts_for_tickets[ $format ]->end_date_and_time($formats[0], $formats[1]),
                $context_for_error_messages . sprintf(
                    'DB DTT/Orig DTT End Date Format Checked: %s',
                    $format
                )
            );

            //get related ticket on this $edtt
            $evt_tkt = $edtt->get_first_related('Ticket');
            $this->assertDateWithinOneMinute(
                $evt_tkt->start_date($formats[0], $formats[1]),
                $this->_default_dates['TKT_start']->format($format),
                $format,
                $context_for_error_messages . sprintf(
                    'DB TKT/Default TKT Start Date Format Checked: %s',
                    $format
                )
            );
            $this->assertDateWithinOneMinute(
                $evt_tkt->end_date($formats[0], $formats[1]),
                $this->_default_dates['TKT_end']->format($format),
                $format,
                $context_for_error_messages . sprintf(
                    'DB TKT/Default TKT End Date Format Checked: %s',
                    $format
                )
            );
            $this->assertDateWithinOneMinute(
                $evt_tkt->start_date($formats[0], $formats[1]),
                $saved_tkts[ $format ]->start_date($formats[0], $formats[1]),
                $format,
                $context_for_error_messages . sprintf(
                    'DB TKT/Orig TKT Start Date Format Checked: %s',
                    $format
                )
            );
            $this->assertDateWithinOneMinute(
                $evt_tkt->end_date($formats[0], $formats[1]),
                $saved_tkts[ $format ]->end_date($formats[0], $formats[1]),
                $format,
                $context_for_error_messages . sprintf(
                    'DB TKT/Orig TKT End Date Format Checked: %s',
                    $format
                )
            );
        }
	}





}
// end class Events_Admin_Page_Decaf
// Location: testcases/admin_pages/events_decaf/Events_Admin_Page_Decaf_Test.php
