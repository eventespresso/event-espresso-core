<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Allow Payment-retry for Pending and Deferred Payments?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('show_pending_payment_options', $values, $show_pending_payment_options ); ?>
					
				</td>
			</tr>
		</tbody>
	</table>
	<p class="description" style="margin-left: 10px;">
		<?php _e("If a payment is marked as 'Pending Payment', or if payment is deferred (ie, an offline gateway like Check, Bank, or Invoice is used), then give registrants the option to retry payment. ", 'event_espresso'); ?>
	</p>
</div>
</form>
<?php 

echo "<hr>SAMPLE FORM<hr>";
		$f = new EE_Sample_Form();
//		$f = new EE_Model_Form_Section(array(
//			'model'=>EEM_Country::instance(),
//			'model_object'=>EEM_Country::instance()->get_one(),
//			'subsections'=>array(
//				'CNT_ISO3'=>new EE_Text_Input(array('html_help_text'=>'this is where we describe the input, if we want')),
//				'textarea'=>new EE_Text_Area_Input(),
//			),
////			'layout_strategy'=>new EE_Div_Per_Section_Layout(),
////			'include'=>array('CNT_cur_sign', 'CNT_ISO'),
//		));
//$f = new EE_Paypal_Standard_Form();
//$f = new EE_Billing_Info_Form();
//$a = EEM_Attendee::instance()->get_one();
//$f->populate_from_attendee($a);
		if ( $f->was_submitted() ) {
			$f->receive_form_submission();
			if( $f->is_valid() ) {
				echo "valido!";
				$f->save();
			}else{
				echo "invalido";
			}
		}

		echo $f->form_open();
		echo $f->get_html_and_js();
		echo $f->form_submit_button( 'Save Country Details', FALSE, 'small', 'accesskey="p"' );
		echo $f->form_close();
		
