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
    * La texture
    * @var string
    * @Column(type="string")
    */
    public $Texture;
	
	/**
    * La position
    * @var integer
    * @Column(type="integer")
    */
    public $PositionX;
	
	/**
    * La position
    * @var integer
    * @Column(type="integer")
    */
    public $PositionY;
	
	/**
    * La position
    * @var integer
    * @Column(type="integer")
    */
    public $PositionZ;
	
	/**
    * Construire un nouveau cube
    */
    public function __construct($texture, $positionX, $positionY, $positionZ)
    {
        //$this->Materiau = $materiau;
        //$this->Dimension = $dimension;
        $this->Texture = $texture;
        $this->PositionX = $positionX;
        $this->PositionY = $positionY;
        $this->PositionZ = $positionZ;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>