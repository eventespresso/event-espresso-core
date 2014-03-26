<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * invoice_settings_layout
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?><table class='<?php echo $form->html_class();?>' id='<?php echo $form->html_id();?>' style='<?php echo $form->html_style();?>'>
	<tr>
		<th><h4><?php _e("Invoice Display Settings", 'event_espresso');?></h4></th>
		<td>						
			<span class="description"><?php _e("The following settings affect the content and/or appearance of the downloadable PDF invoice.", 'event_espresso');?></span>
		</td>
	</tr><?php
	foreach($form->subsections() as $name=>$subsection){
		if($subsection instanceof EE_Form_Input_Base){
			echo $layout_strategy->layout_input($subsection);
		}elseif($subsection instanceof EE_Form_Section_Proper){
			echo $layout_strategy->layout_proper_subsection($subsection);
		}
	}
?></table><?php
// End of file invoice_settings_layout.template.php