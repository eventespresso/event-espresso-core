<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
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
