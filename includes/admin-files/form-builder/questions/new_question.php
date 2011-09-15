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

    <ul>
				<li>
					<label for="question"><?php _e('Question:','event_espresso'); ?><em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label>
					<input class="question-name"  name="question" id="question" size="50" value="" type="text" />
				</li>
    
				<li>
					<label for="question_type"><?php _e('Type:','event_espresso'); ?></label>
  				<select name="question_type" id="question_type">
  			  	<option value="TEXT">Text</option>
  			  	<option value="TEXTAREA">Text Area</option>
  			  	<option value="SINGLE">Radio Button</option>
  			  	<option value="MULTIPLE">Checkbox</option>
  			  	<option value="DROPDOWN">Drop Down</option>
  				</select>
				</li>
				<li>
					<label for="values"><?php _e('Values:','event_espresso'); ?></label>
					<input name="values" id="values" size="50" value="" type="text" />
					<p class="input-info"> <?php _e('A comma seperated list of values. Eg. black, blue, red', 'event_espresso'); ?></p>
				</li>
				
				<li>
					<input name="required" id="required" type="checkbox" />
					<label class="inline" for="required"><?php _e('Required:','event_espresso'); ?></label>
				</li>
				
				<li>				
					<input name="admin_only" id="admin_only" type="checkbox" />
					<label class="inline" for="admin_only"><?php _e(' Admin view only:','event_espresso'); ?></label>
				</li>
				
				<li>
					<label for="required_text"><?php _e('Required Text:','event_espresso'); ?></label>
         <input name="required_text" id="required_text" size="50" type="text" /> 
						<p class="input-info"><?php _e('Text to display if not completed.', 'event_espresso'); ?></p>
				
				</li>
					<label for="sequence"><?php   _e('Order/Sequence:','event_espresso'); ?></label>
          <input name="sequence" id="sequence" size="50" value="<?php if(isset($sequence)) echo $sequence; ?>" type="text" />
				</li>
            

    </ul>
			<p class="submit-footer">
				<input name="action" value="insert" type="hidden" />
				<input name="Submit" value="Add Question" type="submit" />
			</p>  
		</form>
	</div>
</div>
</div>
<?php
}