<?php
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
global $post;
$tag = is_single() ? 'h1' : 'h2';
?>
<header class="event-header">
	<?php echo "<{$tag}  id=\"event-details-{$tag}-{$post->ID}\" class=\"entry-title\">"; ?>
		<a class="ee-event-header-lnk" href="<?php the_permalink(); ?>"<?php echo \EED_Events_Archive::link_target();?>>
            <?php the_title(); ?>
        </a>
	<?php echo "</{$tag}"; ?>
	<?php if ( ! is_archive() && has_excerpt( $post->ID )): the_excerpt(); endif;?>
</header>
