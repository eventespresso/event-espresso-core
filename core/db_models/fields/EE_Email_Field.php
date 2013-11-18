<?php
class EE_Email_Field extends EE_Text_Field_Base{
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return sanitize_email($value_inputted_for_field_on_model_object);
	}
}
