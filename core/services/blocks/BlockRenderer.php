<?php
namespace EventEspresso\core\services\blocks;

use EventEspresso\core\domain\DomainInterface;

/**
 * BlockRenderer
 *
 *
 * @package EventEspresso\core\services\blocks
 * @author  Darren Ethier
 * @since   4.9.71.p
 */
abstract class BlockRenderer implements BlockRendererInterface
{

    /**
     * @var DomainInterface
     */
    protected $domain;

    /**
     * @var string
     */
    private $template_root_path;


    /**
     * BlockRenderer constructor.
     *
     * @param DomainInterface $domain
     */
    public function __construct(DomainInterface $domain)
    {
        $this->domain = $domain;
        $this->setTemplateRootPath();
    }


    /**
     * Sets the root path to the main block template.
     */
    private function setTemplateRootPath()
    {
        $this->template_root_path = $this->domain->pluginPath() . 'ui/blocks/';
    }


    /**
     * Exposes the root path for the main block template.
     * @return string
     */
    public function templateRootPath()
    {
        return $this->template_root_path;
    }
}
