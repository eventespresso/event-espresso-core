<div style="display: block;" id="event-post" class="postbox closed">
	<div class="handlediv" title="Click to toggle"><br />
	</div>
	<h3 class="hndle">
				<span>
			<?php _e('Create a Post', 'event_espresso'); ?>
	  </span></h3>
	<div class="inside">
			<table class="form-table">
				<tbody>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Create a post for this event?', 'event_espresso'); ?>
							</label>
						</th>
						<td class="med">
							<?php echo select_input('create_post', $values, 'N'); ?> 
							<input type="hidden" name="post_id" value="<?php echo isset($event->post_id) ? $event->post_id : ''; ?>" />
						</td>
						<?php
							global $current_user;
							get_currentuserinfo();

							if (isset($event->post_id)) {
								$post_data = get_post($event->post_id);
								$tags = get_the_tags($event->post_id);
								if ($tags) {
									foreach ($tags as $k => $v) {
										$tag[$k] = $v->name;
									}
								$tags = join(', ', $tag);
								}
							} else {
								$post_data = new stdClass();
								$post_data->ID = 0;
								$tags = '';
							}
							$box = array();

							$custom_post_array = array(array('id' => 'espresso_event', 'text' => __('Espresso Event', 'event_espresso')));
							$post_page_array = array(array('id' => 'post', 'text' => __('Post', 'event_espresso')), array('id' => 'page', 'text' => __('Page', 'event_espresso')));
							$post_page_array = isset($org_options['template_settings']['use_custom_post_types']) && $org_options['template_settings']['use_custom_post_types'] == 'Y' ? array_merge($custom_post_array, $post_page_array) : $post_page_array;

							$post_types = $post_page_array;
							
							?>
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Author', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<?php wp_dropdown_users(array('who' => 'authors', 'selected' => $current_user->ID)); ?>
						</td>
					</tr>
					<tr>
						<th class="middle">	
							<label>
								<?php _e('Post Type', 'event_espresso: '); ?> 
							</label>
						</th>
						<td class="med">
							<?php echo select_input('post_type', $post_types, 'espresso_event') ?>						
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Tags', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
						 <input id="post_tags" name="post_tags" size="20" type="text" value="<?php echo $tags; ?>" />
						</td>
					</tr>
				</tbody>
			</table>
	   	
					<p class="section-heading"><?php _e('Post Categories:', 'event_espresso'); ?> </p>
			<?php	require_once( 'includes/meta-boxes.php');
		 			post_categories_meta_box($post_data, $box); ?>
		<input type="hidden" name="espresso_fb" value="true" />
		<p><?php _e('Post templates are stored in the "templates" directory of the plugin.', 'event_espresso'); ?></p>
		<!-- if post templates installed, post template -->

	</div>
</div>
<!-- /event-post -->