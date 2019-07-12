<?php

namespace Serveur\Entites;

/**
* Classe définissant un cube
*
* @method Serveur\Entites\Cube __construct($nom)
*
* @Entity @Table(name="t_cubes")
*/
class Cube extends Entite
{
	/**
    * Le materiau du cube
    * @var Serveur\Entites\Materiau
    * @ManyToOne(targetEntity="Serveur\Entites\Materiau", fetch="EAGER", cascade="persist")
    * @JoinColumn(name="Materiau", referencedColumnName="Id")
    */
    public $Materiau;
	
	/**
    * Les dimensions du cube
    * @var integer
    * @Column(type="integer")
    */
    public $Dimension;
	
	/**
    * Construire un nouveau cube
    */
    public function __construct($materiau, $dimension)
    {
        $this->Materiau = $materiau;
        $this->Dimension = $dimension;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>