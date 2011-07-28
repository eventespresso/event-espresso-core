<?php
function event_process_payments(){
	$org_options = get_option('events_organization_settings');
	global $wpdb;

    if ( $_POST[ 'perm_delete_event' ] )
    {
        if ( is_array( $_POST[ 'checkbox' ] ) )
        {
            while ( list($key, $value) = each( $_POST[ 'checkbox' ] ) ):
                $del_id = $key;
				event_espresso_empty_event_trash($del_id);
                //$sql = "DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id = '$del_id'";
                //$wpdb->query( $sql );
            endwhile;
        }
?>

        <div id="message" class="updated fade">
          <p><strong>
            <?php _e( 'Event(s) have been permanently deleted.', 'event_espresso' ); ?>
            </strong></p>
        </div>
<?php
	}
	
?>
	<h3><?php _e('Select an event to view attendee details and payments','event_espresso'); ?></h3>
 
 <div style="float:right; margin:10px 20px;">
  <ul>
    <li><button style="margin-left:20px" class="button-primary" onclick="window.location='<?php echo get_bloginfo( 'wpurl' ) . "/wp-admin/admin.php?event_espresso&id=" . $event_id . "&export=report&action=payment&all_events=true"; ?>'" >
      <?php _e( 'Export All Event Attendees to Excel', 'event_espresso' ); ?>
      </button>
      </li>
      </ul>
      </div>
   	<div id="tablewrapper">
		<div id="tableheader">
        	<div class="search">
                <select id="columns" onchange="sorter.search('query')"></select>
                <input type="text" id="query" onkeyup="sorter.search('query')" />
            </div>
            <span class="details">

				<div><?php _e('Records','event_espresso'); ?>  <span id="startrecord"></span> - <span id="endrecord"></span>
                                <?php _e('of','event_espresso'); ?> <span id="totalrecords"></span>
</div>
        		<div><a href="javascript:sorter.reset()"><?php _e('Reset','event_espresso'); ?></a></div>
        	</span>
        </div>
        
   <form id="form1" name="form1" method="post" action="<?php echo $_SERVER[ "REQUEST_URI" ] ?>">
   
   <table id="table" class="tinytable"> 
    <thead>
           <tr>
            <th><h3><?php _e('Delete','event_espresso'); ?></h3></th>
            <th><h3><?php _e('Event ID','event_espresso'); ?></h3></th>
            <th><h3><?php _e('Event Name','event_espresso'); ?></h3></th>
            <th><h3><?php _e('Start Date','event_espresso'); ?></h3></th>
            <th><h3><?php _e('Status','event_espresso'); ?></h3></th>
            <th><h3><?php _e('# Attendees','event_espresso'); ?></h3></th>
            <th><h3><?php _e('Action','event_espresso'); ?></h3></th>
        </tr>
          </thead>
    <tbody>
<?php

	$event_results = $wpdb->get_results("SELECT * FROM ". EVENTS_DETAIL_TABLE. " ORDER BY date(start_date) " . $limit);
	if ($wpdb->num_rows > 0) {
		foreach ($event_results as $event){
			$event_id = $event->id;
			$event_name = $event->event_name;
			$event_desc = $event->event_desc;
			$event_description = $event->event_desc;
			$event_identifier = $event->event_identifier;
			$event_cost = $event->event_cost;
			$active = $event->is_active;
			$event_status = $event->event_status;
			$status = array();
			$status = event_espresso_get_is_active($event_id);

			$start_date = $event->start_date;
			$end_date = $event->end_date;
			$reg_limit = $event->reg_limit;
?>
          	<tr>
            <td>
            <?php echo $event_status == 'D' ? '<input name="checkbox[' . $event_id . ']" type="checkbox"  title="Permanently delete '. $event_name .'" />' : '';?>
            
            </td>
            <td><?php echo $event_id; ?></td>
            <td><a href="admin.php?page=events&amp;event_id=<?php echo $event_id?>&amp;event_admin_reports=list_attendee_payments" title="<?php _e('View Attendees','event_espresso'); ?>"><?php echo stripslashes($event_name); ?></a></td>
            <td><?php echo event_date_display($start_date)?></td>
            <td><?php echo $status['display'] ?></td>
            <td><?php echo get_number_of_attendees_reg_limit($event_id,'num_attendees_slash_reg_limit');?></td>
            <td><a href="admin.php?page=events&amp;event_id=<?php echo $event_id?>&amp;event_admin_reports=list_attendee_payments" title="<?php _e('View Attendees','event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/icons/group.png" width="16" height="16" alt="<?php _e('View Attendees','event_espresso'); ?>" /></a> | <a href="admin.php?page=events&amp;action=edit&amp;event_id=<?php echo $event_id?>" title="<?php _e('Edit Event','event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/icons/calendar_edit.png" width="16" height="16" alt="<?php _e('Edit Event','event_espresso'); ?>" /></a> | <a href="#" onclick="window.location='<?php echo get_bloginfo('wpurl')."/wp-admin/admin.php?event_espresso&amp;id=".$event_id."&amp;export=report&action=payment&amp;type=excel";?>'" title="<?php _e('Export to Excel','event_espresso'); ?>"><img alt="<?php _e('Export to Excel','event_espresso'); ?>" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/icons/excel_icon.png" width="16" height="16"  /></a> | <a href="#" onclick="window.location='<?php echo get_bloginfo('wpurl')."/wp-admin/admin.php?event_espresso&id=".$event_id."&export=report&action=payment&type=csv";?>'" title="<?php _e('Export to CSV','event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/icons/csv_icon_sm.gif" width="15" height="16" alt="<?php _e('Export to CSV','event_espresso'); ?>" /></a>
            | <a href="admin.php?page=events&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event_id ?>" title="<?php _e( 'Email Event Attendees', 'event_espresso' ); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_go.png" width="16" height="16" alt="<?php _e( 'Email Event Attendees', 'event_espresso' ); ?>" /></a></td>
  			</tr>
<?php
		}
 	}else{ ?>
  		<tr>
    	<td><?php _e('No Record Found!','event_espresso'); ?></td>
  		</tr>
<?php	
	}
?>
  	</tbody>
	</table>
     <input type="checkbox" name="sAll" onclick="selectAll(this)" />
  <strong>
  <?php _e( 'Check All', 'event_espresso' ); ?>
  </strong>
  <input name="perm_delete_event" type="submit" class="button-secondary" id="perm_delete_event" value="<?php _e( 'Permanently Delete Events(s)', 'event_espresso' ); ?>" style="margin-left:100px;" onclick="return confirmDelete();" />
  </form>
	<div id="tablefooter">
          <div id="tablenav">
            	<div>
                    <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/first.gif" width="16" height="16" alt="First Page" onclick="sorter.move(-1,true)" />
                    <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/previous.gif" width="16" height="16" alt="First Page" onclick="sorter.move(-1)" />
                    <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/next.gif" width="16" height="16" alt="First Page" onclick="sorter.move(1)" />
                    <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/last.gif" width="16" height="16" alt="Last Page" onclick="sorter.move(1,true)" />
</div>
                <div>
                	<select id="pagedropdown"></select>
				</div>
                <div>
                	<a href="javascript:sorter.showall()"><?php _e('View All','event_espresso'); ?></a>
                </div>
            </div>
			<div id="tablelocation">
            	<div>
                    <select onchange="sorter.size(this.value)">
                    <option value="5">5</option>
                        <option value="10" selected="selected">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span><?php _e('Entries Per Page','event_espresso'); ?></span>
                </div>
                <div class="page"><?php _e('Page','event_espresso'); ?> <span id="currentpage"></span> <?php _e('of','event_espresso'); ?>
                    <span id="totalpages"></span>
</div>
            </div>
        </div>
    </div>
  	<script type="text/javascript">
	var sorter = new TINY.table.sorter('sorter','table',{
		headclass:'head',
		ascclass:'asc',
		descclass:'desc',
		evenclass:'evenrow',
		oddclass:'oddrow',
		evenselclass:'evenselected',
		oddselclass:'oddselected',
		paginate:true,
		size:30,
		colddid:'columns',
		currentid:'currentpage',
		totalid:'totalpages',
		startingrecid:'startrecord',
		endingrecid:'endrecord',
		totalrecid:'totalrecords',
		hoverid:'selectedrow',
		pageddid:'pagedropdown',
		navid:'tablenav',
		sortcolumn:1,
		sortdir:1,
		//sum:[2],
		//avg:[2,7,8,9],
		//columns:[{index:7, format:'%', decimals:1},{index:2, format:'$', decimals:0}],
		init:true
	});
  	</script>
<?php
}
