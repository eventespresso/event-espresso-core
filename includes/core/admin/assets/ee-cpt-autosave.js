jQuery(document).ready(function($) {

	$(document).ajaxSend( function( e, x, a ) {
		var ee_autosave_data = {};
		//loop through the id containers and add the fields to the ee_autosave_data object.
		$.each( EE_AUTOSAVE_IDS, function(index, value) {
			ee_autosave_data[value] = $('#' + value).find(':input').serializeFullArray();
		});
		//console.log(ee_autosave_data);
		a.data += '&' + $.param( {ee_autosave_data : ee_autosave_data } );
	});



	/**
	 * Capture all success ajax on a cpt EE admin page so that we can handle any special cases for metaboxes present.
	 * @param  {string} e event
	 * @param  {object} x xhr object
	 * @param  {object} a Ajax Settings in original request
	 * @return {void}
	 */
	$(document).ajaxSuccess( function( e, x, a ) {
		var response = autosave_parse_response(x.responseXML), postID, stayhere = true;
		var successname = typeof( a.success.name ) !== 'undefined' ? a.success.name : false;
		if ( !response || typeof(response.responses) === 'undefined' ) {
			stayhere = false;
			response = typeof( x.responseText) !== 'undefined' ? x.responseText : false;
		}

		

		//doublecheck that we have a post id, cause if we don't then this is just a "keep-alive" no action needed
		if ( stayhere ) {
			postID = parseInt( response.responses[0].id, 10 );
			if ( !isNaN(postID) && postID > 0 ) {
				//do our own stuff with the post
				EE_do_cpt_autosave_extras( postID );
			} else {
				return; //get out this is a keep alive
			}
		} else {
			//only do our autosave extras if this isn't a WP core route and there is a response object
			if ( !response || successname != 'EE_after_autosave_extras' )
				return;

			EE_after_autosave_extras( response, 'OK', x );
		}
		
	});


	/**
	 * Add in any handlers for cpt autosaves in here.
	 */
	EE_do_cpt_autosave_extras = function( postid ) {
		var postdata;
		postdata = {
			action: 'ee-autosave',
			post_ID: postid,
			autosavenonce: $('#autosavenonce').val(),
			route: $('#current_route').val(),
			iswpsave: true
		};

		//do extra ajax post
		$.ajax({
			data: postdata,
			beforeSend: autosave_loading,
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
				resp = $.parseJSON(response);
			} catch (e) {
				$('#autosave-alert').remove();
				$('#titlediv').after('<div id="autosave-alert" class="error below-h2"><p>' + response + '</p></div>');
				isjson = false;
			}
		}

			
		if ( ct.indexOf('json') > -1 || isjson ) {
			resp = resp === '' ? response : resp;

			//make sure that we're only handling EE_ajax responses
			if ( typeof(resp.isEEajax) === 'undefined' )
				return;

			if ( typeof(resp.data) === 'undefined' ) resp.data = [];
			if ( typeof(resp.data.items) === 'undefined' ) resp.data.where = '#autosave-alert';
			if ( typeof(resp.data.items) === 'undefined' ) resp.data.what = 'There was a problem with ee autosaves, likely have not setup the response correctly';

			if ( resp.error || resp.notices ) {
				$('#autosave-alert').remove();
				var error = typeof(resp.notices) === 'undefined' || resp.notices === '' ? resp.error : resp.notices;
				$('#titlediv').after('<div id="autosave-alert" class="error below-h2"><p>' + error + '</p></div>');
			} else {
				if  ( ( resp.data.items ) === 'undefined' )
					$(resp.where).val(resp.data.what);
				else {
					//loop through the items array and get the values to add
					$.each( resp.data.items, function(where, what) {
						$('#' + where).val(what);
					});
				}
			}
		}
	}
});