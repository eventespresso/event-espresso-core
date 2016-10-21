jQuery(document).ready(function ($) {
    // collection of datetime selectors
    var $datetime_selectors = $('.ticket-selector-datetime-selector-slct');
    // reset all to default option
    $.each( $datetime_selectors, function () {
        $(this).val(0);
    });
    // update ticket selector if datetime is chosen
    $datetime_selectors.on('change', function () {
        var ticket_selector_id = '#' + $(this).data('tkt_slctr_tbl');
        var $ticket_selector = $(ticket_selector_id);
        if ( $ticket_selector.length ) {
            var selected_datetime = $(this).val();
            $ticket_selector.find('.tckt-slctr-tbl-tr').hide();
            $ticket_selector.find('.ee-ticket-datetimes-' + selected_datetime).show();
        }
    });
});