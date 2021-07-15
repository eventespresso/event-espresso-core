<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Question_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *  @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Question_Caps_Test
 *
 */
class EEM_Question_Caps_Test extends EE_UnitTestCase{
	/**
	 * test that they can read any questions by default
	 */
	function test_get_all__caps__read_frontend(){
		$this->assertEquals( EEM_Question::instance()->count(), EEM_Question::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );
	}
	/**
	 * test that questions aren't editable until you're logged in,
	 * then you can only edit your own non-system questions,
	 * and then you can edit others if you have that cap,
	 * and then you can edit others if you have that cap
	 */
	function test_get_all__caps__edit() {
        $this->loadFactories();
		//remove all questions currently existing
		EEM_Question::instance()->delete_permanently( EEM_Question::instance()->alter_query_params_so_deleted_and_undeleted_items_included(), false );
		$this->assertEquals( 0, EEM_Question::instance()->count( EEM_Question::instance()->alter_query_params_so_deleted_and_undeleted_items_included() ) );
		global $current_user;
		$user = $this->factory->user->create_and_get();
		$this->assertEquals( 0, EEM_Question::instance()->count( array( 'caps' => EEM_Base::caps_edit ) ) );

		//now log in and see I can edit my own
		$current_user = $user;
		$user->add_cap( 'ee_edit_questions');
		$q1 = $this->new_model_obj_with_dependencies( 'Question', array( 'QST_system' => '', 'QST_wp_user' => $user->ID ) );
		$q2_system = $this->new_model_obj_with_dependencies( 'Question', array( 'QST_system' => 'something', 'QST_wp_user' => $user->ID ) );
		$q3_others = $this->new_model_obj_with_dependencies( 'Question', array( 'QST_system' => '', 'QST_wp_user' => 9999 ) );
		$q4_others_system = $this->new_model_obj_with_dependencies( 'Question', array( 'QST_system' => 'somethingelse', 'QST_wp_user' => 9999 ) );
		$i_can_edit = EEM_Question::instance()->get_all( array( 'caps' => EEM_Base::caps_edit ) );
		$this->assertEquals( $q1, reset( $i_can_edit ) );
		$this->assertEquals( $q3_others, next( $i_can_edit ) );
		$this->assertEquals( 2, count( $i_can_edit ) );

		//now give them the ability to edit system questions
		$user->add_cap( 'ee_edit_system_questions' );
		$i_can_edit = EEM_Question::instance()->get_all( array( 'caps' => EEM_Base::caps_edit ) );
		$this->assertEquals( $q1, reset( $i_can_edit ) );
		$this->assertEquals( $q2_system, next( $i_can_edit ) );
		$this->assertEquals( $q3_others, next( $i_can_edit ) );
		$this->assertEquals( $q4_others_system, next( $i_can_edit ) );
		$this->assertEquals( 4, count( $i_can_edit ) );
	}
}

// End of file EEM_Question_Test.php