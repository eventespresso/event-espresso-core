<?php
namespace EventEspresso\core\domain\services;

/**
 * Interface DomainServiceInterface
 * A Domain Service is defined as follows:
 *  - a stateless object that performs an action
 *  - should have little to no dependencies
 *  - should not interact with other layers ( application or infrastructure )
 *    therefore it should not access the application framework, external APIs, etc
 *  - does not contain logic that should belong to a model,
 *    but is often logic that implements or coordinates logic from multiple models
 *
 * @package EventEspresso\core\domain\services
 */
interface DomainServiceInterface
{
}
