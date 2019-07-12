<?php
/**
* This cron watch users account report activity
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
* Get all user banks
*
* @param interger $userId The user identifier
*
* @return Core\CoreContracts\Bank[] This response contains the banks
*/
function GetBanks($userId)
{
	echo 'Start to get all banks.<br />';
	$services = new CoreService();
	$result = $services->getBanks($userId);
	echo count($result->response) . ' banks found.<br />';
	return $result->response;
}

/**
* Get all accounts
*
* @param interger $bankId The bank identifier
*
* @return Core\CoreContracts\Account[] This response contains the accounts
*/
function GetAccounts($bankId)
{
	echo 'Start to get all banks.<br />';
	$services = new CoreService();
	$result = $services->getAccounts($bankId);
	echo count($result->response) . ' accounts found.<br />';
	return $result->response;
}

/**
* Get all accounts
*
* @param interger $userId The user identifier
* @param interger $accountId The account identifier
* @param interger $year The targeted year
*
* @return Core\CoreContracts\AccountReport[] This response contains the account reports
*/
function GetAccountReports($userId, $accountId, $year)
{
	echo 'Start to get all banks.<br />';
	$services = new CoreService();
	$result = $services->getAccountReports($userId, $accountId, $year);
	echo count($result->response) . ' account reports found.<br />';
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
	if(date("d") == '01')
	{
		$tasks = array();
		$users = GetUsers();
		foreach($users as $user)
		{
			$_SESSION['currentuser'] = $user;
			$databaseBanks = GetBanks($user->Id);
			foreach($databaseBanks as $bank)
			{
				$databaseAccounts = GetAccounts($bank->Id);
				foreach($databaseAccounts as $account)
				{
					$toNotify = true;
					$year = (date("m") == '01') ? date("Y", strtotime("-1 year")) : date("Y");
					$month = date("m", strtotime("-1 month"));
					$databaseAccountReports = GetAccountReports($user->Id, $account->Id, $year);
					foreach($databaseAccountReports as $accountReport)
					{
						if($accountReport->CreationDate->format('m') == $month)
						{
							$toNotify = false;
						}
					}
					
					if($toNotify == true)
					{
						echo 'Send mail to ' . $user->Email . ' for the account ' . $account->Name . '.<br />';
						$values = array();
						$values['#firstname'] = $user->Firstname;
						$values['#lastname'] = $user->Lastname;
						$values['#month'] = $month;
						$values['#year'] = $year;
						$values['#accountname'] = $account->Name;
						$mail = new CoreCommons\Mail("AccountReportRequired", $values); 
						$mail->Send($user->Email);
					}
				}
			}
		}
		
		return "Account report crons finished";
	} 
	else
	{
		echo "Proces detect we are not the first day of the month : " . date("d");
	}
}

echo Process();
?>
