jQuery(document).ready(function($) {

	var MSG_helper = {

		/**
		 * This function toggles message boxes active and inactive setting the correct selectors for other js used on this page
		 * @param  {string} messenger What messenger is being toggled
		 * @param  {string} type      'active' or 'inactive'? (default: active)
		 * @return {void}
		 */
		toggle: function( messenger, type ) {
			if ( typeof(type) === 'undefined' ) type = 'active';

			//makes sure we strip out any '#'
			messenger = messenger.replace('#','');

			//set refs
			var active_main = '#espresso_' + messenger + '_settings';
			var active_secondary = '#espresso_' + messenger + '_inactive_mts';

			//remove or add id?
			if ( type == 'active' ) {
				$('.inactive-message-types', active_secondary).attr('id', 'inactive-message-types');
				$('.messenger-activation', active_main).attr('id', 'active-message-types');
				$(active_main).fadeIn();
				$(active_secondary).fadeIn();
			} else {
				$('.inactive-message-types', active_secondary).attr('id', '');
				$('.messenger-activation', active_main).attr('id', '');
			}

			//make sure we grab any changed containers
			$active_mts = $( '#active-message-types' );
			$inactive_mts = $( '#inactive-message-types' );

			return this; //make chainable
		},


		/**
		 * This just initializes the display everytime a messenger is selected
		 * @return {void}
		 */
		init: function() {
			$('#postbox-container-2 .postbox').hide();
			$('#postbox-container-1 .postbox').hide();

			return this; //make chainable
		},



		/**
		 * triggered when a messagetype is dragged into the inactive container
		 * @param  {obj} item what item was dragged
		 * @return {obj}      this so it can be chainable
		 */
		inactivate: function( $item ) {
			console.log(messenger);
			console.log(this);
			$item.fadeOut( function() {
				var $list = $( "ul", $inactive_mts),
				list_width = $( $list ).width();

				$item.css("width", "50%");
				$item.appendTo( $list ).fadeIn(function() {
					$item.animate({width: list_width});
				});
			});
			return this;
		},


		/**
		 * triggered when a message type is dragged into the active container
		 * @param {obj} item what item was dragged
		 * @return {obj}      this so it can be chainable
		 */
		activate: function( $item ) {
			console.log(messenger);
			console.log(this);
			$item.fadeOut(function() {
				var $list = $( "ul", $active_mts );
				$item
					.css( "width", "15%" )
					.appendTo( $list )
					.fadeIn();
			});
			return this;
		},


		messenger_toggle: function( messenger, status ) {
			var data = {
				messenger: messenger,
				status: status,
				action: 'activate_messenger',
				page: 'espresso_messages',
				activate_nonce: $('#on-off-nonce').text()
			};

			//let's register a handler for success ajax called after
			$(document).ajaxSuccess( function( event, xhr, ajaxoptions ) {
				//we can get the response from xhr
				var ct = xhr.getResponseHeader("content-type") || "";
				if ( ct.indexOf('json') > -1 ) {
					var resp = xhr.responseText;
					resp = $.parseJSON(resp);
					//let's handle toggling all the elements if we had a successful switch!
					if ( resp.success ) {
						MSG_helper.toggle_msg_elements( messenger, status );
					}
				}
			});

			this.do_ajax(data);
		},


		
		toggle_msg_elements: function( messenger, status ) {
			$('.ajax-loader-grey').toggle().hide();
			var $on_off_button = $('#on-off-' + messenger),
				$messenger_settings = $('.messenger-settings', '.' + messenger + '-content'),
				$active_mts = $('#active-message-types'),
				$inactive_mts = $('#inactive-message-types'),
				$inactive_on_msg = $('.inactive-on-message', '.' + messenger + '-mt-content'),
				$inactive_off_msg = $('.inactive-off-message', '.' + messenger + '-mt-content'),
				$active_on_msg = $('.active-on-message', '.' + messenger + '-content');

			if ( status == 'on' ) {
				$( $on_off_button ).attr('value','messenger-off').attr('class', 'on-off-active on-off-action');
				$( $messenger_settings ).removeClass('hidden');
				$( $active_mts ).removeClass('hidden');
				$( $inactive_mts ).removeClass('hidden');
				$( $inactive_on_msg ).removeClass('hidden');
				$( $inactive_off_msg ).addClass('hidden');
				$( $active_on_msg ).removeClass('hidden');
			} else if ( status == 'off' ) {
				$( $on_off_button ).attr('value', 'messenger-on').attr('class','on-off-inactive on-off-action');
				$( $messenger_settings ).addClass('hidden');
				$( $active_mts ).addClass('hidden');
				$( $inactive_mts ).addClass('hidden');
				$( $inactive_on_msg ).addClass('hidden');
				$( $inactive_off_msg ).removeClass('hidden');
				$( $active_on_msg ).addClass('hidden');
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
					console.log( ct );
					if (ct.indexOf('html') > -1) {
						/*console.log('html');
						console.log('response');*/
						MSG_helper.display_content(response,setup.where,setup.what);
					}

					if (ct.indexOf('json') > -1 ) {
						var resp = response,
						wht = resp.data.what === 'undefined' ? setup.what : resp.data.what,
						whr = resp.data.where === 'undefined' ? setup.where : resp.data.where,
						display_content = resp.error ? resp.error : resp.content;

						MSG_helper.display_notices(resp.notices);
						MSG_helper.display_content(display_content, whr, wht);
					}
				}
			});
			return false;
		},


		display_notices: function(content) {
			$('#ajax-notices-container').html(content);
		},


		

		display_content: function(content, where, what) {
			if ( typeof(where) === 'undefined' || typeof(what) === 'undefined' ) {
				console.log('content cannot be displayed because we need where or what');
				return false;
			}
			if ( what == 'clear' ) {
				$(where).html(content);
			} else if ( what == 'append' ) {
				$(where).append(content);
			} else if ( what == 'prepend' ) {
				$(where).prepend(content);
			}
		}
	};
	

	//on page load do init and toggle
	var messenger = $('.item_display a').attr('href');
	MSG_helper.init().toggle(messenger);
	
	//defined the global active and inactive message type containers
	var $active_mts = $( '#active-message-types' ),
	$inactive_mts = $( '#inactive-message-types' );


	//set draggables and droppables!
	$( "li", $active_mts ).draggable({
		cancel: ".mt-settings-submit", //clicking a submit button wont' initiate dragging
		revert: "invalid", //when not dropped the item will revert back to its initial location
		containment: "document",
		helper: "clone",
		cursor: "move"
	});

	//make sure inactives are draggable too
	$( "li", $inactive_mts ).draggable({
		cancel: ".mt-settings-submit", //clicking a submit button wont' initiate dragging
		revert: "invalid", //when not dropped the item will revert back to its initial location
		containment: "document",
		helper: "clone",
		cursor: "move"
	});

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


	$('.activate_messages_on_off_toggle_container').on('click', '.on-off-action', function(e) {
		e.preventDefault();
		var messenger = $(this).attr('id').replace('on-off-',''),
		status = $(this).attr('value').replace('messenger-','');
		MSG_helper.messenger_toggle(messenger, status);
	});
});