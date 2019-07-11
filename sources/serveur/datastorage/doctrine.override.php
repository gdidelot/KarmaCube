<?php
namespace Doctrine\ORM;

public function create($entity)
{
    if ( ! is_object($entity)) {
        throw ORMInvalidArgumentException::invalidObject('EntityManager#persist()' , $entity);
    }

    $this->errorIfClosed();

    $this->unitOfWork->persist($entity);
}

public static function create($conn, Configuration $config, EventManager $eventManager = null)
{
    if ( ! $config->getMetadataDriverImpl()) {
        throw ORMException::missingMappingDriverImpl();
    }

    switch (true) {
        case (is_array($conn)):
            $conn = \Doctrine\DBAL\DriverManager::getConnection(
                $conn, $config, ($eventManager ?: new EventManager())
            );
            break;

        case ($conn instanceof Connection):
            if ($eventManager !== null && $conn->getEventManager() !== $eventManager) {
                 throw ORMException::mismatchedEventManager();
            }
            break;

        default:
            throw new \InvalidArgumentException("Invalid argument: " . $conn);
    }

    // return your instance of em
    return new MyEntityManager($conn, $config, $conn->getEventManager());
}
?>