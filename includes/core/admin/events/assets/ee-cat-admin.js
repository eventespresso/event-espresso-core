jQuery(function(){
	jQuery("#insert_category_event_form").validate({
		rules: {
			category_name: 'required'
		},
		messages: {
			category_name: eei18n.add_cat_name
		}
	});
	jQuery("#update_category_event_form").validate({
		rules: {
			category_name: 'required'
		},
		messages: {
			category_name: eei18n.add_cat_name
		}
	});
});