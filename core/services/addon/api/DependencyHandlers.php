<?php

namespace EventEspresso\core\services\addon\api;

use DomainException;
use EE_Dependency_Map;
use EventEspresso\core\services\dependencies\DependencyHandlerInterface;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class DependencyHandlers
 * for tracking and loading dependency handlers for add-ons
 * Dependency handlers are classes that implement the DependencyHandlerInterface
 *
 * @package EventEspresso\core\services\addon\api
 * @since 5.0.30.p
 */
class DependencyHandlers
{
    private EE_Dependency_Map $dependency_map;

    /**
     * array of fully qualified class names for dependency handlers where keys are add-on slugs
     * @var string[][]
     */
    private array $dependency_handlers = [];


    public function __construct(EE_Dependency_Map $dependency_map)
    {
        $this->dependency_map = $dependency_map;
    }


    public function addDependencyHandlerFor(string $dependency_handler_fqcn, string $addon_slug)
    {
        if (! isset($this->dependency_handlers[ $addon_slug ])) {
            $this->dependency_handlers[ $addon_slug ] = [];
        }
        $this->dependency_handlers[ $addon_slug ][] = $dependency_handler_fqcn;
    }


    public function registerDependenciesFor(string $addon_slug)
    {
        if (isset($this->dependency_handlers[ $addon_slug ])) {
            foreach ($this->dependency_handlers[ $addon_slug ] as $dependency_handler_fqcn) {
                $dependency_handler = LoaderFactory::getNew($dependency_handler_fqcn, [$this->dependency_map]);
                if (! $dependency_handler instanceof DependencyHandlerInterface) {
                    throw new DomainException(
                        sprintf(
                            esc_html__('The dependency handler class %1$s must implement %2$s', 'event_espresso'),
                            $dependency_handler_fqcn,
                            DependencyHandlerInterface::class
                        )
                    );
                }
                $dependency_handler->registerDependencies();
            }
        }
    }
}
