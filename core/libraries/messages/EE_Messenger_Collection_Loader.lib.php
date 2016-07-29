<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Messenger_Collection_Loader
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Messenger_Collection_Loader {



	/**
	 * @type EE_Messenger_Collection $_messenger_collection
	 */
	protected $_messenger_collection = null;



	/**
	 * EE_Messenger_Collection_Loader constructor.
	 *
	 * @param EE_Messenger_Collection $messengers
	 */
	public function __construct( EE_Messenger_Collection $messengers ) {
		$this->set_messenger_collection( $messengers );
	}



	/**
	 * @return EE_Messenger_Collection
	 */
	public function messenger_collection() {
		return $this->_messenger_collection;
	}



	/**
	 * @param mixed $messengers
	 */
	public function set_messenger_collection( EE_Messenger_Collection $messengers ) {
		$this->_messenger_collection = $messengers;
	}



	/**
	 * load_messengers
	 * globs the supplied filepath and adds any found
	 *
	 * @param  string $folder
	 * @throws \EE_Error
	 */
	public function load_messengers_from_folder( $folder = '' ) {
		//make sure autoloaders are set (fail-safe)
		EED_Messages::set_autoloaders();
		$folder = ! empty( $folder ) ? $folder : EE_LIBRARIES . 'messages' . DS . 'messenger';
		$folder .= $folder[ strlen( $folder ) - 1 ] != DS ? DS : '';
		// get all the files in that folder that end in ".class.php
		$filepaths = apply_filters(
			'FHEE__EE_messages__get_installed__messenger_files',
			glob( $folder . '*.class.php' )
		);
		if ( empty( $filepaths ) ) {
			return;
		}
		foreach ( (array) $filepaths as $file_path ) {
			// extract filename from path
			$file_path = basename( $file_path );
			// now remove any file extensions
			$messenger_class_name = substr( $file_path, 0, strpos( $file_path, '.' ) );

			//first check to see if the class name represents an actual messenger class.
			if ( strpos( strtolower( $messenger_class_name ), 'messenger' ) === false ) {
				continue;
			}

			if ( ! class_exists( $messenger_class_name ) ) {
				throw new EE_Error(
					sprintf(
						__( 'The "%1$s" messenger class can\'t be loaded from %2$s.  Likely there is a typo in the class name or the file name.', 'event_espresso' ),
						$messenger_class_name,
						$file_path
					)
				);
			}

			$this->_load_messenger( new $messenger_class_name() );
		}
	}


	/**
	 * load_messengers
	 * globs the supplied filepath and adds any found
	 *
	 * @return array
	 */
	public function load_active_messengers_from_db() {
		//make sure autoloaders are set (fail-safe)
		EED_Messages::set_autoloaders();
		$active_messengers = apply_filters(
			'FHEE__EEH_MSG_Template__get_active_messengers_in_db',
			get_option( 'ee_active_messengers', array() )
		);
		foreach ( (array) $active_messengers as $active_messenger_classname => $active_messenger ) {
			$this->_load_messenger( $active_messenger );
		}
	}



	/**
	 * load_messenger
	 *
	 * @param \EE_messenger $messenger
	 * @return bool
	 */
	protected function _load_messenger( EE_messenger $messenger ) {
		if ( $this->messenger_collection()->has_by_name( $messenger->name ) ) {
			return true;
		}
		return $this->messenger_collection()->add(
			$messenger,
			$messenger->name
		);
	}



}



// End of file EE_Messenger_Collection_Loader.lib.php
// Location: /core/libraries/messages/EE_Messenger_Collection_Loader.lib.php