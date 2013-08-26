jQuery(document).ready(function($) {

//	$('.display-ticket-manager').on('click', function(){
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
	
	/*$(".datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		showButtonPanel: true
	}); // close doc.ready/**/

	var header_clicked = false;
	$('#upload_image_button').click(function() {
		formfield = $('#upload_image').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
		$('p.event-featured-thumb').addClass('old');
		header_clicked = true;
		return false;
	});

	window.original_send_to_editor = window.send_to_editor;

	window.send_to_editor = function(html) {
		if(header_clicked) {
		imgurl = $('img',html).attr('src');
		$('#' + formfield).val(imgurl);
		$('#featured-image').append("<p id='image-display'><img class='show-selected-image' src='"+imgurl+"' alt='' /></p>");
		header_clicked = false;
		tb_remove();

		} else {
			window.original_send_to_editor(html);
		}
	};

	// process the remove link in the metabox
	$('#remove-image').click(function(){
		confirm(eei18n.image_confirm);
		$("#upload_image").val('');
		$("p.event-featured-thumb").remove();
		$("p#image-display").remove();
		$('#remove-image').remove();
		$("#show_thumb_in_lists, #show_on_calendar, #show_thumb_in_regpage").val(false);
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
	
	
	
	

	// EVENT START DATEPICKER
	$('#event-datetimes-dv').on( 'focusin', '.dtm-es-picker', function () {
		
		var row = $(this).next().val();
		var eventEnd = $('#event-end-'+row).val();
		if ( eventEnd !== '' ) {
			eventEnd = getDateFromFormat( eventEnd, 'yyyy-MM-dd  h:mm a' );
			eventEnd = new Date( eventEnd );
		} else {
			eventEnd = new Date();
			var year = eventEnd.getFullYear();
			eventEnd.setFullYear(year+1);
			eventEnd.setHours(0);
			eventEnd.setMinutes(0);
			eventEnd.setSeconds(0);
		}

		//get start date if already exists
		var eventStart = $('#event-start-'+row).val();
		if ( eventStart !== '' ) {
			eventStart = getDateFromFormat( eventStart, 'yyyy-MM-dd  h:mm a' );
			eventStart = new Date( eventStart );
		} else {
			eventStart = new Date();
		}
			
		$(this).datetimepicker({

			dateFormat : 'yy-mm-dd',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			minDate: null,
			maxDate: null,
			numberOfMonths: 2,
			hour: eventStart.getHours(),
			minute: eventStart.getMinutes(),
			showOn:'focus',
	
			onClose: function(dateText, inst) {
			
				var eventEndsOn = $('#event-end-'+row).val();

				var StartDate = new Date( getDateFromFormat( dateText, 'yyyy-MM-dd  h:mm a' ) );

				if ( eventEndsOn !== '' ) {
					var newEndDate = new Date( getDateFromFormat( eventEndsOn, 'yyyy-MM-dd  h:mm a' )  );
					if ( StartDate > newEndDate ) {
						$('#event-end-'+row).val( dateText );
					}
											
				} else {
					$('#event-end-'+row).val( dateText );
				}
			
			}
			
		});
	});
	
	

	// EVENT END DATEPICKER
	$('#event-datetimes-dv').on( 'focusin', '.dtm-ee-picker', function () {

		var row = $(this).next().val();
		var eventStart = $('#event-start-'+row).val();
		if ( eventStart !== '' ) {
			eventStart = getDateFromFormat( eventStart, 'yyyy-MM-dd  h:mm a' );
			eventStart = new Date( eventStart );
			//alert( 'eventStart : ' + eventStart );
		}

		//get end date if it already exists otherwise we use the eventStart date
		var eventEnd = $('#event-end-'+row).val();
		if ( eventEnd !== '' ) {
			eventEnd = getDateFromFormat( eventEnd, 'yyyy-MM-dd  h:mm a' );
			eventEnd = new Date( eventEnd );
		} else {
			eventEnd = eventStart;
		}
						
		$(this).datetimepicker({
		
			dateFormat : 'yy-mm-dd',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,
			hour: eventEnd.getHours(),
			minute: eventEnd.getMinutes(),
			minDate: eventStart,
			maxDate: new Date( 'Dec 31, 2100' ),
			showOn:'focus',
			
			onClose: function( dateText, inst ) {

				var eventStartsOn = $('#event-start-'+row).val();
				var EndDate = new Date( getDateFromFormat( dateText, 'yyyy-MM-dd  h:mm a' ) );
				if ( eventStartsOn !== '' ) {
					var newStartDate = new Date( getDateFromFormat( eventStartsOn, 'yyyy-MM-dd  h:mm a' ) );
					if ( newStartDate > EndDate ) {
						$('#event-start-'+row).val( dateText );
						$('#reg-end-'+row).val( dateText );
					}
				} else {
					$('#event-start-'+row).val( dateText );
					$('#reg-end-'+row).val( dateText );
				}

			}

		});
	});


	
	
	//@todo: why was this validation being called on document ready?? from mike.
	//although it works fine in 4.0-BETA, but not in FET-2476-integration
	//$('#update_event_event_form').validate();

// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download. 
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

// HISTORY
// ------------------------------------------------------------------
// May 17, 2003: Fixed bug in parseDate() for dates <1970
// March 11, 2003: Added parseDate() function
// March 11, 2003: Added "NNN" formatting option. Doesn't match up
//                 perfectly with SimpleDateFormat formats, but 
//                 backwards-compatability was required.

// ------------------------------------------------------------------
// These functions use the same 'format' strings as the 
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
// 
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

var MONTH_NAMES=new Array( eei18n.January, eei18n.February, eei18n.March, eei18n.April, eei18n.May, eei18n.June, eei18n.July, eei18n.August, eei18n.September, eei18n.October, eei18n.November, eei18n.December, eei18n.Jan, eei18n.Feb, eei18n.Mar, eei18n.Apr, eei18n.May, eei18n.Jun, eei18n.Jul, eei18n.Aug, eei18n.Sep, eei18n.Oct, eei18n.Nov, eei18n.Dec );
var DAY_NAMES=new Array( eei18n.Sunday, eei18n.Monday, eei18n.Tuesday, eei18n.Wednesday, eei18n.Thursday, eei18n.Friday, eei18n.Saturday, eei18n.Sun, eei18n.Mon, eei18n.Tue, eei18n.Wed, eei18n.Thu, eei18n.Fri, eei18n.Sat );
function LZ(x) {return(x<0||x>9?"":"0")+x}

// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------
function isDate(val,format) {
	var date=getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
	}

// -------------------------------------------------------------------
// compareDates(date1,date1format,date2,date2format)
//   Compare two date strings to see which is greater.
//   Returns:
//   1 if date1 is greater than date2
//   0 if date2 is greater than date1 of if they are the same
//  -1 if either of the dates is in an invalid format
// -------------------------------------------------------------------
function compareDates(date1,dateformat1,date2,dateformat2) {
	var d1=getDateFromFormat(date1,dateformat1);
	var d2=getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
	}

// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}
	
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}
	
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<DAY_NAMES.length; i++) {
				var day_name=DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}

});
