jQuery(document).ready(function($) {

	var MSG_helper = {

		/**
		 * This function toggles message boxes active and inactive setting the correct selectors for other js used on this page
		 * @param  {string} incoming_messenger What messenger is being toggled
		 * @param  {string} type      'active' or 'inactive'? (default: active)
		 * @return {void}
		 */
		toggle: function( incoming_messenger, type ) {
			if ( typeof(type) === 'undefined' ) type = 'active';

			//makes sure we strip out any '#'
			messenger = incoming_messenger.replace('#','');

			//set refs
			var active_main = '#espresso_' + messenger + '_settings';
			var active_secondary = '#espresso_' + messenger + '_inactive_mts';

			//remove or add id?
			if ( type == 'active' ) {
				$('.inactive-message-types', active_secondary).attr('id', 'inactive-message-types');
				$('.mt-tab-container', active_main).attr('id', 'active-message-types');
				$(active_main).fadeIn();
				$(active_secondary).fadeIn();
			} else {
				$('.inactive-message-types', active_secondary).attr('id', '');
				$('.mt-tab-container', active_main).attr('id', '');
			}

			//make sure we grab any changed containers
			$active_mts = $( '#active-message-types' );
			$inactive_mts = $( '#inactive-message-types' );

			//set draggables and droppables!
			$( "li", $active_mts ).draggable({
				cancel: ".no-drag", //clicking .no-drag class element won't initiate dragging
				revert: "invalid", //when not dropped the item will revert back to its initial location
				containment: "document",
				helper: "clone",
				cursor: "move"
			});

			//make sure inactives are draggable too
			$( "li", $inactive_mts ).draggable({
				cancel: ".no-drag", //clicking .no-drag class element won't initiate dragging
				revert: "invalid", //when not dropped the item will revert back to its initial location
				containment: "document",
				helper: "clone",
				cursor: "move"
			});/**/

			$inactive_mts.droppable({
				accept: "#active-message-types li",
				activeClass: "ui-state-highlight",
				drop: function( event, ui ) {
					MSG_helper.inactivate( ui.draggable );
				}
			});


			$active_mts.droppable({
				accept: "#inactive-message-types li",
				activeClass: "custom-state-active",
				drop: function( event, ui ) {
					MSG_helper.activate( ui.draggable );
				}
			});

			return this; //make chainable
		},



		mt_toggle: function( $item, status ) {
			var msgr = messenger.replace('#',''),
			mt = $($item).attr('id').replace('-messagetype-'+msgr,'');

			var data = {
				messenger: msgr,
				message_type: mt,
				status: status,
				action: 'activate_mt',
				page: 'espresso_messages',
				ee_admin_ajax: true,
				mt_nonce: $('.mt_nonce', $item).text()
			};

			$('.ajax-loader-grey').toggle();

			//register a handler for success ajax called after
			$(document).ajaxSuccess( function( event, xhr, ajaxoptions ) {
				//we can get the response from xhr
				var ct = xhr.getResponseHeader("content-type") || "";
				if ( ct.indexOf('json') > -1 ) {
					var resp = xhr.responseText;
					resp = $.parseJSON(resp);
					//let's handle toggling all the elements if we had a successful switch!
					$('.ajax-loader-grey').hide();
					if ( resp.success ) {
						MSG_helper.switch_types( $item, status );
						//do we need to reload mt?
						if ( typeof(resp.data.mt_reload) !== 'undefined' ) {
							$(resp.data.mt_reload).each(function(index, value) {
								MSG_helper.update_mt_form(value, msgr);
							});
						}
					} else {
						MSG_helper.switch_types( $item, status, true );
					}
				}
			});

			this.do_ajax(data);
		},


		switch_types: function( $item, status, reverse ) {
			//convert status if necessary
			if ( status == 'on' || status == 'off' ) {
				status = status == 'on' ? 'activate' : 'deactivate';
			}

			//if reverse is true (not undefined) then we want to reverse the status
			if ( typeof(reverse) !== 'undefined' && reverse ) {
				status = status == 'activate' ? 'deactivate' : 'activate';
			}

			var $list = status == 'activate' ? $( "ul.messenger-activation", $active_mts ) : $( "ul", $inactive_mts),
				css_width = status == 'activate' ? '31%' : '75%',
				list_width = $list.width();

			$item.fadeOut(function() {
				$(this)
					.appendTo( $list )
					.css("width", css_width);
			});

			$item.fadeIn( function() {
						if ( status == 'deactivate' ) {
							$(this).animate({width: list_width});
						} else {
							$(this).animate({width: css_width});
						}
					});

			//unbind any existing ajax success handler so we don't get repeat fires
			$(document).unbind('ajaxSuccess');
			return this;
		},


		/**
		 * This just initializes the display everytime a messenger is selected
		 * @return {void}
		 */
		init: function() {
			$('#postbox-container-2 .postbox').hide();
			$('#postbox-container-1 .postbox').hide();
			//show just the global settings metabox
			$( '#espresso_global_message_settings').show();
			$('.mt-settings-content').hide();

			return this; //make chainable
		},



		/**
		 * triggered when a messagetype is dragged into the inactive container
		 * @param  {obj} item what item was dragged
		 * @return {obj}      this so it can be chainable
		 */
		inactivate: function( $item ) {
			this.mt_toggle( $item, 'deactivate' );
			return this;
		},


		/**
		 * triggered when a message type is dragged into the active container
		 * @param {obj} item what item was dragged
		 * @return {obj}      this so it can be chainable
		 */
		activate: function( $item ) {
			this.mt_toggle( $item, 'activate' );
			return this;
		},


		messenger_toggle: function( messenger, status, event ) {
			var data = {
				messenger: messenger,
				status: status,
				action: 'activate_messenger',
				page: 'espresso_messages',
				ee_admin_ajax: true,
				activate_nonce: $('#on-off-nonce-' + messenger).text()
			};

			$('.ajax-loader-grey').toggle();

			//let's register a handler for success ajax called after
			$(document).ajaxSuccess( function( event, xhr, ajaxoptions ) {
				//we can get the response from xhr
				var ct = xhr.getResponseHeader("content-type") || "";
				if ( ct.indexOf('json') > -1 ) {
					var resp = xhr.responseText;
					resp = $.parseJSON(resp);
					//let's handle toggling all the elements if we had a successful switch!
					if ( resp.success ) {
						MSG_helper.toggle_msg_elements( messenger, status, resp.data.active_mts );
						//do we need to reload mt?
						if ( typeof(resp.data.mt_reload) !== 'undefined' ) {
							$(resp.data.mt_reload).each(function(index, value) {
								MSG_helper.update_mt_form(value, messenger);
							});
						}
						return true;
					} else {
						event.preventDefault();
					}
				}
			});

			this.do_ajax(data);
		},



		update_mt_form: function( mt, messenger ) {
			var data = {
				messenger: messenger,
				message_type: mt,
				action: 'ee_msgs_update_mt_form',
				ee_admin_ajax: true,
				page: 'espresso_messages'
			};

			$(document).ajaxSuccess( function( event, xhr, ajaxoptions ) {
				//we can get the response from xhr
				var ct = xhr.getResponseHeader("content-type") || "";
				if ( ct.indexOf('json') > -1 ) {
					var resp = xhr.responseText;
					resp = $.parseJSON(resp);

					//let's handle toggling all the elements if we had a successful switch!
					if ( resp.success ) {
						$('.mt-settings-content', '.'+messenger+'-content #'+mt+'-messagetype-'+messenger).replaceWith(resp.data.template_args.content).slideToggle();
						//unbind any existing ajax success handler so we don't get repeat fires
						$(document).unbind('ajaxSuccess');
					}
				}
			});

			this.do_ajax(data);
		},



		toggle_msg_elements: function( messenger, status, mts ) {
			$('.ajax-loader-grey').toggle().hide();

			var $on_off_button = $('#ee-on-off-toggle-' + messenger),
				$messenger_settings = $('.messenger-settings', '.' + messenger + '-content'),
				$active_mts = $('#active-message-types'),
				$inactive_mts = $('#inactive-message-types'),
				$inactive_on_msg = $('.inactive-on-message', '.' + messenger + '-content'),
				$inactive_off_msg = $('.inactive-off-message', '.' + messenger + '-content'),
				$active_on_msg = $('.active-on-message', '.' + messenger + '-content'),
				$msgr_link = $('.item_display'),
				show_hide_msgr_form = $('#has_form_class').text();

			if ( status == 'on' ) {
				if ( show_hide_msgr_form !== 'hidden' )
					$( $messenger_settings ).removeClass('hidden');
				$( $active_mts ).removeClass('hidden');
				$( $inactive_mts ).removeClass('hidden');
				$( $inactive_on_msg ).removeClass('hidden');
				$( $inactive_off_msg ).addClass('hidden');
				$( $active_on_msg ).removeClass('hidden');
				$( $msgr_link ).addClass('messenger-active');
			} else if ( status == 'off' ) {
				$( $messenger_settings ).addClass('hidden');
				$( $active_mts ).addClass('hidden');
				$( $inactive_mts ).addClass('hidden');
				$( $inactive_on_msg ).addClass('hidden');
				$( $inactive_off_msg ).removeClass('hidden');
				$( $active_on_msg ).addClass('hidden');
				$( $msgr_link ).removeClass('messenger-active');
			}

			//unbind any existing ajax success handler so we don't get repeat fires
			$(document).unbind('ajaxSuccess');

			//make sure active mts are moved to the right spot
			if ( typeof(mts) !== 'undefined' ) {
				$.each(mts, function( index, value ) {
					var $item = $('#' + value + '-messagetype-'+messenger);
					MSG_helper.switch_types($item, status);
				});
			}
		},



		do_ajax: function(data, setup) {

			if ( typeof(setup) === 'undefined' ) {
				setup = {
					where: '#ajax-notices-container',
					what: 'clear'
				};
			}

			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: data,
				success: function(response, status, xhr) {
					var ct = xhr.getResponseHeader("content-type") || "";
					if (ct.indexOf('html') > -1) {
						MSG_helper.display_content(response,setup.where,setup.what);
					}

					if (ct.indexOf('json') > -1 ) {
						var resp = response,
						wht = typeof(resp.data.what) === 'undefined' ? setup.what : resp.data.what,
						whr = typeof(resp.data.where) === 'undefined' ? setup.where : resp.data.where,
						display_content = resp.error ? resp.error : resp.content;

						display_content = resp.error ? resp.error : resp.content;

						if ( whr == '#ajax-notices-container' && resp.notices !== '' ) {
							wht = 'append';
						}

						MSG_helper.display_notices(resp.notices);
						MSG_helper.display_content(display_content, whr, wht);
					}
					return true;
				}
			});
		},


		display_notices: function(content) {
			$('.ajax-loader-grey').hide();
			$('#ajax-notices-container').html(content);
			$('.espresso-notices').show();
		},




		display_content: function(content, where, what) {
			if ( typeof(where) === 'undefined' || typeof(what) === 'undefined' ) {
				console.log('content is not displayed because we need where or what');
				return false;
			}
			if ( what == 'clear' ) {
				$(where).html(content);
			} else if ( what == 'append' ) {
				$(where).append(content);
			} else if ( what == 'prepend' ) {
				$(where).prepend(content);
			}
		},


		slide: function($item) {
			var msgr = messenger.replace('#',''),
				mt = $( $item ).attr('id').replace('-messagetype-'+msgr+'-handle','');

			$( '.mt-settings-content', '.'+msgr+'-content #'+mt+'-messagetype-'+msgr ).slideToggle();
		},


		submit_form: function( type, $item ) {
			var queryparts = $($item).serializeFullArray();
			queryparts.page = 'espresso_messages';
			queryparts.action = 'ee_msgs_save_settings';
			queryparts.ee_admin_ajax = true;

			$('.ajax-loader-grey').toggle();

			this.do_ajax(queryparts);
		}
	};


	//on page load do init and toggle
	var messenger = $('.item_display a').attr('href');
	MSG_helper.init().toggle('email');



	//toggle slide
	$( document ).on('click', '#active-message-types .mt-handlediv', function() {
		MSG_helper.slide(this);
	});

	$( document ).on('click', '#inactive-message-types .mt-handlediv', function() {
		MSG_helper.slide(this);
	});

	/**
	 * bind to messenger text link selector event
	 * @param  {obj} e event
	 * @return {void}
	 */
	$('.ee-text-links').on('click', '.ee-text-link', function(e) {
		e.preventDefault();

		//first set all content as hidden and other text links as not active
		$('.ee-text-link-li').each( function() {
			$(this).removeClass('item_display');
			messenger = $('a', this).attr('href');
			MSG_helper.init().toggle(messenger, 'inactive');
		});

		$(this).parent().addClass('item_display');
		//show new box
		var this_messenger = $(this).attr('href');
		MSG_helper.toggle(this_messenger);
	});


	$('.activate_messages_on_off_toggle_container').on('click', '.ee-on-off-toggle', function(e) {
		var messenger = $(this).attr('id').replace('ee-on-off-toggle-',''),
		status = $(this).prop('checked') ? 'on' : 'off';
		e.stopPropagation();
		MSG_helper.messenger_toggle(messenger, status, e)
	});


	$(document).on('submit', '.mt-settings-form', function(e) {
		e.preventDefault();
		MSG_helper.submit_form('message_type', this);
	});


	$('.messenger-settings', document).on('submit', '.mt-settings-form', function(e) {
		e.preventDefault();
		MSG_helper.submit_form('messenger', this);
	});

});
