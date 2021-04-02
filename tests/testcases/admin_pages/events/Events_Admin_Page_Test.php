<?php
/**
 *
 * This class contains all tests for the Events Admin Page (non decaf).
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 * @since 4.9
 * @group admin
 *
 */
class Events_Admin_Page_Test extends EE_UnitTestCase {

	/**
	 * Holds the Events_Admin_Page Mock class
	 * @var Events_Admin_Page_Mock
	 */
	protected $_admin_page;


	/**
	 * This holds the EE_Event object for testing with
	 * @var EE_Event
	 */
	protected $_event;
	
	
	
	public function setUp() {
		parent::setUp();
		$this->delayedAdminPageMocks( 'events' );
	}


    /**
     * @param string $timezone
     * @throws EE_Error
     * @throws ReflectionException
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
	 * Tests the _delete_event method via the mock
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/9699
	 * @group 9699
	 */
	public function test_delete_event() {
		$this->_load_requirements();
		//let's delete the event
		$this->_admin_page->delete_event( $this->_event->ID() );

		//assert it got deleted!
		$this->assertEmpty( EEM_Event::instance()->get_one_by_ID( $this->_event->ID() ) );
	}
}