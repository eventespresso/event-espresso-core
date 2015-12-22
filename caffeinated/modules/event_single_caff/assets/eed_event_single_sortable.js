jQuery( document ).ready( function( $ ) {

	var SingleSortable = {

		/** @param use_sortable_display_order_select : object */
		use_sortable_display_order_select : $( '#EED_Events_Single_use_sortable_display_order' ),

		/** @param eventSingleSortable : object */
		display_order_list : $( '#event-single-sortable-js' ),

		/**
		 * @function initialize
		 */
		initialize : function() {
			SingleSortable.set_listener_for_use_sortable_display_order_select();
			SingleSortable.activate_eventSingleSortable();
		},

		/**
		 * @function set_listener_for_use_sortable_display_order_select
		 */
		set_listener_for_use_sortable_display_order_select : function() {
			SingleSortable.use_sortable_display_order_select.on( 'change', function() {
				SingleSortable.activate_eventSingleSortable();
			} );
		},

		/**
		 * @function activate_eventSingleSortable
		 */
		activate_eventSingleSortable : function() {
			if ( SingleSortable.use_sortable_display_order_select.val() === '1' ) {
				SingleSortable.enable_eventSingleSortable();
				SingleSortable.display_order_list.find( 'li' ).each( function() {
					$( this ).addClass( 'ui-sortable-handle' );
				} );
			} else {
				SingleSortable.disable_eventSingleSortable();
				SingleSortable.display_order_list.find( 'li' ).each( function() {
					$( this ).removeClass( 'ui-sortable-handle' );
				} );
			}
		},

		/**
		 * @function enable_eventSingleSortable
		 */
		enable_eventSingleSortable : function() {
			SingleSortable.display_order_list.sortable( {
				disabled : false,
				items : SingleSortable.display_order_list.find( 'li' ),
				update : function() {
					var elements = '';
					$( '.single-sortable-js' ).each( function() {
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
		},

		/**
		 * @function disable_eventSingleSortable
		 */
		disable_eventSingleSortable : function() {
			SingleSortable.display_order_list.sortable( {
				disabled : true
			} ).enableSelection();
		}


	};


	/**********************************************************************************/


	var ArchiveSortable = {

		/** @param use_sortable_display_order_select : object */
		use_sortable_display_order_select : $( '#EED_Events_Archive_use_sortable_display_order' ),

		/** @param eventArchiveSortable : object */
		display_order_list : $( '#event-archive-sortable-js' ),

		/**
		 * @function initialize
		 */
		initialize : function() {
			ArchiveSortable.set_listener_for_use_sortable_display_order_select();
			ArchiveSortable.activate_eventArchiveSortable();
		},

		/**
		 * @function set_listener_for_use_sortable_display_order_select
		 */
		set_listener_for_use_sortable_display_order_select : function() {
			ArchiveSortable.use_sortable_display_order_select.on( 'change', function() {
				ArchiveSortable.activate_eventArchiveSortable();
			} );
		},

		/**
		 * @function activate_eventArchiveSortable
		 */
		activate_eventArchiveSortable : function() {
			if ( ArchiveSortable.use_sortable_display_order_select.val() === '1' ) {
				ArchiveSortable.enable_eventArchiveSortable();
				ArchiveSortable.display_order_list.find( 'li' ).each( function() {
					$( this ).addClass( 'ui-sortable-handle' );
				} );
			} else {
				ArchiveSortable.disable_eventArchiveSortable();
				ArchiveSortable.display_order_list.find( 'li' ).each( function() {
					$( this ).removeClass( 'ui-sortable-handle' );
				} );
			}
		},

		/**
		 * @function enable_eventArchiveSortable
		 */
		enable_eventArchiveSortable : function() {
			ArchiveSortable.display_order_list.sortable( {
				cursor : 'move',
				disabled : false,
				items : ArchiveSortable.display_order_list.find( 'li' ),
				update : function() {
					var elements = '';
					$( '.archive-sortable-js' ).each( function() {
						elements += $( this ).attr( 'id' ) + ',';
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
		},

		/**
		 * @function disable_eventArchiveSortable
		 */
		disable_eventArchiveSortable : function() {
			ArchiveSortable.display_order_list.sortable( {
				disabled : true
			} ).enableSelection();
		}


	};


	/**********************************************************************************/


	SingleSortable.initialize();
	ArchiveSortable.initialize();

});

