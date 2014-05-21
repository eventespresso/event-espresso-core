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
	 * Verifies taht for each model, the tables it claims to require have been installed
	 */
	public function test_model_tables_exist(){
		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
			$model_instance = EE_Registry::instance()->load_model($model);
			foreach($model_instance->get_tables() as $table_alias => $table_obj){
				$this->assertTableExists($table_obj->get_table_name(),$model);
			}
		}
	}
	/**
	 * We really should implement this function in the proper PHPunit style
	 * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
	 * @global type $wpdb
	 * @param type $table_name
	 * @param type $model_name
	 */
	private function assertTableExists($table_name,$model_name){
		global $wpdb;
		$exists =  $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $table_name;
		if( !$exists ){
			$this->assertTrue($exists,  sprintf(__("Table like %s does not exist as it was defined on the model %s", 'event_espresso'),$table_name,$model_name));
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
}

// End of file EEM_Base_Test.php