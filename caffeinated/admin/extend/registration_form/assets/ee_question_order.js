jQuery(document).ready(function($) {
	$('.question-group-questions').sortable({
        axis:   "y",
        cursor: 'grabbing',
        items: '.ee-question-sortable',
        update: function(event, ui) {
            const allQuestions = $('.ee-question-sortable');
            allQuestions.each( function(i) {
                $('.question-group-QGQ_order', this).val(i+1);
            });
        }
	}).each(function() {
        espresso_reg_forms_fix_sortable_offset($(this).sortable("instance"));
    });


    /**
     * Corrects a jQuery UI Sortable drag-offset bug on scrolled admin pages.
     *
     * In _getParentOffset(), jQuery UI adds scrollParent.scrollTop() to the drag helper's
     * parent offset to compensate for an INNER scroll container. WP admin sets
     * overflow-y:auto on <html>, so when there is no closer scroll container jQuery UI
     * treats the page root itself as the "scroll parent" and adds the page scroll — which
     * element.offset() already includes. That double-count launches the dragged row ~scrollY
     * px up the screen. (Surfaced by the WordPress 7.1 update, which changed <html> overflow.)
     *
     * We wrap _getParentOffset (rather than fixing offset.parent once on `start`) because
     * refreshPositions() recomputes it on every rearrange — so a one-time fix gets clobbered
     * the moment you drag over another row. Subtracting inside the wrapper corrects every
     * recompute, and only when the scroll parent is the page root (the buggy case). It's a
     * no-op when a genuine inner scroll container is the scroll parent (scrollTop 0), where
     * jQuery UI's compensation is already correct.
     *
     * NOTE: keep in sync with the identical fix in
     * admin_pages/registration_form/assets/espresso_registration_form_admin.js
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
});
