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

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($email, $motdepasse);
*/
interface IQuetes
{
    public function obtenirQuetes();
	
	public function obtenirQuetesUtilisateur($utilisateur);
	
	public function ajouterQuete($quete);
	
	public function modifierQuete($quete);
	
	public function supprimerQuete($quete);
	
	public function obtenirEtapes($quete);
	
	public function ajouterEtape($etapeQuete);
	
	public function modifierEtape($etapeQuete);
	
	public function supprimerEtape($etapeQuete);
}

?>