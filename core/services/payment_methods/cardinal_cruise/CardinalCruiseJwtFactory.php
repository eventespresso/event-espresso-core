<?php

namespace EventEspresso\core\services\payment_methods\cardinal_cruise;

use EE_Currency_Config;
use EE_Registration_Config;
use EE_Transaction;

/**
 * Class CardinalCruiseJwt
 *
 * Class for creating the JWT to send to Cardinal Cruise.
 * Inspired from the WooCommerce extension "3-D Secure Payment Gateway by CardinalCommerce"'s Gateway.php
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class CardinalCruiseJwtFactory
{
    /**
     * @var EE_Registration_Config
     */
    private $reg_config;
    /**
     * @var EE_Currency_Config
     */
    private $currency_config;

    /**
     * CardinalCruiseJwt constructor.
     * @param EE_Registration_Config $reg_config
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(
        EE_Registration_Config $reg_config,
        EE_Currency_Config $currency_config
    )
    {

        $this->reg_config = $reg_config;
        $this->currency_config = $currency_config;
    }

    /**
     * Gets the JWT string to send to Cardinal Commerce
     * @since $VID:$
     * @param EE_Transaction|null $transaction
     * @return string
     */
    public function generateCruiseJwt(EE_Transaction $transaction = null)
    {
        $iat = time();
        $data = array(
            'jti' => uniqid(),
            'iat' => $iat,
            'exp' => $iat + 7200,
            'iss' => $this->reg_config->cardinal_commerce_api_identifier,
            'OrgUnitId' => $this->reg_config->cardinal_commerce_api_org_unit_id,
        );
        if ($transaction) {
            $payload = $this->createRequestOrderObject($transaction);
            $data['Payload'] = $payload;
            $data['ObjectifyPayload'] = true;
        }
        $rv = $this->generateJwtFromData($data);
        return $rv;
    }

    private function createRequestOrderObject(EE_Transaction $transaction)
    {
        $currency_alpha = $this->currency_config->code;
        $raw_amount = $this->prepareAmountForCardinalCommerce($transaction->remaining(), $currency_alpha);

        $request_order_object = array(
//        "Consumer" => array(
////            "BillingAddress" => array(
////                "FirstName" => $order->get_billing_first_name(),
////                "LastName" => $order->get_billing_last_name(),
////                "Address1" => $order->get_billing_address_1(),
////                "Address2" => $order->get_billing_address_2(),
////                "City" => $order->get_billing_city(),
////                "State" => $order->get_billing_state(),
////                "PostalCode" => $order->get_billing_postcode(),
////                "CountryCode" => $order->get_billing_country(),
////                "Phone1" => $order->get_billing_phone(),
////            ),
////            "ShippingAddress" => array(
////                "FirstName" => $order->get_shipping_first_name(),
////                "LastName" => $order->get_shipping_last_name(),
////                "Address1" => $order->get_shipping_address_1(),
////                "Address2" => $order->get_shipping_address_2(),
////                "City" => $order->get_shipping_city(),
////                "State" => $order->get_shipping_state(),
////                "PostalCode" => $order->get_shipping_postcode(),
////                "CountryCode" => $order->get_shipping_country(),
////            ),
////            "Email1" => $order->get_billing_email(),
////        ),
            "OrderDetails" => array(
                "OrderNumber" => $transaction->ID(),
                "Amount" => $raw_amount,
                "CurrencyCode" => $currency_alpha,
                "OrderChannel" => "S",
            ),
            "Options" => array(
                "EnableCCA" => true,
            ),
        );

        return $request_order_object;
    }

    private function signJwt($header, $body)
    {
        $secret = $this->reg_config->cardinal_commerce_api_key;
        $plaintext = $header . '.' . $body;
        return $this->base64EncodeUrlSafe(hash_hmac(
            'sha256', $plaintext, $secret, true));
    }

    private static function base64EncodeUrlSafe($source)
    {
        $rv = base64_encode($source);
        $rv = str_replace('=', '', $rv);
        $rv = str_replace('+', '-', $rv);
        $rv = str_replace('/', '_', $rv);
        return $rv;
    }

    private function generateJwtFromData($data)
    {
        $header = $this->base64EncodeUrlSafe(json_encode(array(
            'alg' => 'HS256', 'typ' => 'JWT'
        )));
        $body = $this->base64EncodeUrlSafe(json_encode($data));
        $signature = $this->signJwt($header, $body);
        return $header . '.' . $body . '.' . $signature;
    }

    protected function prepareAmountForCardinalCommerce($amount, $currency_alpha)
    {
        $float_amount = (float) $amount;
        $exponent = $this->currencyDecimalPlaces($currency_alpha);
        $int_amount = (int) round($float_amount * pow(10, $exponent));
        return (string) $int_amount;
    }

    public static function currencyDecimalPlaces($alpha)
    {
        if (in_array($alpha, array(
            'ADP', 'BEF', 'BIF', 'BYR', 'CLP', 'DJF', 'ESP', 'GNF', 'ISK',
            'ITL', 'JPY', 'KMF', 'KRW', 'LUF', 'MGF', 'PTE', 'PYG', 'RWF',
            'TPE', 'TRL', 'UYI', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
        ))) {
            return 0;
        } elseif (in_array($alpha, array(
            'BHD', 'CSD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND',
        ))) {
            return 3;
        } elseif ($alpha == 'CLF') {
            return 4;
        }
        return 2;
    }
}
// End of file CardinalCruiseJwt.php
// Location: ${NAMESPACE}/CardinalCruiseJwt.php
