jQuery(document).ready(function($) {

    $("#post-body").on("change", "#QST_type", function() {
        espresso_reg_forms_show_or_hide_question_options();
    }).on("click", "#new-question-option", function() {
        espresso_reg_forms_add_option();
    }).on("click", ".remove-option", function() {
        espresso_reg_forms_trash_option(this);
    }).on("click", "#QST_admin_only", function() {
        espresso_maybe_switch_required(this);
    }).on("keydown", ".question-options-table input", function(e) {
        const keyPressed = e.which;
        if (keyPressed === 13) { //enter key
            e.preventDefault();
            e.stopPropagation();
            espresso_reg_forms_add_option();
        }
    });

    espresso_reg_forms_show_or_hide_question_options();

    /** sortable options **/
    $(".question-options-table").sortable({
        axis:   "y",
        cursor: "grabbing",
        items:  ".ee-options-sortable",
        update: () => espresso_update_option_order()
    }).each(function() {
        espresso_reg_forms_fix_sortable_offset($(this).sortable("instance"));
    });


    /**
     * Corrects a jQuery UI Sortable drag-offset bug on scrolled admin pages.
     *
     * In _getParentOffset(), jQuery UI adds scrollParent.scrollTop() to the drag helper's
     * parent offset to compensate for an INNER scroll container. WP admin sets
     * overflow-y:auto on <html>, so when this wrapper is overflow:visible (desktop) jQuery UI
     * treats the page root itself as the "scroll parent" and adds the page scroll — which
     * element.offset() already includes. That double-count launches the dragged row ~scrollY
     * px up the screen.
     *
     * We wrap _getParentOffset (rather than fixing offset.parent once on `start`) because
     * refreshPositions() recomputes it on every rearrange — so a one-time fix gets clobbered
     * the moment you drag over another row. Subtracting inside the wrapper corrects every
     * recompute, and only when the scroll parent is the page root (the buggy case). It's a
     * no-op on mobile, where the wrapper's own overflow-x:scroll makes it the scroll parent
     * (scrollTop 0) and jQuery UI's compensation is already correct.
     *
     * @param {Object} instance the jQuery UI sortable widget instance
     */
    function espresso_reg_forms_fix_sortable_offset(instance) {
        if (! instance || instance._eeParentOffsetPatched) {
            return;
        }
        instance._eeParentOffsetPatched = true;
        const originalGetParentOffset = instance._getParentOffset;
        instance._getParentOffset = function() {
            const offset       = originalGetParentOffset.call(this);
            const scrollParent = this.scrollParent && this.scrollParent[0];
            const offsetParent = this.offsetParent && this.offsetParent[0];
            const isPageRoot   = scrollParent === document.documentElement || scrollParent === document.body;
            // mirror the exact condition under which _getParentOffset added the scroll
            // (absolute + scroll parent contains the offset parent, which jQuery UI zeroes
            // out when it is the <body>), and undo it only when that scroll parent is the
            // page root — i.e. the double-counted case
            if (this.cssPosition === "absolute" && isPageRoot
                && offsetParent && offsetParent !== document.body
                && $.contains(scrollParent, offsetParent)) {
                offset.top  -= this.scrollParent.scrollTop();
                offset.left -= this.scrollParent.scrollLeft();
            }
            return offset;
        };
    }


    /**
     * @return void
     */
    function espresso_update_option_order() {
        const allOptions = $(".question-options-table tr.ee-options-sortable");
        allOptions.each(function(i) {
            //always add one to the index because there should always be a default option for selects
            $(".QSO_order", this).val(i + 1);
        });
    }


    /**
     * @return void
     */
    function espresso_reg_forms_show_or_hide_question_options() {
        const val = $("#QST_type").val();
        if (window.ee_question_data.question_type_with_options.indexOf(val) !== -1) {
            $("#question_options").show();
            espresso_reg_forms_show_option_desc();
        } else {
            $("#question_options").hide();
        }
        if (window.ee_question_data.question_types_with_max.indexOf(val) !== -1) {
            $("#text_input_question_options").show();
        } else {
            $("#text_input_question_options").hide();
        }
        $(".question_type_description").hide();
        $("#question_type_description-" + val).show();

    }


    /**
     * @return void
     */
    function espresso_reg_forms_add_option() {

        const $question_options       = $("#question_options");
        const $question_options_count = $("#question_options_count");
        let count                     = $question_options_count.val();

        const $sampleRow = $question_options.find("tbody tr.question-option.sample");
        if (! $sampleRow.length) {
            console.error("new question HTML could not be found");
            return;
        }
        const $newRow = $sampleRow.clone(true);
        $newRow.removeClass("sample");
        $newRow.addClass("ee-options-sortable");
        // the template ships the sample row hidden with disabled inputs so it isn't posted; re-enable the clone
        $newRow.removeAttr("hidden");
        $newRow.find("input").removeAttr("disabled");
        // since html() only returns the inner HTML,
        // we need to wrap the row in a dummy p tag and then traverse up to the parent
        // so that the call to html() will return the actual row as well
        const $newRowHtml   = $newRow.wrap("<p/>").parent().html();
        // use global regex to replace ALL counts with new value
        const newContent    = $newRowHtml.replace(new RegExp("xxcountxx", "g"), count);
        // add to dom, before the "no default value" row if present, else at the end
        const $noDefaultRow = $question_options.find("tr.no-default-value-row");
        if ($noDefaultRow.length) {
            $noDefaultRow.before(newContent);
        } else {
            $question_options.find("tbody tr:last").after(newContent);
        }
        // make sure QSO_order is correct on all sortable options in the dom
        espresso_update_option_order();
        // focus the new input after it's been added to the DOM
        $question_options.find("#question_options-" + count + "-QSO_value").focus();
        // add new count to DOM after everything else has been updated.
        count++;
        $question_options_count.val(count);
    }


    /**
     * @return void
     */
    function espresso_reg_forms_show_option_desc() {
        $(".option-desc-cell").show();
        $(".option-desc-header").show();
        /** focus on value field **/
        $(".option-value").focus();
    }


    /**
     * @param {HTMLElement} item
     * @return void
     */
    function espresso_maybe_switch_required(item) {
        if ($(item).prop("checked")) {
            $("#QST_required").val("0").prop("disabled", true);
            $("#required_toggled_on").show();
            $("#required_toggled_off").hide();
        } else {
            $("#QST_required").prop("disabled", false);
            $("#required_toggled_on").hide();
            $("#required_toggled_off").show();
        }
    }


    /**
     * @param {HTMLElement} item
     * @return void
     */
    function espresso_reg_forms_trash_option(item) {
        const $questionOptionRow = $(item).closest("tr.question-option");
        if (! $questionOptionRow.length) {
            console.error('question option row not found');
            return;
        }
        // if this option was selected as the default
        // then make the "no default value" option the new default option for the question
        const $questionOptionDefault = $questionOptionRow.find("input.option-default[type=radio]");
        if ($questionOptionDefault.is(":checked")) {
            // the no default option input uses 999999 in place of an ID to avoid collisions
            const $noDefaultOption = $("#question_options-999999-QSO_default");
            if ($noDefaultOption.is("input[type=radio]")) {
                $noDefaultOption.prop("checked", true);
            } else {
                console.error('no default question option input found');
            }
        }
        $questionOptionRow.remove();
	    espresso_update_option_order();
    }

});
