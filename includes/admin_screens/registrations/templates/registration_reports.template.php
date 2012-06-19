<?php //printr( $reg_reports, '$reg_reports' ); ?>
	
<?php foreach ( $reg_reports as $report) : ?>

	<div id="<?php echo $report; ?>" class="reg-admin-report-chart-dv" style="width:95%; min-height:420px; margin:20px 4% 40px 1%;"></div>
	
<?php endforeach; ?>
