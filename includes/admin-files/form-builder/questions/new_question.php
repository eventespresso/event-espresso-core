<?php
//Function for adding new questions
function event_espresso_form_builder_new(){
?>
<div class="metabox-holder">
  <div class="postbox">
		<div title="Click to toggle" class="handlediv"><br /></div>
	  <h3 class="hndle"><?php _e('Add New Questions','event_espresso'); ?></h3>
   <div class="inside">
			<p class="intro"><?php _e('Add questions using the form below.  By default all participants will be asked for their first name, last name, and email address.','event_espresso'); ?></p>
			<form name="newquestion" method="post" action="" id="new-question-form">

			<table class="form-table">
				<tbody>
					<tr>
						<th>
							<label for="question"><?php _e('Question:','event_espresso'); ?><em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label>
						</th>
						<td>
							<input class="question-name"  name="question" id="question" size="50" value="" type="text" />
						</td>
					</tr>
					<tr>
						<th id="question-type-select">
							<label for="question_type"><?php _e('Type:','event_espresso'); ?></label>
						</th>
						<td>
  					<select name="question_type" id="question_type" class="chzn-select wide">
  			  		<option value="TEXT">Text</option>
  			  		<option value="TEXTAREA">Text Area</option>
  			  		<option value="SINGLE">Radio Button</option>
  			  		<option value="MULTIPLE">Checkbox</option>
  			  		<option value="DROPDOWN">Drop Down</option>
  					</select>
						</td>
					</tr>
					<tr id="add-question-values">
						<th>
							<label for="values"><?php _e('Values:','event_espresso'); ?></label>
						</th>
						<td>
							<input name="values" id="values" size="50" value="" type="text" />
							<p class="input-info"> <?php _e('A comma seperated list of values. Eg. black, blue, red', 'event_espresso'); ?></p>
						</td>
					</tr>
					<tr>
						<th>
							<label class="inline" for="required"><?php _e('Required:','event_espresso'); ?></label>
						</th>
						<td>
							<input name="required" id="required" type="checkbox" />
						</td>
					</tr>
					<tr>
						<th>				
							<label class="inline" for="admin_only"><?php _e(' Admin view only:','event_espresso'); ?></label>
						</th>
						<td>
							<input name="admin_only" id="admin_only" type="checkbox" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="required_text"><?php _e('Required Text:','event_espresso'); ?></label>
						</th>
						<td>
		 					<input name="required_text" id="required_text" size="50" type="text" /> 
							<p class="input-info"><?php _e('Text to display if not completed.', 'event_espresso'); ?></p>
						</td>
					</tr>
					<tr>
						<th>
							<label for="sequence"><?php   _e('Order/Sequence:','event_espresso'); ?></label>
						</th>
						<td>
		  				<input name="sequence" id="sequence" size="50" value="<?php if(isset($sequence)) echo $sequence; ?>" type="text" />
						</td>
					</tr>
				</tbody>
			</table>
		<p class="submit-footer">
			<input name="action" value="insert" type="hidden" />
			<input class="button-primary" name="Submit" value="Add Question" type="submit" />
			<?php wp_nonce_field( 'espresso_form_check', 'add_new_question' ); ?>
		</p>  
		</form>
	</div>
</div>
</div>
<?php
}