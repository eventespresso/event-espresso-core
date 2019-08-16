<?php

use EventEspresso\core\domain\services\assets\CoreAssetManager;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 *
 * EE_Billing_Info_Form
 * Default form which can be used by payment method types for their billing info.
 * Has no default fields. Consider using EE_Billing_Attendee_Info_Form instead
 * if the billing info has billee name and address info.
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_Billing_Info_Form extends EE_Form_Section_Proper
{

    /**
     * The payment method this billing form is for
     * @var EE_Payment_Method
     */
    protected $_pm_instance;

    /*
     * Please note that there is no guarantee there's a transaction on the billing form (eg if the form were
     * initialized in the admin to just display previous answers.) So this will often be `null`.
     * @var EE_Transaction|null
     */
    protected $transaction;

    /**
     * @var EventEspresso\core\services\assets\AssetCollection $assets
     */
    protected $assets;

    /**
     * @var EventEspresso\core\domain\Domain $domain
     */
    protected $domain;

    /**
     * @var EventEspresso\core\services\assets\Registry $registry
     */
    protected $registry;


    /**
     * @param EE_Payment_Method $payment_method
     * @param array             $options_array @see EE_Form_Section_Proper::__construct()
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct(EE_Payment_Method $payment_method, $options_array = array())
    {
        $this->_pm_instance = $payment_method;
        $this->_layout_strategy = new EE_Div_Per_Section_Layout();
        if(isset($options_array['transaction']) && $options_array['transaction'] instanceof EE_Transaction){
            $this->transaction = $options_array['transaction'];
        }
        parent::__construct($options_array);
        // In the future this feature may be available to other payment methods, but for now it's only PayPal Pro.
        if ($this->_pm_instance->type() === 'Paypal_Pro') {
            add_action('wp_enqueue_scripts', array($this, 'registerCardinalCommerceJs'), 2);
            add_action('wp_enqueue_scripts', array($this, 'enqueueCardinalCommerceJs'), 10);
        }
    }



    /**
     * Sets the payment method for this billing form
     * @param EE_Payment_Method $payment_method
     * @return void
     */
    public function set_payment_method(EE_Payment_Method $payment_method)
    {
        $this->_pm_instance = $payment_method;
    }



    /**
     * Returns the instance of the payment method this billing form is for
     * @return EE_Payment_Method
     */
    public function payment_method()
    {
        return $this->_pm_instance;
    }



    /**
     * payment_fields_autofilled_notice_html
     * @return string
     */
    public function payment_fields_autofilled_notice_html()
    {
        return  new EE_Form_Section_HTML(
            EEH_HTML::p(
                apply_filters('FHEE__EE_Billing_Info_Form__payment_fields_autofilled_notice_html_text', __('Payment fields have been autofilled because you are in debug mode', 'event_espresso')),
                '',
                'important-notice'
            )
        );
    }



    /**
     * @return string
     */
    public function html_class()
    {
        return ! empty($this->_html_class) ? $this->_html_class . ' ee-billing-form' : 'ee-billing-form';
    }

    /**
     * registers JS for Cardinal Commerce to do 3D Secure Authorization.
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DuplicateCollectionIdentifierException
     * @since $VID:$
     */
    public function registerCardinalCommerceJs()
    {
        /** @var EventEspresso\core\services\assets\AssetCollection $assets */
        $this->assets = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\AssetCollection');
        /** @var EventEspresso\core\services\assets\Registry $registry */
        $this->registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');
        /** @var EventEspresso\core\domain\Domain $domain */
        $this->domain = LoaderFactory::getLoader()->getShared('EventEspresso\core\domain\Domain');

        $asset_namespace = $this->domain->assetNamespace();

        $songbird_domain = $this->_pm_instance->debug_mode()
            ? 'songbirdstag.cardinalcommerce.com'
            : 'songbird.cardinalcommerce.com';

        $cardinal_commerce_songbird = 'ee-cardinal-commerce-songbird';
        $this->assets->add(
            new JavascriptAsset(
                $cardinal_commerce_songbird,
                "https://{$songbird_domain}/edge/v1/songbird.js",
                $this->registry->getJsDependencies(
                    $asset_namespace,
                    $cardinal_commerce_songbird
                ),
                true,
                $this->domain
            ),
            $cardinal_commerce_songbird
        );

        $ee_pm_cardinal_commerce = 'eventespresso-payment-methods-cardinal-commerce';
        $this->assets->add(
            new JavascriptAsset(
                $ee_pm_cardinal_commerce,
                $this->registry->getJsUrl(
                    $asset_namespace,
                    $ee_pm_cardinal_commerce
                ),
                array_merge(
                    $this->registry->getJsDependencies(
                    $asset_namespace,
                        $ee_pm_cardinal_commerce
                    ),
                    [
                        $cardinal_commerce_songbird,
                        CoreAssetManager::JS_HANDLE_CORE,
                        CoreAssetManager::JS_HANDLE_JQUERY,
                        'single_page_checkout',
                        CoreAssetManager::JS_HANDLE_JS_CORE,
                    ]
                ),
                true,
                $this->domain
            ),
            $ee_pm_cardinal_commerce
        );

        $cruise_jwt_factory = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\payment_methods\cardinal_cruise\CardinalCruiseJwtFactory');

        $this->registry->addData(
            'cardinalCommerce',
            [
                'data' => [

                    'jwt' => $cruise_jwt_factory->generateCruiseJwt($this->transaction)
                ],
                'translations' => [
                    'no_SPCO_error' => esc_html__('It appears the Single Page Checkout javascript was not loaded properly! Please refresh the page and try again or contact support.', 'event_espresso'),
                    'no_cardinal_error' => esc_html__('It appears the Cardinal Commerce Songbird.js was not loaded properly! Please refresh the page and try again or contact support.', 'event_espresso'),
                    'invalid_response_from_cardinal' => esc_html__('Cardinal Commerce did not send a valid response. Please retry or contact the site admin.', 'event_espresso')
                ]
            ]
        );
    }

    public function enqueueCardinalCommerceJs()
    {
        wp_enqueue_script('ee-cardinal-commerce-songbird');
        wp_enqueue_script('eventespresso-payment-methods-cardinal-commerce');
    }
}

// End of file EE_Billing_Info_Form.form.php
