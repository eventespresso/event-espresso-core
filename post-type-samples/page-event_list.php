<?php

/*
Template Name: Espresso Events
Template for displaying a list of event posts.
Modified by Chris Reynolds for 3.1.20.P
*/


get_header(); ?>
        <div id="container">
            <div id="content" role="main">

            <?php global $post, $wp_query;
                // define some arguments for our Event Espresso query
                $args = array(
                        'post_type' => 'espresso_event',
                        'meta_key' => 'event_start_date',
                        'meta_query' => array(
                            array(
                                'key' => 'event_start_date',
                                'value' => date('Y-m-d'),
                                'compare' => '>=', // compares the event_start_date against today's date so we only display events that haven't happened yet
                                'type' => 'DATE'
                                )
                            ),
                        'orderby' => 'meta_value',
                        'order' => 'DESC' // change this to ASC if you want newer events on top
                    );
            // this saves the query to a temporary location so we can go back to it later after we run our query
            $temp = $wp_query;
            $wp_query = null;
            $wp_query = new WP_Query();
            $wp_query->query($args);

            // now run the loop
            while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
              <?php
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
                $event_cat = do_shortcode('[CATEGORY_NAME event_id="'.$event_id.'"]'); // displays the event category name, not used in this template but you can add it in
                $event_price = '$' . do_shortcode('[EVENT_PRICE event_id="'.$event_id.'" number="0"]'); // this only displays the first price, change the currency symbol to the one that applies to you
                $event_date = do_shortcode('[EVENT_TIME event_id="'.$event_id.'" type="start_date" format="l, F j, Y"]'); // change the date format if you so desire http://php.net/manual/en/function.date.php
                $event_time = do_shortcode('[EVENT_TIME event_id="'.$event_id.'" type="start_time"]');
                $event_venue = do_shortcode('[ESPRESSO_VENUE event_id="'.$event_id.'"]'); // modify this shortcode to display the venue however you want http://eventespresso.com/support/documentation/shortcodes-template-variables/#venue
                $event_attendees_min_max = do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="num_attendees"]') . '/' . do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="reg_limit"]');
                $event_attendees = do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="available_spaces"]');
                $show_venue = '0'; // set this to 1 if you want to display the venue (this assumes you have venues set up so the default is to set this to 0 for off)
                $show_attendees = '1'; // display number of attendees? set this to 0 if you don't want the attendee numbers. to change how they are displayed, change the shortcode in the $event_attendees variable above
                //the_meta(); //this function displays all the meta values for the post -- more info here: http://codex.wordpress.org/Function_Reference/the_meta
				//This gets the data that is entered into the custom write panels
				//http://wefunction.com/2009/10/revisited-creating-custom-write-panels-in-wordpress/
				//$event_meta = get_post_meta( $post->ID, 'event_meta', true );
				?>

                    <?php /* we're not using this section, but you could do something with it if you wanted
                    <div class="entry-meta">
                        <?php //twentyten_posted_on(); // uncomment if you're using twentyten ?>
                    </div><!-- .entry-meta -->
                    */ ?>

                   <!-- <p>Event ID: <?php echo $event_id;  ?></p> -->
                   <!-- event stuff starts here -->

                <div id="post-<?php the_ID(); ?>" class="event_data <?php echo $event_cat; ?> event-data-display event-list-display event-display-boxes" <?php //post_class(); // if you'd rather use the regular post_class function, comment out all that class stuff there and use this instead ?>>
                    <h2 id="event_title-<?php echo $event_id ?>" class="event_title entry-title">
                        <?php if ($event_externalURL != '') { // if there's an alternate registration URL, use that link
                            echo '<a href="' . $event_externalURL . '" title="' . the_title() . ' class="a_event_title" id="a_event_title-' . $event_id . '">';
                        } else { // otherwise just use the regular link ?>
                            <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>">
                        <?php } the_title(); ?></a></h2>
                    <div class="event_meta">
                        <p id="p_event_price-<?php echo $event_id ?>" class="event_price">
                            <span class="section-title">Price: </span>
                            <?php echo $event_price; ?>
                        </p>
                        <p id="event_date-<?php echo $event_id ?>">
                            <span class="section-title">Date: </span>
                            <?php echo $event_date; ?><br />
                            <?php echo $event_time; ?>
                        </p>
                    </div>
                    <div class="event-desc">
                        <?php the_content(); ?>
                    </div>

                    <?php if ( $show_venue == '1' ) { ?>
                        <p class="event_address" id="event_address-<?php echo $event_id ?>">
                            <span class="section-title">Address: </span>
                            <?php echo $event_venue; ?>
                        </p>
                    <?php }
                    if ( $show_attendees == '1' ) { ?>
                        <p id="available_spaces-<?php echo $event_id ?>">
                            <span class="section-title">Available Spaces: </span>
                            <?php echo $event_attendees;
                            /* if you'd prefer to show the minimum/maximum number of attendees comment out or remove the above lines and use this instead:
                            <?php echo $event_attendees_min_max; ?>
                            */ ?>
                        </p>
                    <?php } ?>

                </div>

                <?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'twentyten' ), 'after' => '</div>' ) ); ?>

                <?php endwhile; // end of the loop. ?>
                <?php $wp_query = null; $wp_query = $temp; // put the old query back where we left it ?>
            </div><!-- #content -->
        </div><!-- #container -->
<?php //get_sidebar(); //uncomment this if you want to display the sidebar ?>
<?php get_footer(); ?>