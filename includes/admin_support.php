<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
function event_espresso_support() {
?>

<div class="wrap">
	<div id="icon-options-event" class="icon32"></div>
	<h2>
		<?php _e('Help and Support', 'event_espresso'); ?>
	</h2>
	<?php
	//For testing email functions
	function event_espresso_test_email($optional_email = '', $optional_message = 'None') {
		global $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$to = !empty($optional_email) ? $optional_email : $org_options['contact_email'];
		$subject = 'Event Espresso Test Message from' . $org_options['organization'];
		$message = 'Event Espresso email is working properly. Optional message: ' . $optional_message;
		$headers = 'From: ' . $org_options['contact_email'] . "\r\n" .
						'Reply-To: ' . $org_options['contact_email'] . "\r\n" .
						'X-Mailer: PHP/' . phpversion();
		wp_mail($to, $subject, $message, $headers);
	}
	
	if(isset($_REQUEST['action'])) {
		switch ($_REQUEST['action']) {
			case "update_event_dates":
				update_event_data();
				break;
			case "event_espresso_update_attendee_data":
				event_espresso_update_attendee_data();
				break;
			case "test_email_function":
				event_espresso_test_email($_REQUEST['optional_email'], $_REQUEST['optional_message']);
				break;
		}
	}
?>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<?php event_espresso_display_right_column(); ?>
		<div id="post-body">
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<ul id="event_espresso-sortables" class="help-support">
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Quick Links', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">
											<ul id="quick-links">
												<li><a href="#install">
													<?php _e('Installation', 'event_espresso'); ?>
													</a></li>
												<li><a href="#plugins">
													<?php _e('Recommended Plugins', 'event_espresso'); ?>
													</a></li>
												<li><a href="#hire_devs">
													<?php _e('Hire a Developer', 'event_espresso'); ?>
													</a></li>
												<li><a href="#theme_devs">
													<?php _e('Favorite Theme Developers', 'event_espresso'); ?>
													</a></li>
												<li><a href="#themes">
													<?php _e('Highly Recommended Themes', 'event_espresso'); ?>
													</a></li>
												<li><a href="#resources">
													<?php _e('Other Resources', 'event_espresso'); ?>
													</a></li>
												<li><a href="#shortcodes">
													<?php _e('Shortcodes', 'event_espresso'); ?>
													</a></li>
												<li><a href="#details">
													<?php _e('Important Information', 'event_espresso'); ?>
													</a></li>
												<li><a href="#support">
													<?php _e('Contact Support', 'event_espresso'); ?>
													</a></li>
												<li><a href="#faq">
													<?php _e('Frequently Asked Questions', 'event_espresso'); ?>
													</a>
													<ul>
														<li><a href="#RegistrationPage">
															<?php _e('Registration Page Problems', 'event_espresso'); ?>
															</a></li>
														<li><a href="#paypal">
															<?php _e('Paypal IPN Problems', 'event_espresso'); ?>
															</a></li>
														<li><a href="#email">
															<?php _e('Email Problems', 'event_espresso'); ?>
															</a></li>
														<li><a href="#import">
															<?php _e('Event Import Problems', 'event_espresso'); ?>
															</a></li>
														<li><a href="#translations">
															<?php _e('Translations', 'event_espresso'); ?>
															</a></li>
														<li><a href="#IncompletePayments">
															<?php _e('Incomplete Payments', 'event_espresso'); ?>
															</a></li>
														<li><a href="#upgrading">
															<?php _e('Problems After Upgrading', 'event_espresso'); ?>
															</a></li>
													</ul>
												</li>
												<li><a href="#additonal">
													<?php _e('Additional Information', 'event_espresso'); ?>
													</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li><a name="install" id="install"></a>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Installation', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">
											<p>Download the <a href="http://eventespresso.com/wp-content/plugins/download-monitor/download.php?id=2">Installation Guide</a> as a PDF</p>
											<p>
												<?php _e('For the latest installation instructions please visit:', 'event_espresso'); ?>
												<a href="http://eventespresso.com/support/installation/" target="_blank">http://eventespresso.com/support/installation/</a></p>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Partners', 'event_espresso'); ?>
										<a name="partners" id="partners"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="partners">
												<dt> <a href="http://bigimprint.com/espresso/" target="_blank">Big Imprint Design</a></dt>
												<dd>We create affordable websites for small businesses and non-profits.</dd>
												<dt> <a href="http://eventespresso.com/contact/" target="_blank">
													<?php _e('Become a Partner', 'event_espresso'); ?>
													</a> </dt>
												<dd>Have experience developing websites around Event Espresso? Become a partner!</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Hire a Developer', 'event_espresso'); ?>
										<a name="hire_devs" id="hire_devs"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="hire_devs">
												<dt> <a href="http://jobs.eventespresso.com/" target="_blank">
													<?php _e('Event Espresso Job Board', 'event_espresso'); ?>
													</a> </dt>
												<dd>A dedicated job board that lists the opportunities to work with Event Espresso or our clients.</dd>
												<dt> <a href="http://wpcandy.com/pros" target="_blank">
													<?php _e('WP Candy Pros', 'event_espresso'); ?>
													</a> </dt>
												<dd>WordPress Professionals and theme developers.</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Favorite Theme Developers', 'event_espresso'); ?>
										<a name="developers" id="theme_devs"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="developers">
												<dt><a href="http://www.mojo-themes.com/" target="_blank">MOJO Themes</a></dt>
												<dd>It's simple really – MOJO themes is a marketplace for everyone to <strong><em>buy</em></strong> or <strong><em>sell</em></strong> themes and templates.</dd>
												<dt><a href="http://www.appthemes.com/cp/go.php?r=12413&i=l0" target="_blank">AppThemes</a></dt>
												<dd>AppThemes are built for businesses of all sizes and run on WordPress so  you don't have to worry about the headache of setting up a complex  server environment.</dd>
												<dt><a href="http://www.woothemes.com/amember/go.php?r=28039&amp;i=b16" target="_blank">WooThemes</a></dt>
												<dd>Top quality, cutting edge WordPress themes and superior customer support.</dd>
												<dt><a href="http://www.shareasale.com/r.cfm?B=258340&amp;U=471857&amp;M=27087" target="_blank">PageLines</a></dt>
												<dd>Build websites faster and better using drag and drop, layout, typography, design-control and more... </dd>
												<dt><a href="http://www.studiopress.com/" target="_blank">StudioPress</a></dt>
												<dd>When you buy a StudioPress theme, you are getting state of the art code,  smart design architecture as well as an array of beautiful frames for  your content.</dd>
												<dt><a href="http://www.elegantthemes.com/" target="_blank">ElegantThemes</a></dt>
												<dd>Each premium WordPress theme comes expertly coded in valid XHTML and  CSS, and all are made compatible with the latest version of WordPress.</dd>
												<dt><a href="http://allurethemes.com" target="_blank">AllureThemes</a></dt>
												<dd>We create beautiful, top quality WordPress themes for you at amazing prices with exceptional support.</dd>
												<dt><a href="http://museumthemes.com" target="_blank">Museum Themes</a></dt>
												<dd>Fine art WordPress themes.</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Recommended Plugins', 'event_espresso'); ?>
										<a name="plugins" id="plugins"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="plugins">
												<dt><a href="http://wordpress.org/extend/plugins/exclude-pages/" target="_blank">Exclude Pages from Navigation</a></dt>
												<dd> Provides a checkbox on the editing page which you can check to exclude  pages from the primary navigation. IMPORTANT NOTE: This will remove the  pages from any "consumer" side page listings, which may not be limited  to your page navigation listings.</dd>
												<dt><a href="http://wordpress.org/extend/plugins/post-types-order/" target="_blank">Post Types Order</a></dt>
												<dd> Order Post Types Objects using a Drag and Drop Sortable javascript capability
													</dt>
												<dt><a href="https://www.e-junkie.com/ecom/gb.php?cl=54585&amp;c=ib&amp;aff=113214" target="_blank">Gravity Forms</a>
													</dd>
												<dd> Build Complex, Powerful Contact Forms in Just Minutes. No Programming Knowledge Required! Yeah, It's Really That Easy. </dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Highly Recommended Themes', 'event_espresso'); ?>
										<a name="themes" id="themes"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="themes">
												<dt><a href="http://www.shareasale.com/r.cfm?B=258340&amp;U=471857&amp;M=27087" target="_blank">PlatformPro</a> by Pagelines</dt>
												<dt><a href="http://www.woothemes.com/amember/go.php?r=28039&amp;i=b16" target="_blank">Diarise</a> by WooThemes</dt>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Other Resources', 'event_espresso'); ?>
										<a name="resources" id="resources"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="resources">
												<dt><a href="http://wordpress.stackexchange.com/" target="_blank">WordPress Answers</a></dt>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox"><a name="shortcodes" id="shortcodes"></a>
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Shortcodes', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">
											<p>
												<?php _e('For more information, please visit:', 'event_espresso'); ?>
												<br />
												<a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/" target="_blank">http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/</a></p>
											<hr />
											<div class="shortcode-box">
												<h4>
													<?php _e('Single Events', 'event_espresso'); ?>
												</h4>
												<p>
													<?php _e('Displays a single event on a page or post', 'event_espresso'); ?>
												</p>
												<p ><span class="highlight">[SINGLEEVENT single_event_id="your_event_identifier"]</span></p>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Add Events to Cart (premium version only, requires Multiple Event Registration addon)', 'event_espresso'); ?>
												</h4>
												<p>
													<?php _e('Displays an "Add Event to Cart" link that can be added to the event details, page, or post. Requires the <a href="http://eventespresso.com/download/plugins-and-addons/multiple-event-registration/" target="_blank">Multiple Event Registration addon</a>.', 'event_espresso'); ?>
												</p>
												<p><span class="highlight">[ESPRESSO_CART_LINK]</span></p>
												<h5>
													<?php _e('Additonal Examples:', 'event_espresso'); ?>
												</h5>
												<p><span class="highlight">[ESPRESSO_CART_LINK direct_to_cart=1 moving_to_cart="Redirecting to cart..."]</span><br />
													<?php _e('(Used to redirect to the shopping cart page. Must be added to an event description.)', 'event_espresso'); ?>
												</p>
												<p><span class="highlight">[ESPRESSO_CART_LINK event_id="add_event_id_here" direct_to_cart=1 moving_to_cart="Redirecting to cart..."]</span><br />
													<?php _e('(Same as above, but uses the event_id paramter and can be added to a page or post.)', 'event_espresso'); ?>
												</p>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Event List', 'event_espresso'); ?>
												</h4>
												<p>
													<?php _e('Returns a list of events', 'event_espresso'); ?>
												</p>
												<ul>
													<li><span class="highlight">[EVENT_LIST]</span></li>
													<li><span class="highlight">[EVENT_LIST limit=1]</span></li>
													<li><span class="highlight">[EVENT_LIST show_expired=true]</span></li>
													<li><span class="highlight">[EVENT_LIST show_deleted=true]</span></li>
													<li><span class="highlight">[EVENT_LIST show_secondary=true]</span></li>
													<li><span class="highlight">[EVENT_LIST show_recurrence=true]</span></li>
													<li><span class="highlight">[EVENT_LIST category_identifier=your_category_identifier]</span></li>
													<li><span class="highlight">[EVENT_LIST order_by=date(start_date),id]</span></li>
												</ul>
												<h5>
													<?php _e('Order by parameters:', 'event_espresso'); ?>
												</h5>
												<p>
													<?php _e('(comma separated)', 'event_espresso'); ?>
												</p>
												<p>id<br />
													date(start_date)<br />
													date(end_date)<br />
													event_name<br />
													date(registration_start)<br />
													date(registration_end)<br />
													city<br />
													state<br />
													category_id<br />
													venue_title </p>
												<p class="yellow_alert"><strong>
													<?php _e('Attention:', 'event_espresso'); ?>
													</strong><br />
													<?php _e('The [EVENT_LIST] shortcode should not be used as a replacement for the [ESPRESSO_EVENTS] shortcode. Replacing the [ESPRESSO_EVENTS] shortcode will break your registration pages.', 'event_espresso'); ?>
												</p>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Attendee Listings', 'event_espresso'); ?>
												</h4>
												<ul>
													<li><span class="highlight">[LISTATTENDEES]</span></li>
													<li><span class="highlight">[LISTATTENDEES limit="30"]</span> //Number of events to show on the page</li>
													<li><span class="highlight">[LISTATTENDEES show_expired="true"]</span> //Show expired events</li>
													<li><span class="highlight">[LISTATTENDEES show_deleted="true"]</span> //Show deleted events</li>
													<li><span class="highlight">[LISTATTENDEES show_secondary="true"]</span> //Show secondary/backup events</li>
													<li><span class="highlight">[LISTATTENDEES show_gravatar="true"]</span> //Show a Gravatar of the attendee</li>
													<li><span class="highlight">[LISTATTENDEES show_recurrence="false"]</span> //Exclude recurring events</li>
													<li><span class="highlight">[LISTATTENDEES event_identifier="your_event_identifier"]</span> //Show a single event using the event identifier</li>
													<li><span class="highlight">[LISTATTENDEES category_identifier="your_category_identifier"]</span> //Show a group of events in a category using the category identifier</li>
												</ul>
												<p>
													<?php _e('For more information about the attendee listing shortcodes and customizations. Please view the <a href="http://eventespresso.com/forums/2010/10/attendee-listing-shortcodes/">Attendee Listing Shortcodes</a> page.', 'event_espresso'); ?>
												</p>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Venue Shortcodes (premium version only)', 'event_espresso'); ?>
												</h4>
												<h5>
													<?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?>
												</h5>
												<a name="venue_shortcode" id="venue_shortcode"></a>
												<dl>
													<dt>
														<?php _e('Event Description Example:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('If you want to display venue details within an event, the venue id is not needed. Just add <span class="highlight">[ESPRESSO_VENUE]</span> to your event description.', 'event_espresso'); ?>
													</dd>
													<dt>
														<?php _e('Example with Optional Parameters:', 'event_espresso'); ?>
													</dt>
													<dd><span class="highlight">[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</span></dd>
													<dt>
														<?php _e('Page/Post Example:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('You can display the details of any venue to a page, post or event by adding the id of the venue to the shortcode.', 'event_espresso'); ?>
														<br />
														<span class="highlight">[ESPRESSO_VENUE id="3"]</span></dd>
													<dt>
														<?php _e('Page/Post Example #2:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('If you want to display all available venues on a page, post, or event:', 'event_espresso'); ?>
														<br />
														<span class="highlight">[ESPRESSO_VENUE]</span> </dd>
													<dd>
														<?php _e('Add the event id to the shortcode to display all the venues for an event:', 'event_espresso'); ?>
														<br />
														<span class="highlight">[ESPRESSO_VENUE event_id="8"]</span></dd>
												</dl>
												<h5>
													<?php _e('Available parameters:', 'event_espresso'); ?>
												</h5>
												<ul>
													<li>outside_wrapper_class = class name for the outside wrapper. Eg. event_venue</li>
													<li>outside_wrapper = outside wrapper element. Eg. div</li>
													<li>inside_wrapper_class = class name for the outside wrapper. Eg. venue_details</li>
													<li>inside_wrapper = inside wrapper element. Eg. p</li>
													<li>title_class = class name for the title Eg. venue_name</li>
													<li>title_wrapper = title wrapper element. Eg. h3</li>
													<li>show_title = show the venue name? (true|false default true)</li>
													<li>image_class = class name for the image. Eg. venue_image</li>
													<li>show_image = show the image? (true|false default true)</li>
													<li>show_description = show the description? (true|false default true)</li>
													<li>show_address = show the address of the venue? (true|false default true)</li>
													<li>show_additional_details = show the additional details? (true|false default true)</li>
													<li>show_google_map_link = show the Google map link? (true|false default true)</li>
													<li>map_link_text = text to display in the link. Eg. Map and Directions</li>
												</ul>
												<dl>
													<dt>
														<?php _e('Show All Events in a Venue:', 'event_espresso'); ?>
													</dt>
													<dd> <span class="highlight">[ESPRESSO_VENUE_EVENTS id="21"]</span></dd>
													<dd> <span class="highlight">[ESPRESSO_VENUE_EVENTS id="21" limit="5"]</span></dd>
												</dl>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Staff Shortcodes (premium version only)', 'event_espresso'); ?>
												</h4>
												<h5>
													<?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?>
												</h5>
												<a name="staff_shortcode" id="staff_shortcode"></a>
												<dl>
													<dt>
														<?php _e('Event Description Example:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('If you want to display a list of staff members within an event, the staff id is not needed. Just add <span class="highlight">[ESPRESSO_STAFF]</span> to your event description.', 'event_espresso'); ?>
													</dd>
													<dt>
														<?php _e('Example with Optional Parameters:', 'event_espresso'); ?>
													</dt>
													<dd><span class="highlight">[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</span></dd>
													<dt>
														<?php _e('Page/Post Example:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('You can display the details of any staff member to a page, post or event by adding the id of the staff member to the shortcode.', 'event_espresso'); ?>
														<span class="highlight">[ESPRESSO_STAFF id="3"]</span></dd>
													<dt>
														<?php _e('Page/Post Example #2:', 'event_espresso'); ?>
													</dt>
													<dd>
														<?php _e('If you want to display a list of staff members assigned to an event, to a page, post or event add the event id to the  <span class="highlight">[ESPRESSO_STAFF]</span> shortcode.', 'event_espresso'); ?>
														<br />
														<span class="highlight">[ESPRESSO_STAFF event_id="8"]</span></dd>
												</dl>
												<h5>
													<?php _e('Available parameters:', 'event_espresso'); ?>
												</h5>
												<ul>
													<li>outside_wrapper_class = class name for the outside wrapper. Eg. event_staff</li>
													<li>outside_wrapper = outside wrapper element. Eg. div</li>
													<li>inside_wrapper_class = class name for the outside wrapper. Eg. event_person</li>
													<li>inside_wrapper = inside wrapper element. Eg. p</li>
													<li>name_class = class name for the persons name</li>
													<li>name_wrapper = name wrapper element. Eg. strong</li>
													<li>image_class = class name for the image. Eg. venue_image</li>
													<li>show_image = show the persons image? (true|false default true)</li>
													<li>show_staff_titles = show the role/title? (true|false default true)</li>
													<li>show_staff_details = show the details? (true|false default true)</li>
													<li>show_image = show the image? (true|false default true)</li>
													<li>show_description = show the description? (true|false default true)</li>
												</ul>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Calendar Shortcodes (premium version only)', 'event_espresso'); ?>
												</h4>
												<ul>
													<li><span class="highlight">[ESPRESSO_CALENDAR]</span></li>
													<li><span class="highlight">[ESPRESSO_CALENDAR show_expired="true"]</span></li>
													<li><span class="highlight">[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]</span></li>
													<li><span class="highlight">[ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]</span></li>
													<li><span class="highlight">[ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay)</span></li>
												</ul>
											</div>
											<div class="shortcode-box">
												<h4>
													<?php _e('Category Shortcodes', 'event_espresso'); ?>
												</h4>
												<p><span class="highlight">[EVENT_ESPRESSO_CATEGORY event_category_id="your_category_indentifier"]</span></p>
											</div>
										</div>
										<!-- / .padding --> 
									</div>
									<!-- / .inside --> 
								</div>
								<!-- / .postbox --> 
							</div>
							<!-- / .metabox-holder --> 
						</li>
						<li><a name="details" id="details"></a>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Important Information', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">
											<?php 
						global $wpdb, $wp_version;
						$wp_req_version = '3.1';
						$php_req_version = '5.2';
						$mysql_req_version = '5.0';
						$is_php_valid = version_compare(phpversion(), $php_req_version, '>');
						$is_mysql_valid = version_compare($wpdb->db_version(), $mysql_req_version, '>');
														
						if ( !version_compare( $wp_version, $wp_req_version, '>=' ) ) {
							echo '<p class="red_alert">'.__('This version of Event Espresso requires WordPress version', 'event_espresso').' '. $wp_req_version.'+. '.__('Please upgrade to the latest version of WordPress.', 'event_espresso').'</p>';
						}
						if(!$is_php_valid){
							echo '<p class="red_alert">'.__('Your version of PHP is out of date, please update to the latest version of PHP. <br>Required version of PHP:', 'event_espresso'). ' ' .$php_req_version.'</p>';
						}
						if(!$is_mysql_valid){
							echo '<p class="red_alert">'.__('Your version of MySQL is out of date, please update to the latest version of MySQL. <br>Required version of MySQL:', 'event_espresso'). ' ' .$mysql_req_version.'</p>';
						}
					?>
											<div class="localhost-information">
												<dl>
													<dt>
														<?php _e('WordPress Version:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo $wp_version; ?></dd>
													<dt>
														<?php _e('PHP Version:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo phpversion(); ?></dd>
													<dt>
														<?php _e('MySQL Version:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo $wpdb->db_version(); ?></dd>
													<dt>Event Espresso Version:</dt>
													<dd><?php echo EVENT_ESPRESSO_VERSION ?></dd>
													<dt>
														<?php _e('WordPress Address (URL):', 'event_espresso'); ?>
													</dt>
													<dd><?php echo site_url(); ?></dd>
													<dt>
														<?php _e('WordPress Content Directory:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo WP_CONTENT_DIR; ?></dd>
													<dt>
														<?php _e('Site address (URL):', 'event_espresso'); ?>
													</dt>
													<dd><?php echo home_url(); ?></dd>
													<dt>
														<?php _e('Event Espresso Plugin URL:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_PLUGINFULLURL ?></dd>
													<dt>
														<?php _e('Event Espresso Plugin Path:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_PLUGINFULLPATH; ?></dd>
													<dt>
														<?php _e('Event Espresso Upload URL:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_UPLOAD_URL; ?></dd>
													<dt>
														<?php _e('Event Espresso Upload Path:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_UPLOAD_DIR; ?></dd>
													<dt>
														<?php _e('Event Espresso Template Path:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_TEMPLATE_DIR; ?>
														<p><span class="red_text">
															<?php _e('If you are having problems with regsitrations, display, etc. You should backup and remove these files immediately.', 'event_espresso'); ?>
															</span></p>
														<?php echo espresso_template_files_exist(EVENT_ESPRESSO_TEMPLATE_DIR);?></dd>
													<dt>
														<?php _e('Event Espresso Gateway Path:', 'event_espresso'); ?>
													</dt>
													<dd><?php echo EVENT_ESPRESSO_GATEWAY_DIR; ?>
														<p><span class="red_text">
															<?php _e('If you are having problems with payments. You should backup and remove these files immediately.', 'event_espresso'); ?>
															</span></p>
														<?php echo espresso_template_files_exist(EVENT_ESPRESSO_GATEWAY_DIR);?></dd>
												</dl>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li><a name="support" id="support"></a>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Contact Support', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">
											<h4>Before Contacting Support</h4>
											<p>Please understand that our primary goal is to offer Event Espresso as a very low cost solution compared to building your own system or using a 3rd party service to handle your registrations.</p>
											<p> As with most open source programs (and closed licensed programs), chances are you will find the occasional bug, glitch, white screen of death, and/or general failure. Please don't panic!</p>
											<p>If your problems are not urgent, please post in our <a href="http://eventespresso.com/forums/" target="_blank">support forums</a>. If you need immediate help. Please purchase a support token below, at which time you can schedule time with a dedicated support tech or core developer.</p>
											<p class="attention-block"><strong class="red_text">
												<?php _e('Attention:', 'event_espresso'); ?>
												</strong><br />
												<?php _e('When requesting support. Please copy and paste the details displayed of the <a href="admin.php?page=support#details">Important Information</a> section above. This will help us determine potential problems with your server, WordPress installation, and/or the Event Espresso plugin. Please also include a list (or screenshot) of all <a href="plugins.php?plugin_status=active">active plugins</a>.', 'event_espresso'); ?>
											</p>
											<h4>
												<?php _e('Premium Support Options', 'event_espresso'); ?>
											</h4>
											<p>
												<?php _e('We offer premium support to customers who desire or require a level of support beyond the complimentary support included with all Event Espresso products.', 'event_espresso'); ?>
											</p>
											<h5>
												<?php _e('Support Tokens', 'event_espresso'); ?>
											</h5>
											<p>
												<?php _e('A support token can be used to get priority support for a single  incident. It can be used to schedule support via phone or IM for a  single incident (up to 30 minutes), or to receive priority e-mail  support. A support token can be used for &ldquo;how to&rdquo; questions, technical  issues, &ldquo;best practice&rdquo; questions or for custom development consulting. A  support token consists of the PayPal Transaction ID you received from  PayPal at the time of your purchase.', 'event_espresso'); ?>
											</p>
											<p>
												<?php _e('<strong>You can purchase support tokens</strong> on the <a href="http://eventespresso.com/support/premium-support-options/">Premium Support page</a>. Tokens can be purchased one at a time, or in blocks of three at a discount.', 'event_espresso'); ?>
											</p>
											<p>Support tokens can be used to schedule live support (phone or IM) or for priority e-mail support. See <a href="http://eventespresso.com/support/">details on premium support</a>.</p>
											<div class="support-tokens">
												<h6>1 Premium Support Token</h6>
												<p>Single incident, up to 30 minutes of live support or priority e-mail support.</p>
												<p class="support-prices"><span class="price">Price: $65.00 </span><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=1TOKEN&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p>
											</div>
											<div class="support-tokens">
												<h6>3 Premium Support Tokens</h6>
												<p>Up to 90 minutes of live support or priority e-mail support.</p>
												<p class="support-prices"><span class="price">Price: $150.00 </span><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=3TOKENS&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p>
											</div>
											<h5>
												<?php _e('Installation &amp; Consulting', 'event_espreso'); ?>
											</h5>
											<div class="install-options">
												<h6>Basic Install</h6>
												<p>Includes plugin installation and setting up basic pages for the plugin.</p>
												<p class="support-prices"><span class="price">Price: $35.00 </span><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=BASICINSTALL&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p>
											</div>
											<div class="install-options">
												<h6>Basic Install with Configuration</h6>
												<p>Includes configuration and testing Payment Gateway's .</p>
												<p class="support-prices"><span class="price">Price: $65.00 </span><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=INSTALLCONFIG&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p>
											</div>
											<div class="install-options">
												<h6>Consulting (1 hour)</h6>
												<p>Developer support and implementation consulting for the Advanced Events Registration plugin for WordPress.</p>
												<p class="support-prices"><span class="price">Price: $135.00 </span><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;i=1HRCONSULT&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_add_to_cart.gif" alt="Add to Cart" border="0"></a></p>
											</div>
											<h5>* Requirements for installation service:</h5>
											<ul>
												<li> The server must be accessible over the internet.</li>
												<li> The server must meet the server requirements (for Advanced Events Registration).</li>
												<li> You must be able to provide a FTP/SFTP username and password. A MySQL database name, username and password is needed for a Basic Install. A WordPress admin user name, password, and login URL.</li>
											</ul>
											<p><a class="ec_ejc_thkbx" onclick="javascript:return EJEJC_lc(this);" href="https://www.e-junkie.com/ecom/gb.php?c=cart&amp;cl=113214&amp;ejc=2" target="ej_ejc"><img src="http://www.e-junkie.com/ej/ej_view_cart.gif" alt="View Cart" border="0"></a><br>
												<script type="text/javascript">//
							function EJEJC_lc(th) { return false; }
							// ]]&gt;
						</script><br>
												<script src="http://www.e-junkie.com/ecom/box.js" type="text/javascript"></script></p>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Frequently Asked Questions', 'event_espresso'); ?>
										<a name="faq" id="faq"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="faqs">
												<dt>
													<?php _e('Registration page just refreshes?', 'event_espresso'); ?>
													<a name="RegistrationPage" id="RegistrationPage"></a> </dt>
												<dd>
													<?php _e('Usually its because you need to point the &quot;Main registration page:&quot; (in the Organization Settings page) to whatever page you have the shortcode', 'event_espresso'); ?>
													[ESPRESSO_EVENTS]
													<?php _e('on.', 'event_espresso'); ?>
												</dd>
												<dt>
													<?php _e('Paypal IPN Problem?', 'event_espresso'); ?>
													<a name="paypal" id="paypal"></a> </dt>
												<dd>
													<?php _e('Four things to check with PayPal when payments notifications are not being sent to Event Espresso.', 'event_espresso'); ?>
													</p>
													<ol>
														<li>
															<?php _e('Make sure you have a standard or a business PayPal account, personal accounts don\'t work.', 'event_espresso'); ?>
														</li>
														<li>
															<?php _e('Turn on your IPN.', 'event_espresso'); ?>
														</li>
														<li>
															<?php _e('Make sure your PayPal account is verified.', 'event_espresso'); ?>
														</li>
														<li>
															<?php _e('Make sure your Event Espresso pages are not protected or private.', 'event_espresso'); ?>
														</li>
													</ol>
													<p class="more-info">
														<?php _e('More information can be found here:', 'event_espresso'); ?>
														<br />
														<a href="http://eventespresso.com/forums/?submit.x=0&submit.y=0&s=ipn" target="_blank"> http://eventespresso.com/forums/?submit.x=0&amp;submit.y=0&amp;s=ipn</a></p>
												</dd>
												<dt>
													<?php _e('Why are emails are not being sent when somone registers?', 'event_espresso'); ?>
													<a name="email" id="email"></a> </dt>
												<dd>
													<?php _e('Check your email settings on the', 'event_espresso'); ?>
													<a href="admin.php?page=event_espresso#email-settings">Event Espresso > General Settings > Email Settings</a> page<br />
													<img class="email-settings-img" src="http://ee-updates.s3.amazonaws.com/images/email-settings.png" width="472" height="120" />
													</p>
													<p>
														<?php _e('If you\'re using WP SMTP with Gmail, also check your spam box to make sure Gmail isn\'t filtering the confirmation emails as spam.', 'event_espresso'); ?>
													</p>
													<p><strong><?php _e('Send a Test Email', 'event_espresso'); ?></strong></p>
													<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>#email">
														<table class="form-table">
															<tbody>
																<tr>
																	<th><label for="optional_email">
																			<?php _e('Email Address', 'event_espresso'); ?>
																		</label></th>
																	<td><input class="regular-text" type="text" name="optional_email" id="optional_email" />
																		<br />
																		<span class="description">
																		<?php _e('Optional', 'event_espresso'); ?>
																	</span></td>
																</tr>
																<tr>
																	<th><label for="optional_message">
																			<?php _e('Message', 'event_espresso'); ?>
																		</label></th>
																	<td><input class="regular-text" type="text" name="optional_message" id="optional_message" />
																		<br />
																		<span class="description">
																		<?php _e('Optional', 'event_espresso'); ?>
																	</span></td>
																</tr>
															</tbody>
														</table>
														<input name="action" type="hidden" value="test_email_function" />
														<input name="Submit" type="submit" value="<?php _e('Send Test', 'event_espresso'); ?>" />
													</form>
													<p>&nbsp;</p>
												</dd>
												<dt>
													<?php _e('My events are not importing correctly when I use the CSV upload tool.','event_espresso'); ?>
													<a name="import" id="import"></a> </dt>
												<dd>
													<p>
														<?php _e('Check your CSV for any apotrophes in the title or description. Using Excel (or someother spreadsheet application) find and replace all apostrophes with <tt>\&amp;#039;</tt>.  This is the HTML entity for \' and is how the titles are entered into the database.  For more information, see <a href="http://eventespresso.com/forums/2011/08/import-csv-malfunction" target="_blank">this forum post</a>.','event_espresso'); ?>
													</p>
												</dd>
												<dt>
													<?php _e('Translating Event Espresso', 'event_espresso'); ?>
													<a name="translations" id="translations"></a> </dt>
												<dd>
													<ol>
														<li>Make sure your site is <a href="http://eventespresso.com/forums/2011/09/translating-event-espresso/" target="_blank">ready for translation</a></li>
														<li>Install <a href="http://www.poedit.net/download.php" target="_blank">POEDIT</a>.</li>
														<li>Download and  Unzip all Event Espresso on your Hard drive (For this example let&rsquo;s say C:\Myfolder\)</li>
														<li>Open POEDIT click-&gt; File -&gt; Open and select the  C:\Myfolder\event-espresso.3.1.13.P\languages\event_espresso-xx_XX.po  file (xx_XX being the language you want.)</li>
														<li>Now you need to update all the text that is configured for  translation in the Event Espresso folders.  To do so, in POEDIT click  –&gt;Catalog –&gt; Update from sources .   This should add more that 600  new words to the original file.</li>
														<li>To translate simply put your own description at the bottom of the screen.<br />
															TIP: turn on the the display quotes. click –&gt;View –&gt;Display  Quotes	This should help you to add the proper spaces &ldquo;blanks&rdquo;.<br />
															Other TIP: to know the source from which .php program comes the  text, select the line you want to translate, do Right Click and POEDIT  will give you the references of the source.</li>
														<li>Once you have done the translation click Save</li>
														<li>With FTP (FireFTP in Firefox) locate the EE\languages folder on your  server (It should be the same path as what you had Unzipped previously)</li>
														<li>Transfer both the xx_XX.po and xx_XX.mo files on the server</li>
														<li>Send your completed translation to support@eventespresso.com for inclusion in future versions.</li>
													</ol>
													<p>Read more: <a href="http://eventespresso.com/forums/2011/09/is-there-a-how-to-translate-step-by-step-somewhere/#ixzz1bopzZJjC">Is there a &ldquo;how to translate – step by step&rdquo; somewhere?</a></p>
												</dd>
												<dt>
													<?php _e('Problems with Incomplete Payments', 'event_espresso'); ?>
													<a name="IncompletePayments" id="IncompletePayments"></a></dt>
												<dd>
													<p>If you are experiencing problems with incomplete payments, most often  it has to do with problems reaching your Transactions page  ([ESPRESSO_TXN_PAGE]) from the payment gateway.  There are a variety of  issues that can cause this on both ends (the gateway and your  site/hosting) which makes it very difficult to diagnose and resolve.</p>
													<p>However, we have found through testing and working with many users  with this issue that one thing that can resolve the problem for most  situations when this is occurring is to use a stripped-down page  template for your Transactions page.  This page template gets added to  your theme and selected as the page template for that page in the  Templates dropdown.  Because we have had a very positive success rate  with the people we have given this template to, we are providing it here  as a free download.  We are also trying to determine the best way to  include it into the core plugin as well.</p>
													<p>You can download our Transactions page template in the link below.   Included in the zip file is a quick readme with installation  instructions.  It is recommended that you try this template after  verifying that IPN is turned on, your account is verified, you have a  standard or business account (if using PayPal) and — most importantly —  that your Transactions page is visible to the internet.  If you have  confirmed these four things and you are still having issues with  incomplete payments, try the download below.</p>
													<p><a href="http://eventespresso.s3.amazonaws.com/2011/09/txnpage.zip">Download Event Espresso txnpage template</a></p>
													<p>Read more: <a href="http://eventespresso.com/forums/2011/09/problems-with-incomplete-payments-download/#ixzz1boxHuqI8">Problems with Incomplete Payments — Download</a></p>
												</dd>
												<dt>
													<?php _e('Problems after upgrading?', 'event_espresso'); ?>
													<a name="upgrading" id="upgrading"></a> </dt>
												<dd>
													<?php _e('If you have just upgraded  from  the free version of this plugin, your event dates, times, and categories may be out of order, missing, showing an error, or are wrong.  Pressing the &quot;Run Upgrade Script&quot; button below should fix all of these problems.', 'event_espresso'); ?>
													<form action="<?php echo $_SERVER["REQUEST_URI"] ?>" method="post" name="form" id="form">
														<p>
															<input type="hidden" name="action" value="update_event_dates" />
															<input class="button-primary" type="submit" name="update_event_dates_button" value="<?php _e('Run Upgrade Script', 'event_espresso'); ?>" id="update_event_dates"/>
														</p>
													</form>
													<p>
														<?php _e('If you have clicked the button above and event dates that should be expired, are showing an error or seem to be out of order. Go into the &quot;<a href="admin.php?page=events">Event Management</a>&quot; page and click the &quot;Edit this Event&quot; button then click the &quot;Update Event&quot; button on each event that is displaying the wrong date(s). This process should fix the problem. If it doesn\'t then send a support request using the help and support button above.', 'event_espresso'); ?>
													</p>
													<?php
						if (event_espresso_verify_attendee_data() == true) {
											?>
													<a name="attendee_data" id="attendee_data"></a>
													<p class="red_text"><strong>
														<?php _e('Attendee information is outdated', 'event_espresso'); ?>
														</strong></p>
													<p>
														<?php _e('Due to recent changes in the way attendee information is handled, attendee data may appear to be missing from some events. In order to reassign attendees to events, please run the attendee update script by pressing the button below.', 'event_espresso'); ?>
													</p>
													<form action="<?php echo $_SERVER["REQUEST_URI"] ?>" method="post" name="form" id="form">
														<p>
															<input type="hidden" name="action" value="event_espresso_update_attendee_data" />
															<input class="button-primary" type="submit" name="event_espresso_update_attendee_data_button" value="<?php _e('Run Attendee Update Script', 'event_espresso'); ?>" id="event_espresso_update_attendee_data_button"/>
														</p>
													</form>
													<?php
						}
						?>
												</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br />
									</div>
									<h3 class="hndle">
										<?php _e('Additional Information', 'event_espresso'); ?>
										<a name="additonal" id="additonal"></a></h3>
									<div class="inside">
										<div class="padding">
											<dl id="additonal">
												<dt><a href="http://eventespresso.com/forums/category/premium-plugin-support/community-user-guide-premium-plugin-support/">User Guide Forum</a> </dt>
												<dt><a href="http://eventespresso.com/forums/category/premium-plugin-support/tutorials/template-customization/">Tutorials</a> </dt>
												<dd>(calendar, css override, payment gateway system, etc.)</dd>
												<dt><a href="http://eventespresso.com/forums/premium-plugin-support/tutorials/template-customization/">Template Customization</a></dt>
												<dt><a href="http://eventespresso.com/forums/2010/12/my-first-event/">Adding Your First Event</a> (video)</dt>
												<dt><a href="http://eventespresso.com/forums/2010/12/video-initial-setp-general-settings-pages/">General Setup &amp; Using Shortcodes</a> (video)</dt>
												<dt><a href="http://eventespresso.com/forums/2010/12/customizing-the-registration-form/%5C">Customizing the Registration Form</a> (video)</dt>
												<dt><a href="http://eventespresso.com/forums/2010/07/account-optional-setting/">Optional PayPal Account Settings</a> (video)</dt>
												<dt><a href="http://eventespresso.com/forums/2011/01/templates-for-the-recurring-events-manager/">Recurring Events Manager</a> (video)</dt>
												<dt><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/">Variables and Shortcodes</a></dt>
												<dt><a href="http://eventespresso.com/forums/category/general/compatiblity-issues/">Compatibility Issues</a></dt>
												<dt><a href="http://eventespresso.com/forums/category/premium-plugin-support/bug-reports/">Bug Submission Form</a></dt>
												<dt><a href="http://eventespresso.com/forums/category/premium-plugin-support/news-and-updates/">Change log</a></dt>
												<dt><a href="http://eventespresso.com/update-request-form/">Update Request Form</a></dt>
												<dd>Please use this form if a newer version of Event Espresso or an Addon  has been released and you are unable to download it from the specified  page or the email notification.</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</li>
						<?php /*?>
			 
			 <li>
			  <div class="metabox-holder">
				<div class="postbox">
				  <div title="Click to toggle" class="handlediv"><br />
				  </div>
				  <h3 class="hndle">
					<?php _e('Additional Information', 'event_espresso'); ?>
					<a name="additonal" id="additonal"></a></h3>
				  <div class="inside">
					<div class="padding">
					  <dl id="additonal">
						<dt>
						  <?php _e('Registration page just refreshes?', 'event_espresso'); ?>
						</dt>
						<dd>
						  <?php _e('Usually its because you need to point the &quot;Main registration page:&quot; (in the Organization Settings page) to whatever page you have the shortcode', 'event_espresso'); ?>
						  [ESPRESSO_EVENTS]
						  <?php _e('on', 'event_espresso'); ?>
						  . </dd>
						  </dl>
					 </div>
				  </div>
				</div>
			  </div>
			</li>
			
		   <?php */?>
					</ul>
				</div>
				<!-- / .meta-box-sortables --> 
			</div>
			<!-- / .post-body-content : left sidebar main content --> 
		</div>
		<!-- / .post-body --> 
		
	</div>
	<!-- / #poststuff --> 
</div>
<!-- / #wrap --> 
<script type="text/javascript" charset="utf-8">
							//<![CDATA[
							jQuery(document).ready(function() {
								postboxes.add_postbox_toggles('support');

							}); 
							//]]>
							</script>
<?php
}

function update_event_data() {
	global $wpdb;
	$wpdb->show_errors();
	$event_dates = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE start_date = '' OR start_date LIKE '%--%' OR end_date = '' OR end_date LIKE '%--%'");
	foreach ($event_dates as $event_date) {
		$event_id = $event_date->id;
		$start_month = $event_date->start_month;
		$start_day = $event_date->start_day;
		$start_year = $event_date->start_year;
		$end_month = $event_date->end_month;
		$end_day = $event_date->end_day;
		$end_year = $event_date->end_year;

		if ($start_month == "Jan" || $start_month == "January") {
			$month_no = '01';
		}
		if ($start_month == "Feb" || $start_month == "February") {
			$month_no = '02';
		}
		if ($start_month == "Mar" || $start_month == "March") {
			$month_no = '03';
		}
		if ($start_month == "Apr" || $start_month == "April") {
			$month_no = '04';
		}
		if ($start_month == "May" || $start_month == "May") {
			$month_no = '05';
		}
		if ($start_month == "Jun" || $start_month == "June") {
			$month_no = '06';
		}
		if ($start_month == "Jul" || $start_month == "July") {
			$month_no = '07';
		}
		if ($start_month == "Aug" || $start_month == "August") {
			$month_no = '08';
		}
		if ($start_month == "Sep" || $start_month == "September") {
			$month_no = '09';
		}
		if ($start_month == "Oct" || $start_month == "October") {
			$month_no = '10';
		}
		if ($start_month == "Nov" || $start_month == "November") {
			$month_no = '11';
		}
		if ($start_month == "Dec" || $start_month == "December") {
			$month_no = '12';
		}
		$start_date = $start_year . "-" . $month_no . "-" . $start_day;

		if ($end_month == "Jan" || $end_month == "January") {
			$end_month_no = '01';
		}
		if ($end_month == "Feb" || $end_month == "February") {
			$end_month_no = '02';
		}
		if ($end_month == "Mar" || $end_month == "March") {
			$end_month_no = '03';
		}
		if ($end_month == "Apr" || $end_month == "April") {
			$end_month_no = '04';
		}
		if ($end_month == "May" || $end_month == "May") {
			$end_month_no = '05';
		}
		if ($end_month == "Jun" || $end_month == "June") {
			$end_month_no = '06';
		}
		if ($end_month == "Jul" || $end_month == "July") {
			$end_month_no = '07';
		}
		if ($end_month == "Aug" || $end_month == "August") {
			$end_month_no = '08';
		}
		if ($end_month == "Sep" || $end_month == "September") {
			$end_month_no = '09';
		}
		if ($end_month == "Oct" || $end_month == "October") {
			$end_month_no = '10';
		}
		if ($end_month == "Nov" || $end_month == "November") {
			$end_month_no = '11';
		}
		if ($end_month == "Dec" || $end_month == "December") {
			$end_month_no = '12';
		}
		$end_date = $end_year . "-" . $end_month_no . "-" . $end_day;

		$sql_dates = "UPDATE " . EVENTS_DETAIL_TABLE . " SET start_date='" . $start_date . "', end_date='" . $end_date . "' WHERE id = '" . $event_id . "'";
		if (!$wpdb->query($sql_dates)) {
			$error = true;
		}
	}
	//Change fields that have 'yes' and 'no' values to 'Y' and 'N' values
	$events_Y = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE is_active = 'yes' OR is_active = 'Yes'");
	foreach ($events_Y as $event_Y) {
		$event_id = $event_Y->id;
		$is_active = "Y";
		$update_events_Y = "UPDATE " . EVENTS_DETAIL_TABLE . " SET is_active = '" . $is_active . "' WHERE id = '" . $event_id . "'";
		if (!$wpdb->query($update_events_Y)) {
			$error = true;
		}
	}

	$events_N = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE is_active = 'no' OR is_active = 'No'");
	foreach ($events_N as $event_N) {
		$event_id = $event_N->id;
		$is_active = "N";
		$update_events_N = "UPDATE " . EVENTS_DETAIL_TABLE . " SET is_active = '" . $is_active . "' WHERE id = '" . $event_id . "'";
		if (!$wpdb->query($update_events_N)) {
			$error = true;
		}
	}
	//End change fields that have 'yes' and 'no' values to 'Y' and 'N' values
	//This section copies the current prices, discounts, and event times from events and places them in their respective tables.
	$wpdb->get_results("SELECT id FROM " . EVENTS_DISCOUNT_CODES_TABLE);
	$disc_codes_num_rows = $wpdb->num_rows;

	$wpdb->get_results("SELECT id FROM " . EVENTS_START_END_TABLE);
	$times_num_rows = $wpdb->num_rows;

	$wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE);
	$prices_num_rows = $wpdb->num_rows;

	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE);
	foreach ($events as $event) {
		$event_id = $event->id;
		$end_time = $event->end_time;
		$start_time = $event->start_time;
		$coupon_code = $event->coupon_code;
		$coupon_code_price = $event->coupon_code_price;
		$use_percentage = $event->use_percentage;
		$event_cost = $event->event_cost;
		if ($times_num_rows == 0) {
			$sql_times = "INSERT INTO " . EVENTS_START_END_TABLE . " (event_id, start_time, end_time) VALUES ('" . $event_id . "', '" . $start_time . "', '" . $end_time . "')";
			//echo "$sql_times <br>";
			if (!$wpdb->query($sql_times)) {
				$error = true;
			}
		}

		if ($disc_codes_num_rows == 0) {
			if ($coupon_code != '') {
				$sql_disc = "INSERT INTO " . EVENTS_DISCOUNT_CODES_TABLE . " (coupon_code, coupon_code_price, use_percentage) VALUES ('" . $coupon_code . "', '" . $coupon_code_price . "', '" . $use_percentage . "')";
				echo "$sql_disc <br>";
				if (!$wpdb->query($sql_disc)) {
					$error = true;
				}

				//Copy the discount codes to the relationship tables
				$discount_id = $wpdb->insert_id;
				$sql_disc_rel = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $event_id . "', '" . $discount_id . "')";
				echo "$sql_disc_rel <br>";
				if (!$wpdb->query($sql_disc_rel)) {
					$error = true;
				}
			}
		}

		if ($prices_num_rows == 0) {
			if ($event_cost != '') {
				$sql_price = "INSERT INTO " . EVENTS_PRICES_TABLE . " (event_id, event_cost) VALUES ('" . $event_id . "', '" . $event_cost . "')";
				//echo "$sql_price <br>";
				if (!$wpdb->query($sql_price)) {
					$error = true;
				}
			}
		}
	}

	if ($error != true) {
		?>
<div id="message" class="updated fade">
	<p><strong>
		<?php _e('Event data has been updated!', 'event_espresso'); ?>
		</strong></p>
</div>
<?php } else { ?>
<div id="message" class="error">
	<p><strong>
		<?php _e('There was an error in your submission, please try again.', 'event_espresso'); ?>
		<?php $wpdb->print_error(); ?>
		.</strong></p>
</div>
<?php
	}
}

