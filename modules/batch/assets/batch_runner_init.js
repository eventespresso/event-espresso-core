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
 *     return_url: string
 * }}
 */
/**
 * AJAX response
 * @namespace response
 * @type {{
 *     addOrReplace: string,
 *     auto_redirect_on_complete: string,
 *     job_size: string,
 *     status: string,
 *     units_processed: string,
 *     update_text: string,
 * }}
 */
jQuery(document).ready(function ($) {

	const runner = new EE_BatchRunner(
		// continue url
		eei18n.ajax_url || window.ajaxurl,
		// continue args
		{
			'action': 'espresso_batch_continue',
			'ee_admin_ajax': !!eei18n.is_admin,
			'ee_front_ajax': !eei18n.is_admin
		},
		// continue callback
		ee_continue_batch_job,
		// cleanup url
		eei18n.ajax_url || window.ajaxurl,
		// cleanup args
		{
			'action': 'espresso_batch_cleanup',
			'ee_admin_ajax': !!eei18n.is_admin,
			'ee_front_ajax': !eei18n.is_admin
		},
		// cleanup callback
		ee_cleanup_batch_job,
		// advance url
		eei18n.ajax_url || window.ajaxurl,
		// advance args
		{
			'action': 'espresso_batch_advance',
			'ee_admin_ajax': !!eei18n.is_admin,
			'ee_front_ajax': !eei18n.is_admin
		},
		// advance callback
		ee_advance_to_next_batch_job,
	);
	runner.set_job_id(ee_job_response.job_id);
	runner.set_progress_bar_div('batch-progress');
	runner.set_progress_area('progress-area', 'append');
	runner.handle_continue_response(ee_job_response);


	/**
	 * Checks for once the download is complete,
	 * then gets the user to download the temp file
	 * then cleans up the job
	 * @param response array
	 * @param status string
	 * @param {type} xhr
	 * @returns void
	 */
	function ee_continue_batch_job(response, status, xhr) {
		//once we're all done, redirect them back to the indicated page
		if (response.data.status === 'complete') {
			runner.cleanup_job(ee_job_i18n.return_url);
		}
	}

	/**
	 * Checks for once the download is complete,
	 * then gets the user to download the temp file
	 * then cleans up the job
	 * @param response array
	 * @param status string
	 * @param {type} xhr
	 * @returns void
	 */
	function ee_advance_to_next_batch_job(response, status, xhr) {
		//once we're all done, redirect them back to the indicated page
		if (response.data.status === 'complete') {
			runner.cleanup_job(ee_job_i18n.return_url);
		}
	}

	/**
	 * waits 2 seconds then redirects to return url
	 *
	 * @param response array
	 * @param status string
	 * @param {type} xhr
	 * @returns void
	 */
	function ee_cleanup_batch_job(response, status, xhr) {
		console.log('%c ee_cleanup_batch_job', 'color: SpringGreen;', {response});
		if (response.data.auto_redirect_on_complete) {
			setTimeout(function () {
				window.location.replace(ee_job_i18n.return_url);
			}, 5000);
		}
	}
});
