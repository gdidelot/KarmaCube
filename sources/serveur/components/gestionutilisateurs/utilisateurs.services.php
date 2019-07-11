<?php
/**
* This interface provide all accessible methods on users module
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreComponents
* @subpackage UsersManager
*/
namespace Serveur\Composants\GestionUtilisateurs;

use Serveur;

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($mail, $password)
*
* @exception Utilisateur_Inconnu
*/
class Utilisateurs implements IUtilisateurs
{
	/**
	* The entity manager
	*/ 
	protected $entityManager;
	
	/**
	* The user repository
	*/
	protected $userRepository;
		
	/**
	* The default constructor
	*/
	public function __construct()  
	{
		$bootstrap = Core\Datastorage\Bootstrap::getInstance();
		$this->entityManager = $bootstrap->getEntityManager();
		$this->userRepository = $this->entityManager->getRepository('Core\CoreContracts\Utilisateur');
	}
	
	/**
	* Authenticate an user
	* 
	* @param string $mail The user's mail 
	* @param string $password The user's password 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user object
	*/
	public function authenticate($mail, $password)
	{
		Core\CoreCommons\Logger::Info("Users.authenticate : Start to authenticate");
		
		$response = null;
		
		try
		{	
			$user = $this->userRepository->findOneBy(array('Email' => $mail, 'Password' => sha1($password)));
			
			if(is_null($user) == true)
			{
				throw new \Exception("User_Unknown");
			}
			
			if($user->State == Core\CoreContracts\StateUser::NotValid)
			{
				throw new \Exception("User_Not_Valid");
			}
			
			if($user->State == Core\CoreContracts\StateUser::Banned)
			{
				throw new \Exception("User_Banned");
			}
			
			$user->State = Core\CoreContracts\StateUser::Online;
			$this->entityManager->merge($user);
			$this->entityManager->flush();
			
			if(isset($user->AvatarExtension) && is_null($user->AvatarExtension) ==  false)
			{
				$parameters = Core\CoreCommons\Parameters::Singleton();
				$rootSite = $parameters::Get("rootsite");
				$documentsrootpath = $parameters::Get("documentsrootpath");
				$name = 'avatar.' . $user->AvatarExtension;
				
				$webShareUrl = sprintf("%s/%s/%s/%s", $rootSite, $documentsrootpath, $user->Email, $name);
				$user->Avatar = $webShareUrl;
			} 
			else 
			{
				$parameters = Core\CoreCommons\Parameters::Singleton();
				$rootSite = $parameters::Get("rootsite");
				$documentsrootpath = $parameters::Get("documentsrootpath");
				$name = 'avatar.png';
				
				$webShareUrl = sprintf("%s/%s/%s", $rootSite, $documentsrootpath, $name);
				$user->Avatar = $webShareUrl;
			}
				
			$response = new Core\CoreCommons\ServiceResponse($user);
			
			//Save the user on a session
			$_SESSION["_" . $user->Id] = $user;
			
			Core\CoreCommons\Logger::Info("Users.authenticate : authentification is finished");
		}
		catch (\Exception $ex) 
		{
			$response = Core\CoreCommons\ServiceResponse::CreateError($ex);
		}
		
		return $response;
	}
	
	/**
	* Generate a random string 
	* 
	* @todo Refactor this method on a helper class
	* @param string $length The string $ength targeted
	*/
	private function generateRandomString($length = 10) 
	{
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$randomString = '';
		for ($i = 0; $i < $length; $i++) 
		{
			$randomString .= $characters[rand(0, strlen($characters) - 1)];
		}
		return $randomString;
	}
}

?> 