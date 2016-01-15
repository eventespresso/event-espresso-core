<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Dependency_Map
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Dependency_Map {

	protected static $dependency_map = array();

	protected static $class_loaders = array();



	/**
	 * EE_Dependency_Map constructor.
	 */
	public function __construct() {
		$this->set_dependency_map();
		$this->set_class_loaders();
	}



	/**
	 * @return array
	 */
	public static function dependency_map() {
		return self::$dependency_map;
	}



	/**
	 * @access protected
	 * @param array $dependency_map
	 */
	protected function set_dependency_map( $dependency_map = array() ) {
		self::$dependency_map = ! empty( $dependency_map )
			? $dependency_map
			: array(
				'EE_Session' => array(
					'EE_Encryption',
				),
				'EE_Cart' => array(
					null,
					'EE_Session',
				),
				'EE_Front_Controller' => array(
					'EE_Registry',
					'EE_Request_Handler',
					'EE_Module_Request_Router',
				),
				'EE_Messenger_Collection_Loader' => array(
					'EE_Messenger_Collection',
				),
				'EE_Message_Type_Collection_Loader' => array(
					'EE_Message_Type_Collection',
				),
				'EE_Message_Resource_Manager' => array(
					'EE_Messenger_Collection_Loader',
					'EE_Message_Type_Collection_Loader',
					'EEM_Message_Template_Group',
				),
				'EE_Message_Factory' => array(
					'EE_Message_Resource_Manager',
				),
				'EE_Messages' => array(
					'EE_Message_Resource_Manager',
				),
				'EE_messages' => array(
					'EE_Message_Resource_Manager',
				),
			);
	}



	/**
	 * @param string $class_name
	 * @return array
	 */
	public static function class_loader( $class_name ) {
		return isset( self::$class_loaders[ $class_name ] ) ? self::$class_loaders[ $class_name ] : '';
	}



	/**
	 * @access protected
	 * @param array $class_loaders
	 */
	protected function set_class_loaders( $class_loaders = array() ) {
		self::$class_loaders = ! empty( $class_loaders )
			? $class_loaders
			: array(
				// load_core
				'EE_Encryption'                     => 'load_core',
				'EE_Module_Request_Router'          => 'load_core',
				'EE_Registry'                       => 'load_core',
				'EE_Request_Handler'                => 'load_core',
				'EE_Session'                        => 'load_core',
				// load_lib
				'EE_Message_Type_Collection'        => 'load_lib',
				'EE_Message_Resource_Manager'       => 'load_lib',
				'EE_Message_Type_Collection_Loader' => 'load_lib',
				'EE_Messenger_Collection'           => 'load_lib',
				'EE_Messenger_Collection_Loader'    => 'load_lib',
				'EEM_Message_Template_Group'        => 'load_lib',
			);
	}



}
// End of file EE_Dependency_Map.core.php
// Location: /EE_Dependency_Map.core.php