<?php
/**
	*����alipay_service
	*���ܣ�֧�����ⲿ����ӿڿ���
	*�汾��2.0
	*���ڣ�2009-01-05
	*���ߣ�֧������˾���۲�����֧���Ŷ�
	*��ϵ��0571-26888888
	*��Ȩ��֧������˾
*/

class alipay_service {

	var $gateway = "http://www.alipay.net/cooperate/gateway.do?";		 //֧���ӿ�
	var $parameter;	   //ȫ����Ҫ���ݵĲ���
	var $security_code;   //��ȫУ����
	var $mysign;		  //ǩ��

	//����֧�����ⲿ����ӿڿ���
	function alipay_service($parameter,$security_code,$sign_type = "MD5",$transport= "https") {
		$this->parameter	  = $this->para_filter($parameter);
		$this->security_code  = $security_code;
		$this->sign_type	  = $sign_type;
		$this->mysign		 = '';
		$this->transport	  = $transport;
		if($parameter['_input_charset'] == "")
		$this->parameter['_input_charset']='GBK';
		if($this->transport == "https") {
			$this->gateway = "http://www.alipay.net/cooperate/gateway.do?";
		} else $this->gateway = "http://www.alipay.net/cooperate/gateway.do?";
		$sort_array  = array();
		$arg		 = "";
		$sort_array  = $this->arg_sort($this->parameter);
		while (list ($key, $val) = each ($sort_array)) {
			$arg.=$key."=".$val."&";
		}
		$prestr = substr($arg,0,count($arg)-2);  //ȥ�����һ���ʺ�
		$this->mysign = $this->sign($prestr.$this->security_code);
	}

	function create_url() {
		$url		 = $this->gateway;
		$sort_array  = array();
		$arg		 = "";
		$sort_array  = $this->arg_sort($this->parameter);
		while (list ($key, $val) = each ($sort_array)) {
			$arg.=$key."=".urlencode($val)."&";
		}
		$url.= $arg."sign=" .$this->mysign ."&sign_type=".$this->sign_type;
		return $url;
	}

	function arg_sort($array) {
		ksort($array);
		reset($array);
		return $array;
	}

	function sign($prestr) {
		$mysign = "";
		if($this->sign_type == 'MD5') {
			$mysign = md5($prestr);
		}elseif($this->sign_type =='DSA') {
			//DSA ǩ�������
			die("DSA ǩ�������������ʹ��MD5ǩ��ʽ");
		}else {
			die("֧�����ݲ�֧��".$this->sign_type."���͵�ǩ��ʽ");
		}
		return $mysign;
	}
	function para_filter($parameter) { //��ȥ�����еĿ�ֵ��ǩ��ģʽ
		$para = array();
		while (list ($key, $val) = each ($parameter)) {
			if($key == "sign" || $key == "sign_type" || $val == "")continue;
			else	$para[$key] = $parameter[$key];
		}
		return $para;
	}
	//ʵ�ֶ����ַ���뷽ʽ
	//function charset_encode($input,$_output_charset ,$_input_charset ="GBK" ) {
		//$output = "";
		////if(!isset($_output_charset) )$_output_charset  = $this->parameter['_input_charset '];
		//if($_input_charset == $_output_charset || $input ==null) {
			//$output = $input;
		//} elseif (function_exists("mb_convert_encoding")){
		//	$output = mb_convert_encoding($input,$_output_charset,$_input_charset);
		//} elseif(function_exists("iconv")) {
			//$output = iconv($_input_charset,$_output_charset,$input);
		//} else die("sorry, you have no libs support for charset change.");
		//return $output;
	//}
}
?>