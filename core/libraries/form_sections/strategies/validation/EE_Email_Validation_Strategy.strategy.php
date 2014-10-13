<?php

class EE_Email_Validation_Strategy extends EE_Text_Validation_Strategy{
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate($normalized_value) {
		if( $normalized_value && ! $this->_validate_email($normalized_value)){
			throw new EE_Validation_Error(__("Please enter a valid email address", "event_espresso"), 'required');
		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('email'=>true);
	}
	
	
	/**
	*	Validate an email address.
	*	Provide email address (raw input)
	*	@return boolean of whether the email is valid or not
	*/
private function _validate_email($email)
{
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex)
   {
      $isValid = false;
   }
   else
   {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
         // local part length exceeded
         $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
         // domain part length exceeded
         $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
         // local part starts or ends with '.'
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
         // local part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
         // character not valid in domain part
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
         // domain part has two consecutive dots
         $isValid = false;
      }
      else if
(!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',
                 str_replace("\\\\","",$local)))
      {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local)))
         {
            $isValid = false;
         }
      }
	  //don't check the DNS records... just personal preference
//      if ($isValid && !(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A")))
//      {
//         // domain not found in DNS
//         $isValid = false;
//      }
   }
   return $isValid;
}
}
