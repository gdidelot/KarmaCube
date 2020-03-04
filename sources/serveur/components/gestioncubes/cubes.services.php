<?php
/**
* This interface provide all accessible methods on users module
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreComponents
* @subpackage UsersManager
*/
namespace Serveur\Composants\GestionCubes;

use Serveur;

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($mail, $password)
*
* @exception Utilisateur_Inconnu
*/
class Cubes implements ICubes
{
	/**
	* The entity manager
	*/ 
	protected $entityManager;
	
	/**
	* The materiau repository
	*/
	protected $materiauRepository;
	
	/**
	* The cube repository
	*/
	protected $cubeRepository;
		
	/**
	* The default constructor
	*/
	public function __construct()  
	{
		$bootstrap = Serveur\Datastorage\Bootstrap::getInstance();
		$this->entityManager = $bootstrap->getEntityManager();
		$this->materiauRepository = $this->entityManager->getRepository('Serveur\Entites\Materiau');
		$this->cubeRepository = $this->entityManager->getRepository('Serveur\Entites\Cube');
	}
	
    public function obtenirCubes()
	{
	}
	
	public function ajouterCube($texture, $positionX, $positionY, $positionZ)
	{
		Serveur\Communs\Logger::Info("Cubes.ajouterCube : Ajout d'un cube");
		
		try
		{	
			$cube = new Serveur\Entites\Cube($texture, $positionX, $positionY, $positionZ);
			
			$this->entityManager->persist($cube);
			$this->entityManager->flush();
				
			$response = new Serveur\Communs\ServiceResponse($cube);
			
			Serveur\Communs\Logger::Info("Cubes.ajouterCube : ajout terminée");
		}
		catch (\Exception $ex)
		{
			$response = Serveur\Communs\ServiceResponse::CreateError($ex);
		}
		
		return $response;
	}
	
	public function modifierCube($cubeId, $texture, $positionX, $positionY, $positionZ)
	{
		
	}
}

?> 