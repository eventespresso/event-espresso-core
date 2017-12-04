<?php

namespace EventEspresso\core\services\notices;

use Closure;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\services\collections\FilterIteratorsHelper\FilterIteratorsHelper;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class NoticesContainer
 * Container for holding multiple Notice objects until they can be processed.
 * Notices REQUIRE an identifier and the current behaviour is if there is already a notice in the system, then the
 * existing notice is returned after adding.
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.53.rc
 */
final class NoticesContainer implements NoticesContainerInterface
{


    /**
     * @var NoticesCollection
     */
    private $notices;


    /**
     * @var NoticeConverterManager
     */
    private $notice_converter;

    /**
     * NoticesContainer constructor.
     *
     * @param NoticesCollection      $notices
     * @param NoticeConverterManager $notice_converter
     */
    public function __construct(NoticesCollection $notices, NoticeConverterManager $notice_converter)
    {
        $this->notices = $notices;
        $this->notice_converter = $notice_converter;
    }


    /**
     * Generic Notice adder where the caller provides the type.  Note if the type is not a registered type then this
     * will throw an exception.
     *
     * @param string $type
     * @param string $identifier
     * @param string $message
     * @return NoticeInterface
     * @throws InvalidEntityException
     */
    public function addNotice($type, $identifier, $message)
    {
        //check if the notice already exists in the collection.
        $notice = $this->notices->get($identifier);
        if (! $notice instanceof NoticeInterface) {
            $notice = new Notice($type, $identifier, $message);
            $this->notices->add(
                $notice,
                $identifier
            );
        }
        return $notice;
    }


    /**
     * @param string $identifier
     * @param string $message
     * @return NoticeInterface
     * @throws InvalidEntityException
     */
    public function addInformation($identifier, $message)
    {
        return $this->addNotice(Notice::INFORMATION, $identifier, $message);
    }


    /**
     * @param string $identifier
     * @param string $message
     * @return NoticeInterface
     * @throws InvalidEntityException
     */
    public function addAttention($identifier, $message)
    {
        return $this->addNotice(Notice::ATTENTION, $identifier, $message);
    }


    /**
     * @param string $identifier
     * @param string $message
     * @return NoticeInterface
     * @throws InvalidEntityException
     */
    public function addError($identifier, $message)
    {
        return $this->addNotice(Notice::ERROR, $identifier, $message);
    }


    /**
     * @param string $identifier
     * @param string $message
     * @return NoticeInterface
     * @throws InvalidEntityException
     */
    public function addSuccess($identifier, $message)
    {
        return $this->addNotice(Notice::SUCCESS, $identifier, $message);
    }




    /**
     * @return boolean
     */
    public function hasInformation()
    {
        return $this->hasForType(Notice::INFORMATION);
    }



    /**
     * @return boolean
     */
    public function hasAttention()
    {
        return $this->hasForType(Notice::ATTENTION);
    }



    /**
     * @return boolean
     */
    public function hasError()
    {
        return $this->hasForType(Notice::ERROR);
    }



    /**
     * @return boolean
     */
    public function hasSuccess()
    {
        return $this->hasForType(Notice::SUCCESS);
    }


    /**
     * @param string $type
     * @return bool
     */
    public function hasForType($type)
    {
        return $this->notices->hasForType($type);
    }


    /**
     * @return int
     */
    public function countInformation()
    {
        return $this->countForType(Notice::INFORMATION);
    }



    /**
     * @return int
     */
    public function countAttention()
    {
        return $this->countForType(Notice::ATTENTION);
    }



    /**
     * @return int
     */
    public function countError()
    {
        return $this->countForType(Notice::ERROR);
    }



    /**
     * @return int
     */
    public function countSuccess()
    {
        return $this->countForType(Notice::SUCCESS);
    }


    /**
     * @param string $type
     * @return int
     */
    public function countForType($type)
    {
        return $this->notices->countForType($type);
    }


    /**
     * @return NoticeInterface[]
     */
    public function getInformation()
    {
        return $this->getNoticesForType(Notice::INFORMATION);
    }



    /**
     * @return NoticeInterface[]
     */
    public function getAttention()
    {
        return $this->getNoticesForType(Notice::ATTENTION);
    }



    /**
     * @return NoticeInterface[]
     */
    public function getError()
    {
        return $this->getNoticesForType(Notice::ERROR);
    }



    /**
     * @return NoticeInterface[]
     */
    public function getSuccess()
    {
        return $this->getNoticesForType(Notice::SUCCESS);
    }


    /**
     * @param $type
     * @return NoticeInterface[]
     */
    public function getNoticesForType($type)
    {
        return $this->notices->getForType($type);
    }


    /**
     * Returns all persistent notices stored in the container.
     *
     * @param NoticeInterface[] $notices Optionally can only get the persistent notices from the provided array of
     *                                   NoticeInterface objects
     * @return NoticeInterface[]
     */
    public function getPersistentNotices(array $notices = array())
    {
        return $this->getFilteredNotices(
            function (NoticeInterface $notice) {
                return $notice->isPersistent();
            },
            $notices
        );
    }


    /**
     * Returns the specific notice matching the given identifier
     *
     * @param string $identifier
     * @return NoticeInterface
     */
    public function getNotice($identifier)
    {
        return $this->notices->get($identifier);
    }

    /**
     * Returns all notices flagged for showing on the next request stored in the container.
     *
     * @param array NoticeInterface $notices Optionally will get the notices flagged for showing on the next request
     *                                       from the provided array of NoticeInterface objects.
     * @return NoticeInterface[]
     */
    public function getNoticesShownOnNextRequest(array $notices = array())
    {
        return $this->getFilteredNotices(
            function (NoticeInterface $notice) {
                return $notice->showOnNextRequest();
            },
            $notices
        );
    }


    /**
     * Used for filtering notices by the provided callback
     *
     * @param Closure           $callback
     * @param NoticeInterface[] $notices If not provided then the entire internal collection is used.
     * @return NoticeInterface[]
     */
    private function getFilteredNotices(Closure $callback, array $notices = array())
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $notices         = ! empty($notices) && is_array($notices) ? $notices : $this->notices;
        return $notices instanceof NoticesCollection
            ? FilterIteratorsHelper::getFilteredObjectsFromCollection($this->notices, $callback)
            : array_filter($notices, $callback);
    }



    /**
     * Runs the given converter on all the notices in the container.  If its a converter that returns the processed
     * notices, this will return them (i.e. jsonified notices).
     *
     * @param string            $notice_converter_identifier
     * @param NoticeInterface[] $notices   Optionally a specific provided array of notices can be converted.  If not
     *                                     provided then all unprocessed notices in the container will be processed by
     *                                     the converter.
     * @return NoticeInterface[]|void
     * @throws InvalidIdentifierException
     */
    public function convertNotices($notice_converter_identifier, array $notices = array())
    {
        /** @noinspection PhpInconsistentReturnPointsInspection */
        return $this->notice_converter->getNoticeConverter($notice_converter_identifier)->process($notices);
    }
}
