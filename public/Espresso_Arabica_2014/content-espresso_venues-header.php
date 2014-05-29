<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<header class="venue-header<?php echo $wrap_class;?>">
	<h1 id="venue-details-h1" class="entry-title">
		<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	</h1>
	<?php if ( has_excerpt( $post->ID )) { the_excerpt(); } ?>
</header>
<!-- .venue-content -->
