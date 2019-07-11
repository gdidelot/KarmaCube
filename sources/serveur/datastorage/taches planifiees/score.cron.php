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
	$services = new CoreService();
	$result = $services->getUsers();
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
	$services = new CoreService();
	$result = $services->getBanks($userId);
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
	$services = new CoreService();
	$result = $services->getAccounts($bankId);
	return $result->response;
}

/**
* Get all operations
*
* @param interger $accountId The account identifier
*
* @return Core\CoreContracts\AccountReport[] This response contains the operations
*/
function GetOperations($accountId)
{
	$services = new CoreService();
	$result = $services->getOperations($accountId, null, null);
	return $result->response;
}

/**
* Get all operation bills
*
* @param interger $operationId The operation identifier
*
* @return Core\CoreContracts\AccountReport[] This response contains the operation bills
*/
function GetOperationBills($operationId)
{
	$services = new CoreService();
	$result = $services->getOperationBills($operationId);
	return $result->response;
}

/**
* Get all activities
*
* @param interger $userId The user identifier
*
* @return Core\CoreContracts\Activity[] This response contains the activities
*/
function GetActivities($userId)
{
	$services = new CoreService();
	$result = $services->getActivities($userId);
	return $result->response;
}

/**
* Process the score
*/
function Process()
{
	$users = GetUsers();
	foreach($users as $user)
	{
		$percentOperationHaveNoCategory = 0;
		$percentOperationHaveNoBill = 0;
		$intervalLastActivityDate = 100;
		
		$operations = array();
		$_SESSION['currentuser'] = $user;
		$databaseBanks = GetBanks($user->Id);
		if(count($databaseBanks) > 0)
		{
			foreach($databaseBanks as $bank)
			{
				$databaseAccounts = GetAccounts($bank->Id);
				foreach($databaseAccounts as $account)
				{
					$temp = GetOperations($account->Id);
					$operations = array_merge($operations, $temp);
				}
			}
			
			if(count($operations) > 0)
			{
				$numberOperationHaveNoCategory = 0;
				$numberOperationHaveNoBill = 0;
				$numberOfDayForTheLastActivity = 0;
				foreach($operations as $operation)
				{
					// Check if all operation have a category
					if(isset($operation->Category) == false || is_null($operation->Category))
					{
						$numberOperationHaveNoCategory = $numberOperationHaveNoCategory + 1;
					}
					
					$bills = GetOperationBills($operation->Id); 
					
					// Check if all operations have a bill
					if(isset($bills) == false || is_null($bills) || count($bills) == 0)
					{
						$numberOperationHaveNoBill = $numberOperationHaveNoBill + 1;
					}
				}
				
				if(count($operations) > 0)
				{
					$percentOperationHaveNoCategory = $numberOperationHaveNoCategory * 100 / count($operations);
					$percentOperationHaveNoBill = $numberOperationHaveNoBill * 100 / count($operations);
				}
			}
		}
		
		$activities = GetActivities($user->Id);
		
		// Check the last user activity
		if(count($activities) > 0)
		{
			$now = new \DateTime('now');
			$lastActivityDate = $activities[count($activities) - 1]->CreationDate;
			$intervalLastActivityDate = $now->diff($lastActivityDate);
			$intervalLastActivityDate = intval($intervalLastActivityDate->format('%a')) + 1;
		}
		
		if($percentOperationHaveNoCategory == 0 && $percentOperationHaveNoBill == 0 && $intervalLastActivityDate <= 1)
		{
			$score = round(floatval(10 * log(1000)), 0);
		}
		else 
		{
			$constant1 = 5;
			$constant2 = 10;
			$constant3 = 20;
			
			$percentOperationHaveNoCategory = ($percentOperationHaveNoCategory != 0) ? $percentOperationHaveNoCategory : $constant1;
			$percentOperationHaveNoBill = ($percentOperationHaveNoBill != 0) ? $percentOperationHaveNoBill : $constant2;
			$intervalLastActivityDate = ($intervalLastActivityDate != 0) ? $intervalLastActivityDate : $constant3;
			
			$value = floatval(floatval($constant1 / $percentOperationHaveNoCategory) + floatval($constant2 / $percentOperationHaveNoBill) + floatval($constant3 / $intervalLastActivityDate));
			$score = round(floatval(10 * log($value)), 0);
		}
		
		//Update score history for this user
		$services = new CoreService();
		$result = $services->updateScore($user->Id, $score);
	}
	
	return "Score crons finished";
}

echo Process();
?>
