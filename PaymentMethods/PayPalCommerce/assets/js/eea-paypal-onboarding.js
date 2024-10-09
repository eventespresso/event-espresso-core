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
     *  onboard_trigger_btn: object,
     *  offboard_btn: object,
     *  form: object,
     *  onboard_window: object,
     *  onboard_section: object,
     *  offboard_section: object,
     *  sandbox_select: object,
     *  onboard_sandbox_section: object,
     *  processing_icon_name: string,
     *  processing_icon: object,
     *  clear_metadata_btn: object,
     *  pp_pm_slug_holder: object,
     *  pp_seller_section: object,
     *  connect_ok_id: string,
     *  connect_cancel_id: string,
     *  disconnect_ok_id: string,
     *  disconnect_cancel_id: string,
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
     *  connect_dialog: string,
     *  disconnect_dialog: string,
     *  processing_mask: string,
     *  supported_countries: array,
     * }}
     */
    function EeaPayPalOnboarding(pm_slug) {
        this.slug = pm_slug;
        this.signup_link = '';
        this.onboard_window = null;
        this.processing_icon_name = 'espresso-ajax-loading';
        this.onboard_btn = $('#eea_paypal_onboard_btn_' + pm_slug);
        this.onboard_trigger_btn = $('#eea_paypal_onboard_trigger_btn_' + pm_slug);
        this.offboard_btn = $('#eea_paypal_offboard_btn_' + pm_slug);
        this.onboard_section = $('#eea_paypal_onboard_section_' + pm_slug);
        this.offboard_section = $('#eea_paypal_offboard_section_' + pm_slug);
        this.form = this.onboard_btn.parents('form:first');
        this.sandbox_select = this.form.find('select[name*=' + pm_slug + '][name*=PMD_debug_mode]');
        this.onboard_sandbox_section = $('#eea_paypal_onboard_test_txt_' + pm_slug);
        this.pp_pm_slug_holder = $('#eea_paypal_pm_slug');
        this.clear_metadata_btn = $('#eea_clear_metadata_' + pm_slug);
        this.pp_seller_section = $('#eea_paypal_seller_id_' + pm_slug);
        this.connect_ok_id = '#eea_ppc_connect_ok_' + pm_slug;
        this.connect_cancel_id = '#eea_ppc_connect_cancel_' + pm_slug;
        this.disconnect_ok_id = '#eep_ppc_disconnect_ok_' + pm_slug;
        this.disconnect_cancel_id = '#eep_ppc_disconnect_cancel_' + pm_slug;
        this.pp_country_select_id = '#eep_ppc_country_' + pm_slug;
        this.checkout_type_select_id = '#eep_ppc_checkout_type_' + pm_slug;
        this.express_checkout_type_id = this.checkout_type_select_id + '-express_checkout';
        this.ppcp_checkout_type_id = this.checkout_type_select_id + '-ppcp';
        this.ppcp_checkout_type_lbl = this.ppcp_checkout_type_id + '-lbl';


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
            this_pm.sandbox_select.on('change', function () {
                const sandbox_mode = this_pm.sandbox_select.val();
                // Update the onboarding URL if the debug mode was changed.
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
            this.onboard_btn.on('click', function () {
                this_pm.pp_pm_slug_holder.text(this_pm.slug);
                this_pm.sandbox_mode = this_pm.sandbox_select.val();
                this_pm.preOnboardingForm();
            });
        };


        /**
         * Shows the pre onboarding/options form.
         * @function
         */
        this.preOnboardingForm = function () {
            position_overlay(true);
            position_dialog(2, false);
            dialogHelper.addContent(eeaPPOnboardParameters.connect_dialog);
            // Pre onboarding form setup.
            this.preOnboardingFormSetup();
            // Onboarding form listeners.
            this.onboardFormListeners();
        }


        /**
         * Set up the pre-onboarding form.
         * @function
         */
        this.preOnboardingFormSetup = function () {
            $(this.express_checkout_type_id).attr('disabled', true);
        }


        /**
         * Onboard/options form listeners.
         * @function
         */
        this.onboardFormListeners = function () {
            let this_pm = this;
            // Cancel.
            $(this.connect_cancel_id).on('click', function() {
                this_pm.hideDialog();
                return false;
            });
            // Continue the onboarding.
            $(this.connect_ok_id).on('click', function() {
                this_pm.startOnboarding();
            });
            // Change country select.
            $(this.pp_country_select_id).on('change', function() {
                this_pm.validateCountry();
            });
        }


        /**
         * Start the onboarding process.
         * @return {void}
         */
        this.startOnboarding = function () {
            let selected_country = $(this.pp_country_select_id).val();
            let checkout_type = 'EXPRESS_CHECKOUT';
            if ($(this.ppcp_checkout_type_id).is(':checked')) {
                checkout_type = 'PPCP';
            }
            // Request the onboarding URL and then initiate PayPal onboarding flow.
            const url_parameters = new URLSearchParams(window.location.search);
            const request_params = {
                wp_nonce: url_parameters.get('_wpnonce'),
                country: selected_country,
                selected_payment: checkout_type
            };
            this.sendRequest('eeaPpGetOnboardingUrl', request_params, this.initiatePayPalOnboarding, false);
        };


        /**
         * Validate the selected country.
         * @return {void}
         */
        this.validateCountry = function () {
            let selected_country = $(this.pp_country_select_id).val();
            if ($.inArray(selected_country, eeaPPOnboardParameters.supported_countries) === -1) {
                // Do not allow PPCP pm to be selected if there is no support for selected country.
                $(this.ppcp_checkout_type_id).prop('checked', false);
                $(this.ppcp_checkout_type_id).attr('disabled', true);
                $(this.ppcp_checkout_type_lbl).fadeOut('fast');
            } else {
                $(this.ppcp_checkout_type_lbl).show();
                $(this.ppcp_checkout_type_id).removeAttr('disabled');
            }
        }


        /**
         * Hide the EE dialog.
         * @return {void}
         */
        this.hideDialog = function () {
            dialogHelper.closeModal();
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
                this_pm.sendRequest('eeaPpClearMetaData', {}, this_pm.reloadPage, false);
            });
        };


        /**
         * Trigger a click to initiate PayPal.
         * @param this_pm
         * @param response
         * @function
         */
        this.initiatePayPalOnboarding = function (this_pm, response) {
            if (typeof response.signup_link !== 'undefined') {
                this_pm.onboard_trigger_btn.attr('href', response.signup_link);
                this_pm.hideDialog();
                this_pm.processing_icon.fadeOut('fast');
                this_pm.onboard_trigger_btn[0].click();
            }
        }


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
                    const is_valid = this_pm.checkForErrors(this_pm, response, request_action === 'eeaPpGetOnboardingUrl');
                    if (is_valid && typeof callback !== 'undefined' && callback) {
                        // Run the callback if there are no errors.
                        callback(this_pm, response);
                    } else {
                        this_pm.processing_icon.fadeOut('fast');
                    }
                    if (update_ui) {
                        this_pm.updateOnboardingUI(this_pm, false);
                    }
                },
                error: function (jqXHR, details, error) {
                    ppc_onboarding_processing = false;
                    this_pm.requestError(jqXHR, error, details, this_pm, request_action === 'eeaPpGetOnboardingUrl');
                },
            });
        };


        /**
         * Updates the onboard button text.
         * @function
         */
        this.toggleBtnText = function (this_pm, sandbox_mode) {
            // Change button text.
            if (sandbox_mode === '1') {
                this_pm.onboard_btn.text(eeaPPOnboardParameters.sandbox_btn_text);
            } else {
                this_pm.onboard_btn.text(eeaPPOnboardParameters.onboard_btn_text);
            }
            // Also update sandbox text.
            this.updateConnectionInfo(this_pm);
        };


        /**
         * Show a dialog with the disconnect warning.
         * @return {boolean}
         */
        this.confirmDisconnect = function () {
            const this_pm = this;
            position_overlay(false);
            position_dialog(3, false);
            dialogHelper.addContent(eeaPPOnboardParameters.disconnect_dialog);
            $(this_pm.disconnect_ok_id).on('click', function() {
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
            $(this.disconnect_cancel_id).on('click', function() {
                this_pm.hideDialog();
                return false;
            });
            overlay.on('click', function() {
                this_pm.hideDialog();
                return false;
            });
        };


        /**
         * Show a dialog with message.
         * @param error
         * @return {void}
         */
        this.showAlert = function (error) {
            const this_pm = this;
            position_overlay(false);
            position_dialog(3, false);
            dialogHelper.addContent('Error: ' + error);
            overlay.on('click', function() {
                this_pm.hideDialog();
            });
        }


        /**
         * Check for errors in the response.
         * @param this_pm
         * @param response
         * @param close_window
         * @return {boolean}
         */
        this.checkForErrors = function (this_pm, response, close_window) {
            if (response === null || response.error) {
                if (close_window) {
                    this_pm.onboard_window.close();
                }
                let error = eeaPPOnboardParameters.request_error;
                if (response !== null && response.message) {
                    error = response.message;
                }
                console.error(error);
                this_pm.showAlert(error);
                this_pm.processing_icon.fadeOut('fast');
                return false;
            }
            return true;
        };


        /**
         * Updates the UI to show if we've managed to get onboard.
         * @function
         */
        this.updateOnboardingUI = function (this_pm, check_status) {
            window.do_before_admin_page_ajax();
            let request_data = {
                action: 'eeaPpGetOnboardStatus',
                payment_method: this_pm.slug,
                sandbox_mode: this_pm.sandbox_mode
            };
            if (check_status) {
                request_data.check_status = check_status;
            }
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
        this.requestError = function (response, err, details, this_pm, close_window) {
            this_pm.processing_icon.fadeOut('fast');
            let error = eeaPPOnboardParameters.error_response;
            if (details) {
                error = error + ': ' + details;
            }
            console.error(error);
            this_pm.showAlert(error);
            if (close_window) {
                this_pm.onboard_window.close();
            }
        };
    }

    // Initialize and run all versions of this payment method (EE Payment Methods Pro add-on allows PM versions).
    for (const slug in eeaPPOnboardParameters.pm_versions) {
        paypal_pms[slug] = new EeaPayPalOnboarding(slug);
        paypal_pms[slug].initialize();
    }
});
