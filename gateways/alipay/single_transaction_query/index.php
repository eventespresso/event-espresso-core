<?php
require_once("alipay_service.php");
require_once("alipay_config.php");
$parameter = array(
"service" => "single_trade_query", //the name of the service 
"partner" =>$partner,                                              
"_input_charset" => $_input_charset,                               
"out_trade_no" => "1190002593",//you must change it, this is the NO related the transaction which you want to query

);
$alipay = new alipay_service($parameter,$security_code,$sign_type);
print_r($parameter );
$link=$alipay->create_url();
print <<<EOT
<br/>
<a href= $link  target= "_blank">submit</a>
EOT;

?>

