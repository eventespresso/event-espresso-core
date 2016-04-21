<?php
/**
 *
 * Class JobHandlerFile
 *
 * Base class for common implementations of JobHandlerInterface, but ones
 * which write to a temporary file
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\JobHandlerBaseClasses;

use EventEspressoBatchRequest\Helpers\BatchRequestException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



abstract class JobHandlerFile extends JobHandler {

	const temp_folder_name = 'batch_temp_folder';

	/**
	 *
	 * @var \EEHI_File
	 */
	protected $_file_helper = null;



	/**
	 * JobHandlerFile constructor.
	 *
	 * @param \EEHI_File|null $file_helper
	 */
	public function __construct( \EEHI_File $file_helper = null ) {
		if( ! $file_helper ) {
			$this->_file_helper = new \EEH_File();
		}
	}



	/**
	 * Creates a file
	 *
	 * @param string $job_id
	 * @param string $filename
	 * @param string $filetype
	 * @return string
	 * @throws \EventEspressoBatchRequest\Helpers\BatchRequestException
	 */
	public function create_file_from_job_with_name( $job_id, $filename, $filetype = 'application/ms-excel' ) {
		$filepath = '';
		try{
			$base_folder = $this->get_base_folder();
			$success = $this->_file_helper->ensure_folder_exists_and_is_writable(
				$base_folder . JobHandlerFile::temp_folder_name
			);
			if ( $success ) {
				$success = $this->_file_helper->ensure_folder_exists_and_is_writable(
					$base_folder . JobHandlerFile::temp_folder_name . DS . $job_id
				);
			}
			if( $success ) {
				$filepath = $base_folder . JobHandlerFile::temp_folder_name . DS . $job_id . DS. $filename;
				$success = $this->_file_helper->ensure_file_exists_and_is_writable( $filepath );
			}
			//let's add the .htaccess file so safari will open the file properly
			if( $success ) {
				$extension = \EEH_File::get_file_extension( $filepath );
				\EEH_File::write_to_file(
					$base_folder . JobHandlerFile::temp_folder_name . DS . $job_id . DS . '.htaccess',
					'AddType ' . $filetype . ' ' . $extension,
					'.htaccess'
				);
			}
			//those methods normally fail with an exception, but if not, let's do it
			if( ! $success ) {
				throw new \EE_Error( __( 'Could not create temporary file, an unknown error occurred', 'event_espresso' ) );
			}
		} catch( \EE_Error $e ) {
			throw new BatchRequestException(
				sprintf(
					__( 'Could not create temporary file for job %1$s, because: %2$s ', 'event_espresso' ),
					$job_id,
					$e->getMessage()
				),
				500,
				$e
			);
		}
		return $filepath;
	}

	/**
	 * Gets the URL to download the file
	 * @param string $filepath
	 * @return string url to file
	 */
	public function get_url_to_file( $filepath ) {
		return str_replace( $this->get_base_folder(), $this->get_base_url(), $filepath );
	}
	
	/**
	 * Gets the folder which will contain the "batch_temp_folder"
	 * @return string
	 */
	public function get_base_folder() {
		return apply_filters( 
			'FHEE__EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile__get_base_folder',
			EVENT_ESPRESSO_UPLOAD_DIR
		);
	}
	
	public function get_base_url() {
		return apply_filters( 
			'FHEE__EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile__get_base_url',
			EVENT_ESPRESSO_UPLOAD_URL
		);
		
	}
}

