jQuery(document).ready(function($) {


	var EE_messages_evt_helper = {

		selectedCache : {},
		messageType : '',
		messenger : '',
		formContent: '',
		grpID : 0,


		/**
		 * Executes loading the form used for creating a custom template
		 * @param  {jQuery} $clickedbutton jQuery object for the lcicked button
		 * @return {void}
		 */
		createTemplateForm: function( clickedButton ) {
			this.messageType = clickedButton.data('messagetype');
			this.messenger = clickedButton.data('messenger');
			this.grpID = clickedButton.data('grpid');

			//display the modal
			this.display_modal();

			//modify the form in the modal
			$('#custom-message-template-grpID').val( this.grpID );
		},

		parseurl: function(url, mode) {
			if ( typeof(mode) === 'undefined' ) mode = 'loose';
			if ( mode == 'strict' ) {
				parseUri.options.strictMode = true;
			}
			return parseUri(url);
		},

		submitForm: function(selected, type, action) {
			var queryobj = $(selected).serializeFullArray();
			queryobj.action = 'ee_msgs_create_new_custom';
			queryobj.page = 'espresso_events';
			queryobj.messageType = this.messageType;
			queryobj.messenger = this.messenger;
			queryobj.group_ID = this.grpID;
			queryobj.ee_admin_ajax = true;

			$('#espresso-ajax-loading').eeCenter().eeAddOverlay().show();

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
						console.log('response');/**/
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
							EE_messages_evt_helper.updateSelectorRow(resp.data);
							EE_messages_evt_helper.close_modal();
							EE_messages_evt_helper.display_notices(resp.notices, 'main', resp.data.what);
						}
						if ( resp.data.close ) {
							EE_messages_evt_helper.close_modal();
						}
					}
				}
			});
			return false;
		},


		/**
		 * This simply gets the form for creating the custom Template (if it's not already set in the formContent proprty)
		 * @return {string} form content html string
		 */
		getForm:function() {
			if ( this.formContent === '' ) {
				this.formContent = $('#messages-change-edit-templates-dv').html();
				$('#messages-change-edit-templates-dv').html('');
			}
			//make sure all formContent is empty.
			return this.formContent;
		},

		display_modal: function() {
			var messages_content = this.getForm();
			//reset all form data
			$('input', messages_content).each(function(index, el) {
				$(this).val('');
			});
			var dialog = dialogHelper.displayModal(true,null,false).addContent(messages_content);
			//replace the content so that
			$('.ee-admin-dialog-container').eeScrollTo(400);
		},


		close_modal: function() {
			dialogHelper.closeModal();
			$('#espresso_events_Messages_Hooks_Extend_messages_metabox_metabox').eeScrollTo(400);
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

			/** show any notices **/
			$('.espresso-notices').show();

			$('#espresso-ajax-loading').eeRemoveOverlay().hide();
			if ( what == 'clear' ) {
				content_div.html('');
				content_div.html(content);
			} else if ( what == 'append' ) {
				content_div.append(content);
			} else if ( what == 'prepend' ) {
				content_div.prepend(content);
			}
		},



		/**
		 * updates the selector row with new grpID and response info
		 * @param  {object} resp json object
		 * @return {void}
		 */
		updateSelectorRow: function(resp) {
			var grpID = resp.grpID;
			var templateName = resp.templateName;
			//add new option to selector and make sure its selected.
			var newOption = '<option value="' + grpID + '">' + templateName + '</option>';
			newOption = $('.message-template-selector', '#' + this.messenger + '-message-selector-row-' + this.messageType).append(newOption);
			$('.message-template-selector', '#' + this.messenger + '-message-selector-row-' + this.messageType).val(grpID);

			//update the edit and create buttons to work with new option!
			this.updateButtons(grpID);
		},



		updateButtons: function (grpID, messageType, messenger) {
			messageType = typeof(messageType) === 'undefined'  ? this.messageType : messageType;
			messenger = typeof(messenger) === 'undefined' ? this.messenger : messenger;
			grpID = typeof(grpID) === 'undefined' ? this.grpID : grpID;

			//setup vars
			var createButton = $('.create-mtpg-button', '#' + messenger + '-message-selector-row-' + messageType);
			var editButton = $('.edit-mtpg-button', '#' + messenger + '-message-selector-row-' + messageType);
			var oldGrpID = createButton.data('grpid');
			var hrefreplace = '';

			//replace old grpID with new grpID
			createButton.data('grpid', grpID);
			editButton.data('grpid', grpID);

			hrefreplace = createButton.attr('href').replace('GRP_ID=' + oldGrpID, 'GRP_ID=' +grpID);
			createButton.attr('href', hrefreplace);
			hrefreplace = editButton.attr('href').replace('id='+oldGrpID, 'id='+grpID);
			editButton.attr('href', hrefreplace);

		}
	};

	$('.create-mtpg-button', '.messages-custom-template-switcher').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		EE_messages_evt_helper.createTemplateForm( $(this) );
	});


	//listener for submit on create template form
	$('.ee-admin-dialog-container').on('submit', 'form', function(e) {
		e.preventDefault();
		e.stopPropagation();
		EE_messages_evt_helper.submitForm( this );
	});

	//listener for selecting template to update create and edit buttons with selection
	$('.message-template-selector', '.messages-custom-template-switcher').on('change', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		var grpID = $(this).val();
		EE_messages_evt_helper.updateButtons( grpID, data.messagetype, data.messenger );
	});

	$('.ee-admin-dialog-container').on('click', '.cancel-create-template', function(e) {
		e.preventDefault();
		e.stopPropagation();
		EE_messages_evt_helper.close_modal();
	});
});
