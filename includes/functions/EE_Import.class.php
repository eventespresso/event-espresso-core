<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');  
/* 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
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
	public  function &instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	

	/**
	 *			@Import Event Espresso data
	 *		  @access public
	 *			@return void
	 */	
	public function import() {
	
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/CSVIO.class.php' );
		$CSVIO = CSVIO::instance();

		if ( $_REQUEST['import'] ) {
	
			if( isset( $_POST['csv_submitted'] )) {
			
				foreach($_FILES["file"]["error"] as $key => $value) {
				
					if($_FILES["file"]["name"][$key]!="") {
					
						if($value==UPLOAD_ERR_OK) {
						
							$filename = $_FILES["file"]["name"][$key];
							$ext = substr(strrchr($filename, '.'), 1);
	
							if( $ext=='csv' ) {
							
								require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/CSVIO.class.php' );
								$CSVIO = $CSVIO::instance();
								$max_upload = $CSVIO->get_max_upload_size();
								
								if($_FILES["file"]["size"][$key]<$max_upload) { 
								
									if(move_uploaded_file($_FILES["file"]["tmp_name"][$key], $upload_dir.$filename)) {

										// csv import export functions require a list of all event espresso tables
										$this->table_list = $CSVIO->list_db_tables();
									// the csv file to import
										$path_to_file = $upload_dir . $filename;
										// convert csv to array
										$this->csv_array = $CSVIO->import_csv_to_array( $this->table_list, $path_to_file );
											
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
											if ( $result = $CSVIO->save_csv_to_db( $this->table_list, $processed_data, $this->columns_to_save ) ) {
												echo $this->import_success ( $import_what . ' have been successfully imported into the database.' );
											} else { 
												$this->import_error ( 'An error occured and the '.$import_what.' were not imported into the database.' );
											}

										} else {
										// no array? must be an error
											$this->import_error ( $this->csv_array );
										}
			
									} else {
										$this->import_error ( $filename . ' was not successfully uploaded' );
									} 
									
								} else {
									$this->import_error ( $filename . ' was too big, not uploaded' );
								}
								
							} else {
								$this->import_error ( $filename . ' had an invalid file extension, not uploaded' );
							}
							
						} else {
							$this->import_error ( $filename . ' was not successfully uploaded' );
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
					$this->import_error ( 'Error! The CSV file contains a table name that does not exist. The Groupon Code(s) were not imported into the database.' );
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
	
	
	/**
	 *			@Import success messages
	 *		  @access private
	 *			@return string on success, FALSE on fail
	 */	
	private function import_success ( $msg = FALSE ) {
		if ( $msg ) {
			return '
	<div id="message" class="updated fade">
		<p><strong>' . __( $msg ) . '</strong></p>
	</div>';
		} else {
			return FALSE;
		}
	}
	
	
	/**
	 *			@Import error messages that occur outside of WP
	 *		  @access private
	 *			@return string on success, FALSE on fail
	 */	
	private function import_error ( $msg = FALSE ) {
	
		if ( $msg ) {
			$style = 'width:90%;height:auto;padding:25px 50px;margin:25px auto;background:#f8f8f8;border:1px solid #ccc;border-radius:5px;color:#ff9900;font:1em/1em Helvetica, Geneva, Arial, sans-serif;text-shadow:-1px -1px 0px #fff;box-shadow:0px 13px 6px -12px rgba(0,0,0,.4);';
			echo '
	<div id="message" class="error fade" style="'.$style.'">
		<p><strong>' . __( $msg ) . '</strong></p>
	</div>';
			exit;
		} else {
			return FALSE;
		}
	}
	

}
/* End of file EE_Import.class.php */
/* Location: /includes/functions/EE_Import.class.php */
?>