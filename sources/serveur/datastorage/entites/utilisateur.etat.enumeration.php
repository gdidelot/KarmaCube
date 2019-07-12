<?php
/**
* User states  enumeration
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core
* @subpackage CoreContracts
*/
namespace Serveur\Entites;
/**
* User states  enumeration
* 
* @method string[] getArray()
*/
class UtilisateurEtat {

	const Inconnu = 0;

	const Invalide = 1;

    const EnLigne = 2;

    const HorsLigne = 3;

    const Banni = 4;
	
	/**
	* Get all available user states
	*
	* @return string[] All enumeration on string array
	*/
	public function getArray()
	{
		$class = new \ReflectionClass(__Class__);
		return $class->getConstants();
	}
}
?> 