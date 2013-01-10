jQuery(function(){
	jQuery("#add-new-cat").validate({
		rules: {
			category_name: "required"
		},
		messages: {
			category_name: "please add a category name"
		}

	});
});