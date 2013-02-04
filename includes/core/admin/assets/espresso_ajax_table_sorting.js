jQuery(document).ready(function($) {

	$('#the-list').sortable({
		
		cursor: 'move',
		
		update: function(event, ui) {
			
			var ajax_table_sort_nonce = $('#ajax_table_sort_nonce').val();
			var ajax_table_sort_page = $('#ajax_table_sort_page').val();
			var ajax_table_sort_action = $('#ajax_table_sort_action').val();
			
			var row_ids = '';
			$('#the-list input[type=checkbox]').each(function(i){
				row_ids += $(this).val() + ',';
			});
		
			$.ajax({
						type: "POST",
						url:  ajaxurl,
						data: { 
							page : ajax_table_sort_page, 
							action : ajax_table_sort_action,
							row_ids : row_ids,
							espresso_ajax : 1, 
							noheader : 'true', 
							_wpnonce : ajax_table_sort_nonce
						},
						dataType: "json",
						beforeSend: function() {
							do_before_admin_page_ajax();
						},
						success: function(response){	
							show_admin_page_ajax_msg( response );
						},
						error: function(response) {
							show_admin_page_ajax_msg(response);
						}
				});

		}
	}).disableSelection();

});

