# Implementing a Basic Batch Job

To do a basic batch job, which can run from the same admin page as other basic jobs, and doesn't require any custom javascript, you first need to create a php class that implements `JobHandlerInterface` and autoload it.  For example, here is the EE core `AttendeesReport` job handler, which creates a CSV file server-side containing all the site's contacts:

```php
<?php
/**
 *
 * Class AttendeesReport
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * 
 *
 */

namespace EventEspressoBatchRequest\JobHandlers;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;





class AttendeesReport extends JobHandlerFile {


	public function create_job(JobParameters $job_parameters): JobStepResponse
	{
		if( ! \EE_Capabilities::instance()->current_user_can( 'ee_read_contacts', 'generating_report' ) ) {
			throw new BatchRequestException(
				__( 'You do not have permission to view contacts', 'event_espresso')
			);
		}
		$filepath = $this->create_file_from_job_with_name(
			$job_parameters->job_id(),
			__('contact-list-report.csv', 'event_espresso')
		);
		$job_parameters->add_extra_data( 'filepath', $filepath );
		$job_parameters->set_job_size( $this->count_units_to_process() );
		//we should also set the header columns
		$csv_data_for_row = $this->get_csv_data( 0, 1 );
		\EEH_Export::write_data_array_to_csv( $filepath, $csv_data_for_row, true );
		//if we actually processed a row there, record it
		if( $job_parameters->job_size() ) {
			$job_parameters->mark_processed( 1 );
		}
		return new JobStepResponse(
			$job_parameters,
			__( 'Contacts report started successfully...', 'event_espresso' )
		);
	}


	public function continue_job(JobParameters $job_parameters, int $batch_size = 50): JobStepResponse
	{
		$csv_data = $this->get_csv_data( $job_parameters->units_processed(), $batch_size );
		\EEH_Export::write_data_array_to_csv( $job_parameters->extra_datum( 'filepath' ), $csv_data, false );
		$units_processed = count( $csv_data );
		$job_parameters->mark_processed( $units_processed );
		$extra_response_data = array(
			'file_url' => ''
		);
		if( $units_processed < $batch_size ) {
			$job_parameters->set_status( JobParameters::status_complete );
			$extra_response_data[ 'file_url' ] = $this->get_url_to_file( $job_parameters->extra_datum( 'filepath' ) );
		}
		return new JobStepResponse(
				$job_parameters,
				sprintf(
					__( 'Wrote %1$s rows to report CSV file...', 'event_espresso' ),
					count( $csv_data ) ),
				$extra_response_data );
	}


	public function cleanup_job(JobParameters $job_parameters): JobStepResponse
	{
		$this->_file_helper->delete(
			\EEH_File::remove_filename_from_filepath( $job_parameters->extra_datum( 'filepath' ) ),
			true,
			'd'
		);
		return new JobStepResponse( $job_parameters, __( 'Cleaned up temporary file', 'event_espresso' ) );
	}

	public function count_units_to_process()
	{
		return \EEM_Attendee::instance()->count();
	}

	public function get_csv_data( $offset, $limit )
	{
		$attendee_rows = \EEM_Attendee::instance()->get_all_wpdb_results(
				array(
					'limit' => array( $offset, $limit ),
					'force_join' => array( 'State', 'Country' ) ) );
		$csv_data = array();
		foreach( $attendee_rows as $attendee_row ){
			$csv_row = array();
			foreach( \EEM_Attendee::instance()->field_settings() as $field_name => $field_obj ){
				if( $field_name == 'STA_ID' ){
					$state_name_field = \EEM_State::instance()->field_settings_for( 'STA_name' );
					$csv_row[ __( 'State', 'event_espresso' ) ] = $attendee_row[ $state_name_field->get_qualified_column() ];
				}elseif( $field_name == 'CNT_ISO' ){
					$country_name_field = \EEM_Country::instance()->field_settings_for( 'CNT_name' );
					$csv_row[ __( 'Country', 'event_espresso' ) ] = $attendee_row[ $country_name_field->get_qualified_column() ];
				}else{
					$csv_row[ $field_obj->get_nicename() ] = $attendee_row[ $field_obj->get_qualified_column() ];
				}
			}
			$csv_data[] = $csv_row;
		}
		return $csv_data;
	}

}
```

## Things to notice:

1. It actually extends `JobHandlerFile`, which extends `JobHandler`, which implements `JobHandlerInterface`.
2. It implements the 3 methods defined in the interface, `create_job`, `continue_job`, and `cleanup_job`, each of which receives a `JobParameters` object (which defines the job, eg it could contain query parameters; it's derived from the global `$_REQUEST` object), and return a `JobStepResponse` (which gets transformed into a JSON response and returned to the AJAX response)
3. `create_job` does initial setup, which in this case is creating a temporary CSV file, and counting the total number of attendees we will put into it. This is called automatically by the batch request library (specifically, `BatchRequestProcessor`) when starting the job, usually during initial page load
4. `continue_job` grabs a batch of attendee rows from the database, and writes their info to the CSV file. It also detects when the job is done, and sets the job as being complete. This is also called by the batch request library during each AJAX request
5. `cleanup_job` does any other cleanup, which in this case is deleting the temporary CSV file. This is called automatically when the user leaves the batch processing page, on a separate AJAX request
6. This class is autoloaded using the `Psr4Autoloader`, but yours can be autoloaded any way you like, including `EEH_Autoloader`

After creating this job handler class and autoloading it, you just need to redirect the users to the batch processing page with the needed parameters to get them started.

This snippet of code generates the desired URL and then echoes a link:

```php
$job_starter_url = EE_Admin_Page::add_query_args_and_nonce(
				array(
					'page' => 'espresso_support',
					'action' => 'batch_file_create',
					'job_handler' => urlencode( 'EventEspressoBatchRequest\JobHandlers\AttendeesReport' ),
					'redirect_url' => urlencode( $this->_req_data[ 'return_url' ] ),
				));
echo "<a href='" . $job_starter_url . "'>Start Job!</a>";
```

So when users click this link, this happens:

| What the User sees | What's happening behind the scenes |
| ------------------ | ---------------------------------- |
The user is directed to the batch processing page (where they see a progress bar and some text describing what is happening) | The request is turned into a JobParameters object, and passed into AttendeesReport ::create_job()
The user sees the progress bar update | AJAX requests are sent to the server, and AttendeesReport::continue_job() is called each time until it notices the job is done
The CSV file is downloaded, and then the user is redirected to where they came from | The user downloads the temporary CSV file, then an AJAX request is sent which gets passed into AttendeesReport::cleanup_job() which deletes the temporary file

Here is a sample video:

https://www.youtube.com/embed/jrtMYrUUe-8
