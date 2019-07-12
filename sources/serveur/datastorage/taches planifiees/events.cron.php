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

/**
* Get all calendar events from user
*
* @param Core\CoreContracts\User $user The user
*
* @return Core\CoreContracts\CalendarEvent[] This response contains the calendar events
*/
function GetCalendarEvents($user)
{
	echo 'Start to get all calendar events.<br />';
	$services = new CoreService();
	$result = $services->getCalendarEvents($user->Id);
	echo count($result->response) . ' events found.<br />';
	return $result->response;
}

/**
* Process the calendar events
*/
function Process()
{
	$tasks = array();
	$users = GetUsers();
	foreach($users as $user)
	{
		$_SESSION['currentuser'] = $user;
		$databaseEvents = GetCalendarEvents($user);
		foreach($databaseEvents as $event)
		{
			//$hier = new DateTime('-1 day');
			echo $event->EventDate->format('Y-m-d') . ' => ' . (new \DateTime('+1 day'))->format('Y-m-d') . '<br />';
			if($event->EventDate->format('Y-m-d') == (new \DateTime('+1 day'))->format('Y-m-d'))
			{
				//Send mail to recall user
				echo 'Send mail to ' . $user->Email . ' for the event #' . $event->Id . ' ' . $event->Title . '.<br />';
				$values = array();
				$values['#firstname'] = $user->Firstname;
				$values['#lastname'] = $user->Lastname;
				$values['#eventtitle'] = $event->Title;
				$mail = new CoreCommons\Mail("PreventEvent", $values); 
				$mail->Send($user->Email);
			}
		}
	}
	
	return "Calendar events crons finished";
}

echo Process();
?>
