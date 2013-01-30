<?php

function espresso_premium_feature($screen) { ?>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<div id="side-info-column" class="inner-sidebar">
			<?php do_meta_boxes("event-espresso_page_$screen", 'side', null); ?>
		</div>
		<div id="post-body">
			<div id="post-body-content">
				<?php require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/pricing_table.php'); ?>
			</div>
		</div>
	</div>
	<?php
}