/*
 * Relies on there being a variable named
 * ee_job_response localized
 * @var array $ee_job_response {
 *	@type string $job_id
 * }
 * @var array eei18n {
 *	@type string ajax_url
 * }
 */


jQuery(document).ready(function() {

    var runner = new EE_BatchRunner(
		//continue url
        eei18n.ajax_url,
		//continue args
        {
            'action' : 'espresso_batch_continue',
            'ee_admin_ajax' : eei18n.is_admin,
			'ee_front_ajax' : ! eei18n.is_admin
        },
		//continue callback
        ee_support_download_file,
		//cleanup url
        eei18n.ajax_url,
		//cleanup args
        {
            'action' : 'espresso_batch_cleanup',
            'ee_admin_ajax' : eei18n.is_admin,
			'ee_front_ajax' : ! eei18n.is_admin
        },
		//cleanup callback
		function( response, data, xhr ) {
			window.location.replace( ee_job_i18n.return_url );
		}
    );
	runner.set_job_id( ee_job_response.job_id );
	runner.set_progress_bar_div( 'batch-progress' );
	runner.set_progress_area( 'progress-area', 'append' );
	runner.handle_continue_response( { 'data' : ee_job_response } );



	/**
	 * Checks for once the download is complete,
	 * then gets the user to download the temp file
	 * then cleans up the job
	 * @param response array
	 * @param status string
	 * @param {type} xhr
	 * @returns void
	 */
	function ee_support_download_file( response, status, xhr ) {
		//once we're all done, redirect them back to the indicated page
		if( response.data.status == 'complete' ) {
			runner.cleanup_job();
		}
	}



});