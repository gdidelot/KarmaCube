<?php
/**
* Provide all files required all module
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package
* @subpackage
*/

$components = array (
    'utilisateurs'
);

foreach ($components as $component) {
    //include the component
    require_once(COMPONENTS_DIR . 'gestion'. $component . '/' . $component . '.config.php');
}

?>