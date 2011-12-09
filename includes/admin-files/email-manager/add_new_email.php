<?php
function add_new_event_email(){
	
	?>
<!--Add event display-->

<div class="metabox-holder">
	<div class="postbox">
		<h3>
			<?php _e('Add an Email','event_espresso'); ?>
		</h3>
		<div class="inside">
			<form id="add-edit-new-event-email" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
				<h4><?php echo stripslashes($email_name) ?></h4>
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="email_name">
									<?php _e('Email Name','event_espresso'); ?>
								</label></th>
							<td><input class="regular-text" type="text" name="email_name" /></td>
						</tr>
						<tr>
							<th><label>
									<?php _e('Email Subject Line','event_espresso'); ?>
								</label></th>
							<td><input class="regular-text" type="text" name="email_subject" /></td>
						</tr>
						<tr>
							<td colspan="2"><div id="descriptiondivrich" class="postarea">
									<div class="postbox">
										<?php the_editor('', $id = 'email_text', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
										<table id="manage-event-email-form" cellspacing="0">
											<tbody>
												<tr>
													<td class="aer-word-count"></td>
													<td class="autosave-info"><span>&nbsp;</span></td>
												</tr>
											</tbody>
										</table>
										<p><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info">
											<?php _e('View Custom Email Tags', 'event_espresso'); ?></a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example">
											<?php _e('Email Example','event_espresso'); ?></a></p>
									</div>
								</div></td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" name="action" value="add">
				<p>
					<input class="button-primary" type="submit" name="Submit" value="<?php _e('Add Email'); ?>" id="add_new_email" />
					<?php wp_nonce_field( 'espresso_form_check', 'add_new_email' ) ?>
				</p>
			</form>
		</div>
	</div>
</div>
<?php 
//espresso_tiny_mce();
} 
