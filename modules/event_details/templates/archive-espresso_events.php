<?php
/**
 * Template Name: Event List
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */


global $wp_query;

//$orderby = isset( $_GET['orderby'] ) ? sanitize_key( $_GET['orderby'] ) : 'program_date';
$posts_per_page = isset( $_GET['posts_per_page'] ) ? sanitize_key( $_GET['posts_per_page'] ) : 25;
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

//wp_reset_query();
$args = array(
	'post_type' => 'espresso_events',
	'post_status' => 'publish',		// future,draft
//	'orderby' => $orderby,
//	'order' => 'ASC',
	'posts_per_page' => $posts_per_page,	
	'paged' => $paged
);

$events = new WP_Query( $args );
wp_reset_postdata();

$pagination_args = array(
	'base' => str_replace( 999999, '%#%', esc_url( get_pagenum_link( 999999 ) ) ),
	'format' => '?paged=%#%',
	'current' => max( 1, $paged ),
	'total' => $events->max_num_pages
);


get_header();
?>
	<div id="espresso-events-list-wrap-dv" >
		<div id="espresso-events-list-dv" class="hidden" role="main">
				
			<h1  id="event-list-h1"><?php _e( 'Upcoming Events', 'event_espresso' ); ?></h1>

		<?php if ( $events->have_posts() ) { ?>
			<?php while ( $events->have_posts() ) { $events->the_post(); ?>
			
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<?php
			//echo '<h3>$post</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $post, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';		
				$wrap_class = '';
				if ( has_post_thumbnail( $post->ID )) {
					if ( $img_ID = get_post_thumbnail_id( $post->ID )) {
						$img_size = $evnt_cntr < 2 ? 'large' : 'medium';
						if ( $featured_img = wp_get_attachment_image_src( $img_ID, $img_size )) {
							$caption = esc_attr( get_post( get_post_thumbnail_id( $post->ID ))->post_excerpt );
							$wrap_class = ' has-img';
				?>
				<div id="ee-event-img-dv-<?php echo $post->ID; ?>" class="ee-event-img-dv">
					<img class="ee-event-img" src="<?php echo $featured_img[0]; ?>" width="<?php echo $featured_img[1]; ?>" height="<?php echo $featured_img[2]; ?>" alt="<?php echo $caption; ?>"/>				
				</div>
				<?php 
						}			
					}			
				}				
			?>
			<div class="espresso-event-wrapper-dv<?php echo $wrap_class;?>">
				<header class="event-header">
					<p><?php the_terms( $post->ID, 'espresso_event_categories' );// the_terms( $post->ID, 'category' ); /*echo date( 'D F j Y, h:i a', strtotime( $post->post_date ));*/ ?></p>
					<h1 class="event-title"><?php the_title(); ?></h1>
				</header>
				<!-- .entry-header -->
				<div class="event-content">
					<?php the_excerpt(); ?> 
					<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'event_espresso' ), 'after' => '</div>' ) ); ?>
				</div>
				
				<!-- .entry-content -->
				<footer class="event-meta">
					<a class="ee-register-button-lnk button" href="<?php the_permalink( $post->ID ); ?>" title=""><?php _e( 'Register Now', 'event_espresso' ); ?></a>
					<?php edit_post_link( __( 'edit this event', 'event_espresso' ), '<p class="edit-event-lnk small-txt clear">', '</p>' ); ?>
				</footer>
				<!-- .entry-meta -->
			</div>

			</article><!-- #post -->

			<?php } ?>

			<?php //event_espresso_content_nav( 'nav-below' ); ?>

		<?php } else { ?>

			<article id="post-0" class="post no-results not-found">

				<header class="entry-header">
					<h1 class="entry-title"><?php _e( 'There are no upcoming Events', 'event_espresso' ); ?></h1>
				</header>

				<div class="entry-content">
					<p><?php _e( 'Perhaps searching will help find a related event.', 'event_espresso' ); ?></p>
					<?php get_search_form(); ?>
				</div><!-- .entry-content -->

			</article><!-- #post-0 -->

		<?php } // end have_posts() check ?>
		
			<div class="clear"></div>
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>