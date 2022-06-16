# Implementing an Advanced Batch Job

If you want to add custom javascript to the batch processing experience, or even add batch processing into an existing page, then instead of the [Basic Batch Job Implementation](implementing-a-basic-batch-job.md), you will want to implement using the advanced batch job.

On the page where you want to do the batch processing, you'll need to enqueue the scripts and css, like this:

```php
wp_register_script( 'progress_bar', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.js', array( 'jquery' ) );
wp_enqueue_style( 'progress_bar', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.css', array(), EVENT_ESPRESSO_VERSION );
wp_enqueue_script( 'batch_runner', EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/batch_runner.js', array( 'progress_bar' ));
wp_enqueue_script( 'support_batch_file_runner', EE_SUPPORT_ASSETS_URL . 'support_batch_file_runner.js', array( 'batch_runner' ), EVENT_ESPRESSO_VERSION,true);
```

This enqueues the needed library scripts (`progress_bar.js`, `progress_bar.css` and `batch_runner.js`), and a js file for initializing the library files, (`support_batch_file_runner.js`) which could look like:

```javascript
jQuery(document).ready(function() {
    var runner = new EE_BatchRunner(
        // continue_url
        eei18n.ajax_url,
        // continue_data
        {
            'page' : 'espresso_support',
            'action' : 'espresso_batch_continue',
            'ee_admin_ajax' : true
        },
        // continue_callback
        ee_support_download_file,
        // cleanup_url
        eei18n.ajax_url,
        // cleanup_data
        {
            'page' : 'espresso_support',
            'action' : 'espresso_batch_cleanup',
            'ee_admin_ajax' : true
        },
        // cleanup_callback
	function( response, data, xhr ) {
                //redirect them as if this page didn't exist
                //(so clicking "back" won't get them here)
                window.location.replace( ee_job_i18n.redirect_url );
	}
        );
        runner.set_job_id( ee_job_response.job_id );
        runner.set_progress_bar_div( 'batch-progress' );
        runner.set_progress_area( 'progress-area', 'append' );
        runner.continue_job();

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
		if( response.data.status == 'complete' && response.data.file_url != '' ) {
			jQuery('#message-area').html( ee_job_i18n.download_and_redirecting );
			window.location.href=response.data.file_url;
			//and redirect a little later
			setTimeout(function() {
				runner.cleanup_job(ee_job_i18n.return_url);
			}, 2000 );
		}
	}
});
```

This initializes the `EE_BatchRunner` javascript object, and sets a callback after each AJAX request to see if the job is done, and if it is the file is downloaded, and then after the cleanup AJAX request the user is redirected to wherever they came from.