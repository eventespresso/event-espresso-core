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
	public function upload_form ( $title, $intro, $page, $action, $type  ) {
		
		ob_start();
?>
	<div class="ee-upload-form-dv">
		<h3><?php echo $title;?></h3>
		<p><?php echo $intro;?></p>
		
		<form action="<?php echo get_bloginfo('wpurl');?>/wp-admin/admin.php?page=<?php echo $page;?>" method="post" enctype="multipart/form-data">
			<input type="hidden" name="csv_submitted" value="TRUE" id="<?php echo time();?>">
			<input name="action" type="hidden" value="<?php echo $action;?>" />
			<input name="import" type="hidden" value="<?php echo $type;?>" />
			<input type="file" name="file[]" size="90" >
			<input class="button-primary" type="submit" value="<?php _e( 'Upload File', 'event_espresso' );?>">
		</form>
			
		<p class="ee-attention">
			<b><?php _e( 'Attention', 'event_espresso' );?></b><br/>
			<?php echo sprintf( __( 'Accepts .%s file types only. Maximum file name length (minus extension) is 15 characters. Anything over that will be truncated to 15 characters.', 'event_espresso' ), $type ) ;?>	
		</p>

	</div>
		
<?php
		$uploader = ob_get_clean();
		return $uploader;
	}





	/**
	 *			@Import Event Espresso data - some code "borrowed" from event espresso csv_import.php
	 *		  @access public
	 *			@return void
	 */	
	public function import() {
	
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_CSV.class.php' );
		$this->EE_CSV = EE_CSV::instance();

		if ( $_REQUEST['import'] ) {
	
			if( isset( $_POST['csv_submitted'] )) {
			
				foreach($_FILES["file"]["error"] as $key => $value) {
				
					if($_FILES["file"]["name"][$key]!="") {
					
						if($value==UPLOAD_ERR_OK) {
						
							$filename = $_FILES["file"]["name"][$key];
							$ext = substr(strrchr($filename, '.'), 1);
	
							if( $ext=='csv' ) {
							
								$max_upload = $this->EE_CSV->get_max_upload_size();
								
								if($_FILES["file"]["size"][$key]<$max_upload) { 
								
									$upload_dir = wp_upload_dir();
								
									if(move_uploaded_file($_FILES["file"]["tmp_name"][$key], $upload_dir.$filename)) {

										// csv import export functions require a list of all event espresso tables
										$this->table_list = $this->EE_CSV->list_db_tables();
									// the csv file to import
										$path_to_file = $upload_dir . $filename;
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
										
												case "event_list";
														$import_what = 'Event Details';
														// nothing to do
												break;
												
												/*-----------------------------------------------------------------*/
												
												case 'groupon_import_csv':
													$import_what = 'Groupon Codes';
													$processed_data = $this->process_groupon_codes();
												break;
												
												/*-----------------------------------------------------------------*/
												
												default:
												break;
											
											}

											// save processed codes to db
											if ( $result = $this->EE_CSV->save_csv_to_db( $this->table_list, $processed_data, $this->columns_to_save ) ) {
											
												//echo $this->import_success ( $import_what . ' have been successfully imported into the database.' );
												$this->EE_CSV->_notices['updates'][] = $import_what . ' have been successfully imported into the database.';
												add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
																				
											} else { 
											
												//$this->import_error ( 'An error occured and the '.$import_what.' were not imported into the database.' );
												$this->EE_CSV->_notices['errors'][] = 'An error occured and the '.$import_what.' were not imported into the database.';
												add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
												
											}

										} else {
											// no array? must be an error
											//$this->import_error ( $this->csv_array );
											//$this->EE_CSV->_notices['errors'][] = $this->csv_array;
											add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
										}
			
									} else {
										//$this->import_error ( $filename . ' was not successfully uploaded' );
										$this->EE_CSV->_notices['errors'][] = $filename . ' was not successfully uploaded';
										add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
									} 
									
								} else {
									//$this->import_error ( $filename . ' was too big, not uploaded' );
									$this->EE_CSV->_notices['errors'][] = $filename . ' was too large of a file and could not be uploaded. The max filesize is ' . $max_upload . ' KB.';
									add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
								}
								
							} else {
								//$this->import_error ( $filename . ' had an invalid file extension, not uploaded' );
								$this->EE_CSV->_notices['errors'][] = $filename . ' had an invalid file extension, not uploaded';
								add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
							}
							
						} else {
							//$this->import_error ( $filename . ' was not successfully uploaded' );
							$this->EE_CSV->_notices['errors'][] = $filename . ' was not successfully uploaded';
							add_action('admin_notices', array( $this->EE_CSV, 'csv_admin_notices' ) );
						}
						
					}
				}
			}
		} // end if import
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