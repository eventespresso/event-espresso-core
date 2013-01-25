
		<div id="titlediv">
		
			<div id="titlewrap">
				<h5 style="margin: 1em .5em .1em;"><?php _e('Event Title', 'event_espresso'); ?></h5>
				<input id="title" type="text" autocomplete="off" value="<?php echo $event_name; ?>" tabindex="1" size="30" name="event">
			</div>
			<!-- /titlewrap -->

			<div id="edit-slug-box" class="padding">

				<strong><?php _e('Permalink:', 'event_espresso'); ?></strong>

				<span id="sample-permalink">
					<?php echo $event_page_url; ?><input size="50" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event_slug; ?>" />
				</span>

				<?php if ( ! $event_is_new ) : ?>
					<a class="button" onclick="prompt('Shortcode:', jQuery('#shortcode').val()); return false;" href="#"><?php _e('Shortcode'); ?></a>
					<a class="button" onclick="prompt('Short URL:', jQuery('#shortlink').val()); return false;" href="#"><?php _e('Short URL'); ?></a>
					<a class="button" onclick="prompt('Full URL:', jQuery('#fulllink').val()); return false;" href="#"><?php _e('Full URL'); ?></a>
					<a class="button" onclick="prompt('Unique Event Identifier:', jQuery('#identifier').val()); return false;" href="#"><?php _e('Identifier'); ?></a>
					<a class="button" target="_blank" href="<?php echo $event_page_url . $event_slug; ?>/"><?php _e('View Post'); ?></a>
				<?php endif; ?>

				<input id="shortcode" type="hidden" value='[SINGLEEVENT single_event_id="<?php echo $event_identifier; ?>"]'>
				<input id="shortlink" type="hidden" value="<?php echo $shortlink; ?>">
				<input id="fulllink" type="hidden" value="<?php echo $event_page_url . $event_slug; ?>">
				<input id="identifier" type="hidden" value="<?php echo $event_identifier; ?>">
				
			</div>
			<!-- /edit-slug-box -->
		</div>


		<div id="postdivrich" class="postarea">
			<?php echo $event_desc_editor; ?>
			<table id="post-status-info" cellspacing="0">
				<tbody>
					<tr>
						<td id="wp-word-count"><?php echo __('Word count:', 'event_espresso') ?> <span class="word-count"></span></td>
						<td class="autosave-info"><span class="autosave-message"></span><span id="last-edit"></span></td>
					</tr>
				</tbody>
			</table>
		</div>

