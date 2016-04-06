<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Register_Model
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Register_Model implements EEI_Plugin_API {
	/**
	 *
	 * @var array keys are the model_id used to register with, values are the array provided to register them, exactly like EE_Register_Model::register()'s 2nd arg
	 */
	protected static $_model_registry;

	/**
	 *
	 * @var array keys are model names, values are their class names. Stored on registration and used
	 * on a hook
	 */
	protected static $_model_name_to_classname_map;



	/**
	 * @param string $model_id unique id for it
	 * @param array  $config   {
	 *		@type array $model_paths array of folders containing DB models, where each file follows the models naming convention,
	 *                         which is: EEM_{model_name}.model.php which contains a single class called EEM_{model_name}. Eg. you could pass
	 *                         "public_html/wp-content/plugins/my_addon/db_models" (with or without trailing slash) and in that folder put
	 *                         each of your model files, like "EEM_Food.model.php" which contains the class "EEM_Food" and
	 *                         "EEM_Monkey.model.php" which contains the class "EEM_Monkey". These will be autoloaded and added to
	 *                         the EE registry so they can be used like ordinary models. The class contained in each file should extend EEM_Base.
	 *		@type array $class_paths array of folders containing DB classes, where each file follows the model class naming convention,
	 *                         which is EE_{model_name}.class.php. The class contained in each file should extend EE_Base_Class
	 *
	 * }
	 * @throws EE_Error
	 */
	public static function register( $model_id = NULL, $config = array() ){
		//required fields MUST be present, so let's make sure they are.
		if ( empty( $model_id ) || ! is_array( $config ) || empty( $config['model_paths'] )) {
			throw new EE_Error( __( 'In order to register Models with EE_Register_Model::register(), you must include a "model_id" (a unique identifier for this set of models), and an array containing the following keys: "model_paths" (an array of full server paths to folders that contain models)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_model_registry[ $model_id ] ) ){
			return;
		}

		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'FHEE__EE_System__parse_model_names' ) || did_action( 'FHEE__EE_System__parse_implemented_model_names' )) {
            EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('An attempt was made to register "%s" as a group models has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register models.','event_espresso'),
					$model_id
				),
				'4.5'
			);
        }
		self::$_model_registry[$model_id] = $config;

		if( ( isset( $config['model_paths'] ) && ! isset( $config['class_paths'] ) ) ||
				( ! isset( $config['model_paths'] ) && isset( $config['class_paths'] ) ) ){
			throw new EE_Error( sprintf( __( 'You must register both "model_paths" AND "class_paths", not just one or the other You provided %s', 'event_espresso' ), implode(", ", array_keys( $config ) ) ) );
		}
		if(isset($config['model_paths'])){
			//make sure they passed in an array
			if( ! is_array( $config['model_paths'] ) ){
				$config['model_paths'] = array( $config['model_paths'] );
			}
			//we want to add this as a model folder
			//and autoload them all
			$class_to_filepath_map = EEH_File::get_contents_of_folders($config['model_paths']);
			EEH_Autoloader::register_autoloader($class_to_filepath_map);
			$model_name_to_classname_map = array();
			foreach(array_keys($class_to_filepath_map) as $classname){
				$model_name_to_classname_map[str_replace("EEM_","",$classname)] = $classname;
			}
			self::$_model_name_to_classname_map[$model_id] = $model_name_to_classname_map;
			add_filter('FHEE__EE_System__parse_model_names', array('EE_Register_Model','add_addon_models'));
			add_filter('FHEE__EE_System__parse_implemented_model_names', array('EE_Register_Model','add_addon_models'));
			add_filter('FHEE__EE_Registry__load_model__paths',array('EE_Register_Model','add_model_folders'));
			unset($config['model_paths']);
		}
		if(isset($config['class_paths'])){
			//make sure they passed in an array
			if( ! is_array( $config['class_paths'] ) ){
				$config['class_paths'] = array( $config['class_paths'] );
			}
			$class_to_filepath_map = EEH_File::get_contents_of_folders($config['class_paths']);
			EEH_Autoloader::register_autoloader($class_to_filepath_map);
			add_filter('FHEE__EE_Registry__load_class__paths',array('EE_Register_Model','add_class_folders'));
			unset($config['class_paths']);
		}
		foreach($config as $unknown_key => $unknown_config){
			self::deregister( $model_id );
			throw new EE_Error(sprintf(__("The key '%s' is not a known key for registering a model", "event_espresso"),$unknown_key));
		}
	}

	/**
	 * Filters the core list of models
	 * @param array $core_models
	 * @return array keys are model names (eg 'Event') and values are their classes (eg 'EE_Event')
	 */
	public static function add_addon_models( $core_models = array() ){
		foreach(self::$_model_name_to_classname_map as $model_name_to_class_map){
			$core_models = array_merge($core_models,$model_name_to_class_map);
		}
		return $core_models;
	}
	/**
	 * Filters the list of model folders
	 * @param array $folders
	 * @return array of folder paths
	 */
	public static function add_model_folders( $folders = array() ){
		foreach(self::$_model_registry as $config){
			if(isset($config['model_paths'])){
				$folders = array_merge($folders,$config['model_paths']);
			}
		}
		return $folders;
	}
	/**
	 * Filters the array of model class paths
	 * @param array $folders
	 * @return array of folder paths
	 */
	public static function add_class_folders( $folders = array() ){
		foreach(self::$_model_registry as $config){
			if(isset($config['class_paths'])){
				$folders = array_merge( $folders, $config['class_paths'] );
			}
		}
		return $folders;
	}



	/**
	 * deregister
	 * @param string $model_id
	 */
	public static function deregister( $model_id = NULL ){
		if( isset( self::$_model_registry[ $model_id ] ) ){
			unset( self::$_model_registry[ $model_id ] );
			unset( self::$_model_name_to_classname_map[ $model_id ] );
		}
	}
}

// End of file EE_Register_Model_Extension.lib.php
