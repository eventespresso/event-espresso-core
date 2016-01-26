<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Message_Type_Collection_Loader
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Message_Type_Collection_Loader {


	/**
	 * @type EE_Message_Type_Collection $_message_type_collection
	 */
	protected $_message_type_collection = null;



	/**
	 * EE_Message_Type_Collection_Loader constructor.
	 *
	 * @param EE_Message_Type_Collection $message_types
	 */
	public function __construct( EE_Message_Type_Collection $message_types ) {
		$this->set_message_type_collection( $message_types );
	}



	/**
	 * @return EE_Message_Type_Collection
	 */
	public function message_type_collection() {
		return $this->_message_type_collection;
	}



	/**
	 * @param mixed $message_types
	 */
	public function set_message_type_collection( EE_Message_Type_Collection $message_types ) {
		$this->_message_type_collection = $message_types;
	}



	/**
	 * load_message_types
	 * globs the supplied filepath and adds any found
	 *
	 * @param  string $folder
	 * @throws \EE_Error
	 */
	public function load_message_types_from_folder( $folder = '' ) {
		//make sure autoloaders are set (fail-safe)
		EED_Messages::set_autoloaders();
		$folder = ! empty( $folder ) ? $folder : EE_LIBRARIES . 'messages' . DS . 'message_type';
		$folder .= $folder[ strlen( $folder ) - 1 ] != DS ? DS : '';
		// get all the files in that folder that end in ".class.php
		$filepaths = apply_filters(
			'FHEE__EE_messages__get_installed__messagetype_files',
			glob( $folder . '*.class.php' )
		);
		if ( empty( $filepaths ) ) {
			return;
		}
		foreach ( (array) $filepaths as $file_path ) {
			// extract filename from path
			$file_path = basename( $file_path );
			// now remove any file extensions
			$message_type_class_name = substr( $file_path, 0, strpos( $file_path, '.' ) );
			if ( ! class_exists( $message_type_class_name ) ) {
				throw new EE_Error(
					sprintf(
						__( 'The "%1$s" message type class is either invalid or not installed', 'event_espresso' ),
						$message_type_class_name
					)
				);
			}
			$message_type = new $message_type_class_name();
			if ( $this->message_type_collection()->has_by_name( $message_type->name ) ) {
				continue;
			}
			$this->message_type_collection()->add(
				$message_type,
				$message_type->name
			);
		}
	}




}



// End of file EE_Message_Type_Collection_Loader.lib.php
// Location: /core/libraries/messages/EE_Message_Type_Collection_Loader.lib.php