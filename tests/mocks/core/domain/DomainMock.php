<?php

namespace EventEspresso\tests\mocks\core\domain;

use EventEspresso\core\domain\DomainBase;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class DomainMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain
 * @author  Brent Christensen
 *
 */
class DomainMock extends DomainBase
{

    /**
     * DomainMock constructor.
     *
     * By default, is constructed the same way as normal DomainBase classes, however
     * if no arguments are provided, then will construct a default for the purpose of mock.
     *
     * @param null $file_path
     * @param null $version
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     * @throws InvalidArgumentException
     */
    public function __construct($file_path = null, $version = null)
    {
        if ($file_path instanceof FilePath
            && $version instanceof Version
        ) {
            parent::__construct($file_path, $version);
        } else {
            parent::__construct(
                new FilePath(EE_TESTS_DIR . 'mocks/core/domain/DomainMock.php'),
                Version::fromString('1.2.3.p')
            );
        }
    }


    public function returnOhYeah()
    {
        return 'Oh Yeah';
    }
}
