jQuery(document).ready(function($) {

	var TKT_helper = {

		/**
		 * gets the total row count jQuery object for the given context
		 * @param  {string} context what context we're getting row count for
		 * @return {jQuery obj}     jQuery obj that contains the row count
		 */
		getrowcountobject: function( context ) {
			var rowcountobj;
			if ( typeof(context) === 'undefined' ) context = 'datetime';

			switch ( context ) {
				case 'datetime' :
					rowcountobj = $('#datetime-total-rows');
					break;
				case 'ticket' :
					rowcountobj = $('#ticket-total-rows');
					break;
			}

			return rowcountobj;
		},


		/**
		 * gets the total rows for a given context in the ui
		 * @param  {string} context what context we're retrieiving rows for
		 * @return {int}            the row count
		 */
		getrowcount: function( context ) {
			if ( typeof(context) === 'undefined' ) context = 'datetime';
			return this.getrowcountobject(context).val();
		},



		/**
		 * This increments the row count of a given context by one and returns the new row count
		 * @param  {string} context what context we're incrementing
		 * @return {int}            the new row count
		 */
		increaserowcount: function( context ) {
			if ( typeof(context) === 'undefined' ) context = 'datetime';
			var countobj = this.getrowcountobject(context);
			var newcount = countobj.val();
			newcount++;
			countobj.val(newcount);
			return newcount;
		},




		/**
		 * This decrements the row count of a given context by one and returns the new row count
		 * @param  {string} context what context we're decreasing row count for
		 * @return {int}            the new row count
		 */
		decreaserowcount: function( context ) {
			if ( typeof(context) === 'undefined' ) context = 'datetime';
			var countobj = this.getrowcountobject(context);
			var newcount = countobj.val();
			newcount--;
			countobj.val(newcount);
			return newcount;
		},




		/**
		 * gets the Ticket Title for the given ticketrow value
		 * @param  {int} ticketrow    What ticket row are we retrieving the title from
		 * @return {string}           The title of the ticket.
		 */
		getTicketTitle: function( ticketrow ) {
			return $('.edit-ticket-TKT-name', '#edit-ticketrow-' + ticketrow).val();
		},




		/**
		 * This creates a completely new row for an event Datetime and adds it to the UI.
		 * @return {TKT_helper obj}  return "this" to allow for possible chaining.
		 */
		newDTTrow: function() {
			var inputid, inputvalue, DTT_start_time, DTT_end_time, newDTTrow;
			//edit form stuff
			var DTTeditform = $('#edit-datetime-form-holder').html().clone();

			//replace DTTNUM with new row.
			var row = this.increaserowcount();
			DTTeditform = DTTeditform.replace('DTTNUM',row);
			DTTeditformobj = $(DTTeditform);

			//make sure all input vals get their values from the create form!
			DTTeditformobj.find('input').each( function() {
				inputid = this.attr('id').replace('-'+row,'');
				//first handle values we know AREN'T in the add-new-datetime form
				switch (inputid) {
					case 'event-datetime-DTT_ID' :
						$(this).val('0');
						break;
					
					case 'event-datetime-DTT_is_primary' :
						$(this).val(row === 1 ? '1' : '0');
						break;

					case 'event-datetime-DTT_EVT_start' :
						DTT_start_time = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(DTT_start_time);
						break;

					case 'event-datetime-DTT_EVT_end' :
						DTT_end_time = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(DTT_end_time);
						break;

					default :
						inputvalue = $('#add-new-' + inputid, '#add-event-datetime').val();
						$(this).val(inputvalue);
						break;
				}
			});

			//get list of available tickets and make sure they are present in the list.
			var existing_datetime_tickets_list = $('#dtt-existing-available-ticket-list-items-holder').html().clone();
			var existing_datetime_tickets_container = $('#edit-datetime-evaliable-tickets-holder').html().clone();

			//str replace on the existing_datetime_tickets so we get the DTTNUM set correctly
			existing_datetime_tickets_container = existing_datetime_tickets_container.replace('DTTNUM',row);
			

			//ARE there tickets?  If so, then we'll use them, if not, then we leave alone.
			if ( $(existing_datetime_tickets).contains('li.datetime-ticket') ) {
				$(existing_datetime_tickets_container).find('.datetime-tickets-list').append(existing_datetime_tickets).show();
			}

			//create new DTT display row.
			var DTT_display_row = $('#dtt_new_display_row_holder').html().clone();
			DTT_display_text = this.DTT_display_text(DTT_start_time, DTT_end_time);
			$(DTT_display_row).find('.datetime-title').text(DTT_display_text);

			//now let's add in the various components together for our new DTT row.
			newDTTrow = '<div id="event-datetime-' + row + '" class="event-datetime-row">' + $(DTT_display_row).html() + DTTeditformobj.html() + $(existing_datetime_tickets_container).html() + '</div>';

			//now let's append to the other rows and we'll scroll up the editor for the user to add/create tickets to the new datetime.
			$('.event-datetimes-container').append(newDTTrow);
			this.DateTimeEditToggle( 'ticket', row);
			return this;
		},





		/**
		 * This clones a given datetime row and adds the cloned datetime to the ui (updating all ui elements that have datetime references)
		 * @param  {int} row    The given row that we are cloning (DTT)
		 * @return {TKT_helper obj}     The TKT_helper obj that allows chaining.
		 */
		cloneDateTime: function( row ) {
			var newrownum = this.increaserowcount();
			var newDTTrow = $('#event-datetime-' + row).clone();
			var newid, newname, curid, curclass, data, curname, ticketsold, tickettitle;

			/*replace all old row values with newrownum*/
			//first let's do the <sections>.
			$(newDTTrow).find('section').each( function() {
				curid = $(this).attr('id');
				curclass = $(this).attr('class');
				newid = curid.replace(row,newrownum);
				$(this).attr('id', newid);
			});

			//next let's do the spans
			$(newDTTrow).find('span').each( function() {
				curclass = $(this).attr('class');
				data = $(this).data();
				
				//handle data-datetime-row properties
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' ) {
					$(this).attr( 'data-datetime-row', newrownum ); //not using jquery .data() to set the value because that doesn't change the actual data attribute and if the datetime row is cloned it doesn't appear to clone the data() obj cache for the selector.
				}

				//handle ticket counts!
				if ( curclass == 'datetime-tickets-sold' ) {
					ticketsold = $(this).text().replace(/[0-9]/g,'') + '0';
					$(this).text(ticketsold);
				}

				if ( curclass == 'ticket-list-ticket-name' ) {
					//find out what ticket we are looking at.
					data = $(this).parent().data();
					
					//now we can get the ticket title from the tickets list and simply replace what's in the datetime ticket with it.  Why do we do this instead of just replacing the numbers?  Because the ticket title may have a number in it.
					tickettitle = TKT_helper.getTicketTitle( data.ticketRow );
					$(this).text(tickettitle + '0');
				}


			});


			//table id updates
			$(newDTTrow).find('table').each( function() {
				curid = $(this).attr('id');

				if ( typeof(curid) !== 'undefined' ) {
					newid = curid.replace(row,newrownum);
					$(this).attr('id', newid);
				}
			});

			//buttons
			$(newDTTrow).find('button').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' )
					$(this).attr('data-datetime-row', newrownum);
			});


			//li
			$(newDTTrow).find('li').each( function() {
				data = $(this).data();
				if ( typeof(data) !== 'undefined' && typeof(data.datetimeRow) !== 'undefined' )
					$(this).attr('data-datetime-row', newrownum);
			});


			//div
			$(newDTTrow).find('div').each( function() {
				curid = $(this).attr('id');
				newid = curid.replace(row, newrownum);
				$(this).attr('id', newid);
			});


			//labels
			$(newDTTrow).find('label').each( function() {
				curid = $(this).attr('for');
				newid = curid.replace(row, newrownum);
				$(this).attr('for', newid);
			});


			//the big enchilda inputs!
			$(newDTTrow).find('input').each( function() {
				curclass = $(this).attr('class');
				curid = $(this).attr('id');
				curname = $(this).attr('name');

				switch ( curclass ) {
					case 'event-datetime-DTT_ID' :
					case 'event-datetime-DTT_is_primary' :
						newname = curname.replace(row, newrownum);
						$(this).attr('name', newname);
						$(this).val('0');
						break;

					case 'event-datetime-DTT_EVT_start' :
					case 'event-datetime-DTT_EVT_end' :
					case 'event-datetime-DTT_reg_limit' :
						newname = curname.replace(row, newrownum);
						newid = curid.replace(row, newrownum);
						$(this).attr('name', newname);
						$(this).attr('id', newid);
						break;

					case 'datetime-ticket-checkbox' :
						newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
						$(this).attr('name', newname);
						break;

					case 'datetime-ticket-ids' :
						newname = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curname);
						newid = TKT_helper.replaceRowValueByPosition(row, newrownum, 1, curid);
						$(this).attr('name', newname);
						$(this).attr('id', newid);
						break;
				}
			});

			//k all replacements done, let's append the new row to the datetime-row container
			$('.event-datetimes-container').append(newDTTrow);

			//todo we need to update ALL existing TKT edit forms with the new DTT li element.
			//todo we need to toggle the edit DTT form for the new Datetime cloned.

			return this;
		},


		/**
		 * Takes care of trashing a datetime in the UI and updating all the relevant ui elements
		 * @param  {int} row dtt row num being trashed
		 * @return {obj}     This object (allows for chaining)
		 */
		trashDTT: function(row) {
			//todo
		},



		/**
		 *  Used to replace a row value in a given string.  So something like "datetime-ticket[row][row]" could have "row" replaced by "newrow" via doing TKT_helper.replaceRowValueByPosition(row, 2, 1, 'datetime-ticket[row][row]'); and getting the resulting string of "datetime-ticket[1][row]";
		 * @param  {string} searchstring   What we're replacing
		 * @param  {string} newvalue       What we're replacing with
		 * @param  {int}    position       What position in the stringtosearch we're replacing.
		 * @param  {string} stringtosearch What is being searched
		 * @return {string}                The string with the replaced values
		 */
		replaceRowValueByPosition: function(searchstring, newvalue, position, stringtosearch) {
			var pattern = new RegExp( searchstring, 'g' );
			var pnth = 0;
			var parsedstr = stringtosearch.replace(pattern, function( match, i, original ) {
				pnth++;
				return ( pnth === position ) ? newvalue : match;
			});
			return parsedstr;
		},




		/**
		 * This simply retrieves a human friendly DTT string for display in the DTT_display row
		 * @param {string} start DTT_start_date
		 * @param {string} end   DTT_end_date
		 * @return {strgin} human friendly formatted DTT string combining start and end.
		 */
		DTT_display_text: function(start, end) {
			var datedisplaytext;
			var fullstartdate = moment( start, 'yyyy-MM-dd h:mm a' );
			var fullenddate = moment( end, 'yyyy-MM-dd H:mm a' );

			//first are months equal?
			if ( fullstartdate.month() != fullenddate.month() ) {
				datedisplaytext = fullstartdate.format("MMM D, YYYY h:mm a") + " - " + fullenddate.format("MMM D, YYYY h:mm a");
			} else if ( fullstartdate.month() == fullenddate.month() && fullstartdate.date() != fullenddate.date() ) {
				datedisplaytext = fullstartdate.format("MMM D, h:mm a") + " - " + fullenddate.format("MMM D, h:mm a YYYY");
			} else {
				datedisplaytext = fullstartdate.format("MMMM D, YYYY") + ' @ ' + fullstartdate.format("h:mm a") + ' - ' + fullenddate.format("h:mm a");
			}

			return datedisplayformat;
		},





		/**
		 * This toggles the display of the edit form for a dtt row depending on the context and row num given.
		 * @param {string} context indicates whether we're toggling ticket-selector or DTT edit forms.
		 * @param {int}    DTTrow  the DTT row we're toggling
		 */
		DateTimeEditToggle: function( context, DTTrow ) {
			if ( context == 'ticket' )
				$('#edit-event-datetime-tickets-' + DTTrow ).slideToggle( 500 );
			else if ( context == 'datetime' )
				$('#edit-event-datetime-' + DTTrow ).slideToggle( 500 );
			return this;
		}


	};


	/**
	 * all event datetims and tickets triggers go below here
	 */

	/**
	 * add datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.ee-create-button', function(e) {
		e.preventDefault();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TKT_helper.newDTTrow();
		}
		return true;
	});


	/**
	 * edit datetime/ticket
	 */
	$('#event-and-ticket-form-content').on('click', '.gear-icon', function(e) {
		e.preventDefault();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TKT_helper.DateTimeEditToggle( 'datetime', data.datetimeRow );
		}
		return true;
	});


	/**
	 * assigned tickets toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.ticket-icon', function(e) {
		e.preventDefault();
		var data = $(this).data();
		TKT_helper.DateTimeEditToggle( 'ticket', data.datetimeRow );
		return true;
	});


	/**
	 * clone icon toggle
	 */
	$('#event-and-ticket-form-content').on('click', '.clone-icon', function(e) {
		e.preventDefault();
		var data = $(this).data();
		if ( data.context == 'datetime' )
			TXN_helper.cloneDateTime(data.datetimeRow);
		return true;
	});



	/**
	 * trash icon click
	 */
	$('#event-and-ticket-form-content').on('click', '.trash-icon', function(e) {
		e.preventDefault();
		var data = $(this).data();
		if ( data.context == 'datetime' ) {
			TXN_helper.trashDTT(data.datetimeRow);
		}
		return true;
	});
});