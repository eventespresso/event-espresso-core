<?php
namespace tests\testcases\core\libraries\rest_api\controllers;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Write_Test
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class Write_Test extends \EE_UnitTestCase
{

    /**
     * @group current
     */
    public function test_no_insert_if_no_caps(){
        $request = new \WP_REST_Request( 'POST', '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event'
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }



    /**
     * Verifies that even if the current user can edit events, they shouldn't be able
     * to insert until we've sorted that code out
     * @group current
     */
    public function test_no_insert_limited_user(){
        $user = $this->factory->user->create_and_get(array('role' => 'subscriber'));
        $user->add_cap('ee_edit_events');
        $user->add_cap('ee_read_events');
        wp_set_current_user( $user->ID );
        //ok now try to insert an event
        $request = new \WP_REST_Request( 'POST', '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event'
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }


}
// End of file Write_Test.php
// Location: tests\testcases\core\libraries\rest_api\controllers/Write_Test.php