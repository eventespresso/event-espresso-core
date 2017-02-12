/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//js for showing/hiding page elements



//JS FOR HANDLING MIGRATION SCRIPT UPDATING
var BG = {
	update_progress_to: function( items_complete, items_total ){
		items_complete = parseInt( items_complete );
		items_total = parseInt( items_total );
		percent_complete = items_complete / items_total;
		bar_size = jQuery('#progress-responsive figure').innerWidth();
		new_bar_size = percent_complete * parseFloat( bar_size );
		jQuery('#progress-responsive__bar').width( new_bar_size );
		percent_complete = Math.floor( percent_complete * 100 ) + '% ('+items_complete+'/'+items_total+')';		
		jQuery('#progress-responsive__percent').text(percent_complete);
	}
}; // BAR GRAPH window object

// RESPONSIVE
//BG.responsive = function(percentage, duration) {
	// Animate bar graph
//	var count1 = 0,
//      bar = jQuery('#progress-responsive__bar'),
//      interval1 = (Math.floor(duration / percentage) / 2),
//      incrementer1 = setInterval(function() {
//		(count1 <= percentage) ? (bar.width(count1 + "%"), count1 += 0.5) : clearInterval(incrementer1);
//	}, interval1);
//	// Animate percent number
//	var count2 = 0,
//      percent = jQuery('#progress-responsive__percent'),
//      interval2 = Math.floor(duration / percentage),
//      incrementer2 = setInterval(function() {
//		(count2 <= percentage) ? (percent.text(count2 + "%"), count2++) : clearInterval(incrementer2);
//	}, interval2);
//	var more_to_migrate = true;
//	while(more_to_migrate){
//		//do ajax request
//	}
	
//	jQuery.post(ajaxurl,data, function(response){
//		alert("response"+response);
//		
//	});
//};




