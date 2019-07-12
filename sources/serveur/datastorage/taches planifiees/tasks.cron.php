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
* Get all tasks from an email
*
* @param string $email The email to get the tasks
*
* @return Core\CoreContracts\Task[] This response contains the tasks
*/
function GetTasks($email)
{
	echo 'Start to get all tasks.<br />';
	$services = new CoreService();
	$result = $services->getTasksByEmail($email);
	echo count($result->response) . ' tasks found.<br />';
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
		$databaseTasks = GetTasks($user->Email);
		foreach($databaseTasks as $task)
		{
			if($task->State != 4 || $task->Completion != 100)
			{
				//Send mail to recall user
				echo 'Send mail to ' . $task->AffectedUser->Email . ' for the task ' . $task->Name . '.<br />';
				$values = array();
				$values['#firstname'] = $task->AffectedUser->Firstname;
				$values['#lastname'] = $task->AffectedUser->Lastname;
				$values['#tasktitle'] = $task->Name;
				$mail = new CoreCommons\Mail("NewTask", $values); 
				$mail->Send($task->AffectedUser->Email);
			}
		}
	}
	
	return "Tasks crons finished";
}

echo Process();
?>
