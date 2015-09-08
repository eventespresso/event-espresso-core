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
	 * @param array $build_artifact  This is an array in a specific format:
	 *              array(
	 *                  //each top level element represents the object being parsed
	 *                 'Ticket' => array(
	 *                      0 => array(
	 *                          //fields are optional
	 *                          'fields' => array(
	 *                              //an array of fields to be used for the instantiated object
	 *                              'TKT_name' => 'Title of ticket'
	 *                               );
	 *                          'relations' => array(
	 *                               //this is an array of relations this particular object will be attached to.
	 *                               //the key is the class name for the EE_Base_Class object to be attached to.
	 *                               //the value is an array with the indexes of what the objects that get attached that are
	 *                               //found in the parent 'relations' array item in this main array.
	 *                               'Datetime' => array( 0, 1 )
	 *                               )
	 *                       )
	 *                  ),
	 *                  'Datetime' => array(
	 *                      0 => array(),
	 *                      1 => array()
	 *                   )
	 *              )
	 * @param bool $save_to_db   Whether to save the objects to the database or not
	 *
	 * @throws Exception
	 * @return array()   an array of EE_Base_Class objects created indexed by model object name.
	 */
	public function build( $build_artifact, $save_to_db = true ) {
		$built_objects = array();

		//first build all the individual objects.
		foreach ( $build_artifact as $model_name => $model_objects ) {
			$model_property = strtolower( $model_name );
			if ( ! property_exists( $this->_factory, $model_property ) ) {
				throw new Exception( sprintf( 'Unable to construct object because %s is not a property on the EE_UnitTest_Factory' ), $model_name );
			}
			foreach ( $model_objects as $index => $model_info ) {
				$fields                         = isset( $model_info['fields'] ) ? $model_info['fields'] : array();
				$built_objects[ $model_name ][$index] = $this->_factory->$model_property->create( $fields );
			}
		}

		//now setup the relations
		foreach ( $build_artifact as $model_name => $model_objects ) {
			foreach( $model_objects as $index => $model_info )
				if ( isset( $model_info['relations'] ) && is_array( $model_info['relations'] ) ) {
					foreach( $model_info['relations'] as $model_relation_name => $model_relation_info ) {
						$model_relation_info = (array) $model_relation_info;
						foreach( $model_relation_info as $relation_index ) {
							if ( isset( $built_objects[$model_name][$index] ) && isset( $built_objects[$model_relation_name][$relation_index] ) ) {
								$built_objects[$model_name][$index]->_add_relation_to( $built_objects[$model_relation_name][$relation_index], $model_relation_name );
								if ( $save_to_db ) {
									$built_objects[$model_name][$index]->save();
								}
							}
						}
					}
				}
		}
		return $built_objects;
	}
}