<?php

namespace Serveur\Entites;

/**
* Classe définissant un materiau
*
* @method Serveur\Entites\Materiau __construct($nom)
*
* @Entity @Table(name="t_materiaux")
*/
class Materiau extends Entite
{
	/**
    * Les dimensions du cube
    * @var integer
    * @Column(type="string")
    */
    protected $Texture;
    
	/**
    * La duree de vie
    * @var integer
    * @Column(type="integer")
    */
    protected $Durabilite;
	
	/**
    * Le nom du materiau
    * @var string
    * @Column(type="string")
    */
    protected $Nom;
	
	/**
    * La densité du materiau
    * @var integer
    * @Column(type="integer")
    */
    protected $Densite;
	
	/**
    * Construire un nouveau materiau
    */
    public function __construct($texture, $durabilite, $nom, $densite)
    {
        $this->Texture = $texture;
        $this->Durabilite = $durabilite;
        $this->Nom = $nom;
        $this->Densite = $densite;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>