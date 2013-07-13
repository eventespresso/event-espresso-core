<?php
class EE_Sample_Form extends EE_Form_Section_Proper{
	function __construct(){
		$this->_subsections = array(
			'name'=>new EE_Text_Input(array('required'=>true,'default'=>'your name here')),
			'email'=>new EE_Email_Input(array('required'=>false)),
			'shirt_size'=>new EE_Select_Input(array(''=>'Please select...', 's'=>  __("Small", "event_espresso"),'m'=>  __("Medium", "event_espresso"),'l'=>  __("Large", "event_espresso")),'string',array('required'=>true)),
			'month_normal'=>new EE_Month_Input(),
			'month_leading_zero'=>new EE_Month_Input(true),
			'year_2'=>new EE_Year_Input(false, 1, 1),
			'year_4'=>new EE_Year_Input(true, 0,10,array('default'=>'2014')),
			'yes_no'=>new EE_Yes_No_Input(array('html_label_text'=>  __("Yes or No", "event_espresso"))),
			'credit_Card'=>new EE_Credit_Card_Input(),
			'image_1'=>new EE_Admin_File_Uploader_Input(),
			'image_2'=>new EE_Admin_File_Uploader_Input()
		);
		parent::__construct();
	}
}