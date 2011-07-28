<?php

/**
 * eway Class
 *
 * Author 		Seth Shoultes
 * @package		Event Espresso eway Gateway
 * @category	Library
 */
$eway_gateway_version = '1.0';

class eway extends PaymentGateway {

    /**
     * Initialize the eway gateway
     *
     * @param none
     * @return void
     */
    public function __construct() {
        parent::__construct();
        // Some default values of the class
        $this->gatewayUrl = 'https://au.ewaygateway.com/Request/';
        // Populate $fields array with a few default
    }

    public function enableTestMode() {
        $this->testMode = TRUE;
    }

    protected function prepareSubmit() {
        $ewayurl = "?CustomerID=" . $this->fields['CustomerID'];
        $ewayurl .= "&UserName=" . $this->fields['UserName'];
        $ewayurl .= "&Amount=" . $this->fields['Amount'];
        $ewayurl .= "&Currency=" . $this->fields['Currency'];
        $ewayurl .= "&ReturnURL=" . str_replace("&", "%26", $this->fields['ReturnURL']);
        $ewayurl .= "&CancelURL=" . $this->fields['CancelURL'];
        $spacereplace = str_replace(" ", "%20", $ewayurl);
        $posturl = $this->gatewayUrl.$spacereplace;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $posturl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

        $response = curl_exec($ch);

        function fetch_data($string, $start_tag, $end_tag) {
            $position = stripos($string, $start_tag);
            $str = substr($string, $position);
            $str_second = substr($str, strlen($start_tag));
            $second_positon = stripos($str_second, $end_tag);
            $str_third = substr($str_second, 0, $second_positon);
            $fetch_data = trim($str_third);
            return $fetch_data;
        }

        $responsemode = fetch_data($response, '<result>', '</result>');
        $responseurl = fetch_data($response, '<uri>', '</uri>');

        if ($responsemode == "True") {
            $this->gatewayUrl=$responseurl;
        } else {
            echo "ERROR";
        }
    }
    public function submitButton($button_url, $gateway) {
        $this->prepareSubmit();
        echo '<form method="post" name="payment_form" action="' . $this->gatewayUrl . '">';
        echo '<td><input class="espresso_payment_button" type="image" alt="Pay using eWay" src="' . $button_url . '" /></td>';
        echo '</form>';
    }

    /**
     * Validate the IPN notification
     *
     * @param none
     * @return boolean
     */
    public function validateIpn() {

        if (function_exists('curl_init')) {
            //new eway code//
            // parse the eway URL
            $urlParsed = parse_url($this->gatewayUrl);

            // generate the post string from the _POST vars
            $req = '';

            // Run through the posted array
            foreach ($_POST as $key => $value) {
                $this->ipnData["$key"] = $value;
                $value = urlencode(stripslashes($value));
                $value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
                $req .= $key . '=' . $value . '&';
            }
            $req .= 'cmd=_notify-validate';
            $url = $this->gatewayUrl;
            $ch = curl_init();    // Starts the curl handler
            curl_setopt($ch, CURLOPT_URL, $url); // Sets the eway address for curl
            curl_setopt($ch, CURLOPT_FAILONERROR, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Returns result to a variable instead of echoing
            curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Sets a time limit for curl in seconds (do not set too low)
            curl_setopt($ch, CURLOPT_POST, 1); // Set curl to send data using post
            curl_setopt($ch, CURLOPT_POSTFIELDS, $req); // Add the request parameters to the post
            $result = curl_exec($ch); // run the curl process (and return the result to $result
            curl_close($ch);

            if (strcmp($result, "VERIFIED") == 0) { // It may seem strange but this function returns 0 if the result matches the string So you MUST check it is 0 and not just do strcmp ($result, "VERIFIED") (the if will fail as it will equate the result as false)
                // Do some checks to ensure that the payment has been sent to the correct person
                // Check and ensure currency and amount are correct
                // Check that the transaction has not been processed before
                // Ensure the payment is complete
                // Valid IPN transaction.
                $this->logResults(true);
                return true;
            } else {
                // Log an invalid request to look into
                // Invalid IPN transaction.  Check the log for details.
                $this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
                $this->logResults(false);
                return false;
            }
        } else {

            //Old eway code
            // parse the eway URL
            $urlParsed = parse_url($this->gatewayUrl);
            // generate the post string from the _POST vars
            $postString = '';
            foreach ($_POST as $field => $value) {
                $this->ipnData["$key"] = $value;
                $value = urlencode(stripslashes($value));
                $value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
                $req .= $key . '=' . $value . '&';
            }
            $postString .="cmd=_notify-validate"; // append ipn command
            // open the connection to eway
            $fp = fsockopen($urlParsed[host], "80", $errNum, $errStr, 30);
            if (!$fp) {
                // Could not open the connection, log error if enabled
                $this->lastError = "fsockopen error no. $errNum: $errStr";
                $this->logResults(false);
                return false;
            } else {
                // Post the data back to eway
                fputs($fp, "POST $urlParsed[path] HTTP/1.1\r\n");
                fputs($fp, "Host: $urlParsed[host]\r\n");
                fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
                fputs($fp, "Content-length: " . strlen($postString) . "\r\n");
                fputs($fp, "Connection: close\r\n\r\n");
                fputs($fp, $postString . "\r\n\r\n");
                // loop through the response from the server and append to variable
                while (!feof($fp)) {
                    $this->ipnResponse .= fgets($fp, 1024);
                }
                fclose($fp); // close connection
            }
            if (eregi("VERIFIED", $this->ipnResponse)) {
                // Valid IPN transaction.
                $this->logResults(true);
                return true;
            } else {
                // Invalid IPN transaction.  Check the log for details.
                $this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
                $this->logResults(false);
                return false;
            }
        }
    }

}