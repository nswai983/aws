create table Registrations (
  registration_id integer NOT NULL AUTO_INCREMENT primary key,
  firstName varchar(30),
  lastName varchar(30),
  grade integer,
  email varchar(50),
  shirtSize char(1),
  hrUsername varchar(30)
);

