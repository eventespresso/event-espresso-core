jQuery(document).ready(function($) {

	var MessageEditorHelper = {

		switchTemplatePack : function( selected ) {
			var data = {
				GRP_ID : $('#ee-msg-grp-id').val(),
				template_pack : selected,
				action : 'switch_template_pack',
				ee_admin_ajax : true,
				page : 'espresso_messages'
			};

			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: data,
				success: function(response, status, xhr) {
					var ct = xhr.getResponseHeader("content-type") || "";
					if (ct.indexOf('html') > -1) {
						$('#ajax-notices-container').html(response);
						$('.spinner').hide();
					}

					if (ct.indexOf('json') > -1 ) {
						MessageEditorHelper.display_notices(response.notices);
						window.scrollTo(0,0);
						if ( response.success ) {
							window.location.replace( response.data.redirect_url );
							return true;
						}
					}
				},
                error: function()
                {
                    $('.ajax-loader-grey').hide();
                    MessageEditorHelper.handle_ajax_errors(eei18n.server_error, setup.where);
                }
			});
			return false;
		},

        context_toggle: function(context, status, message_template_group_id, event) {
            var data = {
                    message_template_group_id: message_template_group_id,
                    context: context,
                    status: status,
                    action: 'toggle_context_template',
                    page: 'espresso_messages',
                    ee_admin_ajax: true,
                    toggle_context_nonce: $('#on-off-nonce-' + context).text()
                },
                switchLabel = status === 'on'
                    ? $('.js-data .ee-active-message').html()
                    : $('.js-data .ee-inactive-message').html();
            $( '.context-active-control-container .spinner' ).addClass( 'is-active' );

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: data,
                success: function(response, status, xhr) {
                    var ct = xhr.getResponseHeader("content-type") || "",
                        setup = {
                            where: '#ajax-notices-container',
                            what: 'clear'
                        };
                    $( '.context-active-control-container .spinner' ).removeClass( 'is-active' );
                    if (ct.indexOf('html') > -1) {
                        event.preventDefault();
                        MessageEditorHelper.display_content(response, setup.where, setup.what);
                    }

                    if (ct.indexOf('json') > -1 ) {
                        MessageEditorHelper.display_notices(response.notices);
                        //let's handle toggling all the elements if we had a successful switch!
                        if ( response.success ) {
                            $('.ee-on-off-toggle-label').html(switchLabel);
                            return true;
                        } else {
                            event.preventDefault();
                        }
                    }
                },
                error: function()
                {
                    $( '.context-active-control-container .spinner' ).removeClass( 'is-active' );
                    event.preventDefault();
                    MessageEditorHelper.handle_ajax_errors(eei18n.server_error, setup.where);
                }
            });
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


		display_notices: function(content) {
			$('.ajax-loader-grey').hide();
			$('#ajax-notices-container').html(content);
			$('.espresso-notices').show();
		},

		handle_ajax_errors: function(error_message, content_container) {
            MessageEditorHelper.display_content(
                '<div class="error fade-away">' + error_message + '</div>',
                content_container,
                'clear'
            );
        }
	};


	$('#mtp_extra_actions').on('click', '.reset-default-button', function(e) {
		var reset = confirm(eei18n.confirm_default_reset);
		if ( reset ) return true;
		e.preventDefault();
	});


	$('#mtp_templates').on('change', '#MTP_template_pack', function(e) {
		var selected_item = $(this).val();
		var original_val = $('option[selected="selected"]', this).val();
		var reset = confirm( eei18n.confirm_switch_template_pack );
		if ( reset ) {
			$('.spinner'). show();
			MessageEditorHelper.switchTemplatePack(selected_item);
			return true;
		} else {
			e.preventDefault();
			$(this).val(original_val);
		}
	});

    /**
     * Context Template Activation/Deactivation
     */
    $('.activate_context_on_off_toggle_container').on('click', '.ee-on-off-toggle', function(e){
        var context = $(this).attr('id').replace('ee-on-off-toggle-', ''),
            status = $(this).prop('checked') ? 'on' : 'off',
            message_template_group_id = $(this).data('grpid');
        e.stopPropagation();
        MessageEditorHelper.context_toggle(context, status, message_template_group_id, e);
    });


	/**
	 * messages shortcode picker
	 */
	$('#ee-msg-edit-frm').on( 'click', '.js-open-list-trigger', function(e) {
		e.stopPropagation();
		shortCodePicker(this);
	});

	/**
	 * Hide shortcode picker on leaving the window.
	 */
	var eeShortcodeHover = false;
	$('.ee_shortcode_chooser_container','#ee-msg-edit-frm').hover( function(e) {
		e.stopPropagation();
		eeShortcodeHover = true;
	}, function(e) {
		e.stopPropagation();
		eeShortcodeHover = false;
	});

	jQuery('body').mouseup( function() {
		if ( ! eeShortcodeHover ) {
			$('.ee_shortcode_chooser_container').addClass('hidden').removeClass('ee-shortcode-chooser-open');
		}
	});
});



function shortCodePicker( el ) {
	var itemClicked = jQuery(el);
	var shortcodeContainer = jQuery( '.ee_shortcode_chooser_container', itemClicked );
	shortcodeContainer.removeClass('hidden' ).addClass('ee-shortcode-chooser-open');

	//set click event but unbind any existing first. Also namespace.
	jQuery( '.js-shortcode-selection', shortcodeContainer ).off('click.shortcodeClick').on('click.shortcodeClick', function(e) {
		e.stopPropagation();
		shortCodePickerClickEvent( this, shortcodeContainer );
	});

	//capture any ctrl-s keypress for shortcode picker
}



function shortCodePickerClickEvent( el, shortcodeContainer ) {
	var shortcodeRequested = jQuery(el).data('value');
	var input = jQuery(el).data('linkedInputId');

	//if linked input has `wp-editor-area` class then use WP Editor insert function
	if ( jQuery('#' + input ).hasClass('wp-editor-area' ) ) {
		AddVariableToWPEditor( input, shortcodeRequested );
	} else {
		AddVariableToInput( input, shortcodeRequested );
	}
	shortcodeContainer.addClass('hidden').removeClass('ee-shortcode-chooser-open');
}


function AddVariableToInput(element_id, value) {

	var input = document.getElementById (element_id);
	var $input = jQuery(input);

	if(document.selection) {
		// Go the IE way
		$input[0].focus();
		document.selection.createRange().text=value;
	}
	else if('selectionStart' in input) {
		var startPos = input.selectionStart;
		input.value = input.value.substr(0, startPos) + value + input.value.substr(input.selectionEnd, input.value.length);
		input.selectionStart = startPos + input.value.length;
		input.selectionEnd = startPos + value.length;
	} else {
		//do nothing for now.
	}
}

function AddVariableToWPEditor( elementId, value ) {
	wpActiveEditor = elementId;
	window.send_to_editor( value );
}