<?php

namespace Serveur\Entites;

/**
* Classe définissant un batiment
*
* @method Serveur\Entites\Batiment __construct($nom)
*
* @Entity @Table(name="t_batiments")
*/
class Batiment extends Entite
{
    /**
    * Nom de la mairie
    * @var string
    * @Column(type="string")
    */
    public $Nom;
	
	/**
    * Construire un nouveau batiment
    */
    public function __construct($nom)
    {
        $this->Nom = $nom;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>