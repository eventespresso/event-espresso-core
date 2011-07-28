<?php
function add_new_event_locale(){
	wp_tiny_mce( false , // true makes the editor "teeny"
		array(
			"editor_selector" => "theEditor"//This is the class name of your text field
		)
	);

        if (  function_exists( 'wp_tiny_mce_preload_dialogs' )){
             add_action( 'admin_print_footer_scripts', 'wp_tiny_mce_preload_dialogs', 30 );
        }
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
<script type="text/javascript" charset="utf-8">

function toggleEditor(id) {
	if (!tinyMCE.get(id))
		tinyMCE.execCommand('mceAddControl', false, id);
	else
		tinyMCE.execCommand('mceRemoveControl', false, id);
	}
	jQuery(document).ready(function($) {
		
                

		var id = 'description';
		$('a.toggleVisual').click(
			function() {
				tinyMCE.execCommand('mceAddControl', false, id);
			}
		);

		$('a.toggleHTML').click(
			function() {
				tinyMCE.execCommand('mceRemoveControl', false, id);
			}
		);
});
</script>
<?php } 
