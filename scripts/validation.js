// At present form validation for admin pages is contained in event_espresso.js
$jaer = jQuery.noConflict();
	jQuery(document).ready(function($jaer) {
	jQuery(function(){
		//Registration form validation
		jQuery('#registration_form').validate();
	});
});