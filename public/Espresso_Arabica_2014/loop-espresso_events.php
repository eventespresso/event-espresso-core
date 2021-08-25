<?php
/**
 * This template will display The Loop that displays your events
 * DO NOT COPY THIS TEMPLATE TO YOUR THEMES FOLDER
 *
 * @package     Event Espresso
 * @author      Seth Shoultes
 * @copyright   (c) 2008-2013 Event Espresso  All Rights Reserved.
 * @license     https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @link        http://www.eventespresso.com
 * @version     4+
 */
if (have_posts()) :
    if (apply_filters('FHEE__archive_espresso_events_template__show_header', true)) : ?>
        <header class="page-header">
            <h1 class="page-title">
                <?php
                if (is_day()) :
                    printf(esc_html__('Today\'s Events: %s', 'event_espresso'), get_the_date());
                elseif (is_month()) :
                    printf(
                        esc_html__('Events This Month: %s', 'event_espresso'),
                        get_the_date(_x('F Y', 'monthly archives date format', 'event_espresso'))
                    );
                elseif (is_year()) :
                    printf(
                        esc_html__('Events This Year: %s', 'event_espresso'),
                        get_the_date(_x('Y', 'yearly archives date format', 'event_espresso'))
                    );
                else :
                    echo apply_filters(
                        'FHEE__archive_espresso_events_template__upcoming_events_h1',
                        esc_html__('Upcoming Events', 'event_espresso')
                    );
                endif;
                ?>
            </h1>

        </header><!-- .page-header -->

        <?php
    endif;
    // allow other stuff
    do_action('AHEE__archive_espresso_events_template__before_loop');
    // Start the Loop.
    while (have_posts()) : the_post();
        // Include the post TYPE-specific template for the content.
        espresso_get_template_part('content', 'espresso_events-shortcode');
    endwhile;
    // Previous/next page navigation.
    espresso_pagination();
    // allow moar other stuff
    do_action('AHEE__archive_espresso_events_template__after_loop');
else :
    // If no content, include the "No posts found" template.
    espresso_get_template_part('content', 'none');
endif;

