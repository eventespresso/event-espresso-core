<?php
if(!class_exists("Stripe")) {
	require_once (dirname(__FILE__).'/lib/Stripe.php');
}

class ClsStripe
{	
	function do_transaction($amount ,$cc, $cvc, $exp_month, $exp_year, $name, $description, $settings)
	{
		$result = array();

        $publishableKey = $settings['stripe_publishable_key'];
        $secretKey = $settings['stripe_secret_key'];
        $currencySymbol = $settings['stripe_currency_symbol'];
        //$transactionPrefix = $stripe_settings['stripe_transaction_prefix'];
		
		Stripe::setApiKey($secretKey);
		
		$charge = "unknown";
		try {
			$charge = Stripe_Charge::create(array(
					"amount"	=> $amount*100,
					"currency"	=> $currencySymbol,
					"card"		=> array(
					"number"	=> $cc,
					"exp_month"	=> $exp_month,
					"exp_year"	=> $exp_year,
					"cvc"		=> $cvc,
					"name"		=> $name
				),
				"description"	=> $description
				));
			
			$result["status"] = 1;
			$result["msg"] = "Transaction was completed successfully [Transaction ID# ".$charge->id."]";
			$result['txid'] = $charge->id;
		} catch (Exception $e) {
			$result["status"] = 0;
			$result["msg"] = "Failed to charge the card." . $e->getMessage();
		}
		
		return $result;
	}
}