/**
 * @namespace eeStatusChangeNotice
 * @type {{
 *     failed_request_msg: string,
 *     unknown_error_msg: string,
 * }}
 */

/**
 * @namespace EESCN
 * @type {{
 *     statusNotice: object,
 *     openStatusNoticeButton: object,
 *     closeStatusNoticeButton: object,
 *     dismissStatusNoticeButton: object,
 * }}
 */
let EESCN;

jQuery(document).ready(function ($) {

	EESCN = {

		/**
		 * DOM elements
		 */
		statusNotice: $('#ee-status-change-notice'),
		openStatusNoticeButton: $('#ee-open-notice-link'),
		closeStatusNoticeButton: $('#ee-close-notice-link'),
		dismissStatusNoticeButton: $('#ee-dismiss-notice-link'),

		/**
		 * @function initialize
		 */
		initialize: function () {
			// set listeners
			EESCN.openStatusNoticeButton.on('click', function () {
				EESCN.openStatusNotice();
			});
			EESCN.closeStatusNoticeButton.on('click', function () {
				EESCN.closeStatusNotice();
			});
			EESCN.dismissStatusNoticeButton.on('click', function () {
				EESCN.dismissStatusNotice();
			});
		},

		/**
		 * @function openStatusNotice
		 */
		openStatusNotice: function() {
			EESCN.openStatusNoticeButton.removeClass('ee-show-link');
			EESCN.statusNotice.addClass('ee-open-notice');
			return false;
		},

		/**
		 * @function closeStatusNotice
		 */
		closeStatusNotice: function() {
			EESCN.openStatusNoticeButton.addClass('ee-show-link');
			EESCN.statusNotice.removeClass('ee-open-notice');
			return false;
		},

		/**
		 * @function removeStatusNotice
		 */
		removeStatusNotice: function () {
			EESCN.openStatusNoticeButton.fadeOut();
			EESCN.closeStatusNotice();
			return false;
		},

		/**
		 * @function dismissStatusNotice
		 */
		dismissStatusNotice: function () {
			$.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'espresso_hide_status_change_notice',
					ee_admin_ajax: 1
				},
				dataType: 'json',
				success: function (response) {
					if (typeof response.success !== 'undefined' && response.success) {
						EESCN.removeStatusNotice();
					} else {
						if (typeof response.errors !== 'undefined' && response.errors !== '') {
							console.error(response.errors);
						} else {
							console.error(eeStatusChangeNotice.unknown_error_msg);
						}
					}
				},
				error: function (xhr) {
					console.error(eeStatusChangeNotice.failed_request_msg + xhr.status + ' ' + xhr.statusText);
				}
			});
		}
	};

	EESCN.initialize();
});
