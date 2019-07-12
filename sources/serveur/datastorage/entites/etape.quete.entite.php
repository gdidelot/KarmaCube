<?php

namespace Serveur\Entites;

/**
* Classe définissant une étape d'une quête
*
* @method Serveur\Entites\EtapeQuete __construct($nom)
*
* @Entity @Table(name="t_etape_quetes")
*/
class EtapeQuete extends Entite
{
	/**
    * Numéro de l'étape
    * @var integrer
    * @Column(type="integrer")
    */
    public $Numero;
	
	/**
    * nom de l'étape
    * @var string
    * @Column(type="string")
    */
    public $Nom;
	
	/**
    * Construire une nouvelle étape de quete
    */
    public function __construct($numero, $nom)
    {
        $this->Numero = $numero;
        $this->Nom = $nom;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
	}
}

?>