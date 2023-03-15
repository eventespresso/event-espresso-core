const paypal_payment_methods = {};
jQuery(document).ready(function ($) {

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
     * }}
     * @namespace eeaPPCommerceParameters
     * @type {{
     * 	pm_versions: array,
     * 	client_id: string,
     * 	payment_currency: string,
     * 	currency_sign: string,
     * 	pp_order_id: string,
     * 	pp_order_nonce: string,
     * 	txn_id: int,
     * 	org_country: string,
     * 	decimal_places: int,
     * 	site_name: string,
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
                this.throwError(eeaPPCommerceParameters.no_spco_error, '', false);
                return false;
            }
            // Ensure that PayPal scripts loaded.
            if (typeof paypal === 'undefined') {
                this.hidePm();
                this.throwError(eeaPPCommerceParameters.no_pm_error, '');
                return false;
            }
            // Prevent loading on registration page.
            if (!this.billing_form.length) {
                return false;
            }
            // PayPal selected as payment method and initialized ?
            if (this.initialized) {
                // Re-build the PM form in case it was deselected once before.
                if (!this.payment_button_container.length) {
                    this.setupPayPal();
                }
                return false;
            }
            this.selected = true;
            this.disableSubmitButtons();
            this.getTransactionData()
            this.initialized = true;
        }


        /**
         * Request the transaction information and store it in local variables.
         * @function
         * @return boolean
         */
        this.initializeObjects = function () {
            this.pp_order_id = eeaPPCommerceParameters.pp_order_id;
            this.pp_order_nonce = eeaPPCommerceParameters.pp_order_nonce;
            // this.button_container_id = 'eea-' + pm_slug + '-payment-buttons';
            this.button_container_id = 'eea-paypal-commerce-payment-buttons';
            this.payment_button_container = $('#' + this.button_container_id);
            this.payment_method_selector = $('#ee-available-payment-method-inputs');
            this.payment_method_select_lbl = $('#ee-available-payment-method-inputs-' + pm_slug + '-lbl');
            this.payment_method_info_div = $('#spco-payment-method-info-' + pm_slug);
            this.billing_form = $('#pp-' + pm_slug + '-billing-form');
            this.payment_form = this.payment_button_container.parents('form:first');
            // PP order details
            this.order_nonce_input = $('#eea-' + pm_slug + '-order-nonce');
            this.order_id_input = $('#eea-' + pm_slug + '-order-id');
            this.order_status_input = $('#eea-' + pm_slug + '-order-status');
            this.order_amount_input = $('#eea-' + pm_slug + '-order-amount');
            // Billing data.
            if (typeof this.billing_form !== 'undefined') {
                this.bill_first_name = this.billing_form.find(
                    'input[id*="billing-form-first-name"]:visible');
                this.bill_last_name = this.billing_form.find(
                    'input[id*="billing-form-last-name"]:visible');
                this.bill_email = this.billing_form.find(
                    'input[id*="billing-form-email"]:visible');
                this.bill_address = this.billing_form.find(
                    'input[id*="billing-form-address"]:visible');
                this.bill_address_2 = this.billing_form.find(
                    'input[id*="billing-form-address2"]:visible');
                this.bill_city = this.billing_form.find(
                    'input[id*="billing-form-city"]:visible');
                this.bill_state = this.billing_form.find(
                    'select[id*="billing-form-state"]:visible');
                this.bill_country = this.billing_form.find(
                    'select[id*="billing-form-country"]:visible');
                this.bill_zip = this.billing_form.find(
                    'input[id*="billing-form-zip"]:visible');
                this.bill_phone = this.billing_form.find(
                    'input[id*="billing-form-phone"]:visible');
            }
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
                    // Now we can set up PayPal buttons.
                    this_pm.setupPayPal();
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
        this.setupPayPal = function () {
            const this_pm = this;
            this_pm.spco.do_before_sending_ajax();

            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal'
                },
                onInit: function (data, actions) {
                    // actions.disable();
                },
                onClick: function () {
                    console.log('-- PP onClick:');
                    const form_valid = this_pm.payment_form.valid();
                    if (!form_valid) {
                        this_pm.throwError(eeaPPCommerceParameters.form_validation_notice, '');
                        return false;
                    }
                },
                // Sets up the transaction when a payment button is clicked.
                createOrder: function (data, actions) {
                    this_pm.spco.do_before_sending_ajax();
                    console.log('-- PP createOrder:', data, actions);
                    return this_pm.createOrder();
                },
                // Finalize the transaction after payer approval
                onApprove: function (data, actions) {
                    this_pm.spco.do_before_sending_ajax();
                    console.log('-- PP onApprove:', data, actions);
                    return this_pm.captureOrder(data, actions);
                },
                onError: function (error) {
                    console.log('-- PP onError:', error);
                    console.error(eeaPPCommerceParameters.general_pp_error);
                    if (String(error).includes('PAYMENT_ALREADY_DONE')) {
                        // Hide any return to cart buttons, etc.
                        $('.hide-me-after-successful-payment-js').hide();
                        // Save order ID.
                        const order_data = {
                            pp_order_id: this_pm.getOrderId(),
                            pp_order_nonce: this_pm.getOrderNonce(),
                        };
                        this_pm.saveOrderData(order_data);
                        // Trigger click event on SPCO "Proceed to Next Step" button.
                        this_pm.spco.enable_submit_buttons();
                        this_pm.payment_button_container.parents('form:first').find('.spco-next-step-btn').trigger('click');
                    } else {
                        let message = eeaPPCommerceParameters.payment_error + '; ' + error;
                        this_pm.throwError(message, this_pm.slug);
                    }
                }
            }).render('#' + this.button_container_id);
            this_pm.spco.end_ajax();
        };


        /**
         * Send a request to the server side to create an Order through the PayPal API.
         * @function
         */
        this.createOrder = function () {
            console.log('-- createOrder:');
            // Do we already have an order created ?
            if (this.pp_order_id.length > 0) {
                console.log('-- createOrder return:', this.pp_order_id);
                this.spco.end_ajax();
                return this.pp_order_id;
            }
            // Create a new order.
            const this_pm = this;
            const request_data = new FormData();
            const billing_info = {
                bill_first_name: this.bill_first_name.val(),
                bill_last_name: this.bill_last_name.val(),
                bill_address: this.bill_address.val(),
                bill_city: this.bill_city.val(),
                bill_state: this.bill_state.val(),
                bill_country: this.bill_country.val(),
                bill_zip: this.bill_zip.val(),
                bill_email: this.bill_email.val()
            };
            let bill_address_2 = this.bill_address_2.val();
            if (bill_address_2) {
                billing_info.bill_address_2 = bill_address_2;
            }
            let phone = this.bill_phone.val();
            if (phone) {
                billing_info.bill_phone = phone;
            }
            console.log('-- billing_info:', billing_info);
            request_data.append('action', 'eeaPpCreateOrder');
            request_data.append('txn_id', eeaPPCommerceParameters.txn_id);
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
                        this_pm.throwError(message, this_pm.slug, false);
                        console.log('-- createOrder return false:');
                        this_pm.spco.end_ajax();
                        return false;
                    }
                })
                .catch((error) => {
                    this_pm.throwError(error, this_pm.slug);
                });
        };


        /**
         * Send a request to the server side to capture the Order through the PayPal API.
         * @function
         */
        this.captureOrder = function (order_data, order_actions) {
            console.log('-- captureOrder:', order_data);
            const this_pm = this;
            const request_data = new FormData();
            request_data.append('action', 'eeaPpCaptureOrder');
            request_data.append('payment_method', this.slug);
            request_data.append('txn_id', eeaPPCommerceParameters.txn_id);
            request_data.append('order_id', order_data.orderID);

            // Do a request to capture the Order.
            return fetch(eei18n.ajax_url, {
                method: 'POST',
                body: request_data
            })
                .then((response) => response.json())
                .then((response_data) => {
                    console.log('-- captureOrder response:', response_data);
                    if (typeof response_data.error !== 'undefined') {
                        // if (response_data.name === 'INSTRUMENT_DECLINED') {
                        //     this_pm.clearOrder();
                        // }
                        let message = eeaPPCommerceParameters.payment_error;
                        if (response_data.message) message += '\n\n' + response_data.message;
                        this_pm.throwError(message, this_pm.slug);
                        // order_actions.restart();
                        console.log('-- captureOrder return []:');
                        this_pm.spco.end_ajax();
                        return [];
                    }
                    // All seems to be good if we got here. Submit the form with some order data.
                    this_pm.saveOrderData(response_data);
                    // Hide any return to cart buttons, etc.
                    $('.hide-me-after-successful-payment-js').hide();
                    // Trigger click event on SPCO "Proceed to Next Step" button.
                    this_pm.spco.enable_submit_buttons();
                    this_pm.payment_button_container.parents('form:first').find('.spco-next-step-btn').trigger('click');
                    console.log('-- captureOrder return response_data:', response_data);
                    this_pm.spco.end_ajax();
                    return response_data;
                });
        };


        /**
         * Add order data to the payment form to pass it to the gateway.
         * @function
         */
        this.saveOrderData = function (order_data) {
            console.log('-- saveOrderData:', order_data);
            // Save order data in case there's an error.
            this.pp_order_id = order_data.pp_order_id;
            this.pp_order_nonce = order_data.pp_order_nonce;
            this.order_id_input.val(this.pp_order_id);
            this.order_nonce_input.val(this.pp_order_nonce);
            this.order_status_input.val(order_data.pp_order_status);
            this.order_amount_input.val(order_data.pp_order_amount);
        };


        /**
         * Get paypal_order_id.
         * @function
         */
        this.getOrderId = function () {
            return this.pp_order_id;
        };


        /**
         * Get pp_order_nonce.
         * @function
         */
        this.getOrderNonce = function () {
            return this.pp_order_nonce;
        };


        /**
         * Clear order data.
         * @function
         */
        this.clearOrder = function () {
            console.log('-- clearOrder:');
            this.pp_order_id = '';
            this.pp_order_nonce = '';
            return true;
        };


        /**
         * Display and/or log the error.
         * @function
         * @param details
         * @param pm_slug
         * @param log_error
         * @param display_error
         */
        this.throwError = function (details, pm_slug, log_error, display_error) {
            let error = eeaPPCommerceParameters.error_response;
            if (details) {
                error = error + ': ' + details;
            }
            console.error(error);
            // front-end message
            if (display_error !== false) {
                this.displayError(details);
            }
            // add to PM logs
            if (log_error !== false) {
                this.logError(error, pm_slug);
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
        this.displayError = function (message) {
            let notification = this.spco.generate_message_object('', '', message);
            this.spco.scroll_to_top_and_display_messages(
                this.payment_method_info_div,
                notification,
                this
            );
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
            if (this.selected && this.payment_button_container.length > 0) {
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

    // Initialize and run all versions of this payment method (EE Payment Methods Pro add-on allows PM versions).
    for (const slug in eeaPPCommerceParameters.pm_versions) {
        paypal_payment_methods[slug] = new EeaPayPalCheckout(slug);
        paypal_payment_methods[slug].initialize();
    }
});
