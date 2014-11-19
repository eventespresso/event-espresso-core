<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEM_Base_Test
 * Tests EEM_Base core functionality. And currently also does the job of making sure all existing models are setup correctly
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
/**
 * @group core/db_models
 */
class EEM_Base_Test extends EE_UnitTestCase{
	public function test_models_defined_ok(){
		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
			$model_instance = EE_Registry::instance()->load_model($model);
			$this->assertInstanceOf('EEM_Base', $model_instance);
			//checks their relations
			foreach($model_instance->relation_settings() as $relation_name => $relation_obj){
				//verify that each relation is named according to an existing model
				$related_model_instance = EE_Registry::instance()->load_model($relation_name);
				$this->assertInstanceOf('EE_Model_Relation_Base', $relation_obj);
			}
			foreach($model_instance->field_settings(true) as $field_name => $field_obj){
				$this->assertInstanceOf('EE_Model_Field_Base', $field_obj);
			}
		}
	}

	/**
	 * Verifies that for each model, the tables it claims to require have been installed
	 */
	public function test_model_tables_exist(){
		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
			$model_instance = EE_Registry::instance()->load_model($model);
			foreach($model_instance->get_tables() as $table_alias => $table_obj){
				$this->assertTableExists($table_obj->get_table_name(),$model);
			}
		}
	}
//	public function test_models_can_insert(){
//		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
//			$model_instance = EE_Registry::instance()->load_model($model);
//			$id = $model_instance->insert(array());
//			$this->assertNotEmpty($id);
//		}
//	}

	/**
	 * checks that EEM_Base::has_field works properly
	 */
	function test_has_field(){
		$this->assertTrue(EEM_Question::instance()->has_field('QST_ID'));
		$this->assertTrue(EEM_QUestion::instance()->has_field('QST_admin_only'));
		$this->assertFalse(EEM_Question::instance()->has_field('monkey brains'));
	}

	/**
	 * checks that adding a LIKE in teh WHERE clauses works ok
	 */
	function test_where_like(){
		$attendees_before = EEM_Attendee::instance()->get_all();
		$this->assertEmpty($attendees_before);

		$a = EE_Attendee::new_instance(array('ATT_email'=>'monkey123@hotmail.com'));
		$a->save();

		$attendees_after_insert = EEM_Attendee::instance()->get_all();
		$this->assertEquals(1,count($attendees_after_insert));

		$attendee_found = EEM_Attendee::instance()->get_one(array(array('ATT_email'=>array('LIKE','%key12%'))));
		$this->assertInstanceOf('EE_Attendee', $attendee_found);
		$this->assertEquals($a->ID(),$attendee_found->ID());
	}

	public function test_delete(){
		$e1 = EE_Event::new_instance();
		$e1->save();
		$e2 = EE_Event::new_instance();
		$e2->save();
		$e3 = EE_Event::new_instance();
		$e3->save();
		//now assert things are as they should be: the items are in teh Db and the entity map
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e1->ID() ), $e1 );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e2->ID() ), $e2 );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e3->ID() ), $e3 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e1->ID() ), $e1 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e2->ID() ), $e2 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e3->ID() ), $e3 );

		//now run a delete query that should have deleted $e1 and $e2
		EEM_Event::instance()->delete_permanently( array( array( 'EVT_ID' => array( '<=', $e2->ID() ) ) ) );

		//check $e1 and $e2 don't exist in the DB anymore
		$this->assertEmpty( EEM_Event::instance()->get_one_by_ID( $e1->ID() ) );
		$this->assertEmpty( EEM_Event::instance()->get_one_by_ID( $e2->ID() ) );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e3->ID() ), $e3 );
		//and now chekc $e1 and $e2 don't exist in the entity map either
		$this->assertEmpty( EEM_Event::instance()->get_from_entity_map( $e1->ID() ) );
		$this->assertEmpty( EEM_Event::instance()->get_from_entity_map( $e2->ID() ) );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e3->ID() ), $e3 );
	}

	public function test_get_col(){
		$att1 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'one' ) );
		$att2 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'two' ) );
		$att3 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'three' ) );
		$att4 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'four' ) );

		$all = EEM_Attendee::instance()->get_col();
		$this->assertArrayContains( $att1, $all );
		$this->assertArrayContains( $att2, $all );
		$this->assertArrayContains( $att3, $all );
		$this->assertArrayContains( $att4, $all );

		$just_two_and_threes_names = EEM_Attendee::instance()->get_col( array( array( 'ATT_fname' => array( 'IN', array( 'two', 'three' ) ) ) ), 'ATT_fname' );
		$this->assertArrayDoesNotContain( 'one', $just_two_and_threes_names );
		$this->assertArrayContains('two', $just_two_and_threes_names );
		$this->assertArrayContains( 'three', $just_two_and_threes_names );
		$this->assertArrayDoesNotContain( 'four', $just_two_and_threes_names );
	}

	/**
	 *
	 * @group current
	 */
	public function test_update__keeps_model_objs_in_sync(){
		$att1 = EE_Attendee::new_instance( array( 'ATT_fname' => 'one' ) );
		$att2 = EE_Attendee::new_instance( array( 'ATT_fname' => 'two' ) );
		$att3 = EE_Attendee::new_instance( array( 'ATT_fname' => 'three' ) );
		$att1->save();
		$att2->save();
		$att3->save();

		//test taht when do perform an update, the model objects are updated also
		$attm = EE_Registry::instance()->load_model( 'EEM_Attendee' );
		$attm->update( array( 'ATT_fname' => 'win' ), array( array( 'ATT_fname' => 'two' ) ) );
		$this->assertEquals( 'one', $att1->fname() );
		$this->assertEquals( 'win', $att2->fname() );
		$this->assertEquals( 'three', $att3->fname() );

		//now test doing an update that should be more efficient wehre we DON'T update
		//model objects
		$attm->update( array( 'ATT_fname' => 'win_again'), array( array( 'ATT_fname' => 'one' ) ), FALSE );
		$this->assertEquals( 'one', $att1->fname() );
		$this->assertEquals( 'win', $att2->fname() );
		$this->assertEquals( 'three', $att3->fname() );
		global $wpdb;
		$name_in_db = $wpdb->get_var( "select ATT_fname FROM " . $wpdb->prefix . "esp_attendee_meta WHERE ATT_ID = " . $att1->ID() );
		$this->assertEquals( 'win_again', $name_in_db );

		//also test to make sure there are no errors when there was nothing to update in the entity map
		$att4 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'four' ) );
		$wpdb->last_error = NULL;
		EEM_Attendee::instance()->update( array( 'ATT_fname' => 'lose' ), array( array( 'ATT_fname' => 'four' ) ) );
		$this->assertEmpty( $wpdb->last_error );

		//and that there are no errors when nothing at all is updated
		EEM_Attendee::instance()->update( array( 'ATT_fname' => 'lose_again'), array( array( 'ATT_fname' => 'nonexistent' ) ) );
		$this->assertEmpty( $wpdb->last_error );
	}
}

// End of file EEM_Base_Test.php
