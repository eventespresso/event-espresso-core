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
	
	
	
	protected function _load_requirements( $timezone = 'America/Vancouver' ) {
		$this->_admin_page = new Events_Admin_Page_Mock();
		$this->_event = $this->factory->event->create();
		$this->_event->set_timezone( $timezone );
		$this->_event->save();
		$this->_set_default_dates( $timezone );
	}
}