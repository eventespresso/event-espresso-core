<?php 
function event_espresso_locale_config_mnu(){
	global $wpdb;
	?>
<div class="wrap">
  <div id="icon-options-event" class="icon32"> </div>
      <h2><?php _e('Manage Locales/Regions','event_espresso');?>
   <?php  if ($_REQUEST[ 'action' ] !='edit' && $_REQUEST[ 'action' ] !='add_new_locale'){
				echo '<a href="admin.php?page=event_locales&amp;action=add_new_locale" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Locale', 'event_espresso') . '</a>';
			}
			?>
    </h2>

 <div id="poststuff" class="metabox-holder has-right-sidebar">
  <?php event_espresso_display_right_column ();?>
  <div id="post-body">
<div id="post-body-content"> 
<?php
	if($_POST['delete_locale'] || $_REQUEST['action']== 'delete_locale'){
		if (is_array($_POST['checkbox'])){
			while(list($key,$value)=each($_POST['checkbox'])):
				$del_id=$key;
				//Delete locale data
				$sql = "DELETE FROM " . EVENTS_LOCALE_TABLE . " WHERE id='$del_id'";
				$wpdb->query($sql);
				
				$sql = "DELETE FROM " . EVENTS_LOCALE_REL_TABLE . " WHERE locale_id='$del_id'";
				$wpdb->query($sql);
			endwhile;	
		}
		if($_REQUEST['action']== 'delete_locale'){
			//Delete discount data
			$sql = "DELETE FROM ".EVENTS_LOCALE_TABLE." WHERE id='" . $_REQUEST['id'] . "'";
			$wpdb->query($sql);
			$sql = "DELETE FROM ".EVENTS_LOCALE_REL_TABLE." WHERE locale_id='" . $_REQUEST['id'] . "'";
			$wpdb->query($sql);
		}
		?>
    <div id="message" class="updated fade">
      <p><strong>
        <?php _e('Locales have been successfully deleted from the event.','event_espresso');?>
        </strong></p>
    </div>
<?php }

if ($_REQUEST['action'] == 'update' ){require_once("update_locale.php");update_event_locale();}
if ($_REQUEST['action'] == 'add' ){require_once("add_locale_to_db.php");add_locale_to_db();}
if ($_REQUEST['action'] == 'add_new_locale'){require_once("add_new_locale.php");add_new_event_locale();}
if ($_REQUEST['action'] == 'edit'){require_once("edit_locale.php");edit_event_locale();}
do_action('espresso_admin_notices');
?>
      <form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"]?>">
       
        <table id="table" class="widefat fixed" width="100%"> 
          <thead>
            <tr>
              <th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
              <th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID','event_espresso'); ?></th>
              <th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name','event_espresso'); ?></th>
            </tr>
          </thead>
          <tbody>
            <?php 

		
	$wpdb->query("SELECT * FROM ". EVENTS_LOCALE_TABLE);
	if ($wpdb->num_rows > 0) {
		$results = $wpdb->get_results("SELECT * FROM ". EVENTS_LOCALE_TABLE ." ORDER BY name ASC");
		foreach ($results as $result){
			$locale_id= $result->id;
			$name=stripslashes($result->name);
			$locale_desc=stripslashes($result->locale_desc);
			?>
            <tr>
              <td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $locale_id?>]" type="checkbox"  title="Delete <?php echo stripslashes($name)?>"></td>
               <td class="column-comments" style="padding-top:3px;"><?php echo $locale_id?></td>
              <td class="post-title page-title column-title"><strong><a href="admin.php?page=event_locales&action=edit&id=<?php echo $locale_id?>"><?php echo $name?></a></strong>
              <div class="row-actions"><span class="edit"><a href="admin.php?page=event_locales&action=edit&id=<?php echo $locale_id?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span><span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_locales&action=delete_locale&id=<?php echo $locale_id?>"><?php _e('Delete', 'event_espresso'); ?></a></span></div>
              </td>
            </tr>
            <?php } 
	}?>
          </tbody>
        </table>
        <div style="clear:both">
        <p>
          <input type="checkbox" name="sAll" onclick="selectAll(this)" />
          <strong>
          <?php _e('Check All','event_espresso'); ?>
          </strong>
          <input name="delete_locale" type="submit" class="button-secondary" id="delete_locale" value="<?php _e('Delete Locale','event_espresso'); ?>" style="margin-left:10px 0 0 10px;" onclick="return confirmDelete();">
          <a  style="margin-left:5px"class="button-primary" href="admin.php?page=event_locales&amp;action=add_new_locale"><?php _e('Add New Locale','event_espresso'); ?></a>
        </p>
        </div>
      </form>
      </div>
     </div>
     </div>
     </div>
<div id="locale_locale" style="display:none">
<h2><?php _e('Locale Locale', 'event_espresso'); ?></h2>
      <p><?php _e('This can be used to group locales together in your custom queries or shortcodes', 'event_espresso'); ?></p>
</div>
<script>
jQuery(document).ready(function($) {						
	
	/* show the table data */
	var mytable = $('#table').dataTable( {
			"bStateSave": true,
			"sPaginationType": "full_numbers",

			"oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong>",
						 	"sZeroRecords": "<?php _e('No Records Found!','event_espresso'); ?>" },
			"aoColumns": [
							{ "bSortable": false },
							 null,
							 null 
							 
							// { "bSortable": false } this isn't required 
							
						]

	} );
	
} );
</script>

<?php 
}