<?php
/**
 * This EE_UnitTest factory is used to create specific builds of EE objects and relationships
 * between objects based on a special incoming setup array.
 *
 * Typically used for building scenarios.
 *
 * @since 4.8.0
 * @package Event Espresso
 * @subpackage  tests
 */
class EE_UnitTest_Factory_for_Specific_Builds {

	/**
	 * @var EE_UnitTest_Factory
	 */
	protected $_factory;


	/**
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( EE_UnitTest_Factory $factory ) {
		$this->_factory = $factory;
	}


	/**
	 * This method builds the EE_Base_Class objects and their relationships
	 *
	 * @param string $model_name this should correspond to the name of a EEM_Base model class that is being built
	 * @param array $build_artifact  This is an array in a specific format:
	 *              {
	 *                  //numerically indexed values represent each object.
	 *                  0 => array(
	 *                      'fields' => array(
	 *                              //an array of fields to be used for the instantiated object
	 *                              'TKT_name' => 'Title of ticket'
	 *                               );
	 *                      'relations' => array(
	 *                               //this is an array of relations this particular object will be attached to.
	 *                               //the key is the class name for the EE_Base_Class object to be attached to.
	 *                               //the value is an array with the indexes of what the objects that get attached that are
	 *                               //found in the parent 'relations' array item in this main array.
	 *                               'Datetime' => array( 0, 1 )
	 *                               )
	 *                  ),
	 *                  'relations' => array(
	 *                              //this is an array of relations used by the object definitions in the numerically indexed
	 *                              //values of the main array.  The key should be the name of the model being related to,
	 *                              //the value should be the $build_artifact for the model.
	 *                               'Datetime' => $datetime_build_artifact_array
	 *                               )
	 *              }
	 * @param bool $save_to_db   Whether to save the objects to the database or not
	 * @throws Exception
	 * @return EE_Base_Class[]   the objects created.
	 */
	public function build( $model_name, $build_artifact, $save_to_db = true ) {
			$model_property = strtolower( $model_name );
			if ( ! property_exists( $this->_factory, $model_property ) ) {
				throw new Exception( sprintf( 'Unable to construct object because %s is not a property on the EE_UnitTest_Factory' ), $model_name );
			}

			$built_objects = array();
			$relations_objects = array();

			//first we need to build the relations if present for use
			if ( isset( $build_artifact['relations'] ) ) {
				foreach( $build_artifact['relations'] as $relation_name => $relation_artifact ) {
					$relations_objects[$relation_name] = $this->build( $relation_name, $relation_artifact, $save_to_db );
				}
				//unset relations
				unset( $build_artifact['relations'] );
			}

			//next build the main objects in the build_artifact
			foreach( $build_artifact as $index => $object_instructions ) {
				/**
				 * @type EE_Base_Class
				 */
				$built_object = $this->$model_property->create( $object_instructions['fields'] );
				if ( isset( $object_instructions['relations'] ) ) {
					foreach ( $object_instructions['relations'] as $object_relation_name => $relate_to_index ) {
						if ( isset( $relations_object[$object_relation_name][$relate_to_index] ) ) {
							$built_object->_add_relation_to( $object_relation_name, $relations_objects[$object_relation_name][$relate_to_index] );
							if ( $save_to_db ) {
								$built_object->save();
							}
						}
					}
				}
				$built_objects[] = $built_object;
			}
			return $built_objects;
	}
}