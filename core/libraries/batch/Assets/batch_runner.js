/* 
 * Helper for pages that run a batched process. 
 * Supply it with the job id, and a url to send ajax requests to, and it will
 * send requests to the ajax url until the job is done.
 * You can optionally also provide it with the id of a div to be the progress bar,
 * and another div to be the update area. 
 * You can provide a callback for it to use every time it receives a valid response
 * after each batch step.
 * If you don't have the job id initially, you can instruct the batch runner where
 * to send an ajax request to get the job initialized and run it
 */

var EE_BatchRunner = function( continue_url, continue_data, continue_callback ){
	this.job_id = null;
	this.progress_bar = null;
	this.progress_area = null;
	this.continue_url = continue_url;
	this.continue_data = continue_data;
	this.continue_callback = continue_callback;
};
/**
 * If the job has already been initialized server-side, and you have access
 * to the job id, set it here, and then you can start calling continue_job.
 * Otherwise, you will need to first call create_job
 * @param string job_id
 * @returns EE_BatchRunner
 */
EE_BatchRunner.prototype.set_job_id = function( job_id ) {
	this.job_id = job_id;
	return this;
};
/**
 * Sets the batch runner's progress bar from the provided div id
 * @param string div_id the ID of the div for the progress bar, without the '#'
 * @returns EE_BatchRunner
 */
EE_BatchRunner.prototype.set_progress_bar_div = function( div_id ) {
	this.progress_bar = new EE_ProgressBar( div_id, 1 );
	return this;
};
EE_BatchRunner.prototype.set_progress_area = function( div_id ) {
	//@todo
};
EE_BatchRunner.prototype.create_job = function( url, data, callback_when_done ) {
	//@todo
};
/**
 * Once we have set the job_id on the BatchRunner, we can call this, providing
 * the url and any extra post data. The job_id will automatically be added to data.
 * Once a successful response is received, callback_when_done will be called (if set).
 * If these parameters are ommitted, the values from previous calls to continue_job
 * will be used.
 * @param string url
 * @param array data any extra POST data you want to send
 * @param function callback_when_done, in addition to our standard callback
 * @returns void
 */
EE_BatchRunner.prototype.continue_job = function() {
	var data = this.continue_data;
	data[ 'job_id' ] = this.job_id;
	var batch_runner = this;
	this.do_ajax( this.continue_url, data, function( response, status, xhr ) {
		if( batch_runner.progress_bar instanceof EE_ProgressBar ) {
			batch_runner.progress_bar.update_progress_to( response.data.units_processed, response.data.job_size );
		}
		//@todo: update progress update-area
		if( typeof( batch_runner.continue_callback ) !== 'undefined'  ) {
			batch_runner.continue_callback( response, status, xhr );
		}
		if( response.data.status === 'continue' ) {
			batch_runner.continue_job();
		}
	});
};
EE_BatchRunner.prototype.cleanup_job = function( url, data, callback_when_done ) {
	data[ 'job_id' ] = this.job_id;
	var batch_runner = this;
	this.do_ajax( url, data, function( response, status, xhr ) {
		if( batch_runner.progress_bar instanceof EE_ProgressBar ) {
			batch_runner.progress_bar.update_progress_to( response.data.units_processed, response.data.job_size );
		}
		//@todo: update progress update-area
		if( typeof( callback_when_done ) !== 'undefined'  ) {
			callback_when_done( response, status, xhr );
		}
	});
};
EE_BatchRunner.prototype.do_ajax = function ( url, data, callback ) {
	jQuery.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function(response, status, xhr) {
			var ct = xhr.getResponseHeader("content-type") || "";
			if (ct.indexOf('html') > -1) {
				//@todo: handle html in response
//				Maintenance_helper.display_content(response,setup.where,setup.what);
//				if( typeof(setup.dont_report) === 'undefined'){
//					Maintenance_helper.report_general_migration_error(response);
//					Maintenance_helper.display_content(ee_maintenance.fatal_error, '#main-message', 'clear');
//					Maintenance_helper.finish();
//				}
			}

			if (ct.indexOf('json') > -1 ) {
				//@todo: handle proper json response
//				var resp = response,
//				wht = typeof(resp.data.what) === 'undefined' ? setup.what : resp.data.what,
//				whr = typeof(resp.data.where) === 'undefined' ? setup.where : resp.data.where,
//				display_content = resp.error ? resp.error : resp.content;
//
//				Maintenance_helper.display_notices(resp.notices);
//				Maintenance_helper.display_content(display_content, whr, wht);
				//call the callback that was passed in
				if (typeof(callback) !== 'undefined'){
					callback( response, status, xhr );
				}
			}
		}
	});
	return false;
}


