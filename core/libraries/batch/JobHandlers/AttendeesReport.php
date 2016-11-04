<?php
/**
 *
 * Class {name}
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */

namespace EventEspressoBatchRequest\JobHandlers;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}


class AttendeesReport extends JobHandlerFile {


	public function create_job(JobParameters $job_parameters) {
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


	public function continue_job(JobParameters $job_parameters, $batch_size = 50) {
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


	public function cleanup_job(JobParameters $job_parameters) {
		$this->_file_helper->delete(
			\EEH_File::remove_filename_from_filepath( $job_parameters->extra_datum( 'filepath' ) ),
			true,
			'd'
		);
		return new JobStepResponse( $job_parameters, __( 'Cleaned up temporary file', 'event_espresso' ) );
	}

	public function count_units_to_process() {
		return \EEM_Attendee::instance()->count( array( 'caps' => \EEM_Base::caps_read_admin ));
	}
	public function get_csv_data( $offset, $limit ) {
		$attendee_rows = \EEM_Attendee::instance()->get_all_wpdb_results( 
			array( 
				'limit' => array( $offset, $limit ),
				'force_join' => array( 'State', 'Country' ),
				'caps' => \EEM_Base::caps_read_admin
			) 
		);
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
