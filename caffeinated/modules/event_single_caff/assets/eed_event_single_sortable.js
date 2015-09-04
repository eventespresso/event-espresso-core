jQuery( document ).ready( function( $ ) {

	$( '#event-single-sortable-js' ).sortable( {
		cursor : 'move',
		items : '.single-sortable-js',
		update : function( event, ui ) {
			var elements = '';
			$( '.single-sortable-js' ).each( function( i ) {
				elements += $( this ).attr('id') + ',';
			} );
			$.ajax( {
				type : "POST",
				url : ajaxurl,
				data : {
					action : 'espresso_update_event_single_order',
					elements : elements,
					espresso_ajax : 1,
					noheader : 'true',
					ee_admin_ajax : true,
					_wpnonce : $( '#espresso_update_event_single_order_nonce' ).val()
				},
				dataType : "json",
				beforeSend : function() {
					do_before_admin_page_ajax();
				},
				success : function( response ) {
					show_admin_page_ajax_msg( response );
				},
				error : function( response ) {
					show_admin_page_ajax_msg( response );
				}
			} );
		}
	} ).disableSelection();


	$( '#event-archive-sortable-js' ).sortable( {
		cursor : 'move',
		items : '.archive-sortable-js',
		update : function( event, ui ) {
			var elements = '';
			$( '.archive-sortable-js' ).each( function( i ) {
				elements += $( this ).attr('id') + ',';
			} );
			$.ajax( {
				type : "POST",
				url : ajaxurl,
				data : {
					action : 'espresso_update_event_archive_order',
					elements : elements,
					espresso_ajax : 1,
					noheader : 'true',
					ee_admin_ajax : true,
					_wpnonce : $( '#espresso_update_event_archive_order_nonce' ).val()
				},
				dataType : "json",
				beforeSend : function() {
					do_before_admin_page_ajax();
				},
				success : function( response ) {
					show_admin_page_ajax_msg( response );
				},
				error : function( response ) {
					show_admin_page_ajax_msg( response );
				}
			} );
		}
	} ).disableSelection();

} );

