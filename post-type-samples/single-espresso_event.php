<?php
/**
 * Template for displaying all single event posts.
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Event Espresso 3.0.17
 * last updated for 3.1.20.P by Chris Reynolds
 */
get_header();
?>

<div id="container" class="event-display-boxes">
	<div id="content" role="main" class="event_espresso_form_wrapper event-data-display">

		<?php
		if (have_posts())
			while (have_posts()) : the_post();

				// GET POST CUSTOM FIELDS //
				//For more information on the get_post_meta function, check out this page:
				//http://codex.wordpress.org/Function_Reference/get_post_meta
				//Here's a bunch of variables  you can use in your template
				$event_identifier = get_post_meta($post->ID, 'event_identifier', true);
				$event_id = get_post_meta($post->ID, 'event_id', true);
				$event_start_date = get_post_meta($post->ID, 'event_start_date', true);
				$event_end_date = get_post_meta($post->ID, 'event_end_date', true);
				$event_location = get_post_meta($post->ID, 'event_location', true);
				$event_address = get_post_meta($post->ID, 'event_address', true);
				$event_address2 = get_post_meta($post->ID, 'event_address2', true);
				$event_city = get_post_meta($post->ID, 'event_city', true);
				$event_state = get_post_meta($post->ID, 'event_state', true);
				$event_country = get_post_meta($post->ID, 'event_country', true);
				$event_phone = get_post_meta($post->ID, 'event_phone', true);
				$event_externalURL = get_post_meta($post->ID, 'event_externalURL', true);
				$event_registration_start = get_post_meta($post->ID, 'event_registration_start', true);
				$event_registration_end = get_post_meta($post->ID, 'event_registration_end', true);
				$event_cat = do_shortcode('[CATEGORY_NAME event_id="' . $event_id . '"]'); // displays the event category name, not used in this template but you can add it in
				$event_price = '$' . do_shortcode('[EVENT_PRICE event_id="' . $event_id . '" number="0"]'); // this only displays the first price, change the currency symbol to the one that applies to you
				$event_date = do_shortcode('[EVENT_TIME event_id="' . $event_id . '" type="start_date" format="l, F j, Y"]'); // change the date format if you so desire http://php.net/manual/en/function.date.php
				$event_time = do_shortcode('[EVENT_TIME event_id="' . $event_id . '" type="start_time"]');
				$event_end_time = do_shortcode('[EVENT_TIME event_id="' . $event_id . '" type="end_time"]');
				$event_venue = do_shortcode('[ESPRESSO_VENUE event_id="' . $event_id . '"]'); // modify this shortcode to display the venue however you want http://eventespresso.com/support/documentation/shortcodes-template-variables/#venue
				$event_attendees_min_max = do_shortcode('[ATTENDEE_NUMBERS event_id="' . $event_id . '" type="num_attendees"]') . '/' . do_shortcode('[ATTENDEE_NUMBERS event_id="' . $event_id . '" type="reg_limit"]');
				$event_attendees = do_shortcode('[ATTENDEE_NUMBERS event_id="' . $event_id . '" type="available_spaces"]');
				$show_venue = '0'; // set this to 1 if you want to display the venue (this assumes you have venues set up so the default is to set this to 0 for off)
				$show_attendees = '1'; // display number of attendees? set this to 0 if you don't want the attendee numbers. to change how they are displayed, change the shortcode in the $event_attendees variable above
				//the_meta(); //this function displays all the meta values for the post -- more info here: http://codex.wordpress.org/Function_Reference/the_meta
				//This gets the data that is entered into the custom write panels
				//http://wefunction.com/2009/10/revisited-creating-custom-write-panels-in-wordpress/
				//$event_meta = get_post_meta( $post->ID, 'event_meta', true );
				?>

				<?php // uncomment the following lines if you want prev/next post links -- personally, I don't think those really have a place for events, so I'm commenting this out
				/*
				  <div id="nav-above" class="navigation">
				  <div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentyten' ) . '</span> %title' ); ?></div>
				  <div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '</span>' ); ?></div>
				  </div><!-- #nav-above -->
				 */
				?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<h1 class="entry-title"><?php the_title(); ?></h1>

					<?php // uncomment the following lines if you're using Twentyten and you care when the event was posted. I don't think this is really relevant, so I'm commenting it out
					/*
					  <div class="entry-meta">
					  <?php twentyten_posted_on(); ?>
					  </div><!-- .entry-meta -->
					 */
					?>
					<div class="entry-content">
						<div class="event_description">
							<?php the_content(); ?>
						</div>
												<!-- <p>Event ID: <?php echo $event_id; ?></p> -->
						<p class="start_date">
							<span class="section-title">Date: </span>
						<?php echo $event_date; ?>
						</p>

					<?php echo do_shortcode('[ESPRESSO_REG_FORM event_id="' . $event_id . '"]'); ?>

					<?php wp_link_pages(array('before' => '<div class="page-link">' . __('Pages:', 'twentyten'), 'after' => '</div>')); ?>
					</div><!-- .entry-content -->

					<?php // another function I don't see much use for on an event.  uncomment it if you want it
					/*
					  if ( get_the_author_meta( 'description' ) ) : // If a user has filled out their description, show a bio on their entries  ?>
					  <div id="entry-author-info">
					  <div id="author-avatar">
					  <?php echo get_avatar( get_the_author_meta( 'user_email' ), apply_filters( 'twentyten_author_bio_avatar_size', 60 ) ); ?>
					  </div><!-- #author-avatar -->
					  <div id="author-description">
					  <h2><?php printf( esc_attr__( 'About %s', 'twentyten' ), get_the_author() ); ?></h2>
					  <?php the_author_meta( 'description' ); ?>
					  <div id="author-link">
					  <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
					  <?php printf( __( 'View all posts by %s <span class="meta-nav">&rarr;</span>', 'twentyten' ), get_the_author() ); ?>
					  </a>
					  </div><!-- #author-link	-->
					  </div><!-- #author-description -->
					  </div><!-- #entry-author-info -->
					  <?php endif;
					 */
					?>

					<div class="entry-utility">
						<?php //twentyten_posted_in(); // uncomment this if you are using twentyten and you care what category this was posted in ?>
		<?php // alternately, you could us this to display the event category:
		/*
		  <p><?php echo $event_cat; ?></p>
		 */
		?>
				<?php edit_post_link(__('Edit', 'twentyten'), '<span class="edit-link">', '</span>'); ?>
					</div><!-- .entry-utility -->
				</div><!-- #post-## -->
				<?php // if you care about having prev/next navigation, uncomment these lines here:
				/*
				  <div id="nav-below" class="navigation">
				  <div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentyten' ) . '</span> %title' ); ?></div>
				  <div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '</span>' ); ?></div>
				  </div><!-- #nav-below -->
				 */
				?>
		<?php // if you want comments on your event, uncomment this line
		/*
		  comments_template( '', true );
		 */
		?>

	<?php endwhile; // end of the loop.  ?>

	</div><!-- #content -->
</div><!-- #container -->

<?php //get_sidebar(); // uncomment if you want a sidebar. i have commented it out because the twentyten layout doesn't work with all themes  ?>
<?php get_footer(); ?>
