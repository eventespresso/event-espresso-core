<?php
function edit_event_locale(){
	global $wpdb;
	$id=$_REQUEST['id'];
	$results = $wpdb->get_results("SELECT * FROM ". EVENTS_LOCALE_TABLE ." WHERE id =".$id);
	foreach ($results as $result){
		$locale_id= $result->id;
		$name=stripslashes_deep($result->name);
	}
	?>
<!--Add event display-->

<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Edit Locale:','event_espresso'); ?>
      <?php echo stripslashes($name) ?></h3>
    <div class="inside">
      <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="locale_id" value="<?php echo $locale_id; ?>">
        <input type="hidden" name="action" value="update">
		<ul>
                <li>
                  <label>
                    <?php _e('Name','event_espresso'); ?>
                  </label>
                  <input type="text" name="name" size="25" value="<?php echo $name;?>">
                </li>
          <li>
            <p>
              <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Locale'); ?>" id="update_locale" />
            </p>
          </li>
        </ul>
      </form>
    </div>
  </div>
</div>
<?php }
