<?php
namespace EventEspresso\core\services\notices;

use EventEspresso\core\exceptions\InvalidEntityException;
use SplStack;

/**
 * NoticeConverterStack
 * Stack of converters that are used for processing notices for display.
 *
 * @package EventEspresso\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
final class NoticeConverterStack extends splStack
{


    /**
     * Validates whether the provided object instance is what this stack accepts
     *
     * @param NoticeConverterInterface $notice_converter
     * @throws InvalidEntityException
     */
    private function validate($notice_converter)
    {
        if (! $notice_converter instanceof NoticeConverterInterface) {
            throw new InvalidEntityException(
                $notice_converter,
                '\EventEspresso\core\services\notices\NoticeConverterInterface'
            );
        }
    }


    /**
     * @param mixed $index
     * @param NoticeConverterInterface $notice_converter
     * @throws InvalidEntityException
     */
    public function add($index, $notice_converter)
    {
        $this->validate($notice_converter);
        parent::add($index, $notice_converter);
    }

    /**
     * @param NoticeConverterInterface $notice_converter
     * @throws InvalidEntityException
     */
    public function push($notice_converter)
    {
        $this->validate($notice_converter);
        parent::push($notice_converter);
    }


    /**
     * @param NoticeConverterInterface $notice_converter
     * @throws InvalidEntityException
     */
    public function unshift($notice_converter)
    {
        $this->validate($notice_converter);
        parent::unshift($notice_converter);
    }


    /**
     * @param mixed $index
     * @param NoticeConverterInterface $notice_converter
     * @throws InvalidEntityException
     */
    public function offsetSet($index, $notice_converter)
    {
        $this->validate($notice_converter);
        parent::offsetSet($index, $notice_converter);
    }


    /**
     * This adds an array of provided converters to this stack.  Remember its FILO,
     * so the first array element in this array will be handled after all other array elements have been handled.
     * The last array element will be handled first (assuming there are not any converters already in this stack).
     *
     * @param array $notice_converters
     * @throws InvalidEntityException
     */
    public function addFromArray(array $notice_converters)
    {
        $this->rewind();
        foreach ($notice_converters as $notice_converter) {
            $this->push($notice_converter);
        }
    }


    /**
     * Gets the specific converter for the notice in the stack that is an instance of the provided class name.
     *
     * @param $fully_qualified_class_name
     * @return NoticeConverterInterface|null
     */
    public function getSpecificConverterByClassName($fully_qualified_class_name)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->current() instanceof $fully_qualified_class_name) {
                return $this->current();
            }
        }
        return null;
    }
}
