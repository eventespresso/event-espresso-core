<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EE_Currency_Config;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class SiteCurrency
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class SiteCurrency extends JsonDataNode
{

    const NODE_NAME = 'siteCurrency';

    /**
     * @var EE_Currency_Config $currency_config
     */
    protected $currency_config;


    /**
     * SiteCurrency constructor.
     *
     * @param EE_Currency_Config $currency_config
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(EE_Currency_Config $currency_config, JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->currency_config = $currency_config;
        $this->setNodeName(SiteCurrency::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $this->addData('code', $this->currency_config->code);
        $this->addData('singularLabel', $this->currency_config->name);
        $this->addData('pluralLabel', $this->currency_config->plural);
        $this->addData('sign', $this->currency_config->sign);
        $this->addData('signB4', $this->currency_config->sign_b4);
        $this->addData('decimalPlaces', $this->currency_config->dec_plc);
        $this->addData('decimalMark', $this->currency_config->dec_mrk);
        $this->addData('thousandsSeparator', $this->currency_config->thsnds);
        $this->setInitialized(true);
    }
}
