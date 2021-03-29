<?php

/**
 * CSV Import Export class
 * For dealing with CSV files directly. For exports/reports, it would generally
 * be preferred to use EventEspressoBatchRequest\BatchRequestProcessor and
 * EEH_Export to create csv files on the server and then direct the user to download them
 *
 * @package     Event Espresso
 * @subpackage  includes/functions
 * @author      Brent Christensen
 */
class EE_CSV
{

    /**
     * string used for 1st cell in exports,
     * which indicates that the following 2 rows will be metadata keys and values
     */
    const metadata_header = 'Event Espresso Export Meta Data';


    /**
     * instance of the EE_CSV object
     *
     * @var EE_CSV
     */
    private static $_instance;

    /**
     * @var array
     */
    private $_primary_keys;


    /**
     * private constructor to prevent direct creation
     *
     * @return void
     */
    private function __construct()
    {
        global $wpdb;

        $this->_primary_keys = [
            $wpdb->prefix . 'esp_answer'                  => ['ANS_ID'],
            $wpdb->prefix . 'esp_attendee'                => ['ATT_ID'],
            $wpdb->prefix . 'esp_datetime'                => ['DTT_ID'],
            $wpdb->prefix . 'esp_event_question_group'    => ['EQG_ID'],
            $wpdb->prefix . 'esp_message_template'        => ['MTP_ID'],
            $wpdb->prefix . 'esp_payment'                 => ['PAY_ID'],
            $wpdb->prefix . 'esp_price'                   => ['PRC_ID'],
            $wpdb->prefix . 'esp_price_type'              => ['PRT_ID'],
            $wpdb->prefix . 'esp_question'                => ['QST_ID'],
            $wpdb->prefix . 'esp_question_group'          => ['QSG_ID'],
            $wpdb->prefix . 'esp_question_group_question' => ['QGQ_ID'],
            $wpdb->prefix . 'esp_question_option'         => ['QSO_ID'],
            $wpdb->prefix . 'esp_registration'            => ['REG_ID'],
            $wpdb->prefix . 'esp_status'                  => ['STS_ID'],
            $wpdb->prefix . 'esp_transaction'             => ['TXN_ID'],
            $wpdb->prefix . 'esp_transaction'             => ['TXN_ID'],
            $wpdb->prefix . 'events_detail'               => ['id'],
            $wpdb->prefix . 'events_category_detail'      => ['id'],
            $wpdb->prefix . 'events_category_rel'         => ['id'],
            $wpdb->prefix . 'events_venue'                => ['id'],
            $wpdb->prefix . 'events_venue_rel'            => ['emeta_id'],
            $wpdb->prefix . 'events_locale'               => ['id'],
            $wpdb->prefix . 'events_locale_rel'           => ['id'],
            $wpdb->prefix . 'events_personnel'            => ['id'],
            $wpdb->prefix . 'events_personnel_rel'        => ['id'],
        ];
    }


