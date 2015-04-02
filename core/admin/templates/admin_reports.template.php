<?php //EEH_Debug_Tools::printr( $admin_reports, '$admin_reports' ); ?>

<?php foreach ( $admin_reports as $report) : ?>

	<div id="<?php echo $report; ?>" class="admin-report-chart-dv" style="width:95%; min-height:420px; margin:20px 4% 40px 1%;"></div>

<?php endforeach; ?>
