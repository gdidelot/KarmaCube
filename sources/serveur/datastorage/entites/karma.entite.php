<?php

namespace Serveur\Entites;

/**
* Classe définissant un karma
*
* @method Serveur\Entites\Karma __construct()
*
* @Entity @Table(name="t_karmas")
*/
class Karma extends Entite
{
	/**
    * Niveau de confiance
    * @var integer
    * @Column(type="integer")
    */
    protected $Confiance;
	
	/**
    * Niveau d'expérience
    * @var integer
    * @Column(type="integer")
    */
    protected $Experience;
	
	/**
    * Construire un nouvel utilisateur
    */
    public function __construct()
    {
        $this->Confiance = 10;
        $this->Experience = 0;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
    }
}

?>