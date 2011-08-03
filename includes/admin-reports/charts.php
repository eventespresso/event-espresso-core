<?php
function espresso_charts() {
    global $wpdb, $org_options;
    ?>

<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php espresso_event_list_attendee_title($_REQUEST['event_id']); ?>
    </h3>
    <div class="inside">
      <style type="text/css">
    .jqplot-target {
        margin-bottom: 2em;
    }
    
    pre {
        background: #D8F4DC;
        border: 1px solid rgb(200, 200, 200);
        padding-top: 1em;
        padding-left: 3em;
        padding-bottom: 1em;
        margin-top: 1em;
        margin-bottom: 4em;
        
    }
    
    p {
        margin: 2em 0;
    }
    
    .note {
        font-size: 0.8em;
    }
  </style>
      <!-- Total Registrations/Transactions -->
    <?php 
  $retVAl_a = array();
  $sql_a = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM wp_events_attendee a WHERE event_id =".$_REQUEST['event_id']." GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
  $results_a = $wpdb->get_results($sql_a);
  foreach ($results_a as $row_a) {
	$retVal_a[] = $row_a;
  }
 
  $attendees_a = '';
  $amount_a ='';
  $date_a = '';
  foreach($retVal_a as $rec_a ){
		//$label = $rec->amount." (".$rec->date.")";
		//$vals[$label] = $rec->date;
		$amount_a .= $rec_a->amount.',';
		$date_a .= "'".$rec_a->date."', ";
		$attendees_a .= $rec_a->quantity.", ";
	}
 //echo "<pre>".print_r($retVal_a,true)."</pre>";
  ?>
    <script>
 jQuery(document).ready(function() {
        var line1 = [<?php echo $attendees_a ?>];//bottom column
		var line2 = [<?php echo $amount_a ?>];
        var ticks = [<?php echo $date_a ?>];
        
        plot1 = jQuery.jqplot('total_reg', [line1, line2], {
            //stackSeries: true,
			title: '<?php _e('Total Registrations/Transactions', 'event_espresso'); ?>',
			seriesDefaults:{
				renderer:jQuery.jqplot.BarRenderer,
                pointLabels: { show: true },
            },
            axes: {
                xaxis: {
                    renderer: jQuery.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
			series: [{
				label: '# Attendees'
			},
			{
				label: '<?php echo $org_options['currency_symbol'] ?> <?php _e('Amount', 'event_espresso'); ?>',
				pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
			}],

			   highlighter: {
				show: true,
				sizeAdjust: 7.5
			  },
			legend: {
				show: true,
				location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
				placement: 'outsideGrid'

			},

        });
		
	
    
        jQuery('#chart1').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                jQuery('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    });</script>
    

   <!-- Completed Registrations/Transactions -->
<?php 
  $retVAl = array();
  $sql = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM wp_events_attendee a WHERE event_id =".$_REQUEST['event_id']." AND payment_status='Completed' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
  $results = $wpdb->get_results($sql);
  foreach ($results as $row) {
	$retVal[] = $row;
  }
  
  $attendees ='';
  $amount ='';
  $date = '';
  foreach($retVal as $rec ){
		//$label = $rec->amount." (".$rec->date.")";
		//$vals[$label] = $rec->date;
		$amount .= $rec->amount.',';
		$date .= "'".$rec->date."', ";
		$attendees .= $rec->quantity.", ";
	}
 //echo "<pre>".print_r($retVal,true)."</pre>";
  ?>
      <script>
 jQuery(document).ready(function() {
        var line1 = [<?php echo $attendees ?>];//bottom column
		var line2 = [<?php echo $amount ?>];
        var ticks = [<?php echo $date ?>];
        
        plot1 = jQuery.jqplot('total_completed', [line1, line2], {
            //stackSeries: true,
			title: '<?php _e('Completed Registrations/Transactions', 'event_espresso'); ?>',
			seriesDefaults:{
				renderer:jQuery.jqplot.BarRenderer,
                pointLabels: { show: true },
            },
            axes: {
                xaxis: {
                    renderer: jQuery.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
			series: [{
				label: '# Attendees'
			},
			{
				label: '<?php echo $org_options['currency_symbol'] ?> <?php _e('Amount', 'event_espresso'); ?>',
				pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
			}],

            highlighter: { show: false },
			legend: {
				show: true,
				location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
				placement: 'outsideGrid'

			},

        });
		
	
    
        jQuery('#chart1').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                jQuery('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    });</script>
  
  <!-- Pending Registrations/Transactions -->
    <?php 
  $retVAl_p = array();
  $sql_p = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM wp_events_attendee a WHERE event_id =".$_REQUEST['event_id']." AND payment_status='Pending' GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
  $results_p = $wpdb->get_results($sql_p);
  foreach ($results_p as $row_p) {
	$retVal_p[] = $row_p;
  }
 
  $attendees_p = '';
  $amount_p ='';
  $date_p = '';
  foreach($retVal_p as $rec_p ){
		//$label = $rec->amount." (".$rec->date.")";
		//$vals[$label] = $rec->date;
		$amount_p .= $rec_p->amount.',';
		$date_p .= "'".$rec_p->date."', ";
		$attendees_p .= $rec_p->quantity.", ";
	}
 //echo "<pre>".print_r($retVal_p,true)."</pre>";
  ?>
    <script>
 jQuery(document).ready(function() {
        var line1 = [<?php echo $attendees_p ?>];//bottom column
		var line2 = [<?php echo $amount_p ?>];
        var ticks = [<?php echo $date_p ?>];
        
        plot1 = jQuery.jqplot('total_pending', [line1, line2], {
            //stackSeries: true,
			title: '<?php _e('Pending Registrations/Transactions', 'event_espresso'); ?>',
			seriesDefaults:{
				renderer:jQuery.jqplot.BarRenderer,
                pointLabels: { show: true},
				
            },
            axes: {
                xaxis: {
                    renderer: jQuery.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
			series: [{
				label: '# Attendees'
			},
			{
				label: '<?php echo $org_options['currency_symbol'] ?> <?php _e('Amount', 'event_espresso'); ?>',
				pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
			}],

            highlighter: { show: false },
			legend: {
				show: true,
				location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
				placement: 'outsideGrid'

			},

        });
		
	
    
        jQuery('#chart1').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                jQuery('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    });</script>
  
  <!-- Incomplete Registrations/Transactions -->  
    <?php 
  $retVAl_i = array();
  $sql_i = "SELECT SUM(a.amount_pd) amount, SUM(a.quantity) quantity, DATE_FORMAT(a.date,'%b %d') date FROM wp_events_attendee a WHERE event_id =".$_REQUEST['event_id']." AND (payment_status='Incomplete' OR payment_status='Payment Declined') GROUP BY DATE_FORMAT(a.date,'%m-%d-%Y')";
  $results_i = $wpdb->get_results($sql_i);
  foreach ($results_i as $row_i) {
	$retVal_i[] = $row_i;
  }
 
  $attendees_i = '';
  $amount_i ='';
  $date_i = '';
  foreach($retVal_i as $rec_i ){
		//$label = $rec->amount." (".$rec->date.")";
		//$vals[$label] = $rec->date;
		$amount_i .= $rec_i->amount.',';
		$date_i .= "'".$rec_i->date."', ";
		$attendees_i .= $rec_i->quantity.", ";
	}
 //echo "<pre>".print_r($retVal_i,true)."</pre>";
  ?>
    <script>
 jQuery(document).ready(function() {
        var line1 = [<?php echo $attendees_i ?>];//bottom column
		var line2 = [<?php echo $amount_i ?>];
        var ticks = [<?php echo $date_i ?>];
        
        plot1 = jQuery.jqplot('total_incomplete', [line1, line2], {
            //stackSeries: true,
			title: '<?php _e('Incomplete Registrations/Transactions', 'event_espresso'); ?>',
			seriesDefaults:{
				renderer:jQuery.jqplot.BarRenderer,
                pointLabels: { show: true },
            },
            axes: {
                xaxis: {
                    renderer: jQuery.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
			series: [{
				label: '# Attendees'
			},
			{
				label: '<?php echo $org_options['currency_symbol'] ?> <?php _e('Amount', 'event_espresso'); ?>',
				pointLabels: { formatString:'<?php echo utf8_encode(html_entity_decode($org_options['currency_symbol'])); ?>%.2f' },
			}],

            highlighter: { show: false },
			legend: {
				show: true,
				location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
				placement: 'outsideGrid'

			},

        });
		
	
    
        jQuery('#chart1').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                jQuery('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    });</script>
      <div id="total_reg" style="margin-top:20px; margin-left:20px; width:600px; height:200px; float:left;"></div>
      <div id="total_completed" style="margin-top:20px; margin-left:20px; width:600px; height:200px; float:left;"></div>
      <div id="total_pending" style="margin-top:20px; margin-left:20px; width:600px; height:200px; float:left;"></div>
      <div id="total_incomplete" style="margin-top:20px; margin-left:20px; width:600px; height:200px; float:left;"></div>
      
      <div style="clear:both"></div>
    </div>
  </div>
</div>
<?php
        event_list_attendees();
}
