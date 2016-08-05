<?php
namespace EventEspresso\core\services\collections;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class LooseCollection
 * A Collection for storing objects that don't all implement a common interface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class LooseCollection extends Collection
{



    /**
     * setCollectionInterface
     *
     * @access protected
     * @param  string $collection_interface
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function setCollectionInterface($collection_interface )
    {
        $this->collection_interface = '';
    }



    /**
     * add
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EE_Object_Collection::set_identifier()
     *
     * @access public
     * @param  mixed $object
     * @param  mixed $identifier
     * @return bool
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function add($object, $identifier = null)
    {
        $this->attach($object);
        $this->setIdentifier($object, $identifier);
        return $this->contains($object);
    }



}
// End of file LooseCollection.php
// Location: /LooseCollection.php