<?php

function add_new_event_category() {
 $values=array(
	array('id'=>true,'text'=> __('Yes','event_espresso')),
	array('id'=>false,'text'=> __('No','event_espresso'))
);
	?>
<!--Add event display-->

<div id="add-edit-categories" class="metabox-holder">
	<div class="postbox">
		<h3> <span>
			<?php _e('Add a Category', 'event_espresso'); ?>
			</span> </h3>
		<div class="inside">
			<form id="add-new-cat" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="category_name">
									<?php _e('Category Name', 'event_espresso'); ?>
									<em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label></th>
							<td><input id="category_name" type="text" name="category_name" /></td>
						</tr>
						<tr>
							<th><label for="cat_id">
									<?php _e('Unique ID', 'event_espresso'); ?>
									<?php echo apply_filters( 'filter_hook_espresso_help', 'unique_id_info'); ?>
								</label></th>
							<td><input id="cat_id"  type="text" name="category_identifier" /></td>
						</tr>
						<tr>
							<th><?php _e('Display Category Description in Event Listing?', 'event_espresso'); ?></th>
							<td><?php echo select_input('display_desc', $values);?></td>
						</tr>
						<tr>
							<td colspan="2"><h4>
									<?php _e('Category Description', 'event_espresso'); ?>
								</h4></td>
						</tr>
						<tr>
							<td colspan="2"><div class="postbox">
									<?php
										$args = array("textarea_rows" => 5, "textarea_name" => "category_desc", "editor_class" => "my_editor_custom");
										wp_editor('', "category_desc", $args);
									?>
									<table id="cat-descr-add-form" cellspacing="0">
										<tbody>
											<tr>
												<td class="aer-word-count"></td>
												<td class="autosave-info"><span>
													<p></p>
													</span></td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- /.postbox --></td>
						</tr>
					</tbody>
				</table>
				<?php  // create our nonces and do our form submit ?>
				<?php wp_nonce_field( 'espresso_form_check', 'ee_add_new_cat' ); ?>
				<input type="hidden" name="action" value="add">
				<p>
					<input class="button-secondary" type="submit" name="Submit" value="<?php _e('Submit'); ?>" id="add_new_category" />
				</p>
			</form>
		</div>
		<!-- /.inside -->
	</div>
	<!-- /.postbox -->
</div>
<!-- metabox-holder -->
<?php wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false ); ?>
<?php wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false ); ?>
<?php
}