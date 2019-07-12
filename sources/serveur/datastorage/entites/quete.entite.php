<?php

namespace Serveur\Entites;

/**
* Classe définissant une quete
*
* @method Serveur\Entites\Quete __construct($nom, $experience, $mairie)
*
* @Entity @Table(name="t_quetes")
*/
class Quete extends Entite
{
	/**
    * Nom de la quete
    * @var string
    * @Column(type="string")
    */
    public $Nom;
	
	/**
    * Expérience gagné après accomplissement de la quete
    * @var integer
    * @Column(type="integer")
    */
    public $Experience;
	
	/**
    * La mairie dépositaire de la quête
    * @var Serveur\Entites\Mairie
    * @ManyToOne(targetEntity="Serveur\Entites\Mairie", fetch="EAGER", cascade="persist")
    * @JoinColumn(name="Mairie", referencedColumnName="Id")
    */
    public $Mairie;
	
	/**
    * Construire une nouvelle quete
    */
    public function __construct($nom, $experience, $mairie)
    {
        $this->Nom = $nom;
        $this->Experience = $experience;
        $this->Mairie = $mairie;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>