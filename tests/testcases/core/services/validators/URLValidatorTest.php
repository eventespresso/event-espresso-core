<?php
namespace EventEspresso\tests\core\services\validators;
use \EE_UnitTestCase;
use EventEspresso\core\services\validators\URLValidator;

/**
 * Class URLValidatorTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class URLValidatorTest extends EE_UnitTestCase
{
    /**
     * @since $VID:$
     * @return array {
     * @type string $url
     * @type boolean $should_be_valid
     * }
     */
    public function urlsToTest()
    {
        return array(
            'localhost' => array('http://localhost', true),
            'http' => array('http://eventespresso.com', true),
            'https' => array('https://eventespresso.com', true),
            'underscore' => array('http://event_espresso.com', true),
            'subsite' => array('http://dev.eventespresso.com', true),
            'querystring' => array('http://foo.bar?foo=bar&other=thing', true),
            'slashquerystring' => array('http://foob.bar/?foo=bar', true),
            'port' => array('http://foo.bar:80', true),
            'unicode' => array('http://스타벅스코리아.com', true),
            'xss' => array('http://example.com/"><script>alert("xss")</script>', false),
            'bad_scheme' => array('php://filter/read=convert.base64-encode/resource=/etc/passw', false),
            'bad_scheme_2' => array('foo://bar', false),
            'javascript' => array('javascript://test%0Aalert(321)', false),
        );
    }

    /**
     * @dataProvider urlsToTest
     * @since $VID:$
     * @group current
     *
     */
    public function testIsValid($url, $should_be_valid)
    {
        $validator = new URLValidator();
        $this->assertEquals($should_be_valid,$validator->isValid($url));
    }


}
// End of file URLValidatorTest.php
// Location: ${NAMESPACE}/URLValidatorTest.php
