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
	<?php
	$inputs_to_show = array_intersect_key($form->inputs(),array_flip(array('PMD_ID', 'PMD_name','PMD_desc','PMD_admin_name','PMD_admin_desc', 'PMD_type','PMD_slug', 'PMD_open_by_default','PMD_button_url')));
	foreach($inputs_to_show as $input){
		echo $layout_strategy->layout_input($input);
	}
	?>
	<tr>
		<th><h4><?php _e("Invoice Display Settings", 'event_espresso');?></h4></th>
		<td>						
			<span class="description"><?php _e("The following settings affect the content and/or appearance of the downloadable PDF invoice.", 'event_espresso');?></span>
		</td>
	</tr><?php
	$inputs_to_show = array_intersect_key($form->inputs(),array_flip(array('pdf_stylesheet','pdf_instructions','pdf_logo_image')));
	foreach($inputs_to_show as $input){
		echo $layout_strategy->layout_input($input);
	}
	?><tr>
		<th><h4><?php _e("Invoice Gateway Settings", 'event_espresso');?></h4></th>
		<td>						
			<span class="description"><?php _e("The following settings affect the functioning of the Invoice gateway.", 'event_espresso');?></span>
		</td>
	</tr>
	<?php
	$inputs_to_show = array_intersect_key($form->inputs(),array_flip(array('show_on_page', 'page_title','page_instructions','page_payable_to','page_address_payable')));
	foreach($inputs_to_show as $input){
		echo $layout_strategy->layout_input($input);
	}
//	foreach($form->subsections() as $name=>$subsection){
//		if($subsection instanceof EE_Form_Input_Base){
//			echo $layout_strategy->layout_input($subsection);
//		}elseif($subsection instanceof EE_Form_Section_Proper){
//			echo $layout_strategy->layout_proper_subsection($subsection);
//		}
//	}
?></table><?php
// End of file invoice_settings_layout.template.php