<?php function espresso_premium_feature(){?>
<div id="poststuff" class="metabox-holder has-right-sidebar">
 <?php event_espresso_display_right_column ();?>
  <div id="post-body">
    <div id="post-body-content">
            <?php require_once(EVENT_ESPRESSO_PLUGINFULLPATH.'includes/pricing_table.php');?>
    </div>
  </div>
</div>
<?php }?>