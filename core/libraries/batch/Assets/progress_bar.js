/*
 * Base object which can be used for converting any div into a progress bar.
 * Example usage:
 * var my_progress_bar = new ProgressBarBase( 'my_div', 100 );
 * my_progress_bar.update_progress_to( 12, 100 );
 */
function EE_ProgressBar(div_id, total_items, show_item_count){

    this.div_id = '#' + div_id;
    this.total_items = total_items;
    this.show_item_count = typeof( show_item_count ) !== 'undefined' ? show_item_count : true;
    //make sure it has the necessary child elements
    jQuery(this.div_id).html('<figure><div class="bar"></div><div class="percent"></div></figure>');



    /**
     * @function update_progress_to
     * @returns void
     */
    this.update_progress_to = function (items_complete, new_total_items) {
        items_complete = parseInt(items_complete);
        if (typeof( new_total_items ) != 'undefined') {
            this.total_items = new_total_items;
        }
        var percent_complete = items_complete / this.total_items;
        var bar_size = jQuery(this.div_id + ' figure').innerWidth();
        var new_bar_size = percent_complete * parseFloat(bar_size);
        jQuery(this.div_id + ' .bar').width(new_bar_size);
        percent_complete = Math.floor(percent_complete * 100) + '%';
        if (this.show_item_count) {
            percent_complete += ' (' + items_complete + '/' + this.total_items + ')';
        }
        jQuery(this.div_id + ' .percent').text(percent_complete);
    };


}


