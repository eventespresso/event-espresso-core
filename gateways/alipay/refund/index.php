<?php

require_once("alipay_service.php");
require_once("alipay_config.php");
$parameter = array(
"service" => "forex_refund_file", //the name of service
"partner" =>$partner,			 
"_input_charset" => $_input_charset,   
//********************************************************************
);
$alipay = new alipay_service($parameter,$security_code,$sign_type);
print_r($parameter ); 
$link=$alipay->create_url();
print <<<EOT
<br/>
<a href= $link ></a>
EOT;

?>
<html>
<head>
<title>Alipay</title>
</head>
<body>

		<form name="alipaysubmit" enctype="multipart/form-data"  target="_blank" method="post" action="https://www.alipay.com/cooperate/gateway.do?">	
		   <input type="hidden" name="_input_charset" value="<?php echo $parameter['_input_charset'] ?>">
			<input type="hidden" name="partner" value="<?php echo $parameter['partner'] ?>">
			<input type="hidden" name="service" value="forex_refund_file">
			<input type="hidden" name="sign" value="<?php echo $alipay->signParams() ?>"> 
			<input type="hidden" name="sign_type" value="MD5">	  
			<input type="file" name="refund_file" >
			<input type="submit" value="Upload File">
		</form>
		<table>
		<tr>
		<td>
		</td>
		</tr>
		</table>
		
 
</body>
</html>
