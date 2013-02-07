jQuery(document).ready(function($) {

	//prepare dialog
	var messages_dialog = $( "#messages-change-edit-templates-dv" ).draggable();
	window.dialog = messages_dialog; //send to global space

	var EE_messages_evt_helper = {
		
		parseurl: function(url) {
			return parseUri(url);
		},

		get_template_content: function(selected, type) {
			//if type is form let's setit up for with a dummy url for the parser.
			var url = type == 'form' ? 'http://dummywebsite.com/?' + $(selected).serialize() : $(selected).attr('href');

			var query_parts = this.parseurl(url);


			//lets reset and add a couple of new vars to the queryKey object
			query_parts.queryKey.route = query_parts.queryKey.action !== 'undefined' ? query_parts.queryKey.action : '';
			query_parts.queryKey.action = 'ee_msgs_switch_template';
			query_parts.queryKey.page = 'events';

			//now let's serialize the query_parts.queryKey object to pass via ajax
			var data = $.param(query_parts.queryKey);
			
		
			$('.ajax-loader-grey').toggle().show();
			//do post
			$.post( ajaxurl, data,
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
		EE_messages_evt_helper.get_template_content(this, 'form');
	});

});