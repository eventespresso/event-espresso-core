		
jQuery(document).ready(function($) {

//	$('.display-ticket-manager').live('click', function(){
//		var page = $('html').scrollTop();
//		var tk_mng_tp = $('#event-datetimes-dv').offset();
//		tk_mng_tp = Math.round( tk_mng_tp.top )-page;  
//		if ( tk_mng_tp > 0 ){
//			tk_mng_tp = 0;
//		}
//		tk_mng_tp = ( tk_mng_tp * (-1))+'px';
//		alert(tk_mng_tp);
//		$('#ticket-manager-dv').animate({ top : tk_mng_tp, opacity : 'show' }, 200 );
//	});


//	$('html').click(function(){
//		$('#ticket-manager-dv').css({ top : 0, opacity : 0 });
//	});
	

	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var offset = $('#event_editor_major_buttons_wrapper').offset();
		//		alert( 'scrollTop : ' + scrollTop +  '   offset.top : ' +offset.top );
		if(offset != null) { 
			if ( (scrollTop+25) > offset.top ) {
				$('#event-editor-floating-save-btns').removeClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').addClass('hidden');
			} else {
				$('#event-editor-floating-save-btns').addClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').removeClass('hidden');
			}
		}
	});
	
	
		
	// set process_datetimes to false
	$('#process_datetimes').val(0);
	// toggle process_datetimes to true if any datetime inputs are changed
	$('.dtm-inp').change( function() {
		$('#process_datetimes').val(1);
	});
	// or if any datetime buttons are clicked	
	$('.dtm-inp-btn').click( function() {
		$('#process_datetimes').val(1);
	});





$('#event-datetimes-dv').on( 'focusin', '.dtm-es-picker', function () {	
	
	var row = $(this).next().val();

	$(this).datetimepicker({

			dateFormat : 'mm-dd-yy',
			timeFormat: 'hh:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,			
			minDate: new Date(),
			showOn:'focus',

//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function(dateText, inst) {
			
				var eventEndsOn = $('#event-end-'+row).val();

				if ( eventEndsOn != '' ) {	
					var newStartDate = new Date( dateText );
					var newEndDate = new Date( eventEndsOn );
					if ( newStartDate > newEndDate ) {
						$('#event-end-'+row).val( dateText );
					}
											
				} else {
					$('#event-end-'+row).val( dateText );
				}
				
				//var start = $(this).datetimepicker('getDate');
				var newStartDate = new Date( dateText );
//				if ( newStartDate == undefined || newStartDate == '' || newStartDate = null ) {
//					newStartDate = ;
//				}
				//alert( 'newStartDate = '+newStartDate );
				$('#event-end-'+row).focusin().datetimepicker('option', 'minDate', newStartDate ).focusout();
				$('#reg-start-'+row).focusin().datetimepicker('option', 'maxDate', newStartDate ).focusout();
				//$(this).focusout();
			
			}/*,
			
		    onSelect: function (){
				var row = $(this).next().val();
				var start = $(this).datetimepicker('getDate');
				var newStartDate = new Date( start );
				$('#event-end-'+row).datepicker('option', 'minDate', newStartDate );
				$('#reg-start-'+row).datepicker('option', 'maxDate', newStartDate );
		 		//alert( 'other box = ' + $('#event-end-'+row).datetimepicker('getDate'));
		    }*/	

		});			 
	});	
	
	

$('#event-datetimes-dv').on( 'focusin', '.dtm-ee-picker', function () {	
	
	var row = $(this).next().val();

	$(this).datetimepicker({
		
			dateFormat : 'mm-dd-yy',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,
			maxDate: new Date( 'Dec 31, 2100' ),
			showOn:'focus',
			
//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function( dateText, inst ) {

				var eventStartsOn = $('#event-start-'+row).val();
				if ( eventStartsOn != '' ) {
					var newStartDate = new Date( eventStartsOn );
					var newEndDate = new Date( dateText );
					if ( newStartDate > newEndDate ) {
						$('#event-start-'+row).val( dateText );
						$('#reg-end-'+row).val( dateText );
					}						
				} else {
					$('#event-start-'+row).val( dateText );
					$('#reg-end-'+row).val( dateText );
				}	

				//var end = $(this).datetimepicker('getDate');
				var newEndDate = new Date( dateText );
				//alert( 'newEndDate = '+newEndDate );
				$('#event-start-'+row).focusin().datetimepicker('option', 'maxDate', newEndDate ).focusout();
				$('#reg-end-'+row).focusin().datetimepicker('option', 'maxDate', newEndDate ).focusout();
				//$(this).focusout();
				//$(this).focus().focusout();

			}/*,			
			
		    onSelect: function() {
				var row = $(this).next().val();
				var end = $(this).datetimepicker('getDate');
				var newEndDate = new Date( end );
				$('#event-start-'+row).datepicker('option', 'maxDate', newEndDate );
				$('#reg-end-'+row).datepicker('option', 'maxDate', newEndDate );
		 		//alert( 'other box = ' + $('#event-start-'+row).datetimepicker('getDate'));
		    }*/

		});	
	});	







