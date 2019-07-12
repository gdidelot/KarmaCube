<?php
/**
* This interface provide all accessible methods on users module
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreComponents
* @subpackage UsersManager
*/
namespace Serveur\Composants\GestionQuetes;

use Serveur;

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($mail, $password)
*
* @exception Utilisateur_Inconnu
*/
class Quetes implements IQuetes
{
	/**
	* The entity manager
	*/ 
	protected $entityManager;
	
	/**
	* The mairie repository
	*/
	protected $mairieRepository;
	
	/**
	* The quete repository
	*/
	protected $queteRepository;
		
	/**
	* The default constructor
	*/
	public function __construct()  
	{
		$bootstrap = Serveur\Datastorage\Bootstrap::getInstance();
		$this->entityManager = $bootstrap->getEntityManager();
		$this->mairieRepository = $this->entityManager->getRepository('Serveur\Entites\Mairie');
		$this->queteRepository = $this->entityManager->getRepository('Serveur\Entites\Quete');
	}
	
    public function obtenirQuetes()
	{
		Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Retourner toutes les quetes");
		
		$response = null;
		
		try
		{	
			$quetes = $this->queteRepository->findAll();

			$response = new Serveur\Communs\ServiceResponse($quetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Obtenir les quetes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex);
		}
		
		return $response;
	}
	
	public function obtenirQuetesUtilisateur($utilisateur)
	{
		Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Retourner quetes utilisateur");
		
		$response = null;
		
		try
		{	
			$quetes = $this->queteRepository->findBy(array('Utilisateur' => $utilisateur));

			$response = new Serveur\Communs\ServiceResponse($quetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Obtenir les quetes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex);
		}
		
		return $response;
	}
	
	public function ajouterQuete($quete)
	
	{Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Retourner ajouter quete");
		
		$response = null;
		
		try
		{	
			$quetes = $this->queteRepository->findBy(array('Utilisateur' => $utilisateur));

			$response = new Serveur\Communs\ServiceResponse($quetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Obtenir les quetes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function modifierQuete($quete)

	{Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Retourner modifier quete");
		
		$response = null;
		
		try
		{	
			$quetes = $this->queteRepository->findBy(array('Utilisateur' => $utilisateur));

			$response = new Serveur\Communs\ServiceResponse($quetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Obtenir les quetes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function supprimerQuete($quete)

	{Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Retourner supprimer quete");
		
		$response = null;
		
		try
		{	
			$quetes = $this->queteRepository->findBy(array('Utilisateur' => $utilisateur));

			$response = new Serveur\Communs\ServiceResponse($quetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirQuetes : Obtenir les quetes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function obtenirEtapes($quete)
	
	{Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Retourner obtenir etapes");
		
		$response = null;
		
		try
		{	
			$etapeQuetes = $this->etapeQueteRepository->findBy(array('Quete' => $quete));

			$response = new Serveur\Communs\ServiceResponse($etapeQuetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Obtenir les etapes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function ajouterEtape($etapeQuete)

	{Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Retourner ajouter etapes");
		
		$response = null;
		
		try
		{	
			$etapeQuetes = $this->etapeQueteRepository->findBy(array('Quete' => $quete));

			$response = new Serveur\Communs\ServiceResponse($etapeQuetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Obtenir les etapes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function modifierEtape($etapeQuete)

	{Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Retourner modifier etapes");
		
		$response = null;
		
		try
		{	
			$etapeQuetes = $this->etapeQueteRepository->findBy(array('Quete' => $quete));

			$response = new Serveur\Communs\ServiceResponse($etapeQuetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Obtenir les etapes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
	public function supprimerEtape($etapeQuete)
	{
		Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Retourner supprimer etapes");
		
		$response = null;
		
		try
		{	
			$etapeQuetes = $this->etapeQueteRepository->findBy(array('Quete' => $quete));

			$response = new Serveur\Communs\ServiceResponse($etapeQuetes);
			
			Serveur\Communs\Logger::Info("Quetes.obtenirEtapes : Obtenir les etapes terminée");
		}
		catch (\Exception $ex) 
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex)
	}
	
}

?> 