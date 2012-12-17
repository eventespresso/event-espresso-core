<?php
function add_new_event_email(){
	
	$email_type_values = array(
		array('id' => 'confirmation', 'text' => __('Confirmation', 'event_espresso')),
		array('id' => 'payment', 'text' => __('Payment', 'event_espresso'))
	);
	?>
<!--Add event display-->

<div class="metabox-holder">
	<div class="postbox">
		<h3>
			<?php _e('Add an Email','event_espresso'); ?>
		</h3>
		<div class="inside">
			<form id="add-edit-new-event-email" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="email_name">
									<?php _e('Email Name','event_espresso'); ?>
								</label></th>
							<td><input class="regular-text" type="text" name="email_name" /></td>
						</tr>
						<tr>
							<th><label for="email_type">
									<?php _e('Email Type','event_espresso'); ?>
								</label></th>
							<td><?php echo select_input('email_type', $email_type_values, isset($email_type) ? $email_type : 'confirmation') ?></td>
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
										<?php
											$args = array("textarea_rows" => 10, "textarea_name" => "email_text", "editor_class" => "my_editor_custom");
											wp_editor('', "email_text", $args);
										?>
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
