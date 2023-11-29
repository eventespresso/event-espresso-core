jQuery(document).ready(function ($) {


    $('#entries-per-page-slct').on('change', function () {
		const per_page = $(this).val();
		$('#per_page').val(per_page);
		const theForm = $(this).parents('form');
		let formURL = theForm.attr('action');
		formURL = formURL.replace('&noheader=true', '');
        theForm.attr('action', formURL);
        theForm.submit();
    });


	let dialog_content = {};
	let d_contents = '';

    const txn_admin_payments_table = $('#txn-admin-payments-tbl');

	txn_admin_payments_table.on('click', '.txn-admin-payment-action-edit-lnk', function () {
        display_payments_and_refunds_modal_dialog();
        // grab payment ID
		const PAY_ID = $(this).data('paymentId');
        const paymentAmount = accounting.unformat($('#payment-amount-' + PAY_ID).text());

        const $payDateInput = $('#txn-admin-payment-date-inp');
        const $payAmountInput = $('#txn-admin-payment-amount-inp');


		//display depending on whether amount is negative (refund) or positive (payment).
        if (paymentAmount < 0) {
            //refund
            $('.txn-reg-status-change-reg-status').val('RCN');
            $('#txn-admin-payment-type-inp').val(-1);
            $('#admin-modal-dialog-edit-refund-h2').show().find('span').html(PAY_ID);
            // transfer values from table to modal box form
            $('#txn-admin-payment-payment-id-inp').val(PAY_ID);
            updateTxnPaymentDetails(PAY_ID);
            $payAmountInput.val(paymentAmount * -1);
            $('#txn-admin-apply-payment-to-all-registrations-inp').data('paymentId', PAY_ID);
            $('#txn-admin-apply-payment-to-some-registrations-inp').data('paymentId', PAY_ID);

            $('#txn-admin-modal-dialog-edit-refund-lnk').show();
            $('#txn-admin-modal-dialog-cancel-lnk').show();
        } else {
            //payment
            $('.txn-reg-status-change-reg-status').val('NAN');
            $('#admin-modal-dialog-edit-payment-h2').show().find('.ee-admin-payment-id').html(PAY_ID);
            // transfer values from table to modal box form
            $('#txn-admin-payment-payment-id-inp').val(PAY_ID);
            $('#txn-admin-payment-type-inp').val(1);
            updateTxnPaymentDetails(PAY_ID);
            const formattedAmount = accounting.formatMoney(paymentAmount);
            $payAmountInput.val(formattedAmount);
            $('#txn-admin-apply-payment-to-all-registrations-inp').data('paymentId', PAY_ID);
            $('#txn-admin-apply-payment-to-some-registrations-inp').data('paymentId', PAY_ID);

            $('#txn-admin-modal-dialog-edit-payment-lnk').show();
            $('#txn-admin-modal-dialog-cancel-lnk').show();
        }
        dttPickerHelper.resetpicker().picker(
            $payDateInput,
            {},
            $payAmountInput,
            true,
            false
        );
    });


    $("#display-txn-admin-apply-payment").on('click', function () {
        display_payments_and_refunds_modal_dialog();

        const $payDateInput = $('#txn-admin-payment-date-inp');
        const $payAmountInput = $('#txn-admin-payment-amount-inp');

        //set reg status to approved by default
        $('.txn-reg-status-change-reg-status').val('RAP');
        $('#admin-modal-dialog-apply-payment-h2').show();
        $('#txn-admin-modal-dialog-apply-payment-lnk').show();
        $('#txn-admin-modal-dialog-cancel-lnk').show();
        $payDateInput.val($('#txn-admin-todays-date-inp').val());
		const paymentAmount = $('#txn-admin-total-amount-due').data('due');
        const formattedAmount = accounting.formatMoney(paymentAmount);
        $payAmountInput.val(formattedAmount);

        //make sure payment status selector shows
        $('.txn-admin-apply-payment-status-dv').show();
        dttPickerHelper.resetpicker().picker(
            $payDateInput,
            {},
            $payAmountInput,
            true,
            false
        );
    });

    txn_admin_payments_table.on('click', '.txn-admin-payment-action-delete-lnk', function () {
        display_delete_payment_modal_dialog();
        //grab payment ID
		const PAY_ID = $(this).data('paymentId');
		$('#delete-txn-admin-payment-payment-id-inp').val(PAY_ID);
        $('.delete-txn-reg-status-change-reg-status').val('NAN');
        $('#admin-modal-dialog-delete-payment-h2').show();
        $('#txn-admin-modal-dialog-delete-lnk').show();
        $('#del-txn-admin-modal-dialog-cancel-lnk').show();
    });


    $("#display-txn-admin-apply-refund").on('click', function () {
        display_payments_and_refunds_modal_dialog();

        const $payDateInput = $('#txn-admin-payment-date-inp');
        const $payAmountInput = $('#txn-admin-payment-amount-inp');

        $('.txn-reg-status-change-reg-status').val('RCN');
        $('#admin-modal-dialog-apply-refund-h2').show();
        $('#txn-admin-modal-dialog-apply-refund-lnk').show();
        $('#txn-admin-modal-dialog-cancel-lnk').show();
        $('#txn-admin-payment-payment-id-inp').val(0);
        $('#txn-admin-payment-type-inp').val(-1);
        $payDateInput.val($('#txn-admin-todays-date-inp').val());
		const refundAmount = $('#txn-admin-payment-total').data('total');
        const formattedAmount = accounting.formatMoney(refundAmount);
        $payAmountInput.val(formattedAmount);
        //don't show payment status selector
        $('.txn-admin-apply-payment-status-dv').hide();

        dttPickerHelper.resetpicker().picker(
            $payDateInput,
            {},
            $payAmountInput,
            true,
            false
        );
    });


    function display_payments_and_refunds_modal_dialog() {
        $('#message').hide();
        dialog_content = $('#txn-admin-apply-payment-dv');
        d_contents = dialog_content.html();
        dialog_content.empty();
        dialogHelper.displayModal().addContent(d_contents);
        overlay.on('click', function () {
            //add content back to dom
            dialog_content.html(d_contents);
            $('.admin-modal-dialog-h2').hide();
            $('#admin-modal-dialog-options-ul a').hide();
            $('#txn-admin-payment-method-slct').trigger('change');
            //reset form values
            $('.txn-admin-apply-payment-inp').each(function () {
                $(this).val('');
            });
			const regCode = $('#txn-admin-reg-code-inp').val();
			$('#txn-admin-payment-accounting-inp').val(regCode);
            $('.txn-admin-apply-payment-slct').each(function () {
                $(this).val(0);
            });
            $('#txn-admin-payment-gateway-response-slct').val('PAP');
            $('#txn-admin-payment-type-inp').val(1);
            // remove validation notices
            $('#txn-admin-apply-payment-frm .required').removeClass('requires-value');
            $('.validation-notice-dv').hide();
        });
    }


    //modal dialog "submit" buttons

    $(document).on('click', '#txn-admin-modal-dialog-apply-payment-lnk', function (event) {
        event.preventDefault();
        if (validate_form_inputs()) {
            $('#espresso-ajax').val(1);
            toggleAjaxActivity();
            apply_payment_or_refund('apply');
        }
    });

    $(document).on('click', '#txn-admin-modal-dialog-apply-refund-lnk', function (event) {
        event.preventDefault();
        if (validate_form_inputs()) {
            $('#espresso-ajax').val(1);
            toggleAjaxActivity();
            apply_payment_or_refund('apply');
        }
    });

    $(document).on('click', '#txn-admin-modal-dialog-edit-payment-lnk', function (event) {
        event.preventDefault();
        if (validate_form_inputs()) {
            $('#espresso-ajax').val(1);
            toggleAjaxActivity();
            apply_payment_or_refund('edit');
        }
    });


    $(document).on('click', '#txn-admin-modal-dialog-edit-refund-lnk', function (event) {
        event.preventDefault();
        if (validate_form_inputs()) {
            $('#espresso-ajax').val(1);
            toggleAjaxActivity();
            apply_payment_or_refund('edit');
        }
    });


    $(document).on('click', '#txn-admin-modal-dialog-delete-lnk', function (event) {
        event.preventDefault();
        $('#delete-espresso-ajax').val(1);
        toggleAjaxActivity();
        apply_delete_payment_or_refund();
    });


    function validate_form_inputs() {
		let goodToGo = true;
        $('#txn-admin-apply-payment-frm .required').each(function () {
            if (!$(this).val()) {
                $(this).addClass('requires-value').siblings('.validation-notice-dv').fadeIn();
                $(this).eeScrollTo(400);
                goodToGo = false;
            }
            $(this).on('change', function () {
                if ($(this).val()) {
                    $(this).removeClass('requires-value').siblings('.validation-notice-dv').fadeOut('fast');
                }
            });
        });
        return goodToGo;
    }


    function toggleAjaxActivity() {
        $('#espresso-ajax-loading').eeCenter('').fadeIn('fast');
        $('#ee-ajax-processing-text').fadeIn('fast');
    }


    function apply_payment_or_refund() {
        $('#txn-admin-apply-payment-frm').submit();
    }


    function display_delete_payment_modal_dialog() {
        $('#message').hide();
        dialog_content = $('#txn-admin-delete-payment-dv');
        d_contents = dialog_content.html();
        dialog_content.empty();
        dialogHelper.displayModal().addContent(d_contents);
        overlay.on('click', function () {
            //add content back to dom
            dialog_content.html(d_contents);
            $('.admin-modal-dialog-h2').hide();
            $('#del-admin-modal-dialog-options-ul a').hide();
            $('#admin-modal-dialog-options-ul a').hide();
        });
    }

    // delete a payment
    function apply_delete_payment_or_refund() {
        $('#txn-admin-delete-payment-frm').submit();
    }

    $(document).on('click', '#txn-admin-modal-dialog-cancel-lnk', function () {
        overlay.trigger('click');
    });

    $(document).on('click', '#del-txn-admin-modal-dialog-cancel-lnk', function () {
        overlay.trigger('click');
    });


    function update_registration_payments_inputs(reg_payments) {
        let check_all = false;
        if (typeof (reg_payments) === 'undefined') {
            reg_payments = [];
            check_all = true;
        }
		let REG_ID;
        $('input[name="txn_admin_payment[registrations]"]').each(function () {
            REG_ID = parseInt($(this).val());
            if ($.inArray(REG_ID, reg_payments) > -1 || check_all) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

    }


    function display_payment_registrations_table() {
        $('#txn-admin-apply-payment-to-registrations-dv').slideDown();
    }

    function hide_payment_registrations_table() {
        $('#txn-admin-apply-payment-to-registrations-dv').slideUp();
    }

    eedialog.on('click', '#txn-admin-apply-payment-to-some-registrations-inp', function () {
        if ($(this).is(':checked')) {
            display_payment_registrations_table();
			const PAY_ID = $(this).data('paymentId');
			const reg_payments = $.parseJSON($('#reg-payments-' + PAY_ID).html());
			update_registration_payments_inputs(reg_payments);
        }
    });

    eedialog.on('click', '#txn-admin-apply-payment-to-all-registrations-inp', function () {
        if ($(this).is(':checked')) {
            hide_payment_registrations_table();
            update_registration_payments_inputs();
        }
    });



	$('.tablenav ').on('focusin', '.ee-datepicker', function(e) {
		e.preventDefault();
        e.stopPropagation();
        $( this ).datepicker({ dateFormat: 'yy-mm-dd' });
	});


    function updateTxnPaymentDetails(PAY_ID) {
        $('#txn-admin-payment-status-slct').val($('#payment-STS_ID-' + PAY_ID).text());
        $('#txn-admin-payment-date-inp').val($('#payment-date-' + PAY_ID).text());
        $('#txn-admin-payment-method-slct').val($('#payment-gateway-id-' + PAY_ID).text());
        $('#txn-admin-payment-gateway-response-inp').val($('#payment-response-' + PAY_ID).text());
        $('#txn-admin-payment-txn-id-chq-nmbr-inp').val($('#payment-txn-id-chq-nmbr-' + PAY_ID).text());
        $('#txn-admin-payment-po-nmbr-inp').val($('#payment-po-nmbr-' + PAY_ID).text());
        $('#txn-admin-payment-accounting-inp').val($('#payment-accntng-' + PAY_ID).text());
        $('#txn-admin-payment-details-inp').val($('#payment-details-' + PAY_ID).text());
    }
});
