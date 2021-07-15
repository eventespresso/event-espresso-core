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
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Question_Group_Question_Caps_Test
 *
 */
class EEM_Question_Group_Question_Caps_Test extends EE_UnitTestCase{
	/**
	 * test that questions aren't editable until you're logged in,
	 * then you can only edit your own non-system questions,
	 * and then you can edit others if you have that cap,
	 * and then you can edit others if you have that cap
	 */
	function test_get_all__caps__edit() {
        $this->loadFactories();
		//verify we only start off with NO question gruops or question group questions
		EEM_Question_Group::instance()->delete_permanently( EEM_Question_Group::instance()->alter_query_params_so_deleted_and_undeleted_items_included(), false );
		$this->assertEquals( 0, EEM_Question_Group::instance()->count( EEM_Question_Group::instance()->alter_query_params_so_deleted_and_undeleted_items_included() ) );
		EEM_Question_Group_Question::instance()->delete( array(), false );
		$this->assertEquals( 0, EEM_Question_Group_Question::instance()->count() );
		global $current_user;
		$user = $this->factory->user->create_and_get();



		$qg1 = $this->new_model_obj_with_dependencies( 'Question_Group', array( 'QSG_system' => 0, 'QSG_wp_user' => $user->ID ) );
		$qg2_system = $this->new_model_obj_with_dependencies( 'Question_Group', array( 'QSG_system' => 3, 'QSG_wp_user' => $user->ID ) );
		$qg3_others = $this->new_model_obj_with_dependencies( 'Question_Group', array( 'QSG_system' => 0, 'QSG_wp_user' => 9999 ) );
		$qg4_others_system = $this->new_model_obj_with_dependencies( 'Question_Group', array( 'QSG_system' => 4, 'QSG_wp_user' => 9999 ) );
		$q = $this->new_model_obj_with_dependencies( 'Question' );
		$qgq1 = $this->new_model_obj_with_dependencies( 'Question_Group_Question', array( 'QST_ID' => $q->ID(), 'QSG_ID' => $qg1->ID() ) );
		$qgq2 = $this->new_model_obj_with_dependencies( 'Question_Group_Question', array( 'QST_ID' => $q->ID(), 'QSG_ID' => $qg2_system->ID() ) );
		$qgq3 = $this->new_model_obj_with_dependencies( 'Question_Group_Question', array( 'QST_ID' => $q->ID(), 'QSG_ID' => $qg3_others->ID() ) );
		$qgq4 = $this->new_model_obj_with_dependencies( 'Question_Group_Question', array( 'QST_ID' => $q->ID(), 'QSG_ID' => $qg4_others_system->ID() ) );

		//I am not yet logged in, so I shouldnt be able to edit any
		$this->assertEquals( 0, EEM_Question_Group_Question::instance()->count( array( 'caps' => EEM_Base::caps_edit ) ) );

		//now log in and see I can edit my own
		$current_user = $user;
		$user->add_cap( 'ee_edit_question_groups');
		$i_can_edit = EEM_Question_Group_Question::instance()->get_all( array( 'caps' => EEM_Base::caps_edit ) );
		$this->assertEquals( $qgq1, reset( $i_can_edit ) );
		$this->assertEquals( $qgq3, next( $i_can_edit ) );
		$this->assertEquals( 2, count( $i_can_edit ) );

		//now give them the ability to edit system questions
		$user->add_cap( 'ee_edit_system_question_groups' );
		$i_can_edit = EEM_Question_Group_Question::instance()->get_all( array( 'caps' => EEM_Base::caps_edit ) );
		$this->assertEquals( $qgq1, reset( $i_can_edit ) );
		$this->assertEquals( $qgq2, next( $i_can_edit ) );
		$this->assertEquals( $qgq3, next( $i_can_edit ) );
		$this->assertEquals( $qgq4, next( $i_can_edit ) );
		$this->assertEquals( 4, count( $i_can_edit ) );
	}
}

// End of file EEM_Question_Test.php