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

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authentification($email, $motdepasse);
*/
interface IUtilisateurs
{
    /**
    * Authentification d'un utilisateur
    *
    * @param string $email Adresse mail de l'utilisateur
    * @param string $motdepasse Mot de passe de l'utilisateur
    *
    * @return Serveur\Entites\Utilisateur L'utilisateur authentifié
    */
    public function authentification($email, $motdepasse);
   
}

?>