jQuery(document).ready(function($) {

	//prepare dialog
	var messages_dialog = $( "#messages-change-edit-templates-dv" ).draggable();
	window.dialog = messages_dialog; //send to global space

	var EE_messages_evt_helper = {
		
		parseurl: function(url, mode) {
			if ( typeof(mode) === 'undefined' ) mode = 'loose';
			if ( mode == 'strict' ) {
				parseUri.options.strictMode = true;
			}
			return parseUri(url);
		},

		get_template_content: function(selected, type) {
			//if type is form then we use serializeFullArray
			var queryparts = type == 'form' ? $(selected).serializeFullArray() : this.parseurl($(selected).attr('href'));

			queryobj = type != 'form' ? queryparts.queryKey : queryparts;


			//lets reset and add a couple of new vars to the queryKey object
			queryobj.route = queryobj.action !== 'undefined' ? queryobj.action : '';
			queryobj.action = 'ee_msgs_switch_template';
			queryobj.page = 'espresso_events';

			
		
			$('.ajax-loader-grey').toggle().show();

			//do post
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: queryobj,
				success: function(response, status, xhr) {
					var ct = xhr.getResponseHeader("content-type") || "";
					console.log( ct );
					if (ct.indexOf('html') > -1) {
						/*console.log('html');
						console.log('response');*/
						EE_messages_evt_helper.display_modal();
						EE_messages_evt_helper.display_content(response, 'dialog', 'clear');
					}

					if ( ct.indexOf('json') > -1 ) {
						/*console.log('json');
						console.log(response);*/
						var resp = response;
						//wait a minute?  We didn't do .jsonParse?  Why not? because we used headers to make sure the script already KNOWS we're recieving json.
				
						if ( typeof(resp.data.where) === 'undefined' ) resp.data.where = 'dialog';
						if ( typeof(resp.data.what) === 'undefined' ) resp.data.what = 'clear';

						if ( resp.data.where == 'dialog' )
							EE_messages_evt_helper.display_modal();

						if ( resp.error ) {
							EE_messages_evt_helper.display_notices(resp.notices, resp.data.where);
							EE_messages_evt_helper.display_content(resp.error, resp.data.where, resp.data.what);
						} else {
							EE_messages_evt_helper.display_notices(resp.notices, resp.data.where);
							EE_messages_evt_helper.display_content(resp.content, resp.data.where, resp.data.what);
						}
						if ( resp.data.close ) {
							EE_messages_evt_helper.close_modal();
						}
					}
				}
			});
			return false;
		},

		display_modal: function() {
			position_overlay();
			position_dialog();
			overlay.on('click', function() {
				EE_messages_evt_helper.close_modal();
				$('.messages-change-edit-templates-content').html('');
			});
		},


		close_modal: function() {
			dialog.fadeOut( 'fast' );
			overlay.fadeOut( 'fast' );
		},


		display_notices: function(content, where, what) {
			if ( typeof(where) === 'undefined' ) where = 'dialog';
			if ( typeof(clear) === 'undefined' ) what = 'clear';
			this.display_content(content, where, what, 'notices');
		},

		/**
		 * displays the content retrieved from ajax
		 * @param  {string} content the content to display
		 * @param  {string} where   where to show ('dialog', 'main') : default = dialog
		 * @param  {string} what    what to do with existing content in the target container ('clear', 'append', 'prepend')
		 * @param {string} type content or notices ('content', 'notices') : default = content;
		 * @return {void}
		 */
		display_content: function(content, where, what, type) {
			if ( typeof(where) === 'undefined' ) where = 'dialog';
			if ( typeof(what) === 'undefined' ) what = 'clear';
			if ( typeof(type) === 'undefined' ) type = 'content';

			//if content is empty let's get out
			if ( ( content === '' || typeof(content) === 'undefined' ) && type != 'notices' )
				return;
			
			var main_container = type == 'content' ? $('.messages-tabs-content', '#edit_event_espresso_events_Messages_Hooks_metabox') : $('.ee-notices', '#edit_event_espresso_events_Messages_Hooks_metabox');
			var dialog_container = type == 'content' ? $('.messages-change-edit-templates-content') : $('.ee-notices', '.messages-change-edit-templates-content');
			var content_div = where == 'main' ? main_container : dialog_container;

			$('.ajax-loader-grey').toggle().hide();
			if ( what == 'clear' ) {
				content_div.html('');
				content_div.html(content);
			} else if ( what == 'append' ) {
				content_div.append(content);
			} else if ( what == 'prepend' ) {
				content_div.prepend(content);
			}
		}
	};


	$('#edit_event_espresso_events_Messages_Hooks_metabox').on('click', '.template_picker', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

	$('.messages-change-edit-templates-content').on('submit', 'form', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this, 'form');
	});

	$('.messages-change-edit-templates-content').on('click', '.messages-preview-button', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

	$('.messages-change-edit-templates-content').on('click', '.messages-preview-go-back-button', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

});