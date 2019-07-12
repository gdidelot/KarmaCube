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
	}
	
	public function ajouterQuete($quete)
	{
	}
	
	public function modifierQuete($quete)
	{
	}
	
	public function supprimerQuete($quete)
	{
	}
	
	public function obtenirEtapes($quete)
	{
	}
	
	public function ajouterEtape($etapeQuete)
	{
	}
	
	public function modifierEtape($etapeQuete)
	{
	}
	
	public function supprimerEtape($etapeQuete)
	{
	}
	
}

?> 