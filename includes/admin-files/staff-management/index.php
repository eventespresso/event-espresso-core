<?php 
function event_espresso_staff_config_mnu(){
	global $wpdb,$current_user,$espresso_premium;
	$_REQUEST[ 'action' ] = isset($_REQUEST[ 'action' ]) ? $_REQUEST[ 'action' ]:NULL;
	?>
<div class="wrap">
  <div id="icon-options-event" class="icon32"> </div>
      <h2><?php _e('Manage Staff Members','event_espresso');?>
   <?php  if ($_REQUEST[ 'action' ] !='edit' && $_REQUEST[ 'action' ] !='add_new_staff'){
				echo '<a href="admin.php?page=event_staff&amp;action=add_new_staff" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Staff Member', 'event_espresso') . '</a>';
			}
			?>
    </h2>

 <div id="poststuff" class="metabox-holder has-right-sidebar">
  <?php event_espresso_display_right_column ();?>
  <div id="post-body">
<div id="post-body-content">   

<?php
	if(isset($_POST['delete_staff']) || $_REQUEST['action']== 'delete_staff'){
		if (is_array($_POST['checkbox'])){
			while(list($key,$value)=each($_POST['checkbox'])):
				$del_id=$key;
				//Delete staff data
				$sql = "DELETE FROM " . EVENTS_PERSONNEL_TABLE . " WHERE id='$del_id'";
				$wpdb->query($sql);
				
				$sql = "DELETE FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE person_id='$del_id'";
				$wpdb->query($sql);
			endwhile;	
		}
		if($_REQUEST['action']== 'delete_staff'){
			//Delete discount data
			$sql = "DELETE FROM ".EVENTS_PERSONNEL_TABLE." WHERE id='" . $_REQUEST['id'] . "'";
			$wpdb->query($sql);
			$sql = "DELETE FROM ".EVENTS_PERSONNEL_REL_TABLE." WHERE person_id='" . $_REQUEST['id'] . "'";
			$wpdb->query($sql);
		}
		?>
    <div id="message" class="updated fade">
      <p><strong>
        <?php _e('Staff member(s) have been successfully deleted from the event.','event_espresso');?>
        </strong></p>
    </div>
<?php }

if ($_REQUEST['action'] == 'update' ){require_once("update_staff.php");update_event_staff();}
if ($_REQUEST['action'] == 'add' ){require_once("add_staff_to_db.php");add_staff_to_db();}
if ($_REQUEST['action'] == 'add_new_staff'){require_once("add_new_staff.php");add_new_event_staff();}
if ($_REQUEST['action'] == 'edit'){require_once("edit_staff.php");edit_event_staff();}
	
?>
      <form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"]?>">
       
        <table id="table" class="widefat manage-discounts"> 
          <thead>
            <tr>
              <th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
              <th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID','event_espresso'); ?></th>
              <th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name','event_espresso'); ?></th>
              <?php if(function_exists('espresso_is_admin')&&espresso_is_admin()==true) {  ?>
              <th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator','event_espresso'); ?></th>
              <?php } ?>

              <th class="manage-column column-author" id="start" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Shortcode','event_espresso'); ?></th>             
            </tr>
          </thead>
          <tbody>
<?php 
	$limitstaff = false;
	global $espresso_manager;
    if( function_exists('espresso_member_data') ){
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_group_admin' ) ){
			if(	$espresso_manager['event_manager_staff'] == "Y" ){
				$limitstaff = true;
			}
		}else if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager') ){
			$limitstaff = true;
	    }
	}
	$sql = "SELECT * FROM ". EVENTS_PERSONNEL_TABLE . " p";
	if( $limitstaff ){
		$sql .= " JOIN $wpdb->users u on u.ID = p.wp_user WHERE p.wp_user = ".$current_user->ID;
	}
	$wpdb->query($sql);

	if ($wpdb->num_rows > 0) {
		$results = $wpdb->get_results($sql . " ORDER BY p.id ASC");
		foreach ($results as $result){
			$staff_id = $result->id;
			$name = isset($result->name) ? stripslashes_deep($result->name):'';
			$staff_desc = isset($result->staff_desc) ? stripslashes_deep($result->staff_desc):'';
            $wp_user = isset($result->wp_user) ? $result->wp_user:'';
			?>
            <tr>
              <td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $staff_id?>]" type="checkbox"  title="Delete <?php echo stripslashes($name)?>"></td>
               <td class="column-comments" style="padding-top:3px;"><?php echo $staff_id?></td>
              <td class="post-title page-title column-title"><strong><a href="admin.php?page=event_staff&action=edit&id=<?php echo $staff_id?>"><?php echo $name?></a></strong>
              <div class="row-actions">
                <span class="edit"><a href="admin.php?page=event_staff&action=edit&id=<?php echo $staff_id?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span>
                <span class="delete">
                    <a  onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_staff&action=delete_staff&id=<?php echo $staff_id?>"><?php _e('Delete', 'event_espresso'); ?></a>
                </span>
              </div>
              </td>
              <?php if(function_exists('espresso_is_admin')&&espresso_is_admin()==true) {  ?>
              <td><?php echo espresso_user_meta($wp_user, 'user_firstname') !=''?espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname'):espresso_user_meta($wp_user, 'display_name'); ?></td>
              <?php } ?>
              <td>[ESPRESSO_STAFF id="<?php echo $staff_id?>"]</td>
             
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
          <input name="delete_staff" type="submit" class="button-secondary" id="delete_staff" value="<?php _e('Delete Staff Member(s)','event_espresso'); ?>" style="margin-left:10px 0 0 10px;" onclick="return confirmDelete();" />
          <a  style="margin-left:5px"class="button-primary" href="admin.php?page=event_staff&amp;action=add_new_staff"><?php _e('Add New Staff Member','event_espresso'); ?></a>
        </p>
        </div>
      </form>
      </div>
     </div>
     </div>
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
							 <?php echo function_exists('espresso_is_admin')&&espresso_is_admin()==true ? 'null,' : ''; ?>
							 null,
							 <?php echo function_exists('espresso_is_admin')&&espresso_is_admin()==true ? 'null,' : ''; ?>
							 { "bSortable": false }
							
						]

	} );
	
} );
// Add new staff form validation
jQuery(function(){
  jQuery('#add-staff').validate();
});
</script>

<?php 
}
