<?php
/**
 * The AuthorizeNet PHP SDK. Include this file in your project.
 *
 * @package AuthorizeNet
 */
require dirname(__FILE__) . '/shared/AuthorizeNetRequest.php';
require dirname(__FILE__) . '/shared/AuthorizeNetTypes.php';
require dirname(__FILE__) . '/shared/AuthorizeNetXMLResponse.php';
require dirname(__FILE__) . '/shared/AuthorizeNetResponse.php';
require dirname(__FILE__) . '/AuthorizeNetAIM.php';

if (class_exists("SoapClient")) {
	require dirname(__FILE__) . '/AuthorizeNetSOAP.php';
}
/**
 * Exception class for AuthorizeNet PHP SDK.
 *
 * @package AuthorizeNet
 */
class AuthorizeNetException extends Exception
{
}