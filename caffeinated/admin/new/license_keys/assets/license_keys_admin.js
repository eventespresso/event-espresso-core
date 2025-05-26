jQuery(document).ready(function ($) {

    window.eeLicenseData = typeof window.eeLicenseData === 'object' ? window.eeLicenseData : null;

    const $license_keys_admin_form = $('#update_license_keys_event_form');
    const $support_license_notice = $('#support-license-notice-dv');
    const $addon_license_keys_notice = $('#add-on-license-keys-notice-dv');
    const $dev_site_notice = $('#dev-site-notice-dv');

    const disableLicenseInputs = function (disabled = true) {
        $('.ee-license-key__input').each(function (index) {
            if ($(this).attr('id') !== 'event_espresso_core-license-key') {
                $(this).prop("disabled", disabled);
            }
        });
        if (disabled) {
            $dev_site_notice.slideDown();
            $support_license_notice.slideDown();
            $addon_license_keys_notice.slideDown();
        } else {
            $dev_site_notice.slideUp();
            $support_license_notice.slideUp();
            $addon_license_keys_notice.slideUp();
        }
    }

    // don't allow form submission with enter key
    $license_keys_admin_form.on('keydown', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    $license_keys_admin_form.on("input", '.ee-license-key__input', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).nextAll('.ee-license-action-btn').prop('disabled', $(this).val() === '');
    });

    $license_keys_admin_form.on("click", ".ee-license-action-btn", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $clickedButton = $(this);
        const action = $clickedButton.data('action');
        const eeLicenseData = window?.eeLicenseData;

        if (action === 'deactivate_license') {
            const confirmNotice = typeof eeLicenseData?.confirmDeactivation !== "undefined"
                ? eeLicenseData.confirmDeactivation
                : 'Are you sure you want to deactivate this license?';

            if (confirm(confirmNotice) !== true) {
                return;
            }
        }
        const target = '#' + $clickedButton.data('target');
        const $licenseInput = $(target);

        if (action === 'reset_license') {
            const confirmNotice = typeof eeLicenseData?.resetDeactivation !== "undefined"
                ? eeLicenseData.resetDeactivation
                : 'Are you sure you want to reset this license?';

            if (confirm(confirmNotice) !== true) {
                return;
            }
            $licenseInput.val('');
        }
        $clickedButton.prop('disabled', true);

        const item_id = $clickedButton.data('item_id');
        const item_name = $clickedButton.data('item_name');
        const plugin_slug = $clickedButton.data('plugin_slug');
        const min_core_ver = $clickedButton.data('min_core_ver');

        const licenseKey = $licenseInput.val();

        const formData = {
            page: 'espresso_license_keys',
            action: 'espresso_update_license',
            license_action: action,
            license_key: licenseKey,
            item_id: item_id,
            item_name: item_name,
            plugin_slug: plugin_slug,
            min_core_ver: min_core_ver,
            noheader: 'true',
            ee_admin_ajax: true
        };
        $.ajax({
            type: "POST",
            url: eei18n.ajax_url,
            data: formData,
            dataType: 'json',
            cache: false,

            beforeSend: function () {
                do_before_admin_page_ajax();
            },

            success: function (response) {
                $('#espresso-ajax-loading').fadeOut('fast');
                $clickedButton.prop('disabled', false);
                console.log('%c response', 'color: Yellow;', response);
                if (typeof (response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null) {
                    const $statusPill = $clickedButton.nextAll('.ee-status-pill');
                    $statusPill.replaceWith(response.return_data.statusNotice);
                    $licenseInput.removeClass([
                        'ee-status-outline--active',
                        'ee-status-outline--inactive',
                        'ee-status-outline--attention',
                        'ee-status-outline--error',
                    ]).addClass('ee-status-outline--' + response.return_data.statusClass);

                    if (
                        response.return_data.license === 'valid' &&
                        (typeof response.return_data.error === "undefined" || response.return_data.error === '')
                    ) {
                        $('#activate-' + plugin_slug).addClass('ee-license-action-btn--hidden');
                        $('#deactivate-' + plugin_slug).removeClass('ee-license-action-btn--hidden');
                        if (plugin_slug === 'event_espresso_core') {
                            disableLicenseInputs(false);
                        }
                    } else {
                        $('#activate-' + plugin_slug).removeClass('ee-license-action-btn--hidden');
                        $('#deactivate-' + plugin_slug).addClass('ee-license-action-btn--hidden');
                        if (plugin_slug === 'event_espresso_core') {
                            disableLicenseInputs(true);
                        }
                    }
                    show_admin_page_ajax_msg(response);
                    if (action === 'reset_license' && licenseKey === '') {
                        location.reload();
                    }
                } else if (response.errors) {
                    show_admin_page_ajax_msg(response);
                } else {
                    response.errors = eei18n.invalid_server_response;
                    show_admin_page_ajax_msg(response);
                }
            },

            error: function (response) {
                $('#espresso-ajax-loading').fadeOut('fast');
                $clickedButton.prop('disabled', false);
                if (typeof (response.errors) === 'undefined') {
                    response.errors = eei18n.error_occurred;
                }
                show_admin_page_ajax_msg(response);
            }
        });

    });

    // check if core has an invalid License, and disable all other license inputs
    if ($('#event_espresso_core-license-key').data('license_status') !== 'valid') {
        disableLicenseInputs(true);
    }

});
