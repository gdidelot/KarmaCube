<?php
/**
* This interface provide all accessible methods on users module
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreComponents
* @subpackage UsersManager
*/
namespace Core\CoreComponents\GestionUtilisateurs;

/**
* This interface provide all accessible methods on users module
*
* @method ServiceResponse authenticate($mail, $password)
*/
interface IUsers
{
    /**
    * Authenticate an user
    *
    * @param string $mail The user's mail
    * @param string $password The user's password
    *
    * @return This response contains the use object
    */
    public function authenticate($mail, $password);
   
}

?>