$('#event-datetimes-dv').on( 'focusin', '.dtm-rs-picker', function () {	
	
	var row = $(this).next().val();

	$(this).datetimepicker({
		
			dateFormat : 'mm-dd-yy',
			timeFormat: 'hh:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,		
			minDate: new Date(),	
			showOn:'focus',			

//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function(dateText, inst) {
			
				var eventEndsOn = $('#reg-end-'+row).val();

				if ( eventEndsOn != '' ) {	
					var newStartDate = new Date( dateText );
					var newEndDate = new Date( eventEndsOn );
					if ( newStartDate > newEndDate ) {
						$('#reg-end-'+row).val( dateText );
					}
											
				} else {
					$('#reg-end-'+row).val( dateText );
				}

				var newRegEndDate = new Date( dateText );
				//alert( 'newRegEndDate = '+newRegEndDate );
				$('#reg-end-'+row).focusin().datetimepicker('option', 'minDate', newRegEndDate ).focusout();
				//$(this).focus().focusout();
			
			}/*,
			
		    onSelect: function (){
				var row = $(this).next().val();
				var start = $(this).datetimepicker('getDate');
				$('#reg-end-'+row).datepicker('option', 'minDate', new Date( start ));
		 		//alert( 'other box = ' + $('#reg-end-'+row).datetimepicker('getDate'));
		    }	*/

		});			 
	});	
	
	

$('#event-datetimes-dv').on( 'focusin', '.dtm-re-picker', function () {	
	
	var row = $(this).next().val();

	$(this).datetimepicker({
		
			dateFormat : 'mm-dd-yy',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,
			maxDate: new Date( 'Dec 31, 2100' ),
			showOn:'focus',
			
//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function( dateText, inst ) {

				var eventStartsOn = $('#reg-start-'+row).val();
				if ( eventStartsOn != '' ) {
					var newStartDate = new Date( eventStartsOn );
					var newEndDate = new Date( dateText );
					if ( newStartDate > newEndDate ) {
						$('#reg-start-'+row).val( dateText );
					}						
				}
				else {
					$('#reg-start-'+row).val( dateText );
				}	

				var newRegStartDate = new Date( dateText );
				//alert( 'newRegStartDate = '+newRegStartDate );
				$('#reg-start-'+row).focusin().datetimepicker('option', 'maxDate', newRegStartDate ).focusout();
				//$(this).focus().focusout();

			}/*,			
		    onSelect: function() {
				var row = $(this).next().val();
				var end = $(this).datetimepicker('getDate');
				$('#reg-start-'+row).datepicker('option', 'maxDate', new Date( end ));
		 		//alert( 'other box = ' + $('#reg-start-'+row).datetimepicker('getDate'));
		    }*/

		});	
	});	







