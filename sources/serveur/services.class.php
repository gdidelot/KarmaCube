<?php
/**
* Service access layer class
* Auto generated on the 2020-03-04 14:31:51
*/
namespace Serveur;

/**
* Service access layer class
* Auto generated on the 2020-03-04 14:31:51
*/
class Services
{
 	/**
	* The interface module IUtilisateurs
	*/
	private $IUtilisateurs;

	/**
	* The interface module IQuetes
	*/
	private $IQuetes;

	/**
	* The interface module ICubes
	*/
	private $ICubes;


 	/**
	* The default constructor
	*/
	public function __construct()
	{
		$this->IUtilisateurs = new Composants\GestionUtilisateurs\Utilisateurs(); 
		$this->IQuetes = new Composants\GestionQuetes\Quetes(); 
		$this->ICubes = new Composants\GestionCubes\Cubes(); 
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
		return $this->IUtilisateurs->authentification($email, $motdepasse);
	}

	
	public function inscription($email, $motdepasse, $anneeDeNaissance, $prenom, $nom)
	{
		return $this->IUtilisateurs->inscription($email, $motdepasse, $anneeDeNaissance, $prenom, $nom);
	}

	
	public function obtenirQuetes()
	{
		return $this->IQuetes->obtenirQuetes();
	}

	
	public function obtenirQuetesUtilisateur($utilisateur)
	{
		return $this->IQuetes->obtenirQuetesUtilisateur($utilisateur);
	}

	
	public function ajouterQuete($quete)
	{
		return $this->IQuetes->ajouterQuete($quete);
	}

	
	public function modifierQuete($quete)
	{
		return $this->IQuetes->modifierQuete($quete);
	}

	
	public function supprimerQuete($quete)
	{
		return $this->IQuetes->supprimerQuete($quete);
	}

	
	public function obtenirEtapes($quete)
	{
		return $this->IQuetes->obtenirEtapes($quete);
	}

	
	public function ajouterEtape($etapeQuete)
	{
		return $this->IQuetes->ajouterEtape($etapeQuete);
	}

	
	public function modifierEtape($etapeQuete)
	{
		return $this->IQuetes->modifierEtape($etapeQuete);
	}

	
	public function supprimerEtape($etapeQuete)
	{
		return $this->IQuetes->supprimerEtape($etapeQuete);
	}

	
	public function obtenirCubes()
	{
		return $this->ICubes->obtenirCubes();
	}

	
	public function ajouterCube($texture, $positionX, $positionY, $positionZ)
	{
		return $this->ICubes->ajouterCube($texture, $positionX, $positionY, $positionZ);
	}

	
	public function modifierCube($cubeId, $texture, $positionX, $positionY, $positionZ)
	{
		return $this->ICubes->modifierCube($cubeId, $texture, $positionX, $positionY, $positionZ);
	}

 }
?>
