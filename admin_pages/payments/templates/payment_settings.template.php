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

<?php 

echo "</form><hr>SAMPLE FORM<hr>";
//		$f = new EE_Sample_Form();
		$f = new EE_Model_Form_Section(array(
			'model'=>EEM_Country::instance(),
			'model_object'=>EEM_Country::instance()->get_one(),
			'subsections'=>array(
				'textarea'=>new EE_Text_Area_Input(),
			)
		));
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$f->receive_form_submission($_POST);
//			dd($f->get_model_object());
			if($f->is_valid()){
				echo "valido!";
				$f->save();
			}else{
				echo "invalido";
			}
		}else{
			$f->populate_defaults(array('name'=>'munchpower','shirt_size'=>'','email'=>'enter it here'));
		}
		echo "<form method='post' action=''>";
		echo $f->get_html_and_js();
		echo '<input type="submit">';
		echo "</form>";
		
