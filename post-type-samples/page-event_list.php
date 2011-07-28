<?php

/*
Template Name: Espresso Events
Template for displaying a list of event posts.
*/


get_header(); ?>
        <div id="container">
            <div id="content" role="main">
            
            <?php query_posts(array('post_type'=>'espresso_event')); ?>

            <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
                
              <?php
              	// GET POST CUSTOM FIELDS //
                //For more information on the get_post_meta function, check out this page:
				//http://codex.wordpress.org/Function_Reference/get_post_meta
				
				//List of available variables as of Event Espresso 3.0.17
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
				
				//This gets the data that is entered into the custom write panels
				//http://wefunction.com/2009/10/revisited-creating-custom-write-panels-in-wordpress/
				//$event_meta = get_post_meta( $post->ID, 'event_meta', true );
			
				?>

                <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h1 class="entry-title"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h1>

                    <div class="entry-meta">
                        <?php twentyten_posted_on();
                        
                        // ECHO POST CUSTOM FIELDS
                         ?>
                 
                        
                    </div><!-- .entry-meta -->

                    <div class="entry-content">
                        <?php the_content(); ?>
                                               
                       <!-- <p>Event ID: <?php echo $event_id;  ?></p>-->
                        <?php if ($event_meta['event_thumbnail']) { ?>

                            <img src="<?php EVENT_ESPRESSO_INCLUDES_DIR;?>functions/timthumb.php?src=<?php echo $event_meta['event_thumbnail'];?>&amp;h=180&amp;w=431&amp;zc=1" alt="" class="pf-img alignleft" />

                            <?php }?>
                        <?php echo do_shortcode('[EVENT_PRICE_DROPDOWN event_id="'.$event_id.'"]');?>
                        
                         <div class="grid_12 details_front clearfix" style="margin-top:20px; height:141px; border:1px solid #dfdfdf;">
    	
        <div class="grid_12 alpha">
        
        	<ul style="float:left; list-style:none; margin-bottom:0;">
            
            	<li style="float:left; height:70px; padding-right:30px; text-transform:uppercase; margin-left:0; padding-left:30px; border-right:1px solid #dfdfdf; border-bottom:1px solid #dfdfdf;">

                    <h3 style="line-height:17px; margin-bottom:0; margin-top:18px;"><?php echo do_shortcode('[CATEGORY_NAME event_id="'.$event_id.'"]');?><br />
                    <span style=" font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></span></h3>
                </li>
                
                <li style="float:left; height:70px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0; padding-left:30px; border-right:1px solid #dfdfdf; border-bottom:1px solid #dfdfdf;">
                    <h3 style="line-height:17px; margin-bottom:0; margin-top:18px;"><a href="<?php echo $event_meta[ 'venue_url' ]; ?>" rel="bookmark" title="<?php echo $event_meta[ 'event_venue' ]; ?>"><?php echo $extra_data[ 'event_venue' ]; ?></a><br />
                    <span style=" font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;">Event Venue</span></h3>
                </li>

                
                <li style="float:left; height:70px; width:141px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0; border-bottom:1px solid #dfdfdf;">
                	<h3 style="line-height:17px; margin-bottom:0; margin-top:18px;"><?php echo do_shortcode('[EVENT_TIME event_id="'.$event_id.'" type="start_date" format="F jS"]'); ?><br />
                    <span style="font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;">Event Start Date</span></h3>
                </li>
                
                <li style="float:left; height:70px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0; border-right:1px solid #dfdfdf; border-bottom:1px solid #dfdfdf;">
                	<h3 style="line-height:17px; margin-bottom:0; margin-top:18px;"><?php echo do_shortcode('[EVENT_TIME event_id="'.$event_id.'" type="start_time"]');?><br />
                	<span style="font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;">Event Start Time</span></h3>

                </li>
                
                <li style="float:left; height:70px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0; border-right:1px solid #dfdfdf;">
                	<h3 style="line-height:17px; margin-bottom:0; margin-top:18px;">November 1st<br />
                    <span style="font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;">Registration Ends</span></h3>
                </li>
                
                <li style="float:left; height:70px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0; border-right:1px solid #dfdfdf;">
                	<h3 style="line-height:17px; margin-bottom:0; margin-top:18px;"><?php echo do_shortcode('[EVENT_PRICE event_id="'.$event_id.'" number="0"]');?>/Team or <?php echo do_shortcode('[EVENT_PRICE event_id="73" number="1"]');?>/Single<br />

                    <span style="font-family:Arial, sans-serif; font-weight:normal; font-size:11px; color:#777;">Event Pricing</span></h3>
                </li>
                
                <li style="float:left; height:70px; width:186px; padding-right:30px; padding-left:30px; text-transform:uppercase; margin-left:0;">
                	<div style="width:100%; float:left; margin-top:17px; height:21px; background:#dfdfdf;">
                    	<div style="height:17px; padding:2px; width:80px; text-align:right; float:left; background:#CC0000;">
                    
                			<h3 style="line-height:17px; margin-bottom:0; color:#fff;"><?php echo do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="num_attendees"]');?> / <?php echo do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="reg_limit"]');?></h3>
                        
                    	</div>
                    </div>

                    <span style="font-family:Arial, sans-serif; font-size:11px; color:#777;">Number Attending</span>
                </li>
                
            </ul>
        
        </div>
        <!-- end .grid_12 .alpha -->
        
    </div>
    <!-- end .grid_12 .details_front -->

                        
                        <?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'twentyten' ), 'after' => '</div>' ) ); ?>
                    </div><!-- .entry-content -->

                </div><!-- #post-## -->

<?php endwhile; // end of the loop. ?>

            </div><!-- #content -->
        </div><!-- #container -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>