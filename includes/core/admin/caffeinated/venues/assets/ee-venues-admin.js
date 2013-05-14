jQuery(function(){
	jQuery('#update_venue_event_form').validate({
		rules: {
			name: "required"
		},
		messages: {
			name: eei18n.required,
			vnu_capacity: eei18n.required
		}
	});
	jQuery('#insert_venue_event_form').validate({
		rules: {
			name: "required"
		},
		messages: {
			name: eei18n.required,
			vnu_capacity: eei18n.required
		}
	});
});