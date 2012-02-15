<?php
require_once("alipay_service.php");
require_once("alipay_config.php");
$parameter = array(
"service" => "forex_compare_file", // the name of service 
"partner" =>$partner,				 
"start_date" => "20090326",  // you should change it, this is the start day which you shoul set.
"end_date" => "20090320",	 //you should change it, this is the end day which you shoul set.
);
$alipay = new alipay_service($parameter,$security_code,$sign_type);
print_r($parameter );
$link=$alipay->create_url();
print <<<EOT
<br/>
<a href= $link  target= "_blank">submit</a>
EOT;

?>

