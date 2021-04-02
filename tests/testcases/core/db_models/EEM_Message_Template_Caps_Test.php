<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Message_Template_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Message_Template_Caps_Test
 *
 */
class EEM_Message_Template_Caps_Test extends EE_UnitTestCase{
/**
	 * Test that message templates are controlled properly by caps
	 * and then you can edit others if you have that cap,
	 * and then you can edit others if you have that cap
	 */
	function test_get_all__caps() {
        $this->loadFactories();
		//remove all questions currently existing
		EEM_Message_Template::instance()->delete( array(), false );
		$this->assertEquals( 0, EEM_Message_Template::instance()->count() );
		EEM_Message_Template_Group::instance()->delete_permanently( EEM_Message_Template_Group::instance()->alter_query_params_so_deleted_and_undeleted_items_included(), false );
		$this->assertEquals( 0, EEM_Message_Template_Group::instance()->count() );

		global $current_user;
		$user = $this->factory->user->create_and_get();
		$this->assertEquals( 0, EEM_Question::instance()->count( array( 'caps' => EEM_Base::caps_read_admin ) ) );

		//now log in and see I can edit my own
		$current_user = $user;
		$user->add_cap( 'ee_read_messages');
		$mtg1 = $this->new_model_obj_with_dependencies( 'Message_Template_Group', array( 'MTP_is_global' => false, 'MTP_user_id' => $user->ID ) );
		$mt1 = $this->new_model_obj_with_dependencies( 'Message_Template', array( 'GRP_ID' => $mtg1->ID() ) );

		$mtg2_others = $this->new_model_obj_with_dependencies( 'Message_Template_Group', array( 'MTP_is_global' => false, 'MTP_user_id' => 9999 ) );
		$mt2_others = $this->new_model_obj_with_dependencies( 'Message_Template', array( 'GRP_ID' => $mtg2_others->ID() ) );

		$mtg3_global = $this->new_model_obj_with_dependencies( 'Message_Template_Group', array( 'MTP_is_global' => true, 'MTP_user_id' => 9999 ) );
		$mt3_global = $this->new_model_obj_with_dependencies( 'Message_Template', array( 'GRP_ID' => $mtg3_global->ID() ) );

		$i_can_edit = EEM_Message_Template::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin ) );
		$this->assertEquals( $mt1, reset( $i_can_edit ) );
		$this->assertEquals( 1, count( $i_can_edit ) );

		//now give them the ability to read others messages
		$user->add_cap( 'ee_read_others_messages' );
		$i_can_edit = EEM_Message_Template::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin ) );
		$this->assertEquals( $mt1, reset( $i_can_edit ) );
		$this->assertEquals( $mt2_others, next( $i_can_edit ) );
		$this->assertEquals( 2, count( $i_can_edit ) );

		//now let them read global message
		$user->add_cap( 'ee_read_global_messages' );
		$i_can_edit = EEM_Message_Template::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin, 'order_by' => array( 'MTP_ID' => 'ASC' ) ) );
		$this->assertEquals( $mt1, reset( $i_can_edit ) );
		$this->assertEquals( $mt2_others, next( $i_can_edit ) );
		$this->assertEquals( $mt3_global, next( $i_can_edit ) );
		$this->assertEquals( 3, count( $i_can_edit ) );
	}
}

// End of file EEM_Message_Template_Test.php