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
class EE_Register_Model {
	/**
	 *
	 * @var array keys are the model_id used to register with, values are the array provided to register them, exactly like EE_Register_Model::register()'s 2nd arg
	 */
	protected static $_model_registry;
	
	/**
	 *
	 * @var array keys are model names, values are their classnames. Stored on registration and used
	 * on a hook
	 */
	protected static $_model_name_to_classname_map;
	 /**
	  * @param string $model_id unique id for it
	  * @param array $config{
	  *		@type array model_paths array of folders containing DB models, where each file follows the models naming convention,
	  *			which is: EEM_{model_name}.model.php which contains a single class called EEM_{model_name}. Eg. you could pass
	  *			"public_html/wp-content/plugins/my_addon/db_models" (with or without trailing slash) and in that folder put 
	  *			each of your model files, like "EEM_Food.model.php" which contains the class "EEM_Food" and 
	  *			"EEM_Monkey.model.php" which contains the class "EEM_Monkey". These will be autoloaded and added to 
	  *			the EE registry so they can be used like ordinary models. The class contained in each file should extend EEM_Base.
	  *		@type array class_paths array of folders containing DB classes, where each file follows the model class namin convention,
	  *			which is EE_{model_name}.class.php. The class contained in each file should extend EE_Base_Class
	  *		@type array model_extension_paths array of folders containing DB model extensions, where each file follows the models naming convention, which is: EEME_{your_plugin_slug}_{model_name_extended}.model_ext.php. Where {your_plugin_slug} is really anything you want (but something having to do with your addon, like 'Calendar' or '3D_View') and {model_name_extended} is the model extended. The class contained in teh file should extend EEME_Base
	  *		@type array class_extension_paths array of folders containgn DB class extensions, where each file follows the model class exntesion naming convention, which is: EEE_{your_plugin_slug}_{moel_name_extended}.class_ext.php. Where {your_plugin_slug} is something like 'Calendar','Mailchimp',etc, and {model_name_extended} is the name of the model extended, eg 'Attendee','Event',etc. THe class contained in the file should extend EEE_Base_Class.
	  * 
	  * }
	  */
	public static function register($model_id,$config){
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_Admin__loaded' )) {
            EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('An attempt was made to register "%s" as a group models has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register models.','event_espresso'),
					$model_id
				),
				'4.3'
			);
        }
		self::$_model_registry[$model_id] = $config;
		EE_Registry::instance()->load_helper('File');
		if(isset($config['model_paths'])){
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
			$class_to_filepath_map = EEH_File::get_contents_of_folders($config['class_paths']);
			EEH_Autoloader::register_autoloader($class_to_filepath_map);
			add_filter('FHEE__EE_Registry__load_class__paths',array('EE_Register_Model','add_class_folders'));
			unset($config['class_paths']);
		}
		if(isset($config['model_extension_paths'])){
			require_once(EE_LIBRARIES.'plugin_api/db/EEME_Base.lib.php');
			$class_to_filepath_map = EEH_File::get_contents_of_folders($config['model_extension_paths']);
			EEH_Autoloader::register_autoloader($class_to_filepath_map);
			foreach(array_keys($class_to_filepath_map) as $classname){
				new $classname;
			}
			unset($config['model_extension_paths']);
		}
		if(isset($config['class_extension_paths'])){
			require_once(EE_LIBRARIES.'plugin_api/db/EEE_Base_Class.lib.php');
			$class_to_filepath_map = EEH_File::get_contents_of_folders($config['class_extension_paths']);
			EEH_Autoloader::register_autoloader($class_to_filepath_map);
			foreach(array_keys($class_to_filepath_map) as $classname){
				new $classname;
			}
			unset($config['class_extension_paths']);
		}
		foreach($config as $unknown_key => $unknown_config){
			throw new EE_Error(sprintf(__("The key '%s' is not a known key for registering a model", "event_espresso"),$unknown_key));
		}
	}
	
	/**
	 * Filters the core list of models
	 * @param type $core_models
	 * @return array keys are model names (eg 'Event') and values are their classes (eg 'EE_Event')
	 */
	public static function add_addon_models($core_models){
		foreach(self::$_model_name_to_classname_map as $model_name_to_class_map){
			$core_models = array_merge($core_models,$model_name_to_class_map);
		}
		return $core_models;
	}
	/**
	 * Filters the list of model folders
	 * @param type $folders
	 * @return array of folder paths
	 */
	public static function add_model_folders($folders){
		foreach(self::$_model_registry as $config){
			if(isset($config['model_paths'])){
				$folders = array_merge($folders,$config['model_paths']);
			}
		}
		return $folders;
	}
	/**
	 * Filters the array of model calss paths
	 * @param type $folders
	 * @return array of folder paths
	 */
	public static function add_class_folders($folders){
		foreach(self::$_model_registry as $config){
			if(isset($config['class_paths'])){
				$folders = array_merge($folders,$config['class_paths']);
			}
		}
		return $folders;
	}
	
	
	
	public static function deregister($model_id){
		if(isset(self::$_model_registry[$model_id])){
			unset(self::$_model_registry[$model_id]);
		}
	}
}

// End of file EE_Register_Model_Extension.lib.php