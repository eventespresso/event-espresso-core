jQuery(document).ready(function($) {

	//load all qtips
	if ( EE_QTIP_HELPER.qtips.length > 0 ) {
		//loop through the qtips and set them up.
		$.each(EE_QTIP_HELPER.qtips, function(i, v ) {
			$(v.target).qtip(v.options);
		});
	}

	//that's it. seriously.

});