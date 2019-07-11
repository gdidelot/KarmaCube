<?php
/**
* This cron watch tasks dead line and recall user if the task is not closed or not set to 100 % for the completion
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0.0
* @package Core
*/

namespace Core;

//Declare constantes
if (defined('CORE_DIR') == false) {
    define('CORE_DIR',  		__Dir__ . '/../../../core/') ;
}
if (defined('COMMONS_DIR') == false) {
    define('COMMONS_DIR',  		CORE_DIR .'commons/');
}
if (defined('COMPONENTS_DIR') == false) {
    define('COMPONENTS_DIR',  	CORE_DIR .'components/');
}
if (defined('CONTRACTS_DIR') == false) {
    define('CONTRACTS_DIR', CORE_DIR .'datastorage/entities/');
}
if (defined('DATASTORAGE_DIR') == false) {
    define('DATASTORAGE_DIR', CORE_DIR .'datastorage/');
}

//Services facade reference
require_once(CORE_DIR . 'core.config.php');

//Components included
require_once(COMPONENTS_DIR . 'usersmanager/users.config.php');

/**
* Get all users
*
* @return Core\CoreContracts\User[] This response contains the users
*/
function GetUsers()
{
	echo 'Start to get all users.<br />';
	$services = new CoreService();
	$result = $services->getUsers();
	echo count($result->response) . ' users found.<br />';
	return $result->response;
}

function SetUserAsOffline($user)
{
	echo 'Start to set user #' . $user->Id . ' as offline because his modification date is ' . $user->ModificationDate->format('d-m-Y H:i') . '.<br />';
	$services = new CoreService();
	$result = $services->logout($user->Id);
	return $result->response;
}

/**
* Process the task
*
* @param string $email The email to get the tasks
*
*/
function Process()
{
	$tasks = array();
	$users = GetUsers();
	
	foreach($users as $user)
	{
		$_SESSION['currentuser'] = $user;
		$datetime1 = $user->ModificationDate;
		$datetime2 = new \DateTime();
		$interval = $datetime1->diff($datetime2);
		if(($interval->i >= 1 || $interval->h >= 1 || $interval->d >= 1 || $interval->m >= 1 || $interval->y >= 1) && $user->State != 1)
		{
			SetUserAsOffline($user);
		}
	}
	
	return "User online crons finished";
}

echo Process();
?>
