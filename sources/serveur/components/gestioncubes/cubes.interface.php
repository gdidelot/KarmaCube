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

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($email, $motdepasse);
*/
interface ICubes
{
    public function obtenirCubes();
	
	public function ajouterCube($cube);
	
	public function modifierCube($cube);
	
	public function supprimerCube($cube);
}

?>