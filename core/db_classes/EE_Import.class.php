<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
/**
 * EE_Import class
 *
 * @package				Event Espresso
 * @subpackage		includes/functions
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
 class EE_Import {


  // instance of the EE_Import object
	private static $_instance = NULL;

	private static $_csv_array = array();

	/**
	 *
	 * @var array of model names
	 */
	private static $_model_list = array();

	private static $_columns_to_save = array();


	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
  private function __construct() {
	}


	/**
	 *		@ singleton method used to instantiate class object
	 *		@ access public
	 *		@ return class instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Import )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 *	@ generates HTML for a file upload input and form
	 *	@ access 	public
	 * 	@param 	string 		$title - heading for the form
	 * 	@param 	string 		$intro - additional text explaing what to do
	 * 	@param 	string 		$page - EE Admin page to direct form to - in the form "espresso_{pageslug}"
	 * 	@param 	string 		$action - EE Admin page route array "action" that form will direct to
	 * 	@param 	string 		$type - type of file to import
	 *	@ return 	string
	 */
	public function upload_form ( $title, $intro, $form_url, $action, $type  ) {

		$form_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => $action ), $form_url );

		ob_start();
?>
	<div class="ee-upload-form-dv">
		<h3><?php echo $title;?></h3>
		<p><?php echo $intro;?></p>

		<form action="<?php echo $form_url?>" method="post" enctype="multipart/form-data">
			<input type="hidden" name="csv_submitted" value="TRUE" id="<?php echo time();?>">
			<input name="import" type="hidden" value="<?php echo $type;?>" />
			<input type="file" name="file[]" size="90" >
			<input class="button-primary" type="submit" value="<?php _e( 'Upload File', 'event_espresso' );?>">
		</form>

		<p class="ee-attention">
			<b><?php _e( 'Attention', 'event_espresso' );?></b><br/>
			<?php echo sprintf( __( 'Accepts .%s file types only.', 'event_espresso' ), $type ) ;?>
			<?php echo __( 'Please only import CSV files exported from Event Espresso, or compatible 3rd-party software.', 'event_espresso' );?>
		</p>

	</div>

<?php
		$uploader = ob_get_clean();
		return $uploader;
	}





	/**
	 *	@Import Event Espresso data - some code "borrowed" from event espresso csv_import.php
	 *	@access public
	 *	@return boolean success
	 */
	public function import() {

		require_once( EE_CLASSES . 'EE_CSV.class.php' );
		$this->EE_CSV = EE_CSV::instance();

		if ( isset( $_REQUEST['import'] )) {
			if( isset( $_POST['csv_submitted'] )) {

			    switch ( $_FILES['file']['error'][0] ) {
			        case UPLOAD_ERR_OK:
			            $error_msg = FALSE;
			            break;
			        case UPLOAD_ERR_INI_SIZE:
			            $error_msg = __("'The uploaded file exceeds the upload_max_filesize directive in php.ini.'", "event_espresso");
			            break;
			        case UPLOAD_ERR_FORM_SIZE:
			            $error_msg = __('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.', "event_espresso");
			            break;
			        case UPLOAD_ERR_PARTIAL:
			            $error_msg = __('The uploaded file was only partially uploaded.', "event_espresso");
			            break;
			        case UPLOAD_ERR_NO_FILE:
			            $error_msg = __('No file was uploaded.', "event_espresso");
			            break;
			        case UPLOAD_ERR_NO_TMP_DIR:
			            $error_msg = __('Missing a temporary folder.', "event_espresso");
			            break;
			        case UPLOAD_ERR_CANT_WRITE:
			            $error_msg = __('Failed to write file to disk.', "event_espresso");
			            break;
			        case UPLOAD_ERR_EXTENSION:
			            $error_msg = __('File upload stopped by extension.', "event_espresso");
			            break;
			        default:
			            $error_msg = __('An unknown error occurred and the file could not be uploaded', "event_espresso");
			            break;
			    }

				if ( ! $error_msg ) {

				    $filename	= $_FILES['file']['name'][0];
					$file_ext 		= substr( strrchr( $filename, '.' ), 1 );
				    $file_type 	= $_FILES['file']['type'][0];
				    $temp_file	= $_FILES['file']['tmp_name'][0];
				    $filesize    	= $_FILES['file']['size'][0] / 1024;//convert from bytes to KB

					if ( $file_ext=='csv' ) {

						$max_upload = $this->EE_CSV->get_max_upload_size();//max upload size in KB
						if ( $filesize < $max_upload || true) {

							$wp_upload_dir = str_replace( array( '\\', '/' ), DS, wp_upload_dir());
							$path_to_file = $wp_upload_dir['basedir'] . DS . 'espresso' . DS . $filename;

							if( move_uploaded_file( $temp_file, $path_to_file )) {

								// convert csv to array
								$this->csv_array = $this->EE_CSV->import_csv_to_model_data_array( $path_to_file );

								// was data successfully stored in an array?
								if ( is_array( $this->csv_array ) ) {

									$import_what = str_replace( 'csv_import_', '', $_REQUEST['action'] );
									$import_what = str_replace( '_', ' ', ucwords( $import_what ));
									$processed_data = $this->csv_array;
									$this->columns_to_save = FALSE;

									// if any imports require funcky processing, we'll catch them in the switch
									switch ($_REQUEST['action']) {

										case "import_events";
										case "event_list";
												$import_what = 'Event Details';
										break;

										case 'groupon_import_csv':
											$import_what = 'Groupon Codes';
											$processed_data = $this->process_groupon_codes();
										break;

									}
									// save processed codes to db
									if ( $this->EE_CSV->save_csv_to_db( $processed_data, $this->columns_to_save ) ) {
										return TRUE;

									}
								} else {
									// no array? must be an error
									EE_Error::add_error(sprintf(__("No file seems to have been uploaded", "event_espresso")), __FILE__, __FUNCTION__, __LINE__ );
									return FALSE;
								}

							} else {
								EE_Error::add_error(sprintf(__("%s was not successfully uploaded", "event_espresso"),$filename), __FILE__, __FUNCTION__, __LINE__ );
								return FALSE;
							}

						} else {
							EE_Error::add_error( sprintf(__("%s was too large of a file and could not be uploaded. The max filesize is %s' KB.", "event_espresso"),$filename,$max_upload), __FILE__, __FUNCTION__, __LINE__ );
							return FALSE;
						}

					} else {
						EE_Error::add_error( sprintf(__("%s  had an invalid file extension, not uploaded", "event_espresso"),$filename), __FILE__, __FUNCTION__, __LINE__ );
						return FALSE;
					}

				} else {
					EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
					return FALSE;
				}

			}
		}
		return;
	}





}
/* End of file EE_Import.class.php */
/* Location: /includes/classes/EE_Import.class.php */
?>