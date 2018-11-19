<?php
namespace EventEspresso\tests\core\services\validators;
use \EE_UnitTestCase;
use EventEspresso\core\services\validators\URLValidator;

/**
 * Class URLValidatorTest
 *
 * Tests URLValidator, which is used by EE_URL_Validation_Strategy and potentially elsewhere
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.68.p
 *
 */
class URLValidatorTest extends EE_UnitTestCase
{
    /**
     * @since 4.9.68.p
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
            'with_path' => array('http://foo.bar/some/path', true),
            'with_file' => array('http://foo.bar/some/file.txt', true),
            'port' => array('http://foo.bar:80', true),
            'unicode' => array('http://스타벅스코리아.com', true),
            'encoded_unicode' => array('http://%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4%EC%BD%94%EB%A6%AC%EC%95%84_foobar.com', true),
            'xss' => array('http://example.com/"><script>alert("xss")</script>', false),
            'bad_scheme' => array('php://filter/read=convert.base64-encode/resource=/etc/passw', false),
            'bad_scheme_2' => array('foo://bar', false),
            'javascript' => array('javascript://test%0Aalert(321)', false),
            'www' => array('www', false),
            'relative_url' => array('some/path', false),
        );
    }

    /**
     * @dataProvider urlsToTest
     * @since 4.9.68.p
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