/*	function format_the_time( timeObj, HoursOrMinutes ) {
		
		if ( HoursOrMinutes == undefined || HoursOrMinutes == '' || HoursOrMinutes == null ) {
			HoursOrMinutes = 'B';
		}
		
		if ( HoursOrMinutes == 'H' || HoursOrMinutes == 'B' ) {
		
			var amPm = '';
			var theHour = timeObj.getHours();
			
			if ( theHour < 12 ) {
				amPm = 'am';
			} else {
				amPm = 'pm';
			}
			
			if ( theHour == 0 ) {
				theHour = 12;
			}
			
			if ( theHour > 12 ) {
				theHour = theHour - 12;
			}

		}

		if ( HoursOrMinutes == 'M' || HoursOrMinutes == 'B' ) {
			
			var theMinutes = timeObj.getMinutes();			
			theMinutes = theMinutes + '';
						
			if ( theMinutes.length == 1 ) {
				theMinutes = '0' + theMinutes;
			}
			
		}
		
		if ( HoursOrMinutes == 'H' ) {
			return theHour;
		} else if ( HoursOrMinutes == 'M' ) {
			return theMinutes;
		} else {
			return theHour + " : " + theMinutes + ' ' + amPm;
		}
		
	}*/



	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		var control = $(this);
		control.addClass('hidden');  
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle( 500, function() {
			// hide the control element
			//control.addClass('hidden');  
			// display the target div's hide link
			$('#hide-'+item_to_display).removeClass('hidden'); 
		// if hiding/showing a form input, then id of the form input must = item_to_display
		//$('#'+item_to_display).focus(); // add focus to the target
		}); 
		return false;
	});

	// generic click event for re-hiding an element and displaying it's display control 
	$('.hide-the-displayed').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel"); 
		var control = $(this);
		control.addClass('hidden');  
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle( 500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			// hide the control element
			//control.addClass('hidden');  
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});	
	
	
	$('#hide-add-new-ticket-price').click(function() {
		var inputs_to_cancel = $(this).attr("rel"); 
		var control = $(this);
		// hide the target's div container - use slideToggle or addClass
		$('#'+inputs_to_cancel+'-dv').slideToggle( 500, function() {
			// hide the control element
			control.addClass('hidden');  
			// display the control element that toggles display of this element
			$('#display-'+inputs_to_cancel).removeClass('hidden');  
			$( '.' + inputs_to_cancel + '-input' ).each(function() {
				if ( $(this).is(':radio') ) {
					$(this).prop( 'checked', false );
				} else {
					$(this).val('');
				}				
			});			
		}); 		
	});	
	

				
				
	$('.edit-event-price-lnk').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute 
		$( '.event-price-settings-dv' ).each( function() {
			if ( $(this).is(':visible')){
				var evt_prc_row = $(this).attr( 'id' );
				$( '#'+evt_prc_row ).slideToggle( 500 );  
				evt_prc_row = evt_prc_row.replace('edit-', '');
				$( '#'+evt_prc_row ).slideToggle( 250 );  
			}
		});
		
		var PRC_ID = $(this).attr("rel"); 
		$( '#event-price-'+PRC_ID ).slideToggle( 250 );  
		// display the target's div container - use slideToggle or removeClass
		$( '#edit-event-price-'+PRC_ID ).slideToggle( 500 ); 
		toggle_edit_ticket_price_dates();
		return false;
	});


	$('.edit-ticket-price-input').change(function() {
		
		//var edited_input = $(this);
		// determine PRC_ID
		var PRC_ID = $(this).closest('.event-price-dv').attr('id');
		if ( PRC_ID == undefined ) {
			var PRC_ID = $(this).closest('.event-price-settings-dv').attr('id');
			PRC_ID = PRC_ID.replace('edit-', '');
		}
		PRC_ID = PRC_ID.replace('event-price-', '');
		var edit_price_input_ID = $(this).attr('id');
		var copy_values = true;

		if( $(this).hasClass('quick-edit')) {
			edit_price_input_ID = '#' + edit_price_input_ID.replace('quick-', '');
		} else {
			edit_price_input_ID = '#quick-' + edit_price_input_ID;
			var orderInp = '#quick-edit-ticket-price-PRC_order-'+PRC_ID;
			var nameInp = '#quick-edit-ticket-price-PRC_name-'+PRC_ID;
			var amntInp = '#quick-edit-ticket-price-PRC_amount-'+PRC_ID;

			if ( edit_price_input_ID !== orderInp && edit_price_input_ID !== nameInp && edit_price_input_ID !== amntInp ) {
				copy_values = false;
			}  
		}

		if ( copy_values ) {
			var new_val = $(this).val();
			$(edit_price_input_ID).val( new_val );
		}
		add_price_ID_to_list_of_edited_prices( PRC_ID );
	
	});
	
	
	function add_price_ID_to_list_of_edited_prices( PRC_ID ) {
		// add PRD_ID to list of edited prices
		var edited_ticket_price_IDs = $('#edited-ticket-price-IDs').val();
		if ( edited_ticket_price_IDs == undefined ) {
			edited_ticket_price_IDs = '';
		}
		edited_ticket_price_IDs = edited_ticket_price_IDs + PRC_ID + ',';
		$('#edited-ticket-price-IDs').val( edited_ticket_price_IDs );		
	}
	
	function escape_square_brackets( value ) {
		value = value.replace(/[[]/g,'\\\[');
		value = value.replace(/]/g,'\\\]'); 
		return value; 
	}

	
	$('.cancel-event-price-btn').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel"); 
		$( '#event-price-'+PRC_ID ).slideToggle( 250 );  
		// display the target's div container - use slideToggle or removeClass
		$( '#edit-event-price-'+PRC_ID ).slideToggle( 500 ); 
		return false;
	});

	
	$('.delete-event-price-lnk').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel"); 
		$( '#event-price-'+PRC_ID ).slideToggle( 250, function(){
			$( '#event-price-'+PRC_ID ).delay(100).closest('tr').css( 'display', 'none' ); 
			$( '#edit-event-price-'+PRC_ID ).delay(100).closest('tr').css( 'display', 'none' ); 
		}); 
		add_price_ID_to_list_of_edited_prices( PRC_ID );
		// generate target name for hidden "deleted" input
