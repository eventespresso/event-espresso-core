<?php
/**
 * All tests for the Messages_Admin_Page class
 *
 * @since 		4.9.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class Messages_Admin_Page_Test extends EE_UnitTestCase {


	/**
	 * @var Messages_Admin_Page_Mock
	 */
	protected $_MessagesAdminPage;


	/**
	 * @var EE_Message_Resource_Manager
	 */
	protected $_MessageResourceManager;


	public function setUp() {
		parent::setUp();
		$this->delayedAdminPageMocks( 'messages' );
		$this->_load_requirements();
	}



	protected function _load_requirements() {
		$this->_MessagesAdminPage = new Messages_Admin_Page_Mock();
		$this->_MessagesAdminPage->initializePage();
		$this->_MessageResourceManager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
	}


	/**
	 * This is testing that the active messenger settings option in the db does not get corrupted when activating a messenger.
	 * @group 9330
	 */
	public function test_activate_messenger_with_invalid_messenger() {
		$original_active_messenger_settings = $this->_MessageResourceManager->get_active_messengers_option( true );

		//activate a dummy messenger
		$activated = $this->_MessagesAdminPage->activate_messenger( 'dummy_messenger' );
		$this->assertFalse( $activated );

		//verify that the new active_messenger_settings is the same as the original so no corruption.
		$updated_active_messenger_settings = $this->_MessageResourceManager->get_active_messengers_option( true );
		$this->assertEquals( $original_active_messenger_settings, $updated_active_messenger_settings );
		//lets just reset notices because we don't care about them for this test.  This prevents a fail from automatically firing.
		EE_Error::reset_notices();
	}




	/**
	 * This is testing that the active messenger settings option in the db does not get corrupted when activating a messenger.
	 * @group 9330
	 */
	public function test_deactivate_messenger_with_valid_messenger() {
		$original_active_messenger_settings = $this->_MessageResourceManager->get_active_messengers_option( true );
		$this->assertTrue( isset( $original_active_messenger_settings['html'] ) );
		//unset manually the html messenger from this array so we'll have our expected array.
		unset( $original_active_messenger_settings['html'] );

		//deactivate an actual messenger
		$deactivated = $this->_MessagesAdminPage->deactivate_messenger( 'html' );

		$this->assertTrue( $deactivated );
		$updated_active_messenger_settings = $this->_MessageResourceManager->get_active_messengers_option( true );

		$this->assertEquals( $original_active_messenger_settings, $updated_active_messenger_settings );
		//lets just reset notices because we don't care about them for this test. This prevents a fail from automatically firing.
		EE_Error::reset_notices();
	}
}