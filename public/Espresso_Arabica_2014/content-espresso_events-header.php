<?php
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
global $post;
?>
<header class="event-header">
	<?php if ( is_single() ) : ?>
	<h1 id="event-details-h1-<?php echo $post->ID; ?>" class="entry-title">
	<?php else : ?>
	<h2 id="event-details-h2-<?php echo $post->ID; ?>" class="entry-title">
	<?php endif; ?>
		<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	<?php if ( is_single() ) : ?></h1><?php else : ?></h2><?php endif; ?>
	<?php if ( ! is_archive() && has_excerpt( $post->ID )): the_excerpt(); endif;?>
</header>
