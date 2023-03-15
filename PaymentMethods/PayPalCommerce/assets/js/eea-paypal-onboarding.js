const paypal_pms = {};
let ppc_onboarding_processing = false;
jQuery(document).ready(function ($) {
    /**
     * @namespace EeaPayPalOnboarding
     * @type {{
     *  slug: string,
     *  signup_link: string,
     *  localized: array,
     *  onboard_btn: object,
     *  offboard_btn: object,
     *  form: object,
     *  onboard_section: object,
     *  offboard_section: object,
     *  sandbox_select: object,
     *  processing_icon_name: string,
     *  processing_icon: object,
     *  clear_metadata_btn: object,
     *  pp_seller_section: object,
     * }}
     *
     * @namespace eeaPPOnboardParameters
     * @type {{
     * 	onboard_btn_text: string,
     * 	sandbox_btn_text: string,
     * 	sandbox_text: string,
     * 	pm_versions: array,
     * 	onboarding_url: string,
     * 	ee_default_styles: string,
     * 	wp_stylesheet: string,
     * 	can_disable_input: bool,
     * 	connection_notice: string,
     * 	error_response: string,
     * 	request_error: string,
     * 	unknown_container: string,
     * 	pm_nice_name: string,
     * 	blocked_popup_notice: string,
     * 	debug_is_on_notice: string,
     *  debug_is_off_notice: boolean,
     *  refresh_alert: string,
     *  disconnect_dialog: string,
     * }}
     */
    function EeaPayPalOnboarding(pm_slug) {
        this.slug = pm_slug;
        this.signup_link = '';
        this.processing_icon_name = 'espresso-ajax-loading';
        this.onboard_btn = $('#eea_paypal_onboard_btn_' + pm_slug);
        this.offboard_btn = $('#eea_paypal_offboard_btn_' + pm_slug);
        this.onboard_section = $('#eea_paypal_onboard_section_' + pm_slug);
        this.offboard_section = $('#eea_paypal_offboard_section_' + pm_slug);
        this.form = this.onboard_btn.parents('form:first');
        this.sandbox_select = this.form.find('select[name*=' + pm_slug + '][name*=PMD_debug_mode]');
        this.onboard_sandbox_section = $('#eea_paypal_onboard_test_txt_' + pm_slug);
        this.pp_pm_slug_holder = $('#eea_paypal_pm_slug');
        this.clear_metadata_btn = $('#eea_clear_metadata_' + pm_slug);
        this.pp_seller_section = $('#eea_paypal_seller_id_' + pm_slug);


        /**
         * Initial setup.
         * @function
         */
        this.initialize = function () {
            // PayPal selected as payment method and initialized ?
            if (!this.onboard_btn.length || !this.offboard_btn.length || this.initialized) {
                return;
            }
            this.setupListeners();
            if (this.sandbox_select.prop('disabled') && eeaPPOnboardParameters.can_disable_input) {
                this.sandbox_select.siblings('p.description').hide();
                this.sandbox_select.siblings('p.disabled-description').show();
            } else {
                this.sandbox_select.siblings('p.description').show();
                this.sandbox_select.siblings('p.disabled-description').hide();
            }

            this.initialized = true;
        };


        /**
         * Sets up listeners for all onboarding actions.
         * @function
         */
        this.setupListeners = function () {
            // Sandbox mode option listeners.
            this.sandboxSelectListeners();
            // Onboard with PayPal.
            this.onboardBtnListeners();
            // Disconnect from PayPal.
            this.offboardBtnListeners();
            // Clear PM extra meta.
            this.clearMetadataBtnListeners();
        };


        /**
         * Sandbox select listeners.
         * @function
         */
        this.sandboxSelectListeners = function () {
            const this_pm = this;
            // Update button text on page load, depending on the PM sandbox mode.
            this_pm.toggleBtnText(this_pm, this_pm.sandbox_select.val());

            // Listen for the sandbox mode change.
            this.sandbox_select.on('change', function () {
                const sandbox_mode = this_pm.sandbox_select.val();
                // Disable the Connect button for the time the URL is being updated. Save current URL.
                this_pm.signup_link = this_pm.onboard_btn.attr('href');
                this_pm.onboard_btn.removeAttr('href');
                // Update the onboarding URL if the debug mode was changed.
                this_pm.sendRequest('eeaPpGetOnboardingUrl', {}, this_pm.updateOnboardingUrl, false);
                this_pm.toggleBtnText(this_pm, sandbox_mode);
            });
        };


        /**
         * Onboard button listeners.
         * @function
         */
        this.onboardBtnListeners = function () {
            const this_pm = this;
            this.processing_icon = $('#' + this.processing_icon_name);
            this.onboard_btn.on('click', function (event) {
                this_pm.pp_pm_slug_holder.text(this_pm.slug);
                this_pm.sandbox_mode = this_pm.sandbox_select.val();
            });
        };


        /**
         * Hide the EE dialog.
         * @return {void}
         */
        this.hideDialog = function () {
            overlay.fadeOut('fast');
            eedialog.fadeOut('fast');
        };


        /**
         * Show a dialog with the disconnect warning.
         * @return {boolean}
         */
        this.confirmDisconnect = function () {
            const this_pm = this;
            position_overlay(false);
            position_dialog(4, false);
            dialogHelper.addContent(eeaPPOnboardParameters.disconnect_dialog);
            $('#eea_paypal_dialog_ok_' + this_pm.slug).on('click', function() {
                this_pm.hideDialog();
                const btn_container = $(this).closest('tr');
                if (btn_container) {
                    this_pm.sandbox_mode = this_pm.sandbox_select.val();
                    this_pm.sendRequest('eeaPpOffboard', {}, this_pm.reloadPage, false);
                } else {
                    console.error(eeaPPOnboardParameters.unknown_container);
                }
                return true;
            });
            $('#eea_paypal_dialog_cancel_' + this_pm.slug).on('click', function() {
                this_pm.hideDialog();
                return false;
            });
            overlay.on('click', function() {
                this_pm.hideDialog();
                return false;
            });
        };


        /**
         * Offboard button listeners.
         * @function
         */
        this.offboardBtnListeners = function () {
            const this_pm = this;
            this.offboard_btn.on('click', function (event) {
                event.preventDefault();
                this_pm.confirmDisconnect();
            });
        };


        /**
         * Clear metadata button listeners.
         * @function
         */
        this.clearMetadataBtnListeners = function () {
            const this_pm = this;
            this.clear_metadata_btn.on('click', function (event) {
                event.preventDefault();
                this_pm.sendRequest('eeaPpOffboard', {}, this_pm.reloadPage, false);
            });
        };


        /**
         * Simply reloads the page.
         * @param this_pm
         * @param response
         * @function
         */
        this.reloadPage = function (this_pm, response) {
            window.do_before_admin_page_ajax();
            // Reload the page when disconnected.
            // Seems to be required for PP scripts. If not refreshed the signup link is opened in a new window or tab.
            location.reload();
        };


        /**
         * Change the onboarding URL, sandbox vs live.
         * @param this_pm
         * @param response
         * @function
         */
        this.updateOnboardingUrl = function (this_pm, response) {
            window.do_before_admin_page_ajax();
            let signup_link = this_pm.signup_link;
            if (typeof response.signup_link !== 'undefined') {
                signup_link = response.signup_link;
            }
            this_pm.onboard_btn.attr('href', signup_link);
            this_pm.processing_icon.fadeOut('fast');
        };


        /**
         * Updates the Disconnect button
         * @param this_pm
         * @function
         */
        this.updateConnectionInfo = function (this_pm) {
            if (this_pm.offboard_section && this_pm.sandbox_select) {
                const debug_mode = this_pm.sandbox_select.val();
                if (this_pm.onboard_sandbox_section &&
                    debug_mode === '0' &&
                    $(this_pm.onboard_sandbox_section).html().length > 0
                ) {
                    // Remove the sandbox connection note.
                    $(this_pm.onboard_sandbox_section).html('');
                } else if (this_pm.onboard_sandbox_section &&
                    debug_mode === '1' &&
                    $(this_pm.onboard_sandbox_section).html().length === 0
                ) {
                    // Add the sandbox connection note.
                    $(this_pm.onboard_sandbox_section).html(
                        eeaPPOnboardParameters.sandbox_text
                    );
                }
            }
        };


        /**
         * Sends an AJAX request.
         * @param request_action
         * @param request_data
         * @param callback to be called on success
         * @param update_ui
         * @function
         */
        this.sendRequest = function (request_action, request_data, callback, update_ui) {
            if (typeof request_data === 'undefined') {
                request_data = {};
            }
            request_data.action = request_action;
            request_data.payment_method = this.slug;
            request_data.sandbox_mode = this.sandbox_select.val();
            const this_pm = this;
            $.ajax({
                type: 'POST',
                url: eei18n.ajax_url,
                data: request_data,
                dataType: 'json',
                beforeSend: function () {
                    window.do_before_admin_page_ajax();
                },
                success: function (response) {
                    ppc_onboarding_processing = false;
                    const is_valid = this_pm.checkForErrors(response);
                    if (is_valid && typeof callback !== 'undefined' && callback) {
                        // Run the callback if there are no errors.
                        callback(this_pm, response);
                    }
                    if (update_ui) {
                        this_pm.updateOnboardingUI(false);
                    }
                },
                error: function (jqXHR, details, error) {
                    ppc_onboarding_processing = false;
                    this_pm.requestError(jqXHR, error, details, this_pm);
                },
            });
        };


        /**
         * Updates the onboard button text.
         * @function
         */
        this.toggleBtnText = function (this_pm, sandbox_mode) {
            const btn_text_span = this_pm.onboard_btn.find('span')[0];

            // Change button text.
            if (btn_text_span) {
                if (sandbox_mode === '1') {
                    $(btn_text_span).text(eeaPPOnboardParameters.sandbox_btn_text);
                } else {
                    $(btn_text_span).text(eeaPPOnboardParameters.onboard_btn_text);
                }
            }
            // Also update sandbox text.
            this.updateConnectionInfo(this_pm);
        };


        /**
         * Show a dialog with message.
         * @param error
         * @return {void}
         */
        this.showAlert = function (error) {
            const this_pm = this;
            position_overlay(false);
            position_dialog(4, false);
            dialogHelper.addContent('Error: ' + error);
            overlay.on('click', function() {
                this_pm.hideDialog();
            });
        }


        /**
         * Check for errors in the response.
         * @param response
         * @return {boolean}
         */
        this.checkForErrors = function (response) {
            if (response === null || response.error) {
                let error = eeaPPOnboardParameters.request_error;
                if (response !== null && response.message) {
                    error = response.message;
                }
                console.error(error);
                this.showAlert(error);
                return false;
            }
            return true;
        };


        /**
         * Updates the UI to show if we've managed to get onboard.
         * @function
         */
        this.updateOnboardingUI = function (check_status) {
            window.do_before_admin_page_ajax();
            let request_data = {
                action: 'eeaPpGetOnboardStatus',
                payment_method: this.slug,
                sandbox_mode: this.sandbox_mode
            };
            if (check_status) {
                request_data.check_status = check_status;
            }
            const this_pm = this;
            $.ajax({
                type: 'POST',
                url: eei18n.ajax_url,
                data: request_data,
                dataType: 'json',
                beforeSend: function () {
                    window.do_before_admin_page_ajax();
                },
                success: function (response) {
                    if (typeof response.on_board !== 'undefined' && response.on_board) {
                        this_pm.showOffboardUI(this_pm, response);
                    } else {
                        if (typeof response.error !== 'undefined') {
                            console.error(response.error);
                            alert(response.error);
                        }
                        this_pm.showOnboardUI(this_pm);
                    }
                    this_pm.processing_icon.fadeOut('fast');
                },
            });
        };


        /**
         * Show the deauthorize UI.
         * @function
         */
        this.showOffboardUI = function (this_pm, response) {
            this_pm.pp_seller_section.html(this_pm.pp_seller_section.html() + ' ' + response.seller_id);
            this_pm.onboard_section.hide();
            this_pm.offboard_section.show();
            if (eeaPPOnboardParameters.can_disable_input) {
                // Disable the debug mode selector.
                // sandbox_select
                this_pm.sandbox_select.prop('disabled', true);
                this_pm.sandbox_select.siblings('p.description').hide();
                this_pm.sandbox_select.siblings('p.disabled-description').show();
            }
        };


        /**
         * Show the onboarding UI.
         * @function
         */
        this.showOnboardUI = function (this_pm) {
            this_pm.onboard_section.show();
            this_pm.offboard_section.hide();
            if (eeaPPOnboardParameters.can_disable_input) {
                // Enable the debug mode selector.
                this_pm.sandbox_select.prop('disabled', false);
                this_pm.sandbox_select.siblings('p.description').show();
                this_pm.sandbox_select.siblings('p.disabled-description').hide();
            }
        };


        /**
         * Display or log the error.
         * @function
         */
        this.requestError = function (response, err, details, this_pm) {
            this_pm.processing_icon.fadeOut('fast');
            let error = eeaPPOnboardParameters.error_response;
            if (details) {
                error = error + ': ' + details;
            }
            console.error(error);
            this_pm.showAlert(error);
        };
    }

    // Initialize and run all versions of this payment method (EE Payment Methods Pro add-on allows PM versions).
    for (const slug in eeaPPOnboardParameters.pm_versions) {
        paypal_pms[slug] = new EeaPayPalOnboarding(slug);
        paypal_pms[slug].initialize();
    }
});

// Default callback for PayPal to trigger when onboarding was a success.
function onboardedCallback(authCode, sharedId) {
    // Prevent double callback triggers (which did happen frequently).
    if (ppc_onboarding_processing) {
        return;
    }
    ppc_onboarding_processing = true;
    const pm_slug = document.getElementById('eea_paypal_pm_slug').textContent;
    const request_data = {
        authCode: authCode,
        sharedId: sharedId
    };
    paypal_pms[pm_slug].sendRequest('eeaPpGetSellerAccessToken', request_data, false, true);
    // Close the window.
    if (typeof PAYPAL !== 'undefined') {
        PAYPAL.apps.Signup.MiniBrowser.closeFlow();
    }
}
