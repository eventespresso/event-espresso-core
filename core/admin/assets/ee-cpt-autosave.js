jQuery(document).ajaxSend( function( e, x, a ) {
	var ee_autosave_data = {};

	var successname = typeof(a.success) != 'undefined' && typeof(a.success.name) !== 'undefined' ? a.success.name : false;

	//console.log(dump(successname));
	//make sure we're ONLY doing our injection on wp successcallbacks cause wp does other stuff too (and we don't want to inject on our OWN calls of course!!)
	if ( successname == 'autosave_saved_new' || successname == 'autosave_saved' ) {
		//loop through the id containers and add the fields to the ee_autosave_data object.
		jQuery.each( EE_AUTOSAVE_IDS, function(index, value) {
			ee_autosave_data[value] = jQuery('#' + value).find(':input').serializeFullArray();
		});

		//console.log(dump(ee_autosave_data));
		//console.log(ee_autosave_data);
		a.data += '&' + jQuery.param( {ee_autosave_data : ee_autosave_data, ee_admin_ajax : true } );
	}
});



/**
 * Capture all complete ajax on a cpt EE admin page so that we can handle any special cases for metaboxes present.
 * @param  {string} e event
 * @param  {object} x xhr object
 * @param  {object} a Ajax Settings in original request
 * @return {void}
 */
jQuery(document).ajaxComplete( function( e, x, a ) {

	var response = wpAjax.parseAjaxResponse(x.responseXML), postID, stayhere = true;
	var successname = typeof(a.success) != 'undefined' && typeof(a.success.name) !== 'undefined' ? a.success.name : false;
	if ( !response || typeof(response.responses) === 'undefined' ) {
		stayhere = false;
		response = typeof(x.responseText) !== 'undefined' ? x.responseText : false;
		//last verification that we definitely DON'T have JSON (possibly via exceptions)
		try {
			resp = jQuery.parseJSON(response);
		} catch (error) {
			//the only way I can think of right now to NOT print WP responses for created permalinks
			if ( !response.match(/sample-permalink/) ) {
				jQuery('#autosave-alert').remove();
				jQuery('#titlediv').after('<div id="autosave-alert" class="error below-h2"><p>' + response + '</p></div>');
				isjson = false;
				return;
			}
		}
	}

	

	//doublecheck that we have a post id, cause if we don't then this is just a "keep-alive" no action needed
	if ( stayhere ) {
		postID = parseInt( response.responses[0].id, 10 );
		if ( !isNaN(postID) && postID > 0 ) {
			//do our own stuff with the post
			return EE_do_cpt_autosave_extras( postID );
		}
	} /**else {
		//only do our autosave extras if this isn't a WP core route and there is a response object
		if ( response && successname == 'EE_after_autosave_extras' )
			EE_after_autosave_extras( response, 'OK', x );
	}**/
	
});


/**
 * Add in any handlers for cpt autosaves in here.
 */
EE_do_cpt_autosave_extras = function( postid ) {
	var postdata;
	postdata = {
		action: 'ee-autosave',
		post_ID: postid,
		autosavenonce: jQuery('#autosavenonce').val(),
		route: jQuery('#current_route').val(),
		current_page: jQuery('#current_page').val(),
		iswpsave: true,
		ee_admin_ajax : true
	};

	//do extra ajax post
	jQuery.ajax({
		data: postdata,
		type: "POST",
		url: ajaxurl,
		success: EE_after_autosave_extras
	});
};



/**
 * Callback after autosave response
 * @param {object} response This should be a json object
 */
function EE_after_autosave_extras(response, status, xhr) {
	var ct = xhr.getResponseHeader("content-type") || "";
	var resp= '', isjson = true;

	if (ct.indexOf('html') > -1) {
		/*console.log('html');
		console.log('response');*/
		//last verification that we definitely DON'T have JSON (possibly via exceptions)
		try {
			resp = jQuery.parseJSON(response);
		} catch (e) {
			jQuery('#autosave-alert').remove();
			jQuery('#titlediv').after('<div id="autosave-alert" class="error below-h2"><p>' + response + '</p></div>');
			isjson = false;
		}
	}

		
	if ( ct.indexOf('json') > -1 || isjson ) {
		resp = resp === '' ? response : resp;

		if ( typeof(resp.data) === 'undefined' || resp === 0 ) resp = {'data':[]};
		if ( typeof(resp.data.items) === 'undefined' ) resp.data.where = '#titlediv';
		if ( typeof(resp.data.items) === 'undefined' ) {
			resp.data.error = !resp.data.error ? '<p>There was a problem with ee autosaves, likely have not setup the response correctly</p>' : resp.data.error;
		}


		if ( resp.error ) {
			jQuery('#autosave-alert').remove();
			var error = typeof(resp.notices) === 'undefined' || resp.notices === '' ? resp.error : resp.notices;
			jQuery('#titlediv').after('<div id="autosave-alert" class="error below-h2"><p>' + error + '</p></div>');
		} else {
			//loop through the items array and get the values to add
			jQuery.each( resp.data.items, function(where, what) {
				jQuery('#' + where).val(what);
			});
		}
	}
}