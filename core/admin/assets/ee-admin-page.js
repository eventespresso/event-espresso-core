jQuery(document).ready(function($) {

    // clear firefox and safari cache: never cache admin AJAX responses. The lazy
    // loaded metabox content below (espressoAjaxPopulate) relies on this cache-buster.
    $.ajaxSetup({ cache: false });

    const eeCPTstatuses           = window.eeCPTstatuses;
    const eeLazyLoadingContainers = window.eeLazyLoadingContainers;

    const $adminBar                = $("#wpadminbar");
    const $recaptchaSettingsSelect = $("#admin-recaptcha-settings-slct");
    const $currentStatusID         = $("#cur_stat_id");
    const overlay                  = $("#espresso-admin-page-overlay-dv");
    const $wpwrap                  = $("#wpwrap");

    // NOTE: ee-dialog-helper.js also sets window.overlay / window.eeTimeout to the
    // same element/value; these are kept here to preserve existing behaviour.
    window.eeTimeout = false;
    window.overlay   = overlay;

    const validate_form_inputs = function(submittedForm) {

        let goodToGo = true;
        let counter  = 1;

        $(submittedForm).find(".required").each(function() {
            if ($(this).val() === "" || $(this).val() === 0) {
                $(this).addClass("requires-value").siblings(".validation-notice-dv").fadeIn();
                goodToGo = false;
            }
            $(this).on("change", function() {
                if ($(this).val() !== "" && $(this).val() !== 0) {
                    $(this).removeClass("requires-value").siblings(".validation-notice-dv").fadeOut("fast");
                }
            });
            if (counter === 1) {
                const thisPos = $(this).offset();
                $(window).scrollTop(thisPos.top - 200);
            }
            counter++;
        });
        return goodToGo;
    };


    $(".submit-for-validation").click(function(event) {
        event.preventDefault();
        const submittedForm = $(this).closest("form");
        if (validate_form_inputs(submittedForm)) {
            submittedForm.submit();
        }
    });

    if ($recaptchaSettingsSelect.length) {
        $recaptchaSettingsSelect.change(function() {
            const $recaptchaSettingsTableRow = $(".admin-recaptcha-settings-tr");
            if ($(this).val() === 1) {
                $recaptchaSettingsTableRow.find(".maybe-required").removeClass("maybe-required").addClass("required");
                $recaptchaSettingsTableRow.show();
                $(".admin-recaptcha-settings-hdr").show();
            } else {
                $recaptchaSettingsTableRow.find(".required").removeClass("required").addClass("maybe-required");
                $recaptchaSettingsTableRow.hide();
                $(".admin-recaptcha-settings-hdr").hide();
            }
        });

        $recaptchaSettingsSelect.trigger("change");
    }


    function escape_square_brackets(value) {
        value = value.replace(/[[]/g, "\\\[");
        value = value.replace(/]/g, "\\\]");
        return value;
    }


    //Select All
    function selectAll(x) {
        let i   = 0;
        const l = x.form.length;
        for (; i < l; i++) {
            if (x.form[i].type === "checkbox" && x.form[i].name !== "sAll") {
                x.form[i].checked = ! x.form[i].checked;
            }
        }
    }


    $(".confirm-delete").click(function() {
        // const what = $(this).attr("rel");
        return confirm(eei18n.confirm_delete);
    });

    $(".updated.fade").delay(5000).fadeOut();

    /*
     Floating "Save" and "Save & Close" buttons
     */
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const offset    = $("#major-publishing-actions .publishing-action").offset();
        if (typeof (offset) !== "undefined" && offset !== null && typeof (offset.top) !== "undefined") {
            if ((scrollTop + 33) > offset.top) {
                $("#event-editor-floating-save-btns").removeClass("hidden");
                $("#major-publishing-actions .button--primary").addClass("hidden");
            } else {
                $("#event-editor-floating-save-btns").addClass("hidden");
                $("#major-publishing-actions .button--primary").removeClass("hidden");
            }
        }
    });


    // Tabs for Messages box on Event Editor Page
    $(document).on('click', '.inside .nav-tab', function(e) {
        e.preventDefault();
        const content_id = $(this).attr("rel");
        //first set all content as hidden and other nav tabs as not active
        $(".ee-nav-tabs .nav-tab-content").hide();
        $(".ee-nav-tabs .nav-tab").removeClass("nav-tab-active");
        //set new active tab
        $(this).addClass("nav-tab-active");
        $("#" + content_id).show();
    });


    /**
     * add in our own statuses IF they exist
     */
    const our_status = $("#cur_status").text();
    // handle removing "move to trash" text if post_status is trash
    if (our_status === "Trashed") {
        $("#delete-action").hide();
    }

    if (typeof (eeCPTstatuses) !== "undefined") {
        // const wp_status = $(".ee-status-container", "#misc-publishing-actions").first();
        const extra_statuses = $("#ee_post_status").html();
        if (our_status !== "") {
            $("#post-status-display").text(our_status);
            $("#save-post", "#save-action").val($("#localized_status_save").text());
        }

        //if custom stati is selected, let's update the text
        $(".save-post-status", "#post-status-select").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            updatePostStatus();
            return false;
        });


        function updatePostStatus(cancel) {
            cancel             = typeof (cancel) !== "undefined";
            const selector     = $("#post_status");
            const changedValue = cancel ? $currentStatusID.text() : $(selector).val();
            const changedLabel = typeof eeCPTstatuses[changedValue] !== "undefined"
                                 ? eeCPTstatuses[changedValue].label
                                 : eeCPTstatuses["draft"].label;
            const saveLabel    = typeof eeCPTstatuses[changedValue] !== "undefined"
                                 ? eeCPTstatuses[changedValue]?.save_label
                                 : eeCPTstatuses["draft"]?.save_label;
            $("#save-post", "#save-action").val(saveLabel);
            $currentStatusID.text(changedValue);
            if (cancel) {
                selector.val(changedValue);
                $("#post-status-display").text(changedLabel);
            }
        }


        $(".cancel-post-status", "#post-status-select").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            updatePostStatus(true);
            return false;
        });

        $("#post").on("submit", function(e) {
            updatePostStatus();
        });


        if (extra_statuses !== "") {
            $("#post_status").append(extra_statuses);
        }
    }

    /**
     * temporarily remove preview button
     */
    $("#preview-action").remove();


    /**
     * temporarily remove trash link on venue editor.
     */
    $("#delete-action", ".event-espresso_page_espresso_venues").remove();


    /**
     * EE Help dialog loads
     */
    $(".espresso-admin").on("click", ".ee-dialog", function(e) {
        e.preventDefault();
        //parse url to get the dialog ref
        let url = $(this).attr("href");
        //create dummy url for parser
        url     = "http://dummyurl.com/" + url;
        console.log(url);
        const queryParts = parseUri(url);

        //set dialogue window
        window.dialog = $("#" + queryParts?.queryKey?.inlineId).draggable();

        position_overlay();
        position_dialog();
        overlay.on("click", function() {
            dialog.fadeOut("fast");
            overlay.fadeOut("fast");
        });
    });


    /**
     * lazy loading of content
     */
    function espressoAjaxPopulate(el) {
        function show(i, id) {
            let p;
            const e    = $("#" + id).find(".widget-loading");
            const page = $("#espresso_admin_current_page").val();
            if (e.length) {
                p       = e.parent();
                const u = $("#" + id + "_url").text();
                setTimeout(function() {
                    p.load(
                        `${ajaxurl}?page=${page}&action=espresso-ajax-content&ee_admin_ajax=1&contentid=${id}&contenturl=${u}`,
                        "",
                        function() {
                            p.hide().slideDown("normal", function() {
                                $(this).css("display", "");
                            });
                        }
                    );
                }, i * 500);
            }
        }


        if (el) {
            el = el.toString();
            if ($.inArray(el, eeLazyLoadingContainers) !== -1) {
                show(0, el);
            }
        } else {
            $.each(eeLazyLoadingContainers, show);
        }
    }


    if (typeof eeLazyLoadingContainers !== "undefined") {
        espressoAjaxPopulate();
    }

    const espressoCloseModalMenus = function() {
        $(".ee-modal-menu").each(function() {
            $(this).removeClass("active");
        });
    };


    if ($wpwrap.length) {
        $wpwrap.on("click", ".espresso-help-tab-lnk", function() {
            const target_help_tab = "#tab-link-" + $(this).attr("id") + " a";
            if ($("#contextual-help-wrap").css("display") === "none") {
                $("#contextual-help-link").trigger("click");
            }
            $(target_help_tab).trigger("click");
        });

        $wpwrap.on("click", ".ee-modal-menu__button", function(e) {
            e.preventDefault();
            espressoCloseModalMenus();
            $(this).parent().toggleClass("active");
        });

        $wpwrap.on("click", ".ee-modal-menu__close", function() {
            espressoCloseModalMenus();
        });


        $wpwrap.on("mouseenter", ".ee-aria-tooltip", function() {
            const label   = $(this).attr("aria-label");
            const tooltip = "<span class=\"ee-tooltip\">" + label + "</span>";

            const $tooltip = $(this).append(tooltip).find(".ee-tooltip").hide();

            let windowTop      = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();
            let windowWidth    = $(window).width();

            // modify window because of toolbars, scrollbars, etc
            windowTop += 32;
            windowWidth -= 32;
            if ($adminBar.length && $adminBar.css("position") === "fixed") {
                windowTop += 16;
            }

            const tooltipHeight = $tooltip.outerHeight();
            const tooltipWidth  = $tooltip.outerWidth();
            const tooltipOffset = $(this).offset();
            const tooltipLeft   = tooltipOffset.left;
            const tooltipRight  = tooltipLeft + tooltipWidth;
            const tooltipTop    = tooltipOffset.top;
            const tooltipBottom = tooltipTop + tooltipHeight;

            let shiftLeft = -16; // plus 1 rem for a bit of space
            let shiftTop  = (tooltipHeight + 8) * -1; // plus half rem for a bit of space

            // does tooltip go off the top of the screen?
            if (tooltipTop < windowTop) {
                shiftTop -= tooltipTop - windowTop;
            }
            // or the bottom of the screen?
            if (tooltipBottom > windowBottom) {
                shiftTop -= tooltipBottom - windowBottom;
            }
            // what about the left side of the screen?
            if (tooltipLeft < 0) {
                shiftLeft = 16; // just set left to 1 rem for a bit of space
            }
            // or the right side?
            if (tooltipRight > windowWidth) {
                shiftLeft -= tooltipRight - windowWidth;
            }

            const $parent = $(this).closest(".ee-aria-tooltip__bounding-box");
            if ($parent.length) {
                const parentHeight = $parent.height();
                const parentWidth  = $parent.width();
                const parentOffset = $parent.offset();
                const parentLeft   = parentOffset.left;
                const parentRight  = parentLeft + parentWidth;
                const parentTop    = parentOffset.top;
                const parentBottom = parentTop + parentHeight;

                // does tooltip go off the top of the parent container?
                if ((tooltipTop + shiftTop) < parentTop) {
                    shiftTop += tooltipTop - parentTop;
                }
                // or the bottom of the parent container?
                if ((tooltipBottom + shiftTop) > parentBottom) {
                    shiftTop -= tooltipBottom - parentBottom;
                }
                // what about the left side of the parent container?
                if ((tooltipLeft + shiftLeft) < parentLeft) {
                    shiftLeft = parentLeft + 16;
                }
                // or the right side of the parent container?
                if ((tooltipRight + shiftLeft) > parentRight) {
                    shiftLeft -= tooltipRight - parentRight + 16;
                }
            }
            const tooltipStyles = {
                left: shiftLeft + "px",
                top:  shiftTop + "px"
            };

            $tooltip.css(tooltipStyles).delay(500).fadeIn(250);
        });

        $wpwrap.on("mouseleave", ".ee-aria-tooltip", function() {
            // comment this out if you need to adjust tooltip styles and want them to stay open
            $(this).find(".ee-tooltip").fadeOut(125).remove();
        });
    }


    // list table filters
    $(".ee-list-table-filter-submit").click(function() {
        $("#ee-list-table-use-filters").val("yes");
    });


    const $listTableFilters      = $("#ee-list-table-filters-dv");
    const $filtersToggle         = $("#ee-list-table-filters-toggle");
    const $filtersToggleText     = $(".ee-list-table-filters-toggle-text");
    const $filtersToggleHideText = $filtersToggle.data("hideText");
    const $filtersToggleShowText = $filtersToggle.data("showText");
    // kinda lame, but we need to delay toggling the button text by the slightest amount
    // because otherwise the visibility of $listTableFilters is off and incorrect
    let delayedToggleTextChange;
    // if the toggle filters button is clicked...
    $filtersToggle.on("click", function(e) {
        e.preventDefault();
        delayedToggleTextChange = setTimeout(toggleListTableFilters, 1);
    });
    // or the window orientation changes
    $(window).on("orientationchange", function() {
        delayedToggleTextChange = setTimeout(toggleListTableFilters, 1);
    });


    const toggleListTableFilters = function() {
        if ($listTableFilters.is(":visible")) {
            $listTableFilters.fadeOut("fast", function() {
                $filtersToggleText.text($filtersToggleShowText);
            });
        } else {
            $listTableFilters.css("display", "flex").hide().fadeIn("fast", function() {
                $filtersToggleText.text($filtersToggleHideText);
            });
        }
        clearTimeout(delayedToggleTextChange);
    };
});
