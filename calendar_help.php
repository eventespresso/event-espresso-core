<div style="display: none;">
	<?php
		/**
		 * Display Calendar styles on specific pages
		 */
	?>
	<div id="display-on-pages" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Display Calendar styles on specific pages', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This tells the plugin to load the calendar CSS file on these pages. This should be a comma seperated list of page ids. The default value is "0", meaning the CSS will load on all pages of your website. The list of page ids will need to be updated if you add/delete/move your calendar page(s).', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('Only loading styles on specific pages avoids unnecessary requests for files from the server that are not required for that pages style and layout.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('<em class="important">If you are uncertain on what this setting does, please do not modify the default value.</em>', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Display calendar on which type of page?
		 */
	?>
	<div id="display-where" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Display calendar on which type of page?', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('<b>Registration Page (default)</b> -- Calendar links go to the Event Espresso registration page for the event. Use this if you are not using Custom Post Types.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('<b>Post</b> -- Calendar links go to the Event Post for the event. Use this option <em><b>only</b></em> if you have enabled Custom Post Types.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Calendar thumbnail sizing
		 */
	?>
	<div id="calendar-thumb-sizes" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Calendar thumbnail sizing', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Using these options allow you to set a general size that your thumbnails will be displayed at on your calendar.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('<em>For best results try to select an image that has a greater size (dimensions) than your selected display size.</em>', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('<em>N.B. On certain displays, such as a Day view these thumbnail sizes might be overridden to reduce the size for best display of events falling on the same day.</em>', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Display event times
		 */
	?>
	<div id="show-event-times" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Display event times', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This option allows you to show the event start and finish times.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('The times are displayed below the event title.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('You may select the format of the time display using the radio button options, or you may set your own custom format explained in the link below the input field.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Enable CSS classes for categories
		 */
	?>
	<div id="enable-categories" class="pop-help" >
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Enable CSS classes for Categories', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Enabling this option will set the events category name as a CSS class on the event element', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('You may use these classes to apply individual styles based on the events category e.g a separate background color for each event category.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Open event in a popup box
		 */
	?>
	<div id="display-thickbox" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Open event in a popup box', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('This option will cause the event to open in a popup box with event details displayed along with a link to the registration page instead of the event link directly moving to the registration page.', 'event_espresso'); ?>
			</p>
		</div>
	</div>
	<?php
		/**
		 * Header Style
		 */
	?>
	<div id="calendar_header_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Header Style', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>left: 'prev,<br />
				today', <br />
				center: 'title', <br />
				right: 'month,agendaWeek,agendaDay,next'</p>
			<p>
				<?php _e('More Info:','event_espresso'); ?>
				<br />
				<a href="http://arshaw.com/fullcalendar/docs/display/header/" target="_blank">http://arshaw.com/fullcalendar/docs/display/header/</a></p>
		</div>
	</div>
	<?php
		/**
		 * Button Text
		 */
	?>
	<div id="calendar_buttonText_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Button Text', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>prev: '&amp;nbsp;&amp;#9668;&amp;nbsp;',//<span class="red_text">(Eg. left triangle)</span><br />
				next: '&amp;nbsp;&amp;#9658;&amp;nbsp;',//<span class="red_text"> (Eg. right triangle)</span><br />
				prevYear: '&amp;nbsp;&amp;lt;&amp;lt;&amp;nbsp;', //<span class="red_text">(Eg. &lt;&lt; )</span><br />
				nextYear: '&amp;nbsp;&amp;gt;&amp;gt;&amp;nbsp;', //<span class="red_text">(Eg. &gt;&gt; )</span><br />
				today:'today',<br />
				month:'month',<br />
				week: 'week',<br />
				day:'day'</p>
			<p>
				<?php _e('More Ino:','event_espresso'); ?>
				<br />
				<a href="http://arshaw.com/fullcalendar/docs/text/buttonText/" target="_blank">http://arshaw.com/fullcalendar/docs/text/buttonText/</a></p>
		</div>
	</div>
	<?php
		/**
		 * Title Format
		 */
	?>
	<div id="calendar_titleFormat_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Title Format', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>month: 'MMMM yyyy', //<span class="red_text">(Eg. September 2009)</span><br />
				week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", //<span class="red_text">(Eg. Sep 7 - 13 2009)</span><br />
				day: 'dddd, MMM d, yyyy' //<span class="red_text">(Eg. Tuesday, Sep 8, 2009)</span></p>
			<p>
				<?php _e('For date formatting options, please refer to: ','event_espresso'); ?>
				<br />
				<a href="http://arshaw.com/fullcalendar/docs/utilities/formatDate/" target="_blank">http://arshaw.com/fullcalendar/docs/utilities/formatDate/</a></p>
		</div>
	</div>
	<?php
		/**
		 * Column format
		 */
	?>
	<div id="calendar_columnFormat_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Column Format', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>month: 'ddd', //<span class="red_text">(Eg. Mon) </span><br />
				week: 'ddd M/d', //<span class="red_text">(Eg. Mon 9/7) </span><br />
				day: 'dddd M/d' //<span class="red_text">(Eg. Monday 9/7)</span></p>
			<p>
				<?php _e('More Ino:','event_espresso'); ?>
				<br />
				<a href="http://arshaw.com/fullcalendar/docs/text/columnFormat/" target="_blank">http://arshaw.com/fullcalendar/docs/text/columnFormat/</a></p>
		</div>
	</div>
	<?php
		/**
		 * Month Names
		 */
	?>
	<div id="calendar_monthNames_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Month Names', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>'January', 'February', 'March', <br />
				'April', 'May', 'June', <br />
				'July', 'August', 'September', 'October', <br />
				'November', 'December'</p>
		</div>
	</div>
	<?php
		/**
		 * Month Names Short
		 */
	?>
	<div id="calendar_monthNamesShort_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Month Names Short', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'</p>
		</div>
	</div>
	<?php
		/**
		 * Day Names
		 */
	?>
	<div id="calendar_dayNames_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Day Names', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'</p>
		</div>
	</div>
	<?php
		/**
		 * Day Names Short
		 */
	?>
	<div id="calendar_dayNamesShort_info" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Day Names Short', 'event_espresso'); ?>
			</h2>
			<p><strong>
				<?php _e('Example:', 'event_espresso'); ?>
				</strong></p>
			<p>'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'</p>
		</div>
	</div>
	<?php
		/**
		 * Display a Single Category
		 */
	?>
	<div id="display_single_category" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e('Display a Single Category', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e( 'Enter the Event Category ID from the ', 'event_espresso' ); ?><a href="admin.php?page=event_categories"><?php _e( 'Categories page','event_espresso' ); ?></a>.
			</p>
		</div>
	</div>
	<?php
		/**
		 * Calendar page
		 */
	?>
	<div id="calendar_page" class="pop-help">
		<div class="TB-ee-frame">
			<h2>
				<?php _e( 'Calendar Page', 'event_espresso' ); ?>
			</h2>
			<p>
				<?php _e( 'If you have a dedicated calendar page on your site, enter the slug or page ID here.  <strong>This is required!</strong>  If left blank, your calendar page may not display correctly and the calendar will not display on pages.', 'event_espresso' ); ?>
			</p>
		</div>
	</div>
	<!-- / div display:none; -->
</div>
