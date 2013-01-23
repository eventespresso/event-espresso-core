jQuery(function(){
	jQuery('#venues-form').validate({
		rules: {
			name: "required"
		},
		messages: {
			name: "please add a name for your venue"
		}
	});
});