/*
 * @function EE_BatchRunner
 *
 * Helper for pages that run a batched process.
 * Supply it with the job id, and a url to send ajax requests to, and it will
 * send requests to the ajax url until the job is done.
 * You can optionally also provide it with the id of a div to be the progress bar,
 * and another div to be the update area.
 * You can provide a callback for it to use every time it receives a valid response
 * after each batch step.
 * If you don't have the job id initially, you can instruct the batch runner where
 * to send an ajax request to get the job initialized and run it
 *
 * @param continue_url string
 * @param continue_data object
 * @param continue_callback closure
 * @param cleanup_url string
 * @param cleanup_data object
 * @param cleanup_callback closure
 * @returns object EE_BatchRunner
 */
function EE_BatchRunner( continue_url, continue_data, continue_callback, cleanup_url, cleanup_data, cleanup_callback ){

    this.job_id = null;
    this.progress_bar = null;
    this.progress_area = null;
    this.progress_area_gets = 'append';//or 'prepend', or 'overwrite'
    this.continue_url = continue_url;
    this.continue_data = continue_data;
    this.continue_callback = continue_callback;
    this.cleanup_url = cleanup_url;
    this.cleanup_data = cleanup_data;
    this.cleanup_callback = cleanup_callback;
    this.cleanup_required = true;

    var thisBatchRunner = this;
    window.onbeforeunload = function () {
        thisBatchRunner.cleanup_job();
    };



    /**
     * @function set_job_id
     *
     * If the job has already been initialized server-side, and you have access
     * to the job id, set it here, and then you can start calling continue_job.
     * Otherwise, you will need to first call create_job
     *
     * @param job_id string
     * @returns EE_BatchRunner
     */
    this.set_job_id = function (job_id) {
        this.job_id = job_id;
        return this;
    };



    /**
     * @function set_progress_bar_div
     *
     * Sets the batch runner's progress bar from the provided div id
     *
     * @param div_id string - the ID of the div for the progress bar, without the '#'
     * @returns EE_BatchRunner
     */
    this.set_progress_bar_div = function (div_id) {
        this.progress_bar = new EE_ProgressBar(div_id, 1);
        return this;
    };



    /**
     * @function set_progress_area
     *
     * Sets teh element where progress updates will appear
     *
     * @param div_id string
     * @param what_happens string 'prepend', 'append', or 'overwrite'
     * @returns EE_BatchRunner
     */
    this.set_progress_area = function (div_id, what_happens) {
        this.progress_area = div_id;
        this.progress_area_gets = what_happens;
        return this;
    };



    /**
     * @function update_progress
     *
     * Updates the update text to this. You may specify to append to it, or
     *
     * @param new_update_text string
     * @returns void
     */
    this.update_progress = function (new_update_text) {
        new_update_text = new_update_text + '<br>';
        if (this.progress_area_gets == 'append') {
            jQuery('#' + this.progress_area).append(new_update_text);
        } else if (this.progress_area_gets == 'prepend') {
            jQuery('#' + this.progress_area).prepend(new_update_text);
        } else {
            jQuery('#' + this.progress_area).html(new_update_text);
        }
    };



    /**
     * @function create_job
     *
     * @param url string
     * @param data object
     * @param callback_when_done string
     * @returns void
     */
    //this.create_job = function (url, data, callback_when_done) {
    //    //@todo
    //};



    /**
     * @function continue_job
     *
     * Once we have set the job_id on the BatchRunner, we can call this, providing
     * the url and any extra post data. The job_id will automatically be added to data.
     * Once a successful response is received, callback_when_done will be called (if set).
     * If these parameters are omitted, the values from previous calls to continue_job
     * will be used.
     *
     * @returns void
     */
    this.continue_job = function () {
        var data = this.continue_data;
        data['job_id'] = this.job_id;
        var batch_runner = this;
        this.do_ajax(this.continue_url, data, function(response, status, xhr) {
			if (typeof( batch_runner.continue_callback ) !== 'undefined') {
				batch_runner.continue_callback(response, status, xhr);
			}
			batch_runner.handle_continue_response( response );
		});
    };
	/**
	 * Handles the data from the response. If the response is favourable, continues the job
	 * @param array data
	 * @returns void
	 */
	this.handle_continue_response = function( response ) {
		var data = response.data;
		if (this.progress_bar instanceof EE_ProgressBar) {
			this.progress_bar.update_progress_to(data.units_processed, data.job_size);
		}
		if (typeof( this.progress_area ) !== 'undefined') {
			this.update_progress(data.update_text);
		}
		
		if (data.status === 'continue') {
			this.continue_job();
		}
	};



    /**
     * @function cleanup_job
     * @returns void
     */
    this.cleanup_job = function () {
        if (this.cleanup_required === false) {
            return;
        }
        var data = this.cleanup_data;
        data['job_id'] = this.job_id;
        var batch_runner = this;
        this.do_ajax(this.cleanup_url, data, function (response, status, xhr) {
            if (batch_runner.progress_bar instanceof EE_ProgressBar) {
                batch_runner.progress_bar.update_progress_to(response.data.units_processed, response.data.job_size);
            }
            batch_runner.cleanup_required = false;
            if (typeof( batch_runner.cleanup_callback ) !== 'undefined') {
                batch_runner.cleanup_callback(response, status, xhr);
            }
        });
    };


    /**
     * @function do_ajax
     *
     * @param url string
     * @param data object
     * @param callback string
     * @returns boolean
     */
    this.do_ajax = function (url, data, callback) {
        var batch_runner = this;
        jQuery.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                //make sure the response is valid json or we don't know what to do with it
                if (ct.indexOf('json') > -1) {
                    if (typeof(callback) !== 'undefined') {
                        callback(response, status, xhr);
                    }
                } else {
                    batch_runner.handle_error(response);
                }
            },
            error: function(xhr,status,error_thrown) {
                batch_runner.handle_error(error_thrown);
            }
        });
        return false;
    };

    /**
     * Handles when an error occurs
     * @param error_message
     */
    this.handle_error = function(error_message){
        //if client code has been good enough to provide us with an internationalized error message, add that
        //especially nice if there is no pre-filled error_message
        if (typeof(eei18n)!=='undefined'){
            error_message += '<br>' + eei18n.error_message;
        }
        if (typeof( this.progress_area ) !== 'undefined') {
            this.update_progress(error_message);
        }
    };


}

