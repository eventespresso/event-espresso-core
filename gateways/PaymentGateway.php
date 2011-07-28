<?php

/**
 *
 * Payment Gateway Class
 * This class builds the payment buttons/forms
 *
 * */
if (!class_exists('PaymentGateway')) {

    abstract class PaymentGateway {

        /**
         * Holds the last error encountered
         *
         * @var string
         */
        public $lastError;
        /**
         * Do we need to log IPN results ?
         *
         * @var boolean
         */
        public $logIpn;
        /**
         * File to log IPN results
         *
         * @var string
         */
        public $ipnLogFile;
        /**
         * Payment gateway IPN response
         *
         * @var string
         */
        public $ipnResponse;
        /**
         * Are we in test mode ?
         *
         * @var boolean
         */
        public $testMode;
        /**
         * Field array to submit to gateway
         *
         * @var array
         */
        public $fields = array();
        /**
         * IPN post values as array
         *
         * @var array
         */
        public $ipnData = array();
        /**
         * Payment gateway URL
         *
         * @var string
         */
        public $gatewayUrl;

        /**
         * Initialization constructor
         *
         * @param none
         * @return void
         */
        public function __construct() {
            // Some default values of the class
            $this->lastError = '';
            $this->logIpn = TRUE;
            $this->ipnResponse = '';
            $this->testMode = FALSE;
        }

        /**
         * Adds a key=>value pair to the fields array
         *
         * @param string key of field
         * @param string value of field
         * @return
         */
        public function addField($field, $value) {
            $this->fields["$field"] = $value;
        }

        /**
         * Submit Payment Button
         *
         * Generates a form with hidden elements from the fields array
         * and displays the payment button that goes to the payment form.
         *
         * @param string value of button url
         * @param string type of gateway
         * @return void
         */
        public function submitButton($button_url, $gateway) {
            $this->prepareSubmit();
            echo '<form method="post" name="payment_form" action="' . $this->gatewayUrl . '">';
            foreach ($this->fields as $name => $value) {
                echo "<input type=\"hidden\" name=\"$name\" value=\"$value\"/>\n";
            }
            switch ($gateway) {
                case 'authnet':
                    $gateway_name = 'Authorize.net';
                    break;
                case 'paypal':
                    $gateway_name = 'PayPal';
                    break;
                case 'eway':
                    $gateway_name = 'eWay';
                    break;
                case 'mwarrior':
                    $gateway_name = 'mwarrior';
                    break;
                case '2checkout':
                    $gateway_name = '2checkout';
                    break;
            }
            echo '<td><input class="espresso_payment_button" type="image" alt="Pay using ' . $gateway_name . '" src="' . $button_url . '" /></td>';
            echo '</form>';
        }

        /**
         * Submit Payment Request (redirect)
         *
         * Generates a form with hidden elements from the fields array
         * and submits it to the payment gateway URL. The user is presented
         * a redirecting message along with a button to click.
         *
         * @param string value of buttn text
         * @return void
         */
        public function submitPayment() {
            $this->prepareSubmit();
            echo "<html>\n";
            echo "<head><title>Processing Payment...</title></head>\n";
            echo "<body onLoad=\"document.forms['gateway_form'].submit();\">\n";
            echo "<p style=\"text-align:center;\"><h2>Please wait, your order is being processed and you";
            echo " will be redirected to the payment website.</h2></p>\n";
            echo "<form method=\"POST\" name=\"gateway_form\" ";
            echo "action=\"" . $this->gatewayUrl . "\">\n";
            foreach ($this->fields as $name => $value) {
                echo "<input type=\"hidden\" name=\"$name\" value=\"$value\"/>\n";
                //echo 'Field name: ' . $name . ' Field value : ' . $value . '<br>';
            }
            echo "<p style=\"text-align:center;\"><br/><br/>If you are not automatically redirected to ";
            echo "the payment website within 5 seconds...<br/><br/>\n";
            echo "<input type=\"submit\" value=\"Click Here\"></p>\n";
            echo "</form>\n";
            echo "</body></html>\n";
        }

        /**
         * Perform any pre-posting actions
         *
         * @param none
         * @return none
         */
        protected function prepareSubmit() {
            // Fill if needed
        }

        /**
         * Enables the test mode
         *
         * @param none
         * @return none
         */
        abstract protected function enableTestMode();

        /**
         * Validate the IPN notification
         *
         * @param none
         * @return boolean
         */
        abstract protected function validateIpn();

        /**
         * Logs the IPN results
         *
         * @param boolean IPN result
         * @return void
         */
        public function logResults($success) {
            if (!$this->logIpn)
                return;
            // Timestamp

            $text = '[' . date('m/d/Y g:i A') . '] - ';
            // Success or failure being logged?

            $text .= ( $success) ? "SUCCESS!\n" : 'FAIL: ' . $this->lastError . "\n";
            // Log the POST variables

            $text .= "IPN POST Vars from gateway:\n";

            foreach ($this->ipnData as $key => $value) {
                $text .= "$key=$value, ";
            }
            // Log the response from the paypal server

            $text .= "\nIPN Response from gateway Server:\n " . $this->ipnResponse;
            // Write to log
            $fp = @fopen($this->ipnLogFile, 'a');
            @fwrite($fp, $text . "\n\n");
            @fclose($fp);
        }

        public function dump_fields() {
            // Used for debugging, this function will output all the field/value pairs
            // that are currently defined in the instance of the class using the
            // add_field() function.
            echo "<h3>PaymentGateway->dump_fields() Output:</h3>";
            echo "
			<table width=\"95%\" border=\"1\" cellpadding=\"2\" cellspacing=\"0\">
			  <tr>
				<td bgcolor=\"black\"><b><font color=\"white\">" . __('Field Name', 'event_espresso') . "</font></b></td>
				<td bgcolor=\"black\"><b><font color=\"white\">" . __('Value', 'event_espresso') . "</font></b></td>
			  </tr>";

            ksort($this->fields);
            foreach ($this->fields as $key => $value) {
                echo "
			  <tr>
				<td>$key</td>
				<td>" . urldecode($value) . "&nbsp;</td>
			  </tr>
			  ";
            }
            echo "</table>";
        }

    }

}