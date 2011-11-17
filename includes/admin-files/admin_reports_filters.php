<?php
global $espresso_premium;
if ($espresso_premium != true)
    return;
//This line keeps the notices from displaying twice
if ( did_action( 'espresso_admin_notices' ) == false )
	do_action('espresso_admin_notices');
?>
      <ul class="ee_subsubsub first subsubsub">
      	<li><h3><?php echo __('Filters', 'event_espresso');?></h3></li>
        <li><strong>
          <?php _e('Events', 'event_espresso'); ?>
          : </strong> </li>
        <li><a <?php echo (isset($_REQUEST['all']) && $_REQUEST['all'] == 'true') ? ' class="current" ' : '' ?> href="admin.php?page=events&all=true">
          <?php _e('All Events', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_events(); ?>)</span></a> |</li>
        <li><a <?php echo (isset($_REQUEST['today']) && $_REQUEST['today'] == 'true') ? ' class="current" ' : '' ?> href="admin.php?page=events&today=true">
          <?php _e('Today', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_events_today(); ?>)</span></a> |</li>
        <li><a <?php echo (isset($_REQUEST['this_month']) && $_REQUEST['this_month'] == 'true') ? ' class="current" ' : '' ?>  href="admin.php?page=events&this_month=true">
          <?php _e('This Month', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_events_this_month(); ?>)</span></a></li>
      </ul>
      <ul class="ee_subsubsub subsubsub">
        <li><strong>
          <?php _e('Registrations', 'event_espresso'); ?>
          : </strong> </li>
        <li><a <?php echo (isset($_REQUEST['all_a']) && $_REQUEST['all_a'] == 'true') ? ' class="current" ' : '' ?> href="admin.php?page=attendees&event_admin_reports=event_list_attendees&all_a=true">
          <?php _e('All Registrations', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_all_attendees(); ?>)</span></a> | </li>
        <li><a <?php echo (isset($_REQUEST['today_a']) && $_REQUEST['today_a'] == 'true') ? ' class="current" ' : '' ?> href="admin.php?page=attendees&event_admin_reports=event_list_attendees&today_a=true">
          <?php _e('Today', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_attendees_today(); ?>)</span></a> |</li>
        <li><a <?php echo (isset($_REQUEST['this_month_a']) && $_REQUEST['this_month_a'] == 'true') ? ' class="current" ' : '' ?>  href="admin.php?page=attendees&event_admin_reports=event_list_attendees&this_month_a=true">
          <?php _e('This Month', 'event_espresso'); ?>
          <span class="count">(<?php echo espresso_total_attendees_this_month(); ?>)</span></a> </li>
        <?php if (isset($_REQUEST['event_id']) && $_REQUEST['event_id']!='' && $_REQUEST['event_admin_reports'] != 'charts'){?>
        <li> | <a href="admin.php?page=attendees&event_admin_reports=charts&event_id=<?php echo $_REQUEST['event_id'] ?>">
          <?php _e('View Report', 'event_espresso'); ?>
          </a></li>
        <?php }?>
        <?php /*?><li> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=attendee_filter_info" title="<?php _e('Numbers not matching up?', 'event_espresso'); ?>"><?php echo '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" />'; ?></a></li><?php */?>
      </ul>
      <div style="clear:both"></div>
      
      <?php if ($_REQUEST['page'] == 'events' || $_REQUEST['page'] == 'attendees') { ?>
<div class="tablenav">
  <div class="alignleft actions">
    <form id="form2" name="form2" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
      <?php
                $_REQUEST['event_admin_reports'] = isset($_REQUEST['event_admin_reports']) ? $_REQUEST['event_admin_reports'] : '';
                switch ($_REQUEST['event_admin_reports']) {
                    case'event_list_attendees':
                    case'edit_attendee_record':
                    case'resend_email':
                    case'enter_attendee_payments':
                    case'list_attendee_payments':
                    case'add_new_attendee':
					case'charts':
                        ?>
      <?php espresso_attendees_by_month_dropdown(isset($_POST['month_range']) ? $_POST['month_range'] : ''); //echo $_POST[ 'month_range' ];  ?>
      <input type="submit" class="button-secondary" value="Filter Month" id="post-query-month">
      <?php echo espresso_category_dropdown(isset($_REQUEST['category_id']) ? $_REQUEST['category_id'] : ''); ?>
      <input type="submit" class="button-secondary" value="Filter Category" id="post-query-category">
      <?php
                        //Payment status drop down
                        $status = array(array('id' => '', 'text' => __('Show All Completed/Incomplete', 'event_espresso')), array('id' => 'Completed', 'text' => __('Completed', 'event_espresso')), array('id' => 'Pending', 'text' => __('Pending', 'event_espresso')), array('id' => 'Incomplete', 'text' => __('Incomplete', 'event_espresso')), array('id' => 'Payment Declined', 'text' => __('Payment Declined', 'event_espresso')));

                        echo select_input('payment_status', $status, isset($_REQUEST['payment_status'])? $_REQUEST['payment_status'] : '');
                        ?>
      <input type="submit" class="button-secondary" value="Filter Status" id="post-query-payment">
      <a class="button-secondary" href="admin.php?page=attendees&event_admin_reports=event_list_attendees" style=" width:40px; display:inline">
      <?php _e('Reset Filters', 'event_espresso'); ?>
      </a>
      <?php
                        break;

                    default:
                        ?>
      <?php $_POST['month_range'] = isset($_POST['month_range']) ? $_POST['month_range'] : '';
                        espresso_event_months_dropdown($_POST['month_range']); //echo $_POST[ 'month_range' ];  ?>
      <input type="submit" class="button-secondary" value="Filter Month" id="post-query-submit">
      <?php $_REQUEST['category_id'] = isset($_REQUEST['category_id']) ? $_REQUEST['category_id'] : '';
                        echo espresso_category_dropdown($_REQUEST['category_id']); ?>
      <input type="submit" class="button-secondary" value="Filter Category" id="post-query-submit">
      <?php
                        $status = array(array('id' => '', 'text' => __('Show Active/Inactive', 'event_espresso')), array('id' => 'A', 'text' => __('Active', 'event_espresso')), array('id' => 'IA', 'text' => __('Inactive', 'event_espresso')), array('id' => 'P', 'text' => __('Pending', 'event_espresso')), array('id' => 'R', 'text' => __('Draft', 'event_espresso')), array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')), array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')), array('id' => 'X', 'text' => __('Denied', 'event_espresso')), array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));
                        $_REQUEST['event_status'] = isset($_REQUEST['event_status']) ? $_REQUEST['event_status'] : '';
                        echo select_input('event_status', $status, $_REQUEST['event_status']);
                        ?>
      <input type="submit" class="button-secondary" value="Filter Status" id="post-query-submit">
      <a class="button-secondary" href="admin.php?page=events" style=" width:40px; display:inline">
      <?php _e('Reset Filters', 'event_espresso'); ?>
      </a>
      <?php
                        break;
                }
                ?>
    </form>
  </div>
</div>
<?php /*?><div id="attendee_filter_info" style="display:none">
        <h2><?php _e('Ateendee Filters ', 'event_espresso'); ?></h2><p><?php _e('Use these filters to show the amount of attndee', 'event_espresso'); ?>.</p>
    </div><?php */?>
<?php
}