var Maintenance_helper = {
	begin_migration: function(){
		BG.update_progress_to(0, 1);
		var kickoff_button = jQuery('#start-migration');
		kickoff_button.attr('disabled',true);
		kickoff_button.text(ee_maintenance.migrating);
		Maintenance_helper.continue_migration();
	},
	/**
	 *Used to start and continue the data migration ajax-calling loop. Called by begin_migration to kick-start the process,
	 *and from update_progress in order to continue
	 **/
	continue_migration: function(){
		var data = {
			action: 'migration_step',
			page: 'espresso_maintenance_settings'
		};
		Maintenance_helper.do_ajax(data,{'where':'#migration-messages', 'what':'prepend','callback':Maintenance_helper.update_progress});
		
	},
	/**
	 * @param ajax_response shoudl eb an object with attributes error, success, notices,content, and data
		data should be an object with attributes  like {records_to_migrate: 1, records_migrated: 1, status: "no_more_migration_scripts", script: null, message: "Data Migration Completed Successfully"…}
	 */
	update_progress: function(ajax_response){
		if(typeof(ajax_response) === 'undefined'){
			migration_data = {
				records_to_migrate:1,
				records_migrated:0,
				status:'Fatal Error',
				script:'Unknown',
				message:'AJAX was not returned'
			};
		}else{
			migration_data = ajax_response.data;
		}
		//update the bar graph
		BG.update_progress_to(migration_data.records_migrated, migration_data.records_to_migrate);
		
		//update the main title of what we're doing
		Maintenance_helper.display_content(migration_data.script, '#main-message', 'clear');
		//update the descriptive text
		Maintenance_helper.display_content(migration_data.message+'<br>', '#migration-messages', 'prepend');
		if(migration_data.status === ee_maintenance.status_completed ||
			migration_data.status === ee_maintenance.status_no_more_migration_scripts){
			Maintenance_helper.finish( migration_data.records_migrated, migration_data.records_to_migrate );
		}else if(migration_data.status === ee_maintenance.status_fatal_error){
			Maintenance_helper.finish( migration_data.records_migrated, migration_data.records_to_migrate );
		}else{
			Maintenance_helper.continue_migration();
		}
	},
	//handles what to do once we're done the current migration script
	finish: function( records_migrated, records_to_migrate ){
		//change button
		//show after-migration options
		var kickoff_button = jQuery('#start-migration');
		kickoff_button.attr('disabled',false);
		kickoff_button.text(ee_maintenance.next);
		kickoff_button.unbind('click');
		kickoff_button.click(function(){
			document.location.href = document.location.href + '&continue_migration=true';
		});
		BG.update_progress_to( records_migrated, records_to_migrate );
		jQuery( '#progress-responsive__percent' ).css({ 'color' : '#fff' });
		alert(ee_maintenance.click_next_when_ready);
	},
	//performs the ajax request, and if successful, calls setup.callback;
	//on failure with HTML response, calls report_general_migration_error with the content and loads that content to the screen
	do_ajax: function(data, setup) {

			if ( typeof(setup) === 'undefined' ) {
				setup = {
					where: '#migration-messages',
					what: 'clear',
					callback: undefined
				};
			}

			data.ee_admin_ajax = true;

			jQuery.ajax({
				type: "POST",
				url: ajaxurl,
				data: data,
				success: function(response, status, xhr) {
//					alert('response:'+response);
					var ct = xhr.getResponseHeader("content-type") || "";
                    //was the response valid JSON?
					if (ct.indexOf('json') > -1 ) {
					    var what, where, display_content;

                        what = typeof(response.data.what) === 'undefined' ? setup.what : response.data.what;
                        where = typeof(response.data.where) === 'undefined' ? setup.where : response.data.where;
                        display_content = response.error ? response.error : response.content;

                        Maintenance_helper.display_notices(response.notices);
                        Maintenance_helper.display_content(display_content, where, what);
                        //call the callback that was passed in
                        if (typeof(setup.callback) !== 'undefined'){
                            setup.callback(response);
                        }
					}else{
					    //so we didn't get json back? that's probably an error
                        Maintenance_helper.handle_ajax_error(response,setup);
                    }
				},
                error: function(xhr,status,error_thrown) {
                    Maintenance_helper.handle_ajax_error(error_thrown,setup);
                }
			});
			return false;
		},
	//sends an ajax message to the backend for logging
	report_general_migration_error: function(message){
		var data = {
			action: 'add_error_to_migrations_ran',
			page: 'espresso_maintenance_settings',
			message:message
		};
		Maintenance_helper.do_ajax(data,{'where':'#migration-messages', 'what':'prepend','dont_report':true});
	},

//we actually want to display notices in the same place as all normal ajax messages appear
	display_notices: function(content) {
		jQuery('#migration-messages').prepend(content);
//		jQuery('#ajax-notices-container').prepend(content);
	},

	display_content: function(content, where, what) {
		if ( typeof(where) === 'undefined' || typeof(what) === 'undefined' ) {
			console.log('content is not displayed because we need where or what');
			return false;
		}
		if ( what == 'clear' ) {
			jQuery(where).html(content);
		} else if ( what == 'append' ) {
			jQuery(where).append(content);
		} else if ( what == 'prepend' ) {
			jQuery(where).prepend(content);
		}
	},
    /**
     * Handles an error because of either invalid JSON being returned, or an empty response
     * @param response_text
     * @param setup
     */
    handle_ajax_error: function(response_text, setup) {
        Maintenance_helper.display_content(response_text,setup.where,setup.what);
        if( typeof(setup.dont_report) === 'undefined'){
            Maintenance_helper.report_general_migration_error(response_text);
            Maintenance_helper.display_content(ee_maintenance.fatal_error, '#main-message', 'clear');
            Maintenance_helper.finish();
        }
    }
};

jQuery(function() {
//	alert("jquery a go");
	jQuery('#db-backed-up').prop('checked', false);
	//show-hide warnings
	jQuery('#show-hide-migration-warnings').click(function(){
		jQuery('.migration-warnings').toggle('slow');
	});
	//dynamic page stuff
	//showing start-button and hiding explanatory text
	jQuery('.toggle-migration-monitor').click(function(){
		jQuery('#migration-prep').toggle('slow');
		jQuery('#migration-monitor').toggle('slow');
		jQuery('#db-backed-up').prop('checked', false);
	});
	
	//start migration, update start-button to be "migrating..." and disable it
	jQuery('#migration-risks').click(function(){
		jQuery('#display-migration-details').trigger('click');
	});
	
	//start migration, update start-button to be "migrating..." and disable it
	jQuery('#start-migration').click(function(){
		Maintenance_helper.begin_migration();
	});
	
	//start migration, update start-button to be "migrating..." and disable it
	jQuery('#do-not-migrate').click(function(){
		if ( confirm( 'You have chosen to NOT migrate your existing data.\nAre you sure you want to continue?' )) {
			return true;
		}else{
			return false;
		}
	});
	
	//start migration, update start-button to be "migrating..." and disable it
	jQuery('#delete-all-data-btn').click(function(){
		if ( confirm( 'Are you sure you want to permanently delete ALL Event Espresso tables, records and options?\nThis action can NOT be undone.' )) {
			return true;
		} else {
			return false;
		}
	});
	
});