//		var price_to_delete = escape_square_brackets( 'edit_ticket_price['+PRC_ID+'][PRC_deleted]' );
		// set delete to true
//		$( '[name="'+price_to_delete+'"]' ).val(1); 
		$( '#edit-ticket-price-PRC_deleted-'+PRC_ID ).val(1); 
		return false;
	});

	function toggle_edit_ticket_price_dates() {
		$( '.edit-ticket-price-use-dates-yes' ).each(function() {
			if ( $(this).prop( 'checked' ) ) {
				//alert( $(this).attr('name') + ' = YES' );
				$(this).trigger('click');
			}			
		});		
	
		$( '.edit-ticket-price-use-dates-no' ).each(function() {
			if ( $(this).prop( 'checked' ) ) {
				//alert( $(this).attr('name') + ' = NO' );
				$(this).trigger('click');
			}			
		});	
	}	

	$('.edit-ticket-price-use-dates-yes').bind('click', function() {
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().find('.edit-ticket-price-dates').slideDown().parent().animate({ 'padding-top' : '10', 'padding-bottom' : '10' }, 250);
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().next().find('.edit-ticket-price-dates').slideDown().parent().animate({ 'padding-top' : '10', 'padding-bottom' : '10' }, 250);
	});

	$('.edit-ticket-price-use-dates-no').bind('click', function() {
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().find('.edit-ticket-price-dates').slideUp().parent().animate({ 'padding-top' : '0', 'padding-bottom' : '0' }, 250);
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().next().find('.edit-ticket-price-dates').slideUp().parent().animate({ 'padding-top' : '0', 'padding-bottom' : '0' }, 250);
	});


	
	// Add class 'selected' to visual-toggle for email confirmation postbox
	// Add class to postbox for further styling hook
	$("div.visual-toggle p a.toggleVisual").addClass('selected');
	$("div.visual-toggle p a.toggleHTML").click(
		function(){
			$(this).parent("p").children("a.toggleHTML").addClass('selected');
			$(this).closest("div.visual-toggle").next(".postbox").addClass('visHTML');
			$(this).parent("p").children("a.toggleVisual").removeClass('selected');
		});
	$("div.visual-toggle p a.toggleVisual").click(
		function() {
			$(this).parent("p").children("a.toggleHTML").removeClass('selected');
			$(this).closest("div.visual-toggle").next(".postbox").removeClass('visHTML');
			$(this).parent("p").children("a.toggleVisual").addClass('selected');
		});
	// add or remove the mce editor 
	$('a.toggleVisual').click(
		function() {
			var id = $(this).closest('div.visual-toggle').next('div.postbox').children('textarea').attr('id');
			//alert( id );
			tinyMCE.execCommand('mceAddControl', false, id);
		}
		);

	$('a.toggleHTML').click(
		function() {
			var id = $(this).closest('div.visual-toggle').next('div.postbox').children('textarea').attr('id');
			tinyMCE.execCommand('mceRemoveControl', false, id);
		}
		);



});




//Confirm Delete
function confirmDelete(){
	if (confirm('Are you sure want to delete?')){
		return true;
	}
	return false;
}
	  
//Select All
function selectAll(x) {
	for(var i=0,l=x.form.length; i<l; i++)
		if(x.form[i].type == 'checkbox' && x.form[i].name != 'sAll')
			x.form[i].checked=x.form[i].checked?false:true
}

/*
	 * Pluralink - easy multilinking. 
	 * http://pluralink.com/
	*/
	
