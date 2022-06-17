/**
 * localized variable
 * @namespace ee_job_response
 * @type {{
 *     job_id: string,
 * }}
 */
/**
 * localized variable
 * @namespace eei18n
 * @type {{
 *     ajax_url: string,
 *     is_admin: boolean,
 * }}
 */
/**
 * localized variable
 * @namespace ee_job_i18n
 * @type {{
 *     return_url: string,
 *     download_and_redirecting: string,
 * }}
 */
/**
 * AJAX response
 * @namespace response
 * @type {{
 *     addOrReplace: string,
 *     auto_redirect_on_complete: string,
 *     file_url: string,
 *     job_size: string,
 *     status: string,
 *     units_processed: string,
 *     update_text: string,
 * }}
 */
jQuery(document).ready(function ($) {

    const runner = new EE_BatchRunner(
        // continue_url
        eei18n.ajax_url || window.ajaxurl,
        // continue_data
        {
            'action': 'espresso_batch_continue',
            'ee_admin_ajax': !!eei18n.is_admin,
            'ee_front_ajax': !eei18n.is_admin
        },
        // continue_callback
        ee_support_download_file,
        // cleanup_url
        eei18n.ajax_url || window.ajaxurl,
        // cleanup_data
        {
            'action': 'espresso_batch_cleanup',
            'ee_admin_ajax': !!eei18n.is_admin,
            'ee_front_ajax': !eei18n.is_admin
        },
        // cleanup_callback
    );
    runner.set_job_id( ee_job_response.job_id );
	runner.set_progress_bar_div( 'batch-progress' );
	runner.set_progress_area( 'progress-area', 'append' );
	runner.handle_continue_response(ee_job_response );



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
		//once we're all done, download the file
        if (response.data.status === 'complete' && response.data.file_url !== '') {
			jQuery('#message-area').html( ee_job_i18n.download_and_redirecting );
            // tell the browser to download the file. But because the file gets downloaded,
            // the user doesn't actually leave. So we don't need to clean up JUST yet
            // first, let's just download the file
			window.onbeforeunload = null;
			window.location.href=response.data.file_url;
            // wait a moment for the file to download to start, then:
            // - restore the onbeforeunload callback cuz someone might navigate away before the automatic redirect
            // - start cleaning up and redirecting the user
            setTimeout(function () {
                runner.setup_clean_up_on_page_exit();
                runner.cleanup_job(ee_job_i18n.return_url);
            }, 1000);
		}
	}
});
