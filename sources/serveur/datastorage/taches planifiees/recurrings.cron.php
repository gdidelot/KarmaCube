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
* Get all recurrings from a user
*
* @param Core\CoreContracts\User $user The user to get the recurrings
*
* @return Core\CoreContracts\Recurring[] This response contains the recurrings
*/
function GetRecurrings($user)
{
	echo 'Start to get all recurring.<br />';
	$services = new CoreService();
	$banksResult = $services->getBanks($user->Id);
	$banks = $banksResult->response;
	
	$accounts = array();
	foreach($banks as $bank)
	{
		$accountsResult = $services->getAccounts($bank->Id);
		$accounts = array_merge($accounts, $accountsResult->response);
	}
	
	$recurrings = array();
	foreach($accounts as $account)
	{
		$recurringsResult = $services->getRecurrings($account->Id);
		$recurrings = array_merge($recurrings, $recurringsResult->response);
	}
	echo count($recurrings) . ' recurrings found for ' . $user->Email . '<br />';
	return $recurrings;
}

/**
* Process the task
*
* @param string $email The email to get the tasks
*
*/
function Process()
{
	$services = new CoreService();
	$users = GetUsers();
	foreach($users as $user)
	{
		$_SESSION['currentuser'] = $user;
		$databaseRecurrings = GetRecurrings($user);
		foreach($databaseRecurrings as $recurring)
		{
			echo 'Process the recurring ' . $recurring->Id . ' with recurring day ' . strval($recurring->Day) . ' and now ' . strval(date("j")) . '<br />';
			if(strval($recurring->Day) == strval(date("j")))
			{
				echo 'Add the operation<br />';
				$result = $services->addOperation($recurring->Account->Id, $recurring->Label, $recurring->Type, 0, 5, $recurring->Category->Id, $recurring->Amount, strval(date("Y-n-j")), true, null);
				var_dump($result);
			}
		}
	}
	
	return "Recurrings crons finished";
}

echo Process();
?>
