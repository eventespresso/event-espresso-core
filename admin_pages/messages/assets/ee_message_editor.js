jQuery(document).ready(function($) {

	var MessageEditorHelper = {

		switchTemplatePack : function( selected ) {
			var data = {
				GRP_ID : $('#ee-msg-grp-id').val(),
				template_pack : $('#MTP_template_pack').val(),
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
						$('#ajax-notices-container').text(response);
					}

					if (ct.indexOf('json') > -1 ) {
						$('#ajax-notices-container').text(resp.notices);
						if ( resp.success ) {
							window.location.replace( resp.redirect_url );
						}
					}
				}
			});
			return false;
		}
	};


	$('#mtp_extra_actions').on('click', '.reset-default-button', function(e) {
		var reset = confirm(eei18n.confirm_default_reset);
		if ( reset ) return true;
		e.preventDefault();
	});


	$('#mtp_templates').on('change', '#MTP_template_pack', function(e) {
		var original_val = $('option[selected="selected"]', this).val();
		var reset = confirm( eei18n.confirm_switch_template_pack );
		if ( reset ) {
			MessageEditorHelper.switchTemplatePack(this);
		} else {
			e.preventDefault();
			$(this).val(original_val);
		}
	});
});