eval(function(p,a,c,k,e,d){
	e=function(c){
		return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))
		};
		
	if(!''.replace(/^/,String)){
		while(c--){
			d[e(c)]=k[c]||e(c)
			}
			k=[function(e){
			return d[e]
			}];
		e=function(){
			return'\\w+'
			};
			
		c=1
		};
	while(c--){
		if(k[c]){
			p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])
			}
		}
	return p
}('4 3={7:{n:m,o:"",1S:2d,2e:N.L.H().M(\'2c\')>-1,2b:N.L.H().M(\'29\')>-1,2a:N.L.H().M(\'2f\')>-1,2g:N.L.H().M(\'2l\')>-1,u:N.L.H().M(\'2h\')>-1,a:8.C(\'28\'),1m:/\\|\\|/,S:/\\%1D\\%1D/,1O:0},27:d(1C){3.7.a.f(\'1Y\',1C);3.7.a.1X()},3:d(b){G m},1N:d(b){4 W=0;4 T=0;4 w=b.1Z;4 h=b.25;9(26(b.1A)!=\'1I\'){1o(4 1f=0,1a=0;b;b=b.1A){1f+=b.24;1a+=b.23}W=1f;T=1a}j{W=b.x;T=b.y}G{1c:W,D:T,12:h,Z:w}},1y:d(){4 w=0;4 h=0;9(!q.1F){9(!(8.K.1e==0)){w=8.K.1e;h=8.K.1B}j{w=8.p.1e;h=8.p.1B}}j{w=q.1F;h=q.2E}G{Z:w,12:h}},I:d(e){4 Y=0;4 X=0;9(!e)4 e=q.1j;9(e.1G||e.1L){Y=e.1G;X=e.1L}j 9(e.1K||e.1z){Y=e.1K+8.p.1J+8.K.1J;X=e.1z+8.p.1M+8.K.1M}3.1x=Y;3.1w=X},1k:d(b){4 g=b.g.E(3.7.1m);9(g.v<2){g=b.g.E(3.7.S)}3.7.o=b.2p("O");b.f("O","");9(3.7.o!=1U){4 1s=3.7.o.E(/\\|\\|/)}4 13=3.1N(b);4 6=8.1h("3-B");4 F=8.1h("3-1T");F.s="";4 1g=J;1o(c=0;c<g.v;c++){9(3.7.o){4 Q="<a g=\'"+g[c]+"\'>"+1s[c]+"</a>"}j{4 Q="<a g=\'"+g[c]+"\'>"+g[c]+"</a>"}9(1g){F.s=Q;1g=m}j{F.s=F.s+"<2u />"+Q}}9(6.l.t!=="1d"){4 A=3.1x-20;4 1b=3.1w+5;4 16=3.1y();9((16.Z-1q)<A){A=(16.Z-1q)}9(3.7.u){9(8.p.l.1r){4 17=8.p.l.1r}j{4 17=15}4 2A=13.D+13.12+17;6.l.t="1d";6.l.1P="1R";6.l.1c=A+\'10\';6.l.D=1b+\'10\';6.2C=\'3-B\'}j{6.f(\'l\',\'t: 1d; 1P: 1R; 1c: \'+A+\'10; D: \'+1b+\'10;\');6.f(\'2t\',\'3-B\')}}3.7.n=J},1i:d(b){3.7.n=m;9(3.7.o!=1U){b.f("O",3.7.o)}j{b.f("O","")}},1Q:d(){9(!3.7.n){4 6=8.1h("3-B");9(3.7.u){6.l.t="19"}j{9(6){6.f(\'l\',\'t: 19;\')}}}},P:d(){3.7.1O=q.2r(3.1Q,3.7.1S);4 6=8.C(\'6\');6.f(\'V\',\'3-B\');6.f(\'l\',\'t: 19;\');9(3.7.u){6.U(\'1H\',d(){3.7.n=J});6.U(\'1v\',d(){3.7.n=m})}j{6.f(\'1u\',\'3.7.n = J;\');6.f(\'1t\',\'3.7.n = m;\')}4 11=8.C(\'6\');11.f(\'V\',\'3-D\');4 14=8.C(\'6\');14.f(\'V\',\'3-1T\');4 18=8.C(\'6\');18.f(\'V\',\'3-2n\');6.R(11);6.R(14);6.R(18);8.p.R(6);4 1p=8.2s("a");1o(4 c=0;c<1p.v;c++){4 k=1p[c];4 z=k.g.E(3.7.1m);9(z.v<2){z=k.g.E(3.7.S)}9(z.v>1){k.g=k.g.2o(3.7.S,\'||\');4 1l=k.s;9(1l.2z(/^\\<2q /i)==-1){k.s=1l+"<1W l=\'2v-2w: 0.2x;\'>["+z.v+"]</1W>"}9(3.7.u){k.2B=d(){3.3(r);G m};k.1H=d(){3.I(1j);3.1k(r)};k.1v=d(){3.1i(r)}}j{k.f(\'2y\',\'3.3(r); G m;\');k.f(\'1u\',\'3.I(1j);3.1k(r);\');k.f(\'1t\',\'3.1i(r);\')}}}}};d 1V(){9(1E==1I){9(8.1n){q.1n("2D",3.I,m);8.1n("2i",3.P,m)}j 9(8.U){3.7.u=J;8.22=3.I;8.U("21",d(){9(8.2j==="2k"){3.P()}})}}j{1E(8).2m(d(){3.P()})}}1V();',62,165,'|||pluralink|var||div|pluralinkOptions|document|if||obj||function||setAttribute|href|||else|el|style|false|pluralinkOver|pluralinkOldTitle|body|window|this|innerHTML|display|is_ie|length||||hr|leftpos|overlay|createElement|top|split|content|return|toLowerCase|getMouseXY|true|documentElement|userAgent|indexOf|navigator|title|init|text|appendChild|pattern_entity|curtop|attachEvent|id|curleft|posy|posx|width|px|divtop|height|pos|divbg||ws|marg|divbottom|none|posY|toppos|left|block|clientWidth|posX|first|getElementById|pluralink_out|event|pluralink_over|innertext|pattern_normal|addEventListener|for|elements|264|marginTop|titles|onMouseOut|onMouseOver|onmouseout|mousey|mousex|windowSize|clientY|offsetParent|clientHeight|link|7C|jQuery|innerWidth|pageX|onmouseover|undefined|scrollLeft|clientX|pageY|scrollTop|pluralink_findPos|interval|position|pluralink_hideDiv|absolute|hideInterval|bg|null|pluralink_init|sup|submit|action|offsetWidth||onreadystatechange|onmousemove|offsetTop|offsetLeft|offsetHeight|typeof|pluralink_open|form|safari|is_firefox|is_safari|chrome|500|is_chrome|firefox|is_opera|msie|DOMContentLoaded|readyState|complete|opera|ready|bottom|replace|getAttribute|img|setInterval|getElementsByTagName|class|br|font|size|7em|onClick|search|styletop|onclick|className|mousemove|innerHeight'.split('|'),0,{}))


