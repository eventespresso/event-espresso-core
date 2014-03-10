<?php

class EE_Month_Input extends EE_Select_Input{
	
	function __construct( $leading_zero = false, $options = array()){
		if($leading_zero){
			$select_options = array(
			'01'=>'01',
			'02'=>'02',
			'03'=>'03',
			'04'=>'04',
			'05'=>'05',
			'06'=>'06',
			'07'=>'07',
			'08'=>'08',
			'09'=>'09',
			'10'=>'10',
			'11'=>'11',
			'12'=>'12'
			);
			parent::__construct($select_options,'string',$options);
		}else{
			$select_options = array(
				1=>'01',
				2=>'02',
				3=>'03',
				4=>'04',
				5=>'05',
				6=>'06',
				7=>'07',
				8=>'08',
				9=>'09',
				10=>'10',
				11=>'11',
				12=>'12'
			);
			parent::__construct($select_options,'int',$options);
		}
	}
}