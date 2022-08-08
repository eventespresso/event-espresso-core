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


    public function set_up()
    {
        parent::set_up();
        $this->delayedAdminPageMocks('events');
    }


    public function tear_down()
    {
        unset($this->_admin_page);
        unset($this->_event);
        parent::tear_down();
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

        $this->_admin_page->delete_event($EVT_ID);
        $this->assertEmpty(EEM_Event::instance()->get_one_by_ID($EVT_ID));
    }
}
// tests/testcases/admin_pages/events/Events_Admin_Page_Test.php
