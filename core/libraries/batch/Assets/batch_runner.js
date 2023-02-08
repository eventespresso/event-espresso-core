let EE_BatchRunner;

jQuery(document).ready(function ($) {

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
	 * @param advance_url string
	 * @param advance_data object
	 * @param advance_callback closure
	 * @returns object EE_BatchRunner
	 */
	EE_BatchRunner = function(
		continue_url,
		continue_data,
		continue_callback,
		cleanup_url,
		cleanup_data,
		cleanup_callback,
		advance_url = '',
		advance_data = null,
		advance_callback = null
	) {

		this.job_id = null;
		this.progress_bar = null;
		this.progress_area = null;
		this.progress_area_gets = 'append'; // or 'prepend', or 'overwrite'
		this.continue_url = continue_url;
		this.continue_data = continue_data;
		this.continue_callback = continue_callback;
		this.cleanup_url = cleanup_url;
		this.cleanup_data = cleanup_data;
		this.cleanup_callback = cleanup_callback;
		this.cleanup_required = true;
		this.advance_url = advance_url;
		this.advance_data = advance_data;
		this.advance_callback = advance_callback;

		const thisBatchRunner = this;

		console.log('%c BatchRunner', 'color: HotPink;', this);

		this.setup_clean_up_on_page_exit = function () {
			window.onbeforeunload = function () {
				thisBatchRunner.cleanup_job(ee_job_i18n.return_url);
			};
		}
		this.setup_clean_up_on_page_exit();


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
		 * Sets the element where progress updates will appear
		 *
		 * @function set_progress_area
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
		 * @function updateProgressBar
		 * @param units_processed string
		 * @param job_size string
		 * @returns void
		 */
		this.updateProgressBar = function(units_processed, job_size) {
			if (this.progress_bar instanceof EE_ProgressBar) {
				this.progress_bar.update_progress_to(units_processed, job_size);
			}
		};

		/**
		 * Updates the update text to this. You may specify to append to it, or
		 *
		 * @function updateProgressArea
		 * @param new_update_text string
		 * @param addOrReplace string
		 * @returns void
		 */
		this.updateProgressArea = function(new_update_text, addOrReplace = null) {
			if (typeof (this.progress_area) === 'undefined') {
				return;
			}
			if (typeof addOrReplace === 'undefined' || addOrReplace === null  || addOrReplace === '') {
				addOrReplace = this.progress_area_gets;
			}
			// remove empty p tags
			new_update_text = new_update_text.replace('<p></p>', '');
			const $progressArea = $('#' + this.progress_area);

			if (addOrReplace === 'before') {
				$progressArea.before(new_update_text);
			} else if (addOrReplace === 'prepend') {
				$progressArea.prepend(new_update_text);
			} else if (addOrReplace === 'append') {
				$progressArea.append(new_update_text);
			} else if (addOrReplace === 'after') {
				$progressArea.after(new_update_text);
			} else {
				// default to replace
				$progressArea.html(new_update_text);
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
			const batch_runner = this;
			const data = batch_runner.continue_data;
			data['job_id'] = batch_runner.job_id;
			this.do_ajax(batch_runner.continue_url, data, function (response, status, xhr) {
				console.log('%c CONTINUE_JOB AJAX', 'color: Cyan;', {response});
				if (typeof (batch_runner.continue_callback) !== 'undefined') {
					batch_runner.continue_callback(response, status, xhr);
				}
				batch_runner.handle_continue_response(response.data);
			});
		};


		/**
		 * Handles the data from the response. If the response is favourable, continues the job
		 * @returns void
		 * @param responseData object
		 * @namespace responseData
		 * @type {{
		 *     addOrReplace: string,
		 *     job_size: string,
		 *     status: string,
		 *     units_processed: string,
		 *     update_text: string,
		 * }}
		 */
		this.handle_continue_response = function (responseData) {
			let addOrReplace = typeof responseData.addOrReplace !== 'undefined' ? responseData.addOrReplace : '';
			this.updateProgressArea(responseData.update_text + '<br>', addOrReplace);
			this.updateProgressBar(responseData.units_processed, responseData.job_size);
			this.advanceOrContinue(responseData.status);
		};


		/**
		 * @function advanceOrContinue
		 * @param status string
		 * @returns void
		 */
		this.advanceOrContinue = function (status) {
			if (status === 'advance') {
				this.advance_to_next_job();
			}
			if (status === 'continue') {
				this.continue_job();
			}
		};


		/**
		 * @function advance_to_next_job
		 * @namespace response.data
		 * @type {{
		 *     job_size: string,
		 *     status: string,
		 *     units_processed: string,
		 *     update_text: string,
		 * }}
		 * @returns void
		 */
		this.advance_to_next_job = function () {
            if (this.advance_url) {
                const batch_runner = this;
                const data = batch_runner.advance_data;
                data['job_id'] = this.job_id;
                this.do_ajax(this.advance_url, data, function (response) {
                    console.log('%c ADVANCE_TO_NEXT_JOB AJAX', 'color: Cyan;', {response});
                    batch_runner.updateProgressArea(response.data.update_text, 'replace');
                });
            }
		};


		/**
		 * @function cleanup_job
		 * @namespace response.data
		 * @type {{
		 *     job_size: string,
		 *     status: string,
		 *     units_processed: string,
		 *     update_text: string,
		 * }}
		 * @returns void
		 */
		this.cleanup_job = function (return_url = '') {
			if (this.cleanup_required === false) {
				return;
			}
			const batch_runner = this;
			const data = batch_runner.cleanup_data;
			data['job_id'] = batch_runner.job_id;
			this.do_ajax(batch_runner.cleanup_url, data, function (response, status, xhr) {
				console.log('%c CLEANUP_JOB AJAX', 'color: Cyan;', {response});
                batch_runner.updateProgressBar(response.data.units_processed, response.data.job_size);
                batch_runner.updateProgressArea(response.data.update_text, 'append');
				batch_runner.cleanup_required = false;
                if (response.data.status === 'cleaned_up' && typeof batch_runner.cleanup_callback !== 'undefined') {
					batch_runner.cleanup_callback(response, status, xhr);
				}
			});
			if (return_url) {
				this.countdownRedirect(return_url, 9);
			}
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
			const batch_runner = this;
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function (response, status, xhr) {
					const ct = xhr.getResponseHeader("content-type") || "";
					//make sure the response is valid json or we don't know what to do with it
					if (ct.indexOf('json') > -1) {
						if (typeof (callback) !== 'undefined') {
							callback(response, status, xhr);
						}
					} else {
						batch_runner.handle_error(response);
					}
				},
				error: function (xhr, status, error_thrown) {
					batch_runner.handle_error(error_thrown);
				}
			});
			return false;
		};

		/**
		 * Handles when an error occurs
		 * @param error_message
		 * @namespace eei18n
		 * @type {{
		 *     batchJobError: string,
		 * }}
		 */
		this.handle_error = function (error_message) {
			// if client code has been good enough to provide us with an internationalized error message, add that
			// especially nice if there is no pre-filled error_message
			let error = '<br><div class="ee-status--error ee-status-outline ee-status-outline--error">';
			if (typeof (eei18n) !== 'undefined') {
				error += eei18n.batchJobError + '<br>';
			}
			if (typeof error_message.error === 'string') {
				error += error_message.error;
			} else if (typeof error_message.errors === 'string') {
				error += error_message.errors;
			} else if (typeof error_message === 'string') {
				error += error_message;
			}
			error += '</div>'
			this.updateProgressArea(error, 'replace');
		};

        /**
         * waits 10 seconds then redirects to return url
         *
         * @function countdownRedirect
         * @param redirectUrl string
         * @param countdown int
         * @returns void
         */
        this.countdownRedirect = function (redirectUrl, countdown = 10) {
            if (redirectUrl) {
                const redirectTimer = setInterval(function () {
                    if (countdown <= 0) {
                        clearInterval(redirectTimer);
                        window.location.replace(redirectUrl);
                    }
                    $("#ee-redirect-timer").html(countdown);
                    countdown--;
                }, 1000);
            }
        };
    }
});
