jQuery(document).ready(function($) {

    $.ajaxSetup({cache: false});

    /**
     * datepicker functionality?
     */
    // if datepicker function exists
    if ($.fn.datepicker) {
        // activate datepicker fields
        $(".datepicker").datepicker({
            changeMonth: true,
            changeYear:  true,
            yearRange:   "-80:+20",
            dateFormat:  "mm/dd/yy"
        });
    }

    // the registration start/end date filters and the month filter are alternative ways
    // to specify a registration date window, so clear one when the other is used
    const $reg_date_range_inputs = $("#reg_start_date, #reg_end_date");
    const $month_range_select    = $("#month_range");
    if ($reg_date_range_inputs.length) {
        $reg_date_range_inputs.on("change", function() {
            if ($(this).val()) {
                $month_range_select.val("");
            }
        });
    }
    if ($month_range_select.length) {
        $month_range_select.on("change", function() {
            if ($(this).val()) {
                $reg_date_range_inputs.val("");
            }
        });
    }


    $("#entries-per-page-slct").change(function() {
        const per_page = $(this).val();
        $("#per_page").val(per_page);
        $("#registrations-overview-frm").submit();
    });


    $("#reg-admin-attendee-questions-submit").on("click", function(e) {
        if (! confirm(eei18n.confirm_update_reg_details)) {
            e.preventDefault();
        }
    });


    $("#wpcontent").on("click", ".ee-more-datetimes-toggle", function(e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(this).parent().next(".more-items").slideToggle();
    });


    /**
     * catch the Check-in status triggers
     * @return string (new html for checkin)
     */
    $(".trigger-checkin", "#the-list").on("click", function() {
        const itemData  = $(this).data();
        const $thisItem = $(this);
        const data      = {
            _regid:        itemData._regid,
            dttid:         itemData.dttid,
            checkinnonce:  itemData.nonce,
            ee_admin_ajax: true,
            action:        "toggle_checkin_status",
            page:          "espresso_registrations"
        };

        const setup = {
            where: "#ajax-notices-container",
            what:  "clear"
        };

        $.ajax({
                   type:    "POST",
                   url:     ajaxurl,
                   data:    data,
                   success: function(response, status, xhr) {
                       const ct = xhr.getResponseHeader("content-type") || "";
                       if (ct.indexOf("html") > -1) {
                           $(setup.where).html(response);
                       }

                       if (ct.indexOf("json") > -1) {
                           const resp    = response,
                                 content = resp.error ? resp.error : resp.content;
                           if (resp.error) {
                               $(setup.where).html(content);
                           } else {
                               $(setup.where).html(resp.notices);
                               $(".espresso-notices").show();
                               $thisItem.find(".dashicons").attr("class", content);
                           }
                       }
                   }
               });
        return false;
    });

    //validation
    try {
        $("#post").validate({
            invalidHandler: function() {
                //toggle the wpjs indicators
                $(".spinner").hide();
                $("#publish").removeClass("button--primary-disabled");
            }
        });
    } catch {
        // .validate only runs when the jQuery validate plugin is present
    }

    $("#js-ee-hide-expired-events").click(function() {
        $("#EVT_ID").toggleClass("ee-hide-expired-events");
    });
    $("#js-ee-hide-upcoming-events").click(function() {
        $("#EVT_ID").toggleClass("ee-hide-upcoming-events");
    });
    $("#EVT_ID").change(function() {
        $("#DTT_ID").val(0);
        $("#reg_datetime_id").val(0);
        $("#reg_event_id").val($(this).val());
    });

    const contactsEl = document.getElementById("ee-contacts-data");
    let contacts = [];
    if (contactsEl && contactsEl.textContent.trim() !== "") {
        try {
            contacts = JSON.parse(contactsEl.textContent);
        } catch (e) {
            contacts = [];
            console.error("failed to parse contacts data", e);
        }
    }
    const searchURL          = ajaxurl + "?page=espresso_registrations&action=ee_search_contacts&ee_admin_ajax=1";
    // use array of objects for jQuery UI Autocomplete or AJAX to fetch results?
    const autocompleteSource = Array.isArray(contacts) && contacts.length ? contacts : searchURL;

    $("#change-reg-contact-autocomplete").autocomplete({
        source:    autocompleteSource,
        minLength: 2,
        select:    function(event, ui) {
            $("#change-reg-contact-id").val(ui.item.id);
        }
    });
});

/**
 * hide unnecessary ui elements when viewing attendee details cpt route.
 */
jQuery("#post-status-display").parent().hide();
jQuery("#visibility").hide();
if (typeof (window.ATTENDEE_DETAILS) !== "undefined") {
    jQuery("#timestamp").html(window.ATTENDEE_DETAILS.att_publish_text);
}
