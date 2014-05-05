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
//	public function test_models_can_insert(){
//		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
//			$model_instance = EE_Registry::instance()->load_model($model);
//			$id = $model_instance->insert(array());
//			$this->assertNotEmpty($id);
//		}
//	}
}

// End of file EEM_Base_Test.php