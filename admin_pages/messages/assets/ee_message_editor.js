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
});