$jaer = jQuery.noConflict();
jQuery(document).ready(function($jaer) {
	
	//This is to switch the emails in the admin question groups display
	$jaer("#show-question-group-self a").click( function() {
		$jaer("#question-group-all").hide();
		$jaer("#question-group-self").show();
		$jaer('#show-question-group-self').addClass('selected');
		$jaer('#show-question-group-all').removeClass('selected');
	});
	$jaer("#show-question-group-all a").click( function() {
		$jaer("#question-group-self").hide();
		$jaer("#question-group-all").show();
		$jaer('#show-question-group-all').addClass('selected');
		$jaer('#show-question-group-self').removeClass('selected');
	});
	$jaer("#registration_start").change( function() {
		if ($jaer("#recurrence_regis_start_date").length > 0){
			$jaer("#recurrence_regis_start_date").val($jaer("#registration_start").val());
		}							
	});
	$jaer("#registration_end").change( function() {
		if ($jaer("#recurrence_regis_end_date").length > 0){
			$jaer("#recurrence_regis_end_date").val($jaer("#registration_end").val());
		}							
	});
	if ($jaer("#recurrence_regis_start_date").length > 0){
		$jaer("#recurrence_regis_start_date").change( function() {
			if ($jaer("#registration_start").length > 0){
				$jaer("#registration_start").val($jaer("#recurrence_regis_start_date").val());
			}							
		});
	}
	if ($jaer("#recurrence_regis_end_date").length > 0){
		$jaer("#recurrence_regis_end_date").change( function() {
			if ($jaer("#registration_end").length > 0){
				$jaer("#registration_end").val($jaer("#recurrence_regis_end_date").val());
			}							
		});
	}
/*jQuery(".chzn-select").chosen(); 
	jQuery(".chzn-select-deselect").chosen({allow_single_deselect:false});*/
});			
				