<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use DomainException;
use EventEspresso\core\domain\entities\routing\data_nodes\core\CurrentUser;
use EventEspresso\core\domain\entities\routing\data_nodes\core\EspressoCoreDomain;
use EventEspresso\core\domain\entities\routing\data_nodes\core\GeneralSettings;
use EventEspresso\core\domain\entities\routing\data_nodes\core\Locale;
use EventEspresso\core\domain\entities\routing\data_nodes\core\SiteCurrency;
use EventEspresso\core\domain\entities\routing\data_nodes\core\SiteUrls;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class Config
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Config extends JsonDataNode
{

    const NODE_NAME = 'config';

    /**
     * @var CurrentUser $current_user
     */
    private $current_user;

    /**
     * @var EspressoCoreDomain $core_domain
     */
    private $core_domain;

    /**
     * @var GeneralSettings $general_settings
     */
    private $general_settings;

    /**
     * @var Locale $locale
     */
    private $locale;

    /**
     * @var SiteCurrency $site_currency
     */
    private $site_currency;

    /**
     * @var SiteUrls $site_urls
     */
    private $site_urls;


    /**
     * JsonDataNode constructor.
     *
     * @param CurrentUser        $current_user
     * @param EspressoCoreDomain $core_domain
     * @param GeneralSettings    $general_settings
     * @param Locale $locale
     * @param SiteCurrency $site_currency
     * @param SiteUrls $site_urls
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(
        CurrentUser $current_user,
        EspressoCoreDomain $core_domain,
        GeneralSettings $general_settings,
        Locale $locale,
        SiteCurrency $site_currency,
        SiteUrls $site_urls,
        JsonDataNodeValidator $validator
    ) {
        parent::__construct($validator);
        $this->current_user = $current_user;
        $this->core_domain = $core_domain;
        $this->general_settings = $general_settings;
        $this->locale = $locale;
        $this->site_currency = $site_currency;
        $this->site_urls = $site_urls;
        $this->setNodeName(Config::NODE_NAME);
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    public function initialize()
    {
        $this->addDataNode($this->core_domain);
        $this->addDataNode($this->site_currency);
        $this->addDataNode($this->current_user);
        $this->addDataNode($this->general_settings);
        $this->addDataNode($this->locale);
        $this->addDataNode($this->site_urls);
        $this->addData('wp_debug', WP_DEBUG);
        $this->setInitialized(true);
    }
}
