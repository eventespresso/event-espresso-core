<?php
namespace EventEspresso\core\services\notices;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\services\request\RequestInterface;

/**
 * NoticeConverterManager
 * This manages the initial setup and provides access to converters.
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   1.0.0
 */
class NoticeConverterManager
{

    const CONVERTER_ADMIN = 'admin_converter';
    const CONVERTER_EE_ERROR = 'ee_error_converter';
    const CONVERTER_JSON = 'json_converter';

    /**
     * @var NoticeConverterStack
     */
    private $converter_stack;


    /**
     * @var RequestInterface
     */
    private $request;


    /**
     * @var NoticeConverterInterface
     */
    private $converter_for_request;

    /**
     * NoticeConverterManager constructor.
     *
     * @param NoticeConverterStack $notice_converter_stack
     * @param RequestInterface     $request
     * @throws InvalidEntityException
     */
    public function __construct(
        NoticeConverterStack $notice_converter_stack,
        RequestInterface $request
    ) {
        $this->converter_stack = $notice_converter_stack;
        $this->request = $request;
        $this->initializeConverters();
    }


    /**
     * This creates and adds the notice converters to the stack and initializes whatever one matches this request.
     *
     * @throws InvalidEntityException
     */
    private function initializeConverters()
    {
        $this->converter_stack->addFromArray(
            $this->createAndGetConverters()
        );
        $this->converter_stack->rewind();
        //looping through the stack and the first notice converter that matches the conditions for this request is used.
        while ($this->converter_stack->valid()) {
            if ($this->converter_stack->current()->useForRequest($this->request)) {
                $this->converter_for_request = $this->converter_stack->current();
                $this->converter_for_request->setHookForRequest();
                break;
            }
        }
    }


    /**
     * Creates converters from the internal converter map and returns them in an array.
     * @return NoticeConverterInterface[]
     */
    private function createAndGetConverters()
    {
        $converters = array();
        foreach ($this->converterMap() as $identifier => $fully_qualified_class_name) {
            $converters[] = new $fully_qualified_class_name();
        }
        return $converters;
    }


    /**
     * Returns a converter for the provided identifier.
     *
     * @param string $identifier
     * @return NoticeConverterInterface
     * @throws InvalidIdentifierException
     */
    public function getNoticeConverter($identifier)
    {
        $map = $this->converterMap();
        if (! isset($map[$identifier])) {
            throw new InvalidIdentifierException(
                '',
                '',
                sprintf(
                    esc_html__(
                        'There is no %1$s class registered with the provided identifier of %2$s',
                        'event_espresso'
                    ),
                    'EventEspresso\core\services\notices\NoticeConverterInterface',
                    $identifier
                )
            );
        }
        return $this->converter_stack->getSpecificConverterByClassName($map[$identifier]);
    }



    /**
     * This returns whatever notice converter was automatically set for the current request.  Note, this might not be
     * set if there are no registered converters set to automatically load for the current request.
     *
     * @return NoticeConverterInterface|null
     */
    public function getNoticeConverterForRequest()
    {
        return $this->converter_for_request;
    }


    /**
     * A map of identifiers to a converter.
     *
     * @return array
     */
    private function converterMap()
    {
        $non_filtered_protected = array(
            self::CONVERTER_JSON => 'EventEspresso\core\services\notices\ConvertNoticesToJson',
            self::CONVERTER_EE_ERROR => 'EventEspresso\core\services\notices\ConvertNoticesToEeErrors',
            self::CONVERTER_ADMIN => 'EventEspresso\core\services\notices\ConvertNoticesToAdminNotices',
        );
        $custom = (array) apply_filters(
            'FHEE__EventEspresso_core_services_notices_NoticeConverterManager__converterMap',
            array()
        );
        /** @noinspection AdditionOperationOnArraysInspection */
        return $non_filtered_protected + $custom;
    }
}
