<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes;

use DomainException;
use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\routing\data_nodes\core\Api;
use EventEspresso\core\domain\entities\routing\data_nodes\core\Config;
use EventEspresso\core\services\assets\JedLocaleData;
use EventEspresso\core\services\json\PrimaryJsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class EventEspressoData
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventEspressoData extends PrimaryJsonDataNode
{
    const NODE_NAME = 'eventEspressoData';

    /**
     * @var Api $api
     */
    private $api;

    /**
     * @var Config $config
     */
    private $config;

    /**
     * @var JedLocaleData $jed_locale
     */
    private $jed_locale;


    /**
     * @param Api $api
     * @param Config $config
     * @param JedLocaleData         $jed_locale
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(Api $api, Config $config, JedLocaleData $jed_locale, JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->api = $api;
        $this->config = $config;
        $this->jed_locale = $jed_locale;
        $this->setNodeName(EventEspressoData::NODE_NAME);
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    public function initialize()
    {
        $this->addDataNode($this->api);
        $this->addDataNode($this->config);
        $this->addData('i18n', $this->jed_locale->getData(Domain::TEXT_DOMAIN));
        $this->setInitialized(true);
    }
}
