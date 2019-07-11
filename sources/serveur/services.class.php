<?php
/**
* Service access layer class
* Auto generated on the 2019-07-11 17:18:30
*/
namespace Serveur;

/**
* Service access layer class
* Auto generated on the 2019-07-11 17:18:30
*/
class Services
{
 	/**
	* The interface module IUtilisateurs
	*/
	private $IUtilisateurs;


 	/**
	* The default constructor
	*/
	public function __construct()
	{
		$this->IUtilisateurs = new Composants\GestionUtilisateurs(); 
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
		return $this->IUtilisateurs->authenticate($mail, $password);
	}

 }
?>
