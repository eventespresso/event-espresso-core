<?php
//Function for editing existing questions
function event_espresso_form_builder_edit(){
	global $wpdb;
	$question_id = $_REQUEST['question_id'];
	$sql = "SELECT * FROM " . EVENTS_QUESTION_TABLE . " WHERE id = '" . $question_id . "'";
	$questions = $wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {
		foreach ($questions as $question) {
			$question_id = $question->id;
			$question_name = stripslashes($question->question);
			$question_values = stripslashes($question->response);
			$question_type = stripslashes($question->question_type);
			$required = stripslashes($question->required);
			$sequence = $question->sequence;
			$required_text = $question->required_text;
			$admin_only = $question->admin_only;
			$system_name = $question->system_name;
			if ($question->system_name !=''){
				$system_question = true;
			}
?>

<div class="metabox-holder">
  <div class="postbox">
    <div class="handlediv" title="Click to toggle"><br>
    </div>
    <h3 class="hndle"><span>
      <?php _e('Edit Question','event_espresso'); ?>
      </span></h3>
      <div class="inside">
    <form id="edit-new-question-form" name="newquestion" method="post" action="<?php echo $_SERVER["REQUEST_URI"]?>">
      
					<p class="intro"> <?php _e('Edit the question using the form below.  By default all participants will be asked for their first name, last name, and email address.','event_espresso'); ?></p>
        			<?php
                    if ($system_question == true){
                    	echo '<p class="inform">'.__('Attention: This is a "System Question", some settings may be disabled.','event_espresso').'</p>'; 
					}
					?>
				
				<ul>
					<li>
          <label for="question"><?php _e('Question:','event_espresso'); ?></label>
          <input name="question" id="question" size="50" value="<?php echo $question_name; ?>" type="text">
        </li>
       
				  <li>
          <label for="question_type"><?php _e('Type:','event_espresso'); ?></label>
         <?php
						$values	=	array(					
							array('id'=>'TEXT','text'=> __('Text','event_espresso')),
							array('id'=>'TEXTAREA','text'=> __('Text Area','event_espresso')),
							array('id'=>'SINGLE','text'=> __('Single','event_espresso')),
							array('id'=>'DROPDOWN','text'=> __('Drop Down','event_espresso')),
							array('id'=>'MULTIPLE','text'=> __('Multiple','event_espresso'))
							);
						if ($system_question == true){
							$values=array(array('id'=>'TEXT','text'=> __('Text','event_espresso')));
						}
					
						echo select_input('question_type', $values, $question_type); 
					?>
					</li>
       
					<li>
          <label for="values"><?php _e('Values:','event_espresso'); ?></label>
          <input name="values" id="values" size="50" value="<?php echo $question_values; ?>" type="text" />
						<p class="input-info"><?php _e('A comma seperated list of values. Eg. black, blue, red', 'event_espresso'); ?></p>
					</li>
        
					<li>
						<label for="required"><?php _e('Required:','event_espresso'); ?></label>
							<p class="input-info"><?php _e('Mark this question as required.', 'event_espresso'); ?></p>
          	<?php 
							$values=array(					
							array('id'=>'Y','text'=> __('Yes','event_espresso')),
							array('id'=>'N','text'=> __('No','event_espresso'))
							);	
							if ($system_question == true && ($system_name =='fname'||$system_name =='lname'||$system_name =='email')){
								$values=array(array('id'=>'Y','text'=> __('Yes','event_espresso')));
							}		
							echo select_input('required', $values, $required); ?>
					</li>
        
					<li>
          <label for="admin_only">
            <?php _e('Admin View Only:','event_espresso'); ?>
          </label>
						<p class="input-info"><?php _e('Only the administrator can see this field.', 'event_espresso'); ?></p>
						<?php
						$values=array(
						array('id'=>'Y','text'=> __('Yes','event_espresso')),
						array('id'=>'N','text'=> __('No','event_espresso'))
						);
						if ($system_question == true && ($system_name =='fname'||$system_name =='lname'||$system_name =='email')){
						$values=array(array('id'=>'N','text'=> __('No','event_espresso')));
						}
			echo select_input('admin_only', $values, $admin_only);
		?>
        </li>
        
					<li>
						<label for="required_text"><?php _e('Required Text:','event_espresso'); ?></label>
						<input name="required_text" id="required_text" size="50" value="<?php echo $required_text; ?>" type="text" />
						<p class="input-info"><?php _e('Text displayed if not completed.', 'event_espresso'); ?></p>
        </li>
        
					<li>
          <label for="sequence"><?php _e('Order/Sequence:','event_espresso'); ?></label>
          <input name="sequence" id="sequence" size="50" value="<?php echo $sequence; ?>" type="text" />
        </li>
				</ul>
      
				<p class="submit-footer">  
					<input name="edit_action" value="update" type="hidden">
        <input type="hidden" name="action" value="edit_question">
        <input name="question_id" value="<?php echo $question_id; ?>" type="hidden">
        
					<input  name="Submit" value="Update Question" type="submit">
				</p>
    </form>
    </div>
  </div>
</div>
<?php
		}
	}else{
		 _e('Nothing found!','event_espresso');
	}
}