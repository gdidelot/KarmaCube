<?php

namespace Serveur\Entites;

class Entite
{
	/**
    * Identifiant unique
    * @var integer
    * @Id @Column(type="integer")
    * @GeneratedValue
    */
    public $Id;
	
	/**
    * Date de modification de l'entité
    * @var datetime
    * @Column(type="datetime", nullable=false)
    */
    public $DateDeModification;
	
	/**
    * Date de création de l'entité
    * @var datetime
    * @Column(type="datetime", nullable=false)
    */
    public $DateDeCreation;
}

?>