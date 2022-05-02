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
    jQuery(this.div_id).html('<div class="percent"></div><figure><div class="bar"></div></figure>');



    /**
     * @function update_progress_to
     * @returns void
     */
    this.update_progress_to = function (items_complete, new_total_items) {
        items_complete = parseInt(items_complete);
        if (typeof( new_total_items ) != 'undefined') {
            this.total_items = new_total_items;
        }
        let percent_complete = items_complete / this.total_items * 100;
		percent_complete = !isNaN(percent_complete) ? percent_complete : 0;
		const widthClass = Math.floor(percent_complete / 10);
        jQuery(this.div_id + ' .bar')
			.width(percent_complete + '%')
			.removeClass(
				'progress-0 progress-1 progress-2 progress-3 progress-4 progress-5' +
				' progress-6 progress-7 progress-8 progress-9 progress-10'
			)
			.addClass('progress-' + widthClass);
        percent_complete = Math.floor(percent_complete) + '%';
        if (this.show_item_count) {
            percent_complete += ' (' + items_complete + '/' + this.total_items + ')';
        }
        jQuery(this.div_id + ' .percent').text(percent_complete);
    };


}


