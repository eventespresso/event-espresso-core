<?php 
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
global $post; 
$event_class = has_post_thumbnail( $post->ID ) ? ' has-img' : '';
?>
<header class="event-header<?php echo $event_class;?>">
	<h1 id="event-details-h1-<?php echo $post->ID; ?>" class="entry-title">
		<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	</h1>
	<?php if (has_excerpt( $post->ID )): the_excerpt(); endif;?>
	<p id="event-date-p">
		<?php 
		if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
			echo $post->EE_Event->primary_datetime()->start_date_and_time(); 
		}				
		?>
	</p>
</header>
