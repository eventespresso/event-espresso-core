<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );
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
 
	private static $_table_list = array();
	
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
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
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
			<?php echo sprintf( __( 'Accepts .%s file types only. Maximum file name length (minus extension) is 15 characters. Anything over that will be truncated to 15 characters.', 'event_espresso' ), $type ) ;?>	
			<?php echo __( 'Please note that you may have to experiment with the import/export settings in your particular spreadsheet program before you find ones that work the best for you.', 'event_espresso' );?>	
		</p>

	</div>
		
<?php
		$uploader = ob_get_clean();
		return $uploader;
	}





	/**
	 *	@Import Event Espresso data - some code "borrowed" from event espresso csv_import.php
	 *	@access public
	 *	@return void
	 */	
	public function import() {
	
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_CSV.class.php' );
		$this->EE_CSV = EE_CSV::instance();

		if ( $_REQUEST['import'] ) {	
			if( isset( $_POST['csv_submitted'] )) {
			 
			    switch ( $_FILES['file']['error'][0] ) {
			        case UPLOAD_ERR_OK:
			            $error_msg = FALSE;
			            break;
			        case UPLOAD_ERR_INI_SIZE:
			            $error_msg = 'An error occured. The uploaded file exceeds the upload_max_filesize directive in php.ini.';
			            break;
			        case UPLOAD_ERR_FORM_SIZE:
			            $error_msg = 'An error occured. The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.';
			            break;
			        case UPLOAD_ERR_PARTIAL:
			            $error_msg = 'An error occured. The uploaded file was only partially uploaded.';
			            break;
			        case UPLOAD_ERR_NO_FILE:
			            $error_msg = 'An error occured. No file was uploaded.';
			            break;
			        case UPLOAD_ERR_NO_TMP_DIR:
			            $error_msg = 'An error occured. Missing a temporary folder.';
			            break;
			        case UPLOAD_ERR_CANT_WRITE:
			            $error_msg = 'An error occured. Failed to write file to disk.';
			            break;
			        case UPLOAD_ERR_EXTENSION:
			            $error_msg = 'An error occured. File upload stopped by extension.';
			            break;
			        default:
			            $error_msg = 'An unknown error occured and the file could not be uploaded';
			            break;
			    }
				
				if ( ! $error_msg ) {
	
				    $filename	= $_FILES['file']['name'][0];
					$file_ext 		= substr( strrchr( $filename, '.' ), 1 );
				    $file_type 	= $_FILES['file']['type'][0];
				    $temp_file	= $_FILES['file']['tmp_name'][0];
				    $filesize    	= $_FILES['file']['size'][0];		
	
					if ( $file_ext=='csv' ) {
					
						$max_upload = $this->EE_CSV->get_max_upload_size();
						
						if ( $filesize < $max_upload ) { 

							$wp_upload_dir = str_replace( array( '\\', '/' ), DS, wp_upload_dir());
							$path_to_file = $wp_upload_dir['basedir'] . DS . 'espresso' . DS . $filename;
							
							if( move_uploaded_file( $temp_file, $path_to_file )) {
								
//								if ( ! file_exists( $path_to_file )) {
//									echo '<h1>NO FILE FOR YOU!!!  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
//									die();
//								}
													
								// csv import export functions require a list of all event espresso tables
								$this->table_list = $this->EE_CSV->list_db_tables();
								// convert csv to array
								$this->csv_array = $this->EE_CSV->import_csv_to_array( $this->table_list, $path_to_file );
									
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
									if ( $result = $this->EE_CSV->save_csv_to_db( $this->table_list, $processed_data, $this->columns_to_save ) ) {
									
										//echo $this->import_success ( $import_what . ' have been successfully imported into the database.' );
										$this->EE_CSV->_notices['updates'][] = $import_what . ' have been successfully imported into the database.';
										add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
										return TRUE;
																		
									} else { 
										$this->EE_CSV->_notices['errors'][] = 'An error occured and the '.$import_what.' were not imported into the database.';
										add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
										return FALSE;
									}

								} else {
									// no array? must be an error
									add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
									return FALSE;
								}

							} else {
								$this->EE_CSV->_notices['errors'][] = $filename . ' was not successfully uploaded';
								add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
								return FALSE;
							} 
							
						} else {
							$this->EE_CSV->_notices['errors'][] = $filename . ' was too large of a file and could not be uploaded. The max filesize is ' . $max_upload . ' KB.';
							add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
							return FALSE;
						}
						
					} else {
						$this->EE_CSV->_notices['errors'][] = $filename . ' had an invalid file extension, not uploaded';
						add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));
						return FALSE;
					}
					
				} else {
					$this->EE_CSV->_notices['errors'][] = $error_msg;
					add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ));	
					return FALSE;	
				}

			} 
		}
		return;
	}
	
	
	
	
	/**
	 *			@Process Groupon Codes
	 *		  @access private
	 *			@return void
	 */	
	private function process_groupon_codes() {
	
			// the db fields and the csv column names we want the data saved to
			$this->columns_to_save = array(
																							'groupon_code'			=> 'Groupon No.',
																							'groupon_status' 	=> 'Status',
																							'groupon_holder'	=> 	'Customer Name'						
																						);
			// so we can check against keys and values as one list																			
			$this->columns_to_save = array_merge( $this->columns_to_save, array_flip($this->columns_to_save));

			$processed_groupon_codes = array();
			
			// loop through data array to do a little processing
			foreach ( $this->csv_array as $table_name => $table_data ) {
				// check that the table name being imported is valid
				if ( ! in_array( $table_name, $this->table_list )) {
					//$this->import_error ( 'Error! The CSV file contains a table name that does not exist. The Groupon Code(s) were not imported into the database.' );
					$this->EE_CSV->_notices['errors'][] = 'Error! The CSV file contains a table name that does not exist. The Groupon Code(s) were not imported into the database.';
					add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
					exit;
				}

				// loop through data array to do a little processing
				foreach ( $table_data as $outer_key => $inner_data ) {
					foreach ( $inner_data as $inner_key => $value ) {
						// change Unredeemed / Redeemed values to boolean
						if ( $innerkey == 'Status' ) {
							$value = 'Redeemed' ? 1 : 0 ;
						}
						// check if column is to be saved
						if ( in_array( $inner_key, $this->columns_to_save )) {
							$processed_groupon_codes[$table_name][$outer_key][$inner_key] = $value;
						}																				
					}																				
				}					
			}	
			
			return $processed_groupon_codes;
			
	}
	
	

}
/* End of file EE_Import.class.php */
/* Location: /includes/classes/EE_Import.class.php */
?>