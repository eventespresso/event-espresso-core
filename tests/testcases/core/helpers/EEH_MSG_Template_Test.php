<?php
/**
 * Contains test class for /core/helpers/EEH_MSG_Template.helper.php
 *
 * @since  		4.4.1
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the EEH_MSG_Template class.
 *
 * @since 		4.4.1
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EEH_MSG_Template_Test extends EE_UnitTestCase {


	/**
	 * @var EE_Message_Resource_Manager
	 */
	protected $_message_resource_manager;



	public function set_up() {
		parent::set_up();
		$this->_message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$this->assertInstanceOf( 'EE_Message_Resource_Manager', $this->_message_resource_manager );
	}


	public function tear_down() {
		parent::tear_down();
		$this->_message_resource_manager = null;
	}


	/**
	 * test messenger that should be active
	 *
	 * @since 4.4.1
	 */
	public function test_get_active_messenger() {
		EEH_Activation::generate_default_message_templates();
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$this->assertInstanceOf(
			'EE_messenger',
			$Message_Resource_Manager->get_active_messenger( 'email' )
		);
		$this->assertNotInstanceOf(
			'EE_messenger',
			$Message_Resource_Manager->get_active_messenger( 'some_random_messenger' )
		);
	}


	/**
	 * @since 4.9.0
	 */
	public function test_create_new_templates() {
		//let's first delete known global templates for the purpose of the test
		$MessageTemplateGroup = EEM_Message_Template_Group::instance()->get_one(
			array(
				array(
					'MTP_messenger' => 'html',
					'MTP_message_type' => 'invoice',
					'MTP_is_global' => true
				)
			)
		);

		$this->assertInstanceOf( 'EE_Message_Template_Group', $MessageTemplateGroup );
		$MessageTemplateGroup->delete_related_permanently( 'Message_Template' );
		$MessageTemplateGroup->delete_permanently();

		//try to retrieve again just to verify its been deleted.
		$MessageTemplateGroup = EEM_Message_Template_Group::instance()->get_one(
			array(
				array(
					'MTP_messenger' => 'html',
					'MTP_message_type' => 'invoice',
					'MTP_is_global' => true
				)
			)
		);
		$this->assertNull( $MessageTemplateGroup );

		//okay now we can do our create templates test.
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		$templates = EEH_MSG_Template::create_new_templates(
			'html',
			'invoice',
			0,
			true
		);
		$this->assertTrue( is_array( $templates ) );
		$this->assertEquals( 2, count( $templates ) );
		$this->assertTrue( isset( $templates['GRP_ID'] ) );
		$this->assertTrue( isset( $templates['MTP_context'] ) );
		$this->assertTrue( $templates['GRP_ID'] > 0 );
	}


} //end EEH_MSG_Template_Test
// Location: tests/testcases/core/helpers/EEH_MSG_Template_Test.php
