<?php
/**
* This interface provide all accessible methods on users module
*eric didelot

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
		$bootstrap = Serveur\Datastorage\Bootstrap::getInstance();
		$this->entityManager = $bootstrap->getEntityManager();
		$this->userRepository = $this->entityManager->getRepository('Serveur\Entites\Utilisateur');
	}

	/**
    * Authentification d'un utilisateur
    *
    * @param string $email Adresse mail de l'utilisateur
    * @param string $motdepasse Mot de passe de l'utilisateur
    *
    * @return Serveur\Entites\Utilisateur L'utilisateur authentifié
    */
    public function authentification($email, $motdepasse)
	{
		Serveur\Communs\Logger::Info("Utilisateurs.authentification : Authentification d'un utilisateur");
		
		$response = null;
		
		try
		{	
			$utilisateur = $this->userRepository->findOneBy(array('Email' => $email, 'MotDePasse' => hash('sha256', $motdepasse)));
			
			if(is_null($utilisateur) == true)
			{
				throw new \Exception("Utilisateur_Inconnu");
			}
			
			if($utilisateur->Etat == Serveur\Entites\UtilisateurEtat::Invalide)
			{
				throw new \Exception("Utilisateur_Invalide");
			}
			
			if($utilisateur->Etat == Serveur\Entites\UtilisateurEtat::Banni)
			{
				throw new \Exception("Utilisateur_Banni");
			}
			
			$utilisateur->Etat = Serveur\Entites\UtilisateurEtat::EnLigne;
			$this->entityManager->merge($utilisateur);
			$this->entityManager->flush();
				
			$response = new Serveur\Communs\ServiceResponse($utilisateur);
			
			// Créer une session utilisateur
			$_SESSION["_" . $utilisateur->Id] = $utilisateur;
			
			Serveur\Communs\Logger::Info("Utilisateurs.authentification : Authentification terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex);
		}
		
		return $response;
	}
	
	public function inscription($email, $motdepasse, $anneeDeNaissance, $prenom, $nom)
	{	
		Serveur\Communs\Logger::Info("Utilisateurs.inscription : Authentification d'un utilisateur");
		
		try
		{	
			$utilisateur = $this->userRepository->findOneBy(array('Email' => $email));
			
			if(is_null($utilisateur) == false)
			{
				throw new \Exception("Utilisateur_Deja_Existant");
			}
			
			if(date('Y') - $anneeDeNaissance < 5)
			{
				throw new \Exception("Trop jeune");
			}
			
			$utilisateur->Etat = Serveur\Entites\UtilisateurEtat::EnLigne;
			
			$this->entityManager->flush();
				
			$response = new Serveur\Communs\ServiceResponse($utilisateur);
			
			// Créer une session utilisateur
			$_SESSION["_" . $utilisateur->Id] = $utilisateur;
			
			Serveur\Communs\Logger::Info("Utilisateurs.inscription : Authentification terminée");
		}
		catch (\Exception $ex)
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex);
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