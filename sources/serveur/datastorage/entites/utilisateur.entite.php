<?php

namespace Serveur\Entites;

/**
* Classe définissant un utilisateur
*
* @method Serveur\Entites\Utilisateur __construct($nom, $prenom, $nationalite, $motdepasse, $karma, $email)
*
* @Entity @Table(name="t_utilisateurs")
*/
class Utilisateur extends Entite
{
	/**
    * Nom de l'utilisateur
    * @var string
    * @Column(type="string")
    */
    public $Nom;
	
	/**
    * Prénom de l'utilisateur
    * @var string
    * @Column(type="string")
    */
    public $Prenom;
	
	/**
    * Etat de l'utilisateur
    * @var integer
    * @Column(type="integer")
    */
    public $Etat;
	
	/**
    * Nationalité de l'utilisateur
    * @var string
    * @Column(type="string")
    */
    public $Nationalite;
    
	/**
    * Mot de passe de l'utilisateur
    * @var string
    * @Column(type="string")
    */
    public $MotDePasse;
	
	/**
    * Le karma de l'utilisateur
    * @var Serveur\Entites\Karma
    * @ManyToOne(targetEntity="Serveur\Entites\Karma", fetch="EAGER", cascade="persist")
    * @JoinColumn(name="Karma", referencedColumnName="Id")
    */
    public $Karma;
	
	/**
    * Adresse mail de l'utilisateur
    * @var string
    * @Column(type="string")
    */
    public $Email;
	
	/**
    * Argents l'utilisateur
    * @var string
    * @Column(type="integer")
    */
    public $Argents;
	
	/**
    * Construire un nouvel utilisateur
    */
    public function __construct($nom, $prenom, $motdepasse, $email)
    {
        $this->Nom = $nom;
        $this->Prenom = $prenom;
        $this->Etat = UtilisateurEtat::Invalide;
        $this->MotDePasse = hash('sha256', $motdepasse);
        $this->Email = $email;
        $this->Argents = 0;
        $this->DateDeModification = new \DateTime();
        $this->DateDeCreation = new \DateTime();
    }
}  