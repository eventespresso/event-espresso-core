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

	const do_insert = 'insert';
	const do_update = 'update';
	const do_nothing = 'nothing';


  // instance of the EE_Import object
	private static $_instance = NULL;

	private static $_csv_array = array();

	/**
	 *
	 * @var array of model names
	 */
	private static $_model_list = array();

	private static $_columns_to_save = array();

	protected $_total_inserts = 0;
	protected $_total_updates = 0;
	protected $_total_insert_errors = 0;
	protected $_total_update_errors = 0;


	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
  private function __construct() {
		$this->_total_inserts = 0;
		$this->_total_updates = 0;
		$this->_total_insert_errors = 0;
		$this->_total_update_errors = 0;
	}


	/**
	 *	@ singleton method used to instantiate class object
	 *	@ access public
	 *	@return EE_Import
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Import )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Resets the importer
	 * @return EE_Import
	 */
	public static function reset(){
		self::$_instance = null;
		return self::instance();
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
									if ( $this->save_csv_data_array_to_db( $processed_data, $this->columns_to_save ) ) {
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

	/**
	 *	Given an array of data (usually from a CSV import) attempts to save that data to the db.
	 *	If $model_name ISN'T provided, assumes that this is a 3d array, with toplevel keys being model names,
	 *	next level being numeric indexes adn each value representing a model object, and the last layer down
	 *	being keys of model fields and their proposed values.
	 *	If $model_name IS provided, assumes a 2d array of the bottom two layers previously mentioned.
	 *	If the CSV data says (in the metadata row) that it's from the SAME database,
	 *	we treat the IDs in the CSV as the normal IDs, and try to update those records. However, if those
	 *	IDs DON'T exist in the database, they're treated as temporary IDs,
	 *	which can used elsewhere to refer to the same object. Once an item
	 *	with a temporary ID gets inserted, we record its mapping from temporary
	 *	ID to real ID, and use the real ID in place of the temporary ID
	 *	when that temporary ID was used as a foreign key.
	 *	If the CSV data says (in the metadata again) that it's from a DIFFERENT database,
	 *	we treat all the IDs in the CSV as temporary ID- eg, if the CSV specifies an event with
	 *	ID 1, and the database already has an event with ID 1, we assume that's just a coincidence,
	 *	and insert a new event, and map it's temporary ID of 1 over to its new real ID.
	 *	An important exception are non-auto-increment primary keys. If one entry in the
	 *	CSV file has the same ID as one in the DB, we assume they are meant to be
	 *	the same item, and instead update the item in the DB with that same ID.
	 *	Also note, we remember the mappings permanently. So the 2nd, 3rd, and 10000th
	 *	time you import a CSV from a different site, we remember their mappings, and
	 * will try to update the item in the DB instead of inserting another item (eg
	 * if we previously imported an event with temporary ID 1, and then it got a
	 * real ID of 123, we remember that. So the next time we import an event with
	 * temporary ID, from the same site, we know that it's real ID is 123, and will
	 * update that event, instead of adding a new event).
	 *		  @access public
	 *			@param array $csv_data_array - the array containing the csv data produced from EE_CSV::import_csv_to_model_data_array()
	 *			@param array $fields_to_save - an array containing the csv column names as keys with the corresponding db table fields they will be saved to
	 *			@return TRUE on success, FALSE on fail
	 */
	public function save_csv_data_array_to_db( $csv_data_array, $model_name = FALSE ) {


		$success = FALSE;
		$error = FALSE;
		//whther to treat this import as if it's data froma different database or not
		//ie, if it IS from a different database, ignore foreign keys whihf
		$export_from_site_a_to_b = true;
		// first level of array is not table information but a table name was passed to the function
		// array is only two levels deep, so let's fix that by adding a level, else the next steps will fail
		if($model_name){
			$csv_data_array = array($csv_data_array);
		}
		// begin looking through the $csv_data_array, expecting the toplevel key to be the model's name...
		$old_site_url = 'none-specified';

		//hanlde metadata
		if(isset($csv_data_array[EE_CSV::metadata_header]) ){
			$csv_metadata = array_shift($csv_data_array[EE_CSV::metadata_header]);
			//ok so its metadata, dont try to save it to ehte db obviously...
			if(isset($csv_metadata['site_url']) && $csv_metadata['site_url'] == site_url()){
				EE_Error::add_attention(sprintf(__("CSV Data appears to be from the same database, so attempting to update data", "event_espresso")));
				$export_from_site_a_to_b = false;
			}else{
				$old_site_url = isset( $csv_metadata['site_url']) ? $csv_metadata['site_url'] : $old_site_url;
				EE_Error::add_attention(sprintf(__("CSV Data appears to be from a different database (%s instead of %s), so we assume IDs in the CSV data DO NOT correspond to IDs in this database", "event_espresso"),$old_site_url,site_url()));
			};
			unset($csv_data_array[EE_CSV::metadata_header]);
		}
		/**
		* @var $old_db_to_new_db_mapping 2d array: toplevel keys being model names, bottom-level keys being the original key, and
		* the value will be the newly-inserted ID.
		* If we have already imported data from the same website via CSV, it shoudl be kept in this wp option
		*/
	   $old_db_to_new_db_mapping = get_option('ee_id_mapping_from'.sanitize_title($old_site_url),array());
	   if( $old_db_to_new_db_mapping){
		   EE_Error::add_attention(sprintf(__("We noticed you have imported data via CSV from %s before. Because of this, IDs in your CSV have been mapped to their new IDs in %s", "event_espresso"),$old_site_url,site_url()));
	   }
	   $old_db_to_new_db_mapping = $this->save_data_rows_to_db($csv_data_array, $export_from_site_a_to_b, $old_db_to_new_db_mapping);

		//save the mapping from old db to new db in case they try re-importing the same data from the same website again
		update_option('ee_id_mapping_from'.sanitize_title($old_site_url),$old_db_to_new_db_mapping);

		if ( $this->_total_updates > 0 ) {
			EE_Error::add_success( sprintf(__("%s existing records in the database were updated.", "event_espresso"),$this->_total_updates));
			$success = true;
		}
		if ( $this->_total_inserts > 0 ) {
			EE_Error::add_success(sprintf(__("%s new records were added to the database.", "event_espresso"),$this->_total_inserts));
			$success = true;
		}

		if ( $this->_total_update_errors > 0 ) {
			EE_Error::add_error(sprintf(__("'One or more errors occurred, and a total of %s existing records in the database were <strong>not</strong> updated.'", "event_espresso"),$this->_total_update_errors), __FILE__, __FUNCTION__, __LINE__ );
			$error = true;
		}
		if ( $this->_total_insert_errors > 0 ) {
			EE_Error::add_error(sprintf(__("One or more errors occurred, and a total of %s new records were <strong>not</strong> added to the database.'", "event_espresso"),$this->_total_insert_errors), __FILE__, __FUNCTION__, __LINE__ );
			$error = true;
		}

		//lastly, we need to update the datetime and ticket sold amounts
		//as those may ahve been affected by this
		EEM_Datetime::instance()->update_sold( EEM_Datetime::instance()->get_all() );
		EEM_Ticket::instance()->update_tickets_sold(EEM_Ticket::instance()->get_all());

		// if there was at least one success and absolutely no errors
		if ( $success && ! $error ) {
			return TRUE;
		} else {
			return FALSE;
		}

	}


	/**
	 * Processes the array of data, given the knowledge that it's from the same database or a different one,
	 * and the mapping from temporary IDs to real IDs.
	 * If the data is from a different database, we NEVER use
	 * @param type $csv_data_array
	 * @param type $export_from_site_a_to_b
	 * @param type $old_db_to_new_db_mapping
	 * @return array updated $old_db_to_new_db_mapping
	 */
	public function save_data_rows_to_db( $csv_data_array, $export_from_site_a_to_b, $old_db_to_new_db_mapping ) {
		foreach ( $csv_data_array as $model_name_in_csv_data => $model_data_from_import ) {
			//now check that assumption was correct. If
			if ( EE_Registry::instance()->is_model_name($model_name_in_csv_data)) {
				$model_name = $model_name_in_csv_data;
			}else {
				// no table info in the array and no table name passed to the function?? FAIL
				EE_Error::add_error( __('No table information was specified and/or found, therefore the import could not be completed','event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
			/* @var $model EEM_Base */
			$model = EE_Registry::instance()->load_model($model_name);

			//so without further ado, scanning all the data provided for primary keys and their inital values
			foreach ( $model_data_from_import as $model_object_data ) {
				//before we do ANYTHING, make sure the csv row wasn't just completely blank
				$row_is_completely_empty = true;
				foreach($model_object_data as $field){
					if($field){
						$row_is_completely_empty = false;
					}
				}
				if($row_is_completely_empty){
					continue;
				}
				//find the PK in the row of data (or a combined key if
				//there is no primary key)
				if($model->has_primary_key_field()){
					$id_in_csv =  $model_object_data[$model->primary_key_name()];
				}else{
					$id_in_csv = $model->get_index_primary_key_string($model_object_data);
				}

				//now we need to decide if we're going to add a new model object given the $model_object_data,
				//or just update.
				if($export_from_site_a_to_b){
					$what_to_do = $this->_decide_whether_to_insert_or_update_given_data_from_other_db( $id_in_csv, $model_object_data, $model, $old_db_to_new_db_mapping );
				}else{//this is just a re-import
					$what_to_do = $this->_decide_whether_to_insert_or_update_given_data_from_same_db( $id_in_csv, $model_object_data, $model, $old_db_to_new_db_mapping );
				}
				if( $what_to_do == self::do_nothing ) {
					continue;
				}

				$model_object_data = $this->_replace_temp_ids_with_mappings( $model_object_data, $model, $old_db_to_new_db_mapping );

				//double-check we actually want to insert, if that's what we're planning
				//based on whether this item would be unique in the DB or not
				if( $what_to_do == self::do_insert ) {
					//we're supposed to be inserting. But wait, will this thing
					//be acceptable if inserted?
					$conflicting = $model->get_one_conflicting($model_object_data);
					if($conflicting){
						//ok, this item would conflict if inserted. Just update the item that it conflicts with.
						$what_to_do = self::do_update;
						//and if this model has a primary key, remember its mapping
						if($model->has_primary_key_field()){
							$old_db_to_new_db_mapping[$model_name][$id_in_csv] = $conflicting->ID();
							$model_object_data[$model->primary_key_name()] = $conflicting->ID();
						}else{
							//we want to update this conflicting item, instead of inserting a conflicting item
							//so we need to make sure they match entirely (its possible that they only conflicted on one field, but we need them to match on other fields
							//for the WHERE conditions in the update). At the time of this comment, there were no models like this
							foreach($model->get_combined_primary_key_fields() as $key_field){
								$model_object_data[$key_field->get_name()] = $conflicting->get($key_field->get_name());
							}
						}
					}
				}
				if( $what_to_do == self::do_insert ) {
					$old_db_to_new_db_mapping = $this->_insert_from_data_array( $id_in_csv, $model_object_data, $model, $old_db_to_new_db_mapping );
				}elseif( $what_to_do == self::do_update ) {
					$this->_update_from_data_array( $model_object_data, $model );
				}else{
					throw new EE_Error( sprintf( __( 'Programming error. We shoudl be inserting or updating, but instead we are being told to "%s", whifh is invalid', 'event_espresso' ), $what_to_do ) );
				}
			}
		}
		return $old_db_to_new_db_mapping;
	}



	/**
	 *
	 * @param type $id_in_csv
	 * @param type $model_object_data
	 * @param EEM_Base $model
	 * @param type $old_db_to_new_db_mapping
	 * @return
	 */
	protected function _decide_whether_to_insert_or_update_given_data_from_other_db( $id_in_csv, $model_object_data, $model, $old_db_to_new_db_mapping ) {
		$model_name = $model->get_this_model_name();
		//if it's a site-to-site export-and-import, see if this modelobject's id
		//in the old data that we know of
		if( isset($old_db_to_new_db_mapping[$model_name][$id_in_csv]) ){
			return self::do_update;
		}else{
			//check if this new DB has an exact copy of this model object (eg, a country or state that we don't want to duplicate)
			$copy_in_db = $model->get_one_copy($model_object_data);
			if( $copy_in_db ){
				//so basically this already exists in the DB...
				//remember the mapping
				$old_db_to_new_db_mapping[$model_name][$id_in_csv] = $copy_in_db->ID();
				//and don't bother trying to update or insert, beceause
				//we JUST asserted that it's the exact same as what's in the DB
				return self::do_nothing;
			}else{
				return self::do_insert;
			}
		}
	}

	/**
	 *
	 * @param type $id_in_csv
	 * @param type $model_object_data
	 * @param EEM_Base $model
	 * @param type $old_db_to_new_db_mapping
	 * @return
	 */
	protected function _decide_whether_to_insert_or_update_given_data_from_same_db( $id_in_csv, $model_object_data, $model ) {
		//in this case, check if this thing ACTUALLY exists in the database
		if(($model->has_primary_key_field() && $model->get_one_by_ID($id_in_csv)) ||
			( ! $model->has_primary_key_field() && $model->get_one(array($model_object_data)))){
			return self::do_update;
		}else{
			return self::do_insert;
		}
	}

	/**
	 *
	 * @param type $model_object_data
	 * @param EEM_Base $model
	 * @param type $old_db_to_new_db_mapping
	 * @return array updated model object data with temp IDs removed
	 */
	protected function _replace_temp_ids_with_mappings( $model_object_data, $model, $old_db_to_new_db_mapping ) {
		//loop through all its related models, and see if we can swap their OLD foreign keys
		//(ie, idsin the OLD db) for  new foreign key (ie ids in the NEW db)
		foreach($model->field_settings() as $field_name => $fk_field){
			if($fk_field instanceof EE_Foreign_Key_Field_Base){
				$fk_value = $model_object_data[$fk_field->get_name()];
				//if the foreign key is 0 or blank, just ignore it and leave it as-is
				if($fk_value == '0' || $fk_value == ''){
					continue;
				}
				//now, is that value in the list of PKs that have been inserted?
				if(is_array($fk_field->get_model_name_pointed_to())){//it points to a bunch of different models. We want to try each
					$model_names_pointed_to = $fk_field->get_model_name_pointed_to();
				}else{
					$model_names_pointed_to = array($fk_field->get_model_name_pointed_to());

				}
				$found_new_id = false;
				foreach($model_names_pointed_to as $model_pointed_to_by_fk){
					if(isset($old_db_to_new_db_mapping[$model_pointed_to_by_fk][$fk_value])){
						//and don't forget to replace the temporary id used in the csv with Id of the newly-added thing
						$model_object_data[$fk_field->get_name()] = $old_db_to_new_db_mapping[$model_pointed_to_by_fk][$fk_value];
						$found_new_id = true;
					}
				}
				if( ! $found_new_id ){
					EE_Error::add_error(sprintf(__("Could not find %s with ID %s in old/csv for model %s and row %s.<br>", "event_espresso"),implode(",",$model_names_pointed_to),$fk_value,$model->get_this_model_name(),http_build_query($model_object_data)), __FILE__, __FUNCTION__, __LINE__ );
				}
			}
		}
		return $model_object_data;
	}

	/**
	 *
	 * @param type $id_in_csv
	 * @param type $model_object_data
	 * @param EEM_Base $model
	 * @param type $old_db_to_new_db_mapping
	 * @return array updated $old_db_to_new_db_mapping
	 */
	protected function _insert_from_data_array( $id_in_csv, $model_object_data, $model, $old_db_to_new_db_mapping ) {
		//remove the primary key, if there is one (we don't want it for inserts OR updates)
		//we'll put it back in if we need it
		if($model->has_primary_key_field() && $model->get_primary_key_field()->is_auto_increment()){
			$effective_id = $model_object_data[$model->primary_key_name()];
			unset($model_object_data[$model->primary_key_name()]);
		}
		//the model takes care of validating the CSV's input
		try{
			$new_id = $model->insert($model_object_data);
			if( $new_id ){
				$old_db_to_new_db_mapping[$model->get_this_model_name()][$id_in_csv] = $new_id;
				$this->_total_inserts++;
				EE_Error::add_success( sprintf(__("Successfully added new %s (with id %s) with csv data %s", "event_espresso"),$model->get_this_model_name(),$new_id, implode(",",$model_object_data)));
			}else{
				$this->_total_insert_errors++;
				//put the ID used back in there for the error message
				if($model->has_primary_key_field()){
					$model_object_data[$model->primary_key_name()] = $effective_id;
				}
				EE_Error::add_error( sprintf(__("Could not insert new %s with the csv data: %s", "event_espresso"),$model->get_this_model_name(),http_build_query($model_object_data)), __FILE__, __FUNCTION__, __LINE__ );
			}
		}catch(EE_Error $e){
			$this->_total_insert_errors++;
			if($model->has_primary_key_field()){
				$model_object_data[$model->primary_key_name()] = $effective_id;
			}
			EE_Error::add_error( sprintf(__("Could not insert new %s with the csv data: %s because %s", "event_espresso"),$model->get_this_model_name(),implode(",",$model_object_data),$e->getMessage()), __FILE__, __FUNCTION__, __LINE__ );
		}
		return $old_db_to_new_db_mapping;
	}

	/**
	 *
	 * @param type $model_object_data
	 * @param EEM_Base $model
	 */
	protected function _update_from_data_array( $model_object_data, $model ) {
		try{
			if($model->has_primary_key_field()){
				$conditions = array($model->primary_key_name() => $model_object_data[$model->primary_key_name()]);
				unset($model_object_data[$model->primary_key_name()]);
			}elseif($model->get_combined_primary_key_fields() > 1 ){
				$conditions = array();
				foreach($model->get_combined_primary_key_fields() as $key_field){
					$conditions[$key_field->get_name()] = $model_object_data[$key_field->get_name()];
				}
			}else{
				$model->primary_key_name();//this shoudl just throw an exception, explaining that we dont have a primary key (or a combine dkey)
			}

			$success = $model->update($model_object_data,array($conditions));
			if($success){
				$this->_total_updates++;
				EE_Error::add_success( sprintf(__("Successfully updated %s with csv data %s", "event_espresso"),$model->get_this_model_name(),implode(",",$model_object_data)));
			}else{
				$matched_items = $model->get_all(array($conditions));
				if( ! $matched_items){
					//no items were matched (so we shouldn't have updated)... but then we should have inserted? what the heck?
					$this->_total_update_errors++;
					EE_Error::add_error( sprintf(__("Could not update %s with the csv data: '%s' for an unknown reason (using WHERE conditions %s)", "event_espresso"),$model->get_this_model_name(),http_build_query($model_object_data),http_build_query($conditions)), __FILE__, __FUNCTION__, __LINE__ );
				}else{
					$this->_total_updates++;
					EE_Error::add_success( sprintf(__("%s with csv data '%s' was found in the database and didn't need updating because all the data is identical.", "event_espresso"),$model_name,implode(",",$model_object_data)));
				}
			}
		}catch(EE_Error $e){
			$this->_total_update_errors++;
			EE_Error::add_error( sprintf(__("Could not update %s with the csv data: %s because %s", "event_espresso"),$model->get_this_model_name(),implode(",",$model_object_data),$e->getMessage()), __FILE__, __FUNCTION__, __LINE__ );
		}
	}





}
/* End of file EE_Import.class.php */
/* Location: /includes/classes/EE_Import.class.php */
?>