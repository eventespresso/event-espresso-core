const paypal_payment_methods = {};

jQuery(document).ready(function ($) {
    // Initialize and run all versions of this payment method (EE Payment Methods Pro add-on allows PM versions).
    for (const slug in eeaPPCommerceParameters.pm_versions) {
        paypal_payment_methods[slug] = new EeaPayPalCheckout(slug);
        paypal_payment_methods[slug].initialize();
    }


    /**
     * @namespace EeaPayPalCheckout
     * @type {{
     *  slug: string,
     *  localized: array,
     * }}
     *
     * @namespace paypal
     * @type {{
     *  paypal: object,
     *  hostedFields: Object,
     * }}
     *
     * @namespace eeaPPCommerceParameters
     * @type {{
     * 	pm_versions: array,
     * 	payment_currency: string,
     * 	checkout_type: string,
     * 	currency_sign: string,
     * 	pp_order_nonce: string,
     * 	txn_id: int,
     * 	org_country: string,
     * 	decimal_places: int,
     * 	site_name: string,
     * 	active_states: array,
     * 	no_spco_error: string,
     * 	no_pm_error: string,
     * 	browser_not_supported: string,
     * 	get_token_error: string,
     * 	form_validation_notice: string,
     * 	no_verification_token: string,
     * 	error_response: string,
     * 	payment_error: string,
     * 	no_order_id: string,
     * 	general_pp_error: string,
     * 	hf_render_error: string,
     * 	pm_capture_error: string,
     * 	not_acdc_eligible: string,
     * }}
     */
    function EeaPayPalCheckout(pm_slug) {
        this.slug = pm_slug;
        this.paypal = {};
        this.transaction = {};
        this.spco = window.SPCO || null;

        /**
         * Initial setup.
         * @function
         */
        this.initialize = function () {
            this.initializeObjects();
            // Ensure that the SPCO has loaded.
            if (typeof this.spco == null) {
                this.hidePm();
                this.throwError(eeaPPCommerceParameters.no_spco_error, '', this.slug, false);
                return false;
            }
            // Ensure that PayPal scripts loaded.
            if (typeof paypal === 'undefined') {
                this.hidePm();
                this.throwError(eeaPPCommerceParameters.no_pm_error, '', this.slug);
                return false;
            }
            // Prevent loading on registration page.
            if (!this.billing_form.length) {
                return false;
            }
            // PayPal components will require re-setup even if PM already initialized.
            if (this.initialized) {
                // PayPal buttons or Hosted Fields ?
                if (eeaPPCommerceParameters.checkout_type
                    && eeaPPCommerceParameters.checkout_type !== 'express_checkout'
                ) {
                    this.setupHostedFields();
                }
                if (eeaPPCommerceParameters.checkout_type !== 'ppcp') {
                    this.setupPayPalButtons();
                }
                this.disableSubmitButtons();
                return true;
            }
            this.selected = true;
            this.disableSubmitButtons();
            this.getTransactionData();
            this.initialized = true;
        }


        /**
         * Request the transaction information and store it in local variables.
         * @function
         * @return boolean
         */
        this.initializeObjects = function () {
            this.pp_order_id = this.pp_order_status = '';
            this.pp_order_nonce = eeaPPCommerceParameters.pp_order_nonce;
            this.button_container_id = '#eep-' + pm_slug + '-payment-buttons';
            this.payment_method_selector = $('#ee-available-payment-method-inputs');
            this.payment_method_select_lbl = $('#ee-available-payment-method-inputs-' + pm_slug + '-lbl');
            this.payment_method_info_div = $('#spco-payment-method-info-' + pm_slug);
            this.billing_form = $('#pp-' + pm_slug + '-billing-form');
            // PP order details
            this.order_nonce_input = $('#eea-' + pm_slug + '-order-nonce');
            this.order_id_input = $('#eea-' + pm_slug + '-order-id');
            this.order_status_input = $('#eea-' + pm_slug + '-order-status');
            // PP credit card fields
            this.card_input_id = '#' + this.slug + '-card-number';
            this.cvv_input_id = '#' + this.slug + '-cvv';
            this.expiration_date_input_id = '#' + this.slug + '-expiration-date';
            this.card_holder_name_input_id = '#' + this.slug + '-card-holder-name';
            this.type_separator_id = '#eep-ppc-separator-holder';
            this.card_fields_class = '.' + this.slug + '-card-fields';
            this.payment_form = this.order_nonce_input.parents('form:first');
            this.new_state_form_id = '#new_state_micro_form';
            this.acdc_submit_btn_dv = '#' + this.slug + '-submit-dv';
            // Billing inputs.
            this.bill_address = $('#pp-' + this.slug + '-billing-form-address');
            this.bill_address2 = $('#pp-' + this.slug + '-billing-form-address2');
            this.bill_city = $('#pp-' + this.slug + '-billing-form-city');
            this.bill_state = $('#pp-' + this.slug + '-billing-form-state');
            this.bill_country = $('#pp-' + this.slug + '-billing-form-country');
            this.bill_zip = $('#pp-' + this.slug + '-billing-form-zip');
            this.bill_phone = $('#pp-' + this.slug + '-billing-form-phone');
            this.add_new_state = $('#pp-' + this.slug + '-billing-form-nsmf_add_new_state');
        }


        /**
         * Requests the transaction information and saves it to local variables.
         * @function
         * @return boolean
         */
        this.getTransactionData = function () {
            const this_pm = this;
            const request_parameters = {
                step: 'payment_options',
                action: 'get_transaction_details_for_gateways',
                selected_method_of_payment: this_pm.slug,
                generate_reg_form: false,
                process_form_submission: false,
                noheader: true,
                ee_front_ajax: true,
                EESID: eei18n.EESID,
                revisit: eei18n.revisit,
                e_reg_url_link: eei18n.e_reg_url_link
            };

            $.ajax({
                type: "POST",
                url: eei18n.ajax_url,
                data: request_parameters,
                dataType: "json",
                beforeSend: function () {
                    this_pm.spco.do_before_sending_ajax();
                },
                success: function (response) {
                    // If we can't get a transaction data we can't set up a checkout.
                    if (response['error'] || typeof response['TXN_ID'] == 'undefined' || response['TXN_ID'] == null) {
                        return this_pm.spco.submit_reg_form_server_error();
                    }
                    // Save transaction data.
                    this_pm.transaction = response;
                    // Now we can set up PayPal. PayPal buttons or Hosted Fields ? Or both ?
                    if (eeaPPCommerceParameters.checkout_type !== 'express_checkout') {
                        this_pm.setupHostedFields();
                    }
                    if (eeaPPCommerceParameters.checkout_type !== 'ppcp') {
                        this_pm.setupPayPalButtons();
                    }
                    this_pm.spco.end_ajax();
                    return true;
                },
                error: function () {
                    this_pm.spco.end_ajax();
                    this_pm.spco.submit_reg_form_server_error();
                    return false;
                }
            });
        };


        /**
         * Sets up PayPal payment button.
         * @function
         */
        this.setupPayPalButtons = function () {
            const this_pm = this;
            this_pm.spco.do_before_sending_ajax();
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay'
                },
                // Sets up the transaction when a payment button is clicked.
                createOrder: function (data, actions) {
                    return this_pm.createOrder();
                },
                // Finalize the transaction after payer approval
                onApprove: function (data, actions) {
                    this_pm.hideACDCForm();
                    this_pm.completePayment(this_pm.getBillingInfo(), this_pm);
                },
                onError: function (error) {
                    console.error(eeaPPCommerceParameters.general_pp_error, error);
                    if (String(error).includes('PAYMENT_ALREADY_DONE')) {
                        // Hide any return to cart buttons, etc.
                        $('.hide-me-after-successful-payment-js').hide();
                        // Save order ID.
                        this_pm.saveOrderInDom();
                        this_pm.hideACDCForm();
                        // Trigger click event on SPCO "Proceed to Next Step" button.
                        this_pm.spco.enable_submit_buttons();
                        this_pm.order_nonce_input.parents('form:first').find('.spco-next-step-btn').trigger('click');
                    } else {
                        let message = eeaPPCommerceParameters.payment_error;
                        this_pm.throwError(message, error, this_pm.slug);
                    }
                }
            }).render(this.button_container_id);
            this_pm.spco.end_ajax();
        };


        /**
         * Sets up PayPal Hosted Fields.
         * @function
         */
        this.setupHostedFields = function () {
            const this_pm = this;
            this_pm.spco.do_before_sending_ajax();
            if (paypal.HostedFields.isEligible()) {
                // Renders card fields
                paypal.HostedFields.render({
                    // Call your server to set up the transaction
                    createOrder: function () {
                        return this_pm.createOrder();
                    },
                    styles: {
                        '.valid': {
                            'color': 'green'
                        },
                        '.invalid': {
                            'color': 'red'
                        }
                    },
                    fields: {
                        number: {
                            selector: this_pm.card_input_id,
                            placeholder: "4111 1111 1111 1111"
                        },
                        cvv: {
                            selector: this_pm.cvv_input_id,
                            placeholder: "123"
                        },
                        expirationDate: {
                            selector: this_pm.expiration_date_input_id,
                            placeholder: "MM/YY"
                        }
                    }
                }).then(function (cardFields) {
                    this_pm.submitCardFieldsListener(cardFields);
                }).catch(function (orderData) {
                    this_pm.throwError(
                        eeaPPCommerceParameters.hf_render_error,
                        JSON.stringify(orderData),
                        this_pm.slug
                    );
                });
            } else {
                // Hides card fields if the merchant isn't eligible
                this_pm.hideACDCForm();
                this_pm.displayError(
                    eeaPPCommerceParameters.not_acdc_eligible,
                    $(this.button_container_id)
                );
                // And allow Express checkout.
                if (eeaPPCommerceParameters.checkout_type === 'ppcp') {
                    this_pm.setupPayPalButtons();
                }
            }
            this_pm.spco.end_ajax();
        }


        /**
         * Listener for the card fields submit action.
         * @function
         */
        this.submitCardFieldsListener = function (cardFields) {
            const this_pm = this;
            $("#" + this_pm.slug + "-submit").on('click', (event) => {
                event.preventDefault();
                // Validate the form.
                let state = cardFields.getState();
                let form_valid = this_pm.payment_form.valid();
                Object.keys(state.fields).forEach(function callback(value) {
                    let field_valid = state.fields[value].isValid;
                    // Highlight the problem field.
                    if (!field_valid) {
                        form_valid = false;
                        $(state.fields[value].container).addClass('ee-needs-value');
                    } else {
                        $(state.fields[value].container).removeClass('ee-needs-value');
                    }
                });
                if (form_valid) {
                    const billing_info = this.getBillingInfo();
                    billing_info.card_holder_name = $(this_pm.card_holder_name_input_id).val();
                    if (! billing_info.address2) {
                        billing_info.address2 = '';
                    }
                    // Make sure that we don't already have a Complete order. In which case we don't want to make PP re-capture this order.
                    if (this_pm.pp_order_id && this_pm.pp_order_status && this_pm.pp_order_status === 'COMPLETED') {
                        // Just complete the payment.
                        const response_data = {
                            pp_order_id: this_pm.pp_order_id,
                            pp_order_nonce: this_pm.pp_order_nonce,
                            pp_order_status: this_pm.pp_order_status,
                        };
                        return this_pm.completePayment(response_data, this_pm);
                    }
                    // Submit the card form to PP for processing the order.
                    cardFields.submit({
                        cardholderName: billing_info.card_holder_name,
                        billingAddress: {
                            streetAddress: billing_info.address,
                            extendedAddress: billing_info.address2,
                            region: billing_info.state,
                            locality: billing_info.city,
                            postalCode: billing_info.zip,
                            countryCodeAlpha2: billing_info.country
                        }
                    }).then(function () {
                        this_pm.completePayment(billing_info, this_pm);
                    }).catch(function (err) {
                        this_pm.throwError(
                            eeaPPCommerceParameters.pm_capture_error,
                            JSON.stringify(err),
                            this_pm.slug
                        );
                    });
                } else {
                    this_pm.displayError(
                        eeaPPCommerceParameters.form_validation_notice,
                        $(this_pm.card_input_id)
                    );
                }
            });
        }


        this.getBillingInfo = function () {
            const state_id = this.bill_state.val();
            let state = '';
            for (const key in eeaPPCommerceParameters.active_states) {
                if (state_id === key) {
                    state = eeaPPCommerceParameters.active_states[key];
                }
            }
            let bill_address2 = this.bill_address2.val();
            if (!bill_address2) {
                bill_address2 = '';
            }
            return {
                address: this.bill_address.val(),
                address2: bill_address2,
                city: this.bill_city.val(),
                state: state,
                state_id: state_id,
                country: this.bill_country.val(),
                zip: this.bill_zip.val(),
            };
        };


        /**
         * Send a request to the server side to create an Order through the PayPal API.
         * @function
         */
        this.createOrder = function (billing_info) {
            console.log('function createOrder()');
            this.spco.do_before_sending_ajax();
            // Do we already have a complete order ?
            if (this.pp_order_id && this.pp_order_status && this.pp_order_status === 'COMPLETED') {
                this.spco.end_ajax();
                return this.pp_order_id;
            }
            // Create a new order.
            const this_pm = this;
            const request_data = new FormData();
            request_data.append('action', 'eeaPPCCreateOrder');
            request_data.append('txn_id', this_pm.transaction['TXN_ID']);
            request_data.append('payment_method', this.slug);
            request_data.append('billing_info', JSON.stringify(billing_info));
            // Do a request to create an Order.
            return fetch(eei18n.ajax_url, {
                method: 'POST',
                body: request_data
            })
                .then((response) => response.json())
                .then((response_data) => {
                    console.log('-- createOrder response:', response_data);
                    if (typeof response_data.pp_order_id !== 'undefined') {
                        this_pm.saveOrderData(response_data);
                        this_pm.spco.end_ajax();
                        return response_data.pp_order_id;
                    } else {
                        let message = eeaPPCommerceParameters.no_order_id;
                        if (typeof response_data.error !== 'undefined') {
                            message = response_data.error;
                        }
                        this_pm.throwError(message, response_data, this_pm.slug, false);
                        console.log('-- createOrder return false!');
                        this_pm.spco.end_ajax();
                        return false;
                    }
                })
                .catch((error) => {
                    this_pm.throwError(error, '', this_pm.slug);
                });
        };


        /**
         * Hide the advanced credit debit card fields.
         * @function
         */
        this.hideACDCForm = function () {
            const card_fields = [
                $(this.card_fields_class),
                $(this.type_separator_id),
                $(this.new_state_form_id),
                $(this.acdc_submit_btn_dv),
            ];
            const bill_fields = [
                $(this.card_holder_name_input_id),
                this.bill_address,
                this.bill_address2,
                this.bill_city,
                this.bill_state,
                this.bill_country,
                this.bill_zip,
                this.bill_phone,
                this.add_new_state,
            ];
            // No need to validate this form, disable inputs.
            SPCO.remove_previous_validation_rules();
            // Send additional POST data with the form submit
            SPCO.additional_post_data += '&eep_ppc_skip_form_validation=true';
            $.each(bill_fields, function (index, field) {
                    field.parent().hide();
                    field.removeAttr('required');
                }
            );
            // Hide card fields as well.
            $.each(card_fields, function (index, field) {
                    field.hide();
                }
            );
        }


        /**
         * Add order data to the payment form to pass it to the gateway.
         * @function
         */
        this.saveOrderData = function (order_data) {
            console.log('function saveOrderData()', order_data);
            // Check each parameter before setting its value.
            if (typeof order_data.pp_order_id !== 'undefined' && order_data.pp_order_id) {
                this.pp_order_id = order_data.pp_order_id;
                this.order_id_input.val(order_data.pp_order_id);
            }
            if (typeof order_data.pp_order_nonce !== 'undefined' && order_data.pp_order_nonce) {
                this.pp_order_nonce = order_data.pp_order_nonce;
                this.order_nonce_input.val(order_data.pp_order_nonce);
            }
            if (typeof order_data.pp_order_status !== 'undefined' && order_data.pp_order_status) {
                this.pp_order_status = order_data.pp_order_status;
                this.order_status_input.val(order_data.pp_order_status);
            }
        };


        /**
         * Complete the payment. Do required last steps to submit this payment.
         * @function
         */
        this.completePayment = function (response_data, this_pm) {
            // Hide any return to cart buttons, etc.
            $('.hide-me-after-successful-payment-js').hide();
            // Trigger click event on SPCO "Proceed to Next Step" button.
            this_pm.spco.enable_submit_buttons();
            this_pm.order_nonce_input.parents('form:first').find('.spco-next-step-btn').trigger('click');
            this_pm.spco.end_ajax();
            this_pm.spco.main_container.on('spco_process_response', (event, nextStep, response) => {
                // Disable the spco submit button in case there was an error response.
                if (! response.success) {
                    this_pm.disableSubmitButtons();
                }
            });
            return response_data
        };


        /**
         * Get paypal_order_id.
         * @function
         */
        this.getOrderId = function () {
            return this.pp_order_id;
        };


        /**
         * Clear order data.
         * @function
         */
        this.clearOrder = function () {
            console.log('function clearOrder()');
            this.pp_order_id = '';
            this.pp_order_nonce = '';
            return true;
        };


        /**
         * Display and/or log the error.
         * @function
         * @param message
         * @param details
         * @param pm_slug
         * @param log_error
         * @param display_error
         */
        this.throwError = function (message, details, pm_slug, log_error, display_error) {
            let error_message = eeaPPCommerceParameters.error_response;
            if (message) {
                error_message = error_message + ': ' + message;
            }
            console.error(error_message, details);
            // front-end message
            if (display_error !== false) {
                this.displayError(error_message);
            }
            // add to PM logs
            if (typeof log_error === 'undefined' || log_error === true) {
                if (!details) {
                    details = error_message;
                }
                this.logError(details, pm_slug);
            }
        };


        /**
         * Simply hides the PM selector.
         * @function
         */
        this.hidePm = function () {
            this.payment_method_select_lbl.hide();
            this.payment_method_info_div.hide();
        };


        /**
         * Scroll to top and display the error message.
         * @function displayError
         */
        this.displayError = function (message, item) {
            let notification = this.spco.generate_message_object('', '', message);
            if (typeof item === 'undefined' || typeof item.offset() === 'undefined') {
                item = this.spco.main_container;
            }
            this.spco.scroll_to_top_and_display_messages(item, notification, true);
        };


        /**
         * Logs this error in the EE system (Payment Methods >> Logs).
         * @function
         * @param  {string} msg
         * @param  {EeaPayPalCheckout} pm_slug
         */
        this.logError = function (msg, pm_slug) {
            const ajax_url = typeof ajaxurl === 'undefined' ? eei18n.ajax_url : ajaxurl;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: ajax_url,
                data: {
                    action: 'eeaPPCommerceLogError',
                    pm_slug: pm_slug,
                    txn_id: eeaPPCommerceParameters.txn_id,
                    message: msg,
                }
            });
        };


        /**
         * Deactivate SPCO submit buttons to prevent submitting with no payment.
         * @function disableSubmitButtons
         */
        this.disableSubmitButtons = function () {
            if (this.selected && this.order_nonce_input.length > 0) {
                this.spco.allow_enable_submit_buttons = false;
                this.spco.disable_submit_buttons();
            }
        };


        /**
         * This disassembles current payment method's setup.
         * @function tearDown
         */
        this.tearDown = function () {
            // Head out if this PM is not initialized anymore.
            if (!this.initialized) {
                return;
            }
            // Reset the setup.
            this.initialized = false;
        };


        // Initialize this PM if SPCO reg step changes to "payment_options".
        this.spco.main_container.on('spco_display_step', (event, step_to_show) => {
            if (typeof step_to_show !== 'undefined' && step_to_show === 'payment_options') {
                this.initialize();
            }
        });

        // Also initialize this PM if the selected method of payment changes.
        this.spco.main_container.on('spco_switch_payment_methods', (event, payment_method) => {
            if (typeof payment_method !== 'undefined' && payment_method === this.slug) {
                this.selected = true;
                this.initialize();
            } else {
                this.selected = false;
                this.tearDown();
            }
        });
    }
});
