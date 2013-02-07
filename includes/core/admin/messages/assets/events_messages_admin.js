jQuery(document).ready(function($) {

	//prepare dialog
	var messages_dialog = $( "#messages-change-edit-templates-dv" ).draggable();
	window.dialog = messages_dialog; //send to global space

	var EE_messages_evt_helper = {
		
		parseurl: function(url) {
			return parseUri(url);
		},

		get_template_content: function(selected) {
			var query_parts = this.parseurl($(selected).attr('href'));
			$('.ajax-loader-grey').toggle().show();
			//do post
			$.post( ajaxurl, {
				action: 'ee_msgs_switch_template',
				page: 'events',
				route: query_parts.queryKey.action,
				id: query_parts.queryKey.id === undefined ? '' : query_parts.queryKey.id,
				evt_id: query_parts.queryKey.evt_id === undefined ? '' : query_parts.queryKey.evt_id,
				_wpnonce: query_parts.queryKey._wpnonce
				},
				function( response ) {
					console.log(response);
					var resp = $.parseJSON(response);
					if ( resp.error ) {
						EE_messages_evt_helper.display_content(resp.error);
					} else {
						EE_messages_evt_helper.display_content(resp.content);
						if ( resp.data.close ) {
							dialog.fadeOut( 'fast' );
							overlay.fadeOut( 'fast' );
						}
					}
				}
			);
			return false;
		},

		display_modal: function(selected) {
			position_overlay();
			position_dialog();
			this.get_template_content(selected);
			overlay.on('click', function() {
				dialog.fadeOut( 'fast' );
				overlay.fadeOut( 'fast' );
				$('.messages-change-edit-templates-content').html('');
			});
		},

		display_content: function(content) {
			var content_div = $('.messages-change-edit-templates-content');
			$('.ajax-loader-grey').toggle().hide();
			content_div.html('');
			content_div.html(content);
		}
	};


	$('#edit_event_events_Messages_Hooks_metabox').on('click', '.template_picker', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.display_modal(this);
	});

	$('.messages-change-edit-templates-content').on('submit', 'form', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

});