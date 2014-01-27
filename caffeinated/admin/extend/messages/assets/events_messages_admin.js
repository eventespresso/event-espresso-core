jQuery(document).ready(function($) {


	var EE_messages_evt_helper = {

		selectedCache : {},
		
		parseurl: function(url, mode) {
			if ( typeof(mode) === 'undefined' ) mode = 'loose';
			if ( mode == 'strict' ) {
				parseUri.options.strictMode = true;
			}
			return parseUri(url);
		},

		get_template_content: function(selected, type, action) {
			var queryparts = {};
			switch ( type ) {
				case 'form' :
					queryparts = $(selected).serializeFullArray();
					break;

				case 'cached_url' :
					queryparts = this.parseurl($(this.selectedCache).attr('href'));
					break;

				default :
					this.selectedCache = selected;
					queryparts = this.parseurl($(selected).attr('href'));
					break;
			}

			queryobj = type != 'form' && type != 'cached' ? queryparts.queryKey : queryparts;

			//if action is set then we define that for th queryobj.route.  Otherwise we leave alone
			queryobj.action = typeof(action) !== 'undefined' ? action : queryobj.action;


			//lets reset and add a couple of new vars to the queryKey object
			queryobj.route = queryobj.action !== 'undefined' ? queryobj.action : '';
			queryobj.action = 'ee_msgs_switch_template';
			queryobj.page = 'espresso_events';
			queryobj.ee_admin_ajax = true;

			if ( action == 'force_switch_template' )
				$('#espresso-ajax-loading').center().show();
			else
				$('#espresso-ajax-loading').center().addOverlay().show();

			//do post
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: queryobj,
				success: function(response, status, xhr) {
					var ct = xhr.getResponseHeader("content-type") || "";
					var resp = '', isjson = true;
					if (ct.indexOf('html') > -1) {
						/*console.log('html');
						console.log('response');*/
						//last verification that we definitely DON'T have JSON (possibly via exceptions)
						try {
							resp = $.parseJSON(response);
						} catch (e) {
							EE_messages_evt_helper.display_modal();
							EE_messages_evt_helper.display_content(response, 'dialog', 'clear');
							isjson = false;
						}
						
					}

					if ( ct.indexOf('json') > -1 || isjson ) {
						/*console.log('json');
						console.log(response);/**/

						resp = resp === '' ? response : resp;

						if( typeof(resp.data) === 'undefined' ) resp.data = [];
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
			var messages_content = $('#messages-change-edit-templates-dv').html();
			var dialog = dialogHelper.displayModal().addContent(messages_content);
			$('.ee-admin-dialog-container').scrollTo();
			overlay.on('click', function() {
				EE_messages_evt_helper.get_template_content('#ee-msg-edit-form','cached_url','force_switch_template');
				EE_messages_evt_helper.close_modal();
				$('.messages-change-edit-templates-content', '.ee-admin-dialog-container').html('');
			});
		},


		close_modal: function() {
			dialogHelper.closeModal();
			$('#espresso_events_Messages_Hooks_Extend_messages_metabox_metabox').scrollTo();
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
			
			var main_container = type == 'content' ? $('.messages-tabs-content', '#espresso_events_Messages_Hooks_Extend_messages_metabox_metabox') : $('.ee-notices', '#espresso_events_Messages_Hooks_Extend_messages_metabox_metabox');
			var dialog_container = type == 'content' ? $('.messages-change-edit-templates-content', '.ee-admin-dialog-container') : $('.ee-notices', '.ee-admin-dialog-container');
			var content_div = where == 'main' ? main_container : dialog_container;

			$('#espresso-ajax-loading').removeOverlay().hide();
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


	$('#espresso_events_Messages_Hooks_Extend_messages_metabox_metabox').on('click', '.template_picker', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

	$('.ee-admin-dialog-container').on('submit', 'form', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this, 'form');
	});

	$('.ee-admin-dialog-container').on('click', '.messages-preview-button', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

	$('.ee-admin-dialog-container').on('click', '.messages-preview-go-back-button', function(e) {
		e.preventDefault();
		EE_messages_evt_helper.get_template_content(this);
	});

});