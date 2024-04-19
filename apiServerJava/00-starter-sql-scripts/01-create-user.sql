-- Drop user first if they exist
DROP USER if exists 'bmradmin'@'%' ;

-- Now create user with prop privileges
CREATE USER 'bmradmin'@'%' IDENTIFIED BY 'bmradmin';

GRANT ALL PRIVILEGES ON * . * TO 'bmradmin'@'%';