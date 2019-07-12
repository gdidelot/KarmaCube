<?php

namespace Serveur\Entites;

/**
* Classe définissant une mairie
*
* @method Serveur\Entites\Mairie __construct($nom, $tax)
*
* @Entity @Table(name="t_mairies")
*/
class Mairie extends Batiment
{
	/**
    * Nom de la mairie
    * @var string
    * @Column(type="string")
    */
    public $Nom;
	
	/**
    * Montant de la tax
    * @var integer
    * @Column(type="integer")
    */
	public $Tax;
	
	/**
    * Construire une nouvelle quete
    */
    public function __construct($nom, $tax)
    {
        $this->Nom = $nom;
        $this->Tax = $tax;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>