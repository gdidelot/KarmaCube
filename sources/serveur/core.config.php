<?php
/**
* Provide all global variables required all modules
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package 
* @subpackage 
*/

//Declare constantes
if (defined('CORE_DIR') == false) {
    define('CORE_DIR', __Dir__ . '/');
}
if (defined('COMMONS_DIR') == false) {
    define('COMMONS_DIR', CORE_DIR .'commons/');
}
if (defined('COMPONENTS_DIR') == false) {
    define('COMPONENTS_DIR', CORE_DIR .'components/');
}
if (defined('CONTRACTS_DIR') == false) {
    define('CONTRACTS_DIR', CORE_DIR .'datastorage/entities/');
}
if (defined('DATASTORAGE_DIR') == false) {
    define('DATASTORAGE_DIR', CORE_DIR .'datastorage/');
}

/**
* The prefix of the salt
*/
define('PREFIX_SALT', 'Malesherbunis');

/**
* The suffix of the salt
*/
define('SUFFIX_SALT', 'Salt_2018');

//Commons references
require_once(COMMONS_DIR . 'parameters.class.php');
require_once(COMMONS_DIR . 'logger.class.php');
require_once(COMMONS_DIR . 'localization.class.php');
require_once(COMMONS_DIR . 'comlistener.class.php');
require_once(COMMONS_DIR . 'serviceresponse.class.php');
require_once(COMMONS_DIR . 'mail.class.php');

//Commons tools references
require_once('vendor/autoload.php');
//require_once(DATASTORAGE_DIR . 'doctrine.override.php');

if (class_exists('Logger')) {
    $loggerConfigurationFile = __dir__ . '/log4php-config.xml';
    Logger::configure($loggerConfigurationFile);
}

//DataStorage required references
require_once(DATASTORAGE_DIR . 'bootstrap.php');

//Services facade reference
require_once(CORE_DIR . 'coreservice.class.php');

//Load the components configuration
require_once(CORE_DIR . 'components.config.php');

?>