    /**
     *        @ singleton method used to instantiate class object
     *        @ access public
     *
     * @return EE_CSV
     */
    public static function instance()
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_CSV) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * @Import contents of csv file and store values in an array to be manipulated by other functions
     * @access public
     * @param string  $path_to_file         - the csv file to be imported including the path to it's location.
     *                                      If $model_name is provided, assumes that each row in the CSV represents a
     *                                      model object for that model If $model_name ISN'T provided, assumes that
     *                                      before model object data, there is a row where the first entry is simply
     *                                      'MODEL', and next entry is the model's name, (untranslated) like Event, and
     *                                      then maybe a row of headers, and then the model data. Eg.
     *                                      '<br>MODEL,Event,<br>EVT_ID,EVT_name,...<br>1,Monkey
     *                                      Party,...<br>2,Llamarama,...<br>MODEL,Venue,<br>VNU_ID,VNU_name<br>1,The
     *                                      Forest
     * @param string  $model_name           model name if we know what model we're importing
     * @param boolean $first_row_is_headers - whether the first row of data is headers or not - TRUE = headers, FALSE =
     *                                      data
     * @return mixed - array on success - multi dimensional with headers as keys (if headers exist) OR string on fail -
     *                                      error message like the following array('Event'=>array(
     *                                      array('EVT_ID'=>1,'EVT_name'=>'bob party',...),
     *                                      array('EVT_ID'=>2,'EVT_name'=>'llamarama',...),
     *                                      ...
     *                                      )
     *                                      'Venue'=>array(
     *                                      array('VNU_ID'=>1,'VNU_name'=>'the shack',...),
     *                                      array('VNU_ID'=>2,'VNU_name'=>'tree house',...),
     *                                      ...
     *                                      )
     *                                      ...
     *                                      )
     * @throws EE_Error
     */
    public function import_csv_to_model_data_array($path_to_file, $model_name = false, $first_row_is_headers = true)
    {
        $multi_dimensional_array = $this->import_csv_to_multi_dimensional_array($path_to_file);
        if (empty($multi_dimensional_array)) {
            return false;
        }
        // gotta start somewhere
        $row = 1;
        // array to store csv data in
        $ee_formatted_data = [];
        // array to store headers (column names)
        $headers = [];
        foreach ($multi_dimensional_array as $data) {
            // if first cell is MODEL, then second cell is the MODEL name
            if ($data[0] == 'MODEL') {
                $model_name = $data[1];
                // don't bother looking for model data in this row.
                // The rest of this row should be blank
                // AND pretend this is the first row again
                $row = 1;
                // reset headers
                $headers = [];
                continue;
            }
            if (strpos($data[0], EE_CSV::metadata_header) !== false) {
                $model_name = EE_CSV::metadata_header;
                // store like model data, we just won't try importing it etc.
                $row = 1;
                continue;
            }


            // how many columns are there?
            $columns = count($data);

            $model_entry = [];
            // loop through each column
            for ($i = 0; $i < $columns; $i++) {
                // replace csv_enclosures with backslashed quotes
                $data[ $i ] = str_replace('"""', '\\"', $data[ $i ]);
                // do we need to grab the column names?
                if ($row === 1) {
                    if ($first_row_is_headers) {
                        // store the column names to use for keys
                        $column_name = $data[ $i ];
                        // check it's not blank... sometimes CSV editing programs
                        // add a bunch of empty columns onto the end...
                        if (! $column_name) {
                            continue;
                        }
                        $matches = [];
                        if ($model_name == EE_CSV::metadata_header) {
                            $headers[ $i ] = $column_name;
                        } else {
                            // now get the db table name from it (the part between square brackets)
                            $success = preg_match('~(.*)\[(.*)\]~', $column_name, $matches);
                            if (! $success) {
                                EE_Error::add_error(
                                    sprintf(
                                        esc_html__(
                                            "The column titled %s is invalid for importing. It must be be in the format of 'Nice Name[model_field_name]' in row %s",
                                            "event_espresso"
                                        ),
                                        $column_name,
                                        implode(",", $data)
                                    ),
                                    __FILE__,
                                    __FUNCTION__,
                                    __LINE__
                                );
                                return false;
                            }
                            $headers[ $i ] = $matches[2];
                        }
                    } else {
                        // no column names means our final array will just use counters for keys
                        $model_entry[ $headers[ $i ] ] = $data[ $i ];
                        $headers[ $i ]                 = $i;
                    }
                    // and we need to store csv data
                } else {
                    // this column isn' ta header, store it if there is a header for it
                    if (isset($headers[ $i ])) {
                        $model_entry[ $headers[ $i ] ] = $data[ $i ];
                    }
                }
            }
            // save the row's data IF it's a non-header-row
            if (! $first_row_is_headers || $row > 1) {
                $ee_formatted_data[ $model_name ][] = $model_entry;
            }
            // advance to next row
            $row++;
        }

        // delete the uploaded file
        unlink($path_to_file);

        // it's good to give back
        return $ee_formatted_data;
    }


    /**
     * Generic CSV-functionality to turn an entire CSV file into a single array that's
     * NOT in a specific format to EE. It's just a 2-level array, with top-level arrays
     * representing each row in the CSV file, and the second-level arrays being each column in that row
     *
     * @param string $path_to_file
     * @return array of arrays. Top-level array has rows, second-level array has each item
     * @throws EE_Error
     */
    public function import_csv_to_multi_dimensional_array($path_to_file)
    {
        // needed to deal with Mac line endings
        ini_set('auto_detect_line_endings', true);
        // because fgetcsv does not correctly deal with backslashed quotes such as \"
        // we'll read the file into a string
        $file_contents = $this->read_unicode_file($path_to_file);
        // replace backslashed quotes with CSV enclosures
        $file_contents = str_replace('\\"', '"""', $file_contents);
        // HEY YOU! PUT THAT FILE BACK!!!
        file_put_contents($path_to_file, $file_contents);

        if (($file_handle = fopen($path_to_file, "r")) !== false) {
            $csv_array = [];
            // in PHP 5.3 fgetcsv accepts a 5th parameter, but the pre 5.3 versions
            // of fgetcsv choke if passed more than 4 - is that crazy or what?
            if (version_compare(PHP_VERSION, '5.3.0') < 0) {
                //  PHP 5.2- version
                // loop through each row of the file
                while (($data = fgetcsv($file_handle)) !== false) {
                    $csv_array[] = $data;
                }
            } else {
                // loop through each row of the file
                while (($data = fgetcsv($file_handle)) !== false) {
                    $csv_array[] = $data;
                }
            }
            # Close the File.
            fclose($file_handle);
            return $csv_array;
        }
        EE_Error::add_error(
            sprintf(
                esc_html__(
                    "An error occurred - the file: %s could not opened.",
                    "event_espresso"
                ),
                $path_to_file
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        return [];
    }


    /**
     * Opens a unicode or utf file
     * (normal file_get_contents has difficulty reading a unicode file)
     *
     * @param string $file_path
     * @return string
     * @throws EE_Error
     * @see http://stackoverflow.com/questions/15092764/how-to-read-unicode-text-file-in-php
     */
    private function read_unicode_file($file_path)
    {
        $fc = "";
        $fh = fopen($file_path, "rb");
        if (! $fh) {
            throw new EE_Error(
                sprintf(
                    esc_html__("Cannot open file for read: %s<br>\n", 'event_espresso'),
                    $file_path
                )
            );
        }
        $file_length = filesize($file_path);
        $bc          = fread($fh, $file_length);
        for ($i = 0; $i < $file_length; $i++) {
            $c = substr($bc, $i, 1);
            if ((ord($c) != 0) && (ord($c) != 13)) {
                $fc = $fc . $c;
            }
        }
        if ((ord(substr($fc, 0, 1)) == 255) && (ord(substr($fc, 1, 1)) == 254)) {
            $fc = substr($fc, 2);
        }
        return ($fc);
    }


    /**
     * @param       $csv_data_array
     * @param false $model_name
     * @return bool
     * @throws EE_Error
     */
    public function save_csv_to_db($csv_data_array, $model_name = false)
    {
        EE_Error::doing_it_wrong(
            'save_csv_to_db',
            esc_html__(
                'Function moved to EE_Import and renamed to save_csv_data_array_to_db',
                'event_espresso'
            ),
            '4.6.7'
        );
        return EE_Import::instance()->save_csv_data_array_to_db($csv_data_array, $model_name);
    }


    /**
     * Writes the CSV file to the output buffer, with rows corresponding to $model_data_array,
     * and dies (in order to avoid other plugins from messing up the csv output)
     *
     * @param string $filename         the filename you want to give the file
     * @param array  $model_data_array 3d array, as described in EE_CSV::write_model_data_to_csv()
     * @return bool | void writes CSV file to output and dies
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function export_multiple_model_data_to_csv($filename, $model_data_array)
    {
        $file_handle = $this->begin_sending_csv($filename);
        $this->write_model_data_to_csv($file_handle, $model_data_array);
        $this->end_sending_csv($file_handle);
    }


    /**
     * Sends HTTP headers to indicate that the browser should download a file,
     * and starts writing the file to PHP's output. Returns the file handle so other functions can
     * also write to it
     *
     * @param string $filename the name of the file that the user will download
     * @return resource, like the results of fopen(), which can be used for fwrite, fputcsv2, etc.
     */
    public function begin_sending_csv($filename)
    {
        // grab file extension
        $ext = substr(strrchr($filename, '.'), 1);
        if ($ext == '.csv' or $ext == '.xls') {
            str_replace($ext, '', $filename);
        }
        $filename .= '.csv';

        // if somebody's been naughty and already started outputting stuff, trash it
        // and start writing our stuff.
        if (ob_get_length()) {
            @ob_flush();
            @flush();
            @ob_end_flush();
        }
        @ob_start();
        header("Pragma: public");
        header("Expires: 0");
        header("Pragma: no-cache");
        header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
        // header("Content-Type: application/force-download");
        // header("Content-Type: application/octet-stream");
        // header("Content-Type: application/download");
        header('Content-disposition: attachment; filename=' . $filename);
        header("Content-Type: text/csv; charset=utf-8");
        do_action('AHEE__EE_CSV__begin_sending_csv__headers');
        echo apply_filters(
            'FHEE__EE_CSV__begin_sending_csv__start_writing',
            "\xEF\xBB\xBF"
        ); // makes excel open it as UTF-8. UTF-8 BOM, see http://stackoverflow.com/a/4440143/2773835
        return fopen('php://output', 'w');
    }


    /**
     * Given an open file, writes all the model data to it in the format the importer expects.
     * Usually preceded by begin_sending_csv($filename), and followed by end_sending_csv($file_handle).
     *
     * @param resource $file_handle
     * @param array    $model_data_array is assumed to be a 3d array: 1st layer has keys of model names (eg 'Event'),
     *                                   next layer is numerically indexed to represent each model object (eg, each
     *                                   individual event), and the last layer has all the attributes of that model
     *                                   object (eg, the event's id, name, etc)
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function write_model_data_to_csv($file_handle, $model_data_array)
    {
        $this->write_metadata_to_csv($file_handle);
        foreach ($model_data_array as $model_name => $model_instance_arrays) {
            // first: output a special row stating the model
            $this->fputcsv2($file_handle, ['MODEL', $model_name]);
            // if we have items to put in the CSV, do it normally

            if (! empty($model_instance_arrays)) {
                $this->write_data_array_to_csv($file_handle, $model_instance_arrays);
            } else {
                // echo "no data to write... so just write the headers";
                // so there's actually NO model objects for that model.
                // probably still want to show the columns
                $model        = EE_Registry::instance()->load_model($model_name);
                $column_names = [];
                foreach ($model->field_settings() as $field) {
                    $column_names[ $field->get_nicename() . "[" . $field->get_name() . "]" ] = null;
                }
                $this->write_data_array_to_csv($file_handle, [$column_names]);
            }
        }
    }


    /**
     * Writes some meta data to the CSV as a bunch of columns. Initially we're only
     * mentioning the version and timezone
     *
     * @param resource $file_handle
     * @throws EE_Error
     * @throws EE_Error
     */
    public function write_metadata_to_csv($file_handle)
    {
        $data_row = [EE_CSV::metadata_header];// do NOT translate because this exact string is used when importing
        $this->fputcsv2($file_handle, $data_row);
        $meta_data = [
            0 => [
                'version'        => espresso_version(),
                'timezone'       => EEH_DTT_Helper::get_timezone(),
                'time_of_export' => current_time('mysql'),
                'site_url'       => site_url(),
            ],
        ];
        $this->write_data_array_to_csv($file_handle, $meta_data);
    }


    /**
     * @Drop   in replacement for PHP's fputcsv function - but this one works!!!
     * @access private
     * @param resource $fh         - file handle - what we are writing to
     * @param array    $row        - individual row of csv data
     * @param string   $delimiter  - csv delimiter
     * @param string   $enclosure  - csv enclosure
     * @param string   $mysql_null - allows php NULL to be overridden with MySQl's insertable NULL value
     * @return void
     */
    private function fputcsv2($fh, array $row, $delimiter = ',', $enclosure = '"', $mysql_null = false)
    {
        // Allow user to filter the csv delimiter and enclosure for other countries csv standards
        $delimiter = apply_filters('FHEE__EE_CSV__fputcsv2__delimiter', $delimiter);
        $enclosure = apply_filters('FHEE__EE_CSV__fputcsv2__enclosure', $enclosure);

        $delimiter_esc = preg_quote($delimiter, '/');
        $enclosure_esc = preg_quote($enclosure, '/');

        $output = [];
        foreach ($row as $field_value) {
            if (is_object($field_value) || is_array($field_value)) {
                $field_value = serialize($field_value);
            }
            if ($field_value === null && $mysql_null) {
                $output[] = 'NULL';
                continue;
            }

            $output[] = preg_match("/(?:${delimiter_esc}|${enclosure_esc}|\s)/", $field_value)
                ? ($enclosure . str_replace($enclosure, $enclosure . $enclosure, $field_value) . $enclosure)
                : $field_value;
        }

        fwrite($fh, join($delimiter, $output) . PHP_EOL);
    }


    /**
     * Writes $data to the csv file open in $file_handle. uses the array indices of $data for column headers
     *
     * @param resource $file_handle
     * @param array    $data        2D array, first numerically-indexed,
     *                              and next-level-down preferably indexed by string
     * @return boolean              if we successfully wrote to the CSV or not.
     *                              If there's no $data, we consider that a success
     *                              (because we wrote everything there was...nothing)
     * @throws EE_Error
     * @throws EE_Error
     */
    public function write_data_array_to_csv($file_handle, $data)
    {
        // determine if $data is actually a 2d array
        if ($data && is_array($data) && is_array(EEH_Array::get_one_item_from_array($data))) {
            // make sure top level is numerically indexed,

            if (EEH_Array::is_associative_array($data)) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            "top-level array must be numerically indexed. Does these look like numbers to you? %s",
                            "event_espresso"
                        ),
                        implode(",", array_keys($data))
                    )
                );
            }
            $item_in_top_level_array = EEH_Array::get_one_item_from_array($data);
            // now, is the last item in the top-level array of $data an associative or numeric array?
            if (EEH_Array::is_associative_array($item_in_top_level_array)) {
                // its associative, so we want to output its keys as column headers
                $keys = array_keys($item_in_top_level_array);
                $this->fputcsv2($file_handle, $keys);
            }
            // start writing data
            foreach ($data as $data_row) {
                $this->fputcsv2($file_handle, $data_row);
            }
            return true;
        }
        // no data TO write... so we can assume that's a success
        return true;
    }


    /**
     * Should be called after begin_sending_csv(), and one or more write_data_array_to_csv()s.
     * Calls exit to prevent polluting the CSV file with other junk
     *
     * @param resource $fh file_handle where we're writing the CSV to
     */
    public function end_sending_csv($fh)
    {
        fclose($fh);
        exit(0);
    }


    /**
     * @Export contents of an array to csv file
     * @access public
     * @param array  $data     - the array of data to be converted to csv and exported
     * @param string $filename - name for newly created csv file
     * @return bool TRUE on success, FALSE on fail
     */
    public function export_array_to_csv($data = false, $filename = false)
    {
        // no data file?? get outta here
        if (! $data or ! is_array($data) or empty($data)) {
            return false;
        }

        // no filename?? get outta here
        if (! $filename) {
            return false;
        }
        $fh = $this->begin_sending_csv($filename);
        $this->end_sending_csv($fh);
        return true;
    }


    /**
     * @Determine the maximum upload file size based on php.ini settings
     * @access    public
     * @param int $percent_of_max - desired percentage of the max upload_mb
     * @return int KB
     */
    public function get_max_upload_size($percent_of_max = false)
    {
        $max_upload   = (int) (ini_get('upload_max_filesize'));
        $max_post     = (int) (ini_get('post_max_size'));
        $memory_limit = (int) (ini_get('memory_limit'));

        // determine the smallest of the three values from above
        $upload_mb = min($max_upload, $max_post, $memory_limit);

        // convert MB to KB
        $upload_mb = $upload_mb * 1024;

        // don't want the full monty? then reduce the max upload size
        if ($percent_of_max) {
            // is percent_of_max like this -> 50 or like this -> 0.50 ?
            if ($percent_of_max > 1) {
                // changes 50 to 0.50
                $percent_of_max = $percent_of_max / 100;
            }
            // make upload_mb a percentage of the max upload_mb
            $upload_mb = $upload_mb * $percent_of_max;
        }

        return $upload_mb;
    }


    /**
     * Gets the date format to use in teh csv. filterable
     *
     * @param string $current_format
     * @return string
     */
    public function get_date_format_for_csv($current_format = null)
    {
        return apply_filters('FHEE__EE_CSV__get_date_format_for_csv__format', 'Y-m-d', $current_format);
    }


    /**
     * Gets the time format we want to use in CSV reports. Filterable
     *
     * @param string $current_format
     * @return string
     */
    public function get_time_format_for_csv($current_format = null)
    {
        return apply_filters('FHEE__EE_CSV__get_time_format_for_csv__format', 'H:i:s', $current_format);
    }
}
