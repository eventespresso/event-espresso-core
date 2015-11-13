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
			ee_support_download_file);
	cancel_job_args = {
					'page' : 'espresso_support',
					'action' : 'batch_cleanup',
					'ee_admin_ajax' : true
				};
	jQuery(window).bind('beforeunload', function(){
		runner.cleanup_job( 
				eei18n.ajax_url, 
				cancel_job_args );
	  });
	runner.set_job_id( ee_job_response.job_id );
	runner.set_progress_bar_div( 'batch-progress' );
	runner.set_progress_area( 'progress-area', 'append' );
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
			jQuery('#message-area').html( ee_job_i18n.download_and_redirecting );
			window.location.href=response.data.file_url;
			runner.cleanup_job( 
				eei18n.ajax_url, 
				cancel_job_args,
				function( response, data, xhr ) {
					//redirect them as if this page didn't exist
					//(so clicking "back" won't get them here)
					window.location.replace( ee_job_i18n.redirect_url );
				});
		}
	}
});