<?php
function add_new_event_locale(){

	?>
<!--Add event display-->

<div class="metabox-holder">
  <div class="postbox">
	<h3>
	  <?php _e('Add a Locale','event_espresso'); ?>
	</h3>
	<div class="inside">
	  <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
		<input type="hidden" name="action" value="add">
		<ul>
				<li>
				  <label>
					<?php _e('Name','event_espresso'); ?>
				  </label>
				  <input type="text" name="name" size="25">
				</li>
		  <li>
			<p>
			  <input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Locale'); ?>" id="add_new_locale" />
			</p>
		  </li>
		</ul>
	  </form>
	</div>
  </div>
</div>

<?php } 
