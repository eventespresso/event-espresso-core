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
	runner = new EE_BatchRunner( 
			eei18n.ajax_url, 
			{
				'page' : 'espresso_support',
				'action' : 'batch_continue',
				'ee_admin_ajax' : true
			},
			ee_support_download_file,
			eei18n.ajax_url, 
			{
				'page' : 'espresso_support',
				'action' : 'batch_cleanup',
				'ee_admin_ajax' : true
			});
	runner.set_job_id( ee_job_response.job_id );
	runner.set_progress_bar_div( 'batch-progress' );
	runner.continue_job();
	/**
	 * Checks for once the download is complete,
	 * then gets the user to download the temp file
	 * then cleans up the job
	 * @param array response
	 * @param string status
	 * @param {type} xhr
	 * @returns void
	 */
	function ee_support_download_file( response, status, xhr ) {
		//once we're all done, downthe file
		if( response.data.status == 'complete' &&
				response.data.file_url != '' ) {
			window.location.href=response.data.file_url;
			runner.cleanup_callback = function( response, data, xhr ) {
					
					window.history.back();
				};
			runner.cleanup_job();
		}
	}
});