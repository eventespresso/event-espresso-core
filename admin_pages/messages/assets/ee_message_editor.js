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
				}
			});
			return false;
		},


		display_notices: function(content) {
			$('.ajax-loader-grey').hide();
			$('#ajax-notices-container').html(content);
			$('.espresso-notices').show();
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
	jQuery( '.js-shortcode-selection', shortcodeContainer ).unbind('click.shortcodeClick').bind( 'click.shortcodeClick', function(e) {
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