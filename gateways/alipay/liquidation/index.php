<?php

require_once("alipay_service.php");
require_once("alipay_config.php");
$parameter = array(
"service" => "forex_liquidation_file", // the name of service
"partner" =>$partner,                                
"start_date" => "20071202",  // you should change it, it is the start day.
"end_date" => "20071209",     //you should change it, it is the end day.
                                       
);
$alipay = new alipay_service($parameter,$security_code,$sign_type);
print_r($parameter );
$link=$alipay->create_url();
print <<<EOT
<br/>
<a href= $link  target= "_blank">submit</a>
EOT;

?>

