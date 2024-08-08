<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class EspressoCoreDomain
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EspressoCoreDomain extends JsonDataNode
{
    const NODE_NAME = 'coreDomain';

    private Domain $domain;


    /**
     * JsonDataNode constructor.
     *
     * @param Domain                $domain
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(Domain $domain, JsonDataNodeValidator $validator)
    {
        $this->domain = $domain;
        parent::__construct($validator);
        $this->setNodeName(EspressoCoreDomain::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $this->addData('assetNamespace', $this->domain->assetNamespace());
        $this->addData('brandName', Domain::brandName());
        $this->addData('coreVersion', $this->domain->version());
        $this->addData('distributionAssetsPath', $this->domain->distributionAssetsPath());
        $this->addData('distributionAssetsUrl', $this->domain->distributionAssetsUrl());
        $this->addData('isCaffeinated', $this->domain->isCaffeinated());
        $this->addData('isDecaf', $this->domain->isDecaf());
        $this->addData('isMultiSite', $this->domain->isMultiSite());
        $this->addData('pluginPath', $this->domain->pluginPath());
        $this->addData('pluginUrl', $this->domain->pluginUrl());
        $this->setInitialized(true);
    }
}
