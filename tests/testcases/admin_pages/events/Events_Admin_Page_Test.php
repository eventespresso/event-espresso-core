<?php

use EventEspresso\core\services\loaders\LoaderFactory;

/**
 *
 * This class contains all tests for the Events Admin Page (non decaf).
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 * @since          4.9
 * @group          admin
 * @group          ppt
 */
class Events_Admin_Page_Test extends EE_UnitTestCase
{

    /**
     * Holds the Events_Admin_Page Mock class
     *
     * @var Events_Admin_Page_Mock
     */
    protected $_admin_page;


    /**
     * This holds the EE_Event object for testing with
     *
     * @var EE_Event
     */
    protected $_event;


    public function setUp()
    {
        parent::setUp();
        $this->delayedAdminPageMocks('events');
    }


    public function tearDown()
    {
        unset($this->_admin_page);
        unset($this->_event);
        parent::tearDown();
    }


    /**
     * @param string $timezone
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _load_requirements($timezone = 'America/Vancouver')
    {
        $this->_admin_page = LoaderFactory::getLoader()->getNew('Events_Admin_Page_Mock');
        $this->_event      = $this->factory->event->create();
        $this->_event->set_timezone($timezone);
        $this->_event->save();
        $this->_set_default_dates($timezone);
    }


    /**
     * Tests the _delete_event method via the mock
     *
     * @see   https://events.codebasehq.com/projects/event-espresso/tickets/9699
     * @group 9699
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function test_delete_event()
    {
        $this->_load_requirements();
        $EVT_ID = $this->_event->ID();

        // creates and saves an array of integers including EVT_ID plus 2 sequential entries before and after
        update_option('ee_no_ticket_prices', range($EVT_ID - 2, $EVT_ID + 2));
        $espresso_no_ticket_prices = get_option('ee_no_ticket_prices', []);
        // verify that EVT_ID is now in the array
        $this->assertArrayContains($EVT_ID, $espresso_no_ticket_prices);

        $this->_admin_page->delete_event($EVT_ID);
        $this->assertEmpty(EEM_Event::instance()->get_one_by_ID($EVT_ID));

        // verify that EVT_ID is no longer in the 'ee_no_ticket_prices' array
        $espresso_no_ticket_prices = get_option('ee_no_ticket_prices', []);
        $this->assertArrayDoesNotContain($EVT_ID, $espresso_no_ticket_prices);
    }
}
// tests/testcases/admin_pages/events/Events_Admin_Page_Test.php
