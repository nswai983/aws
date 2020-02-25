create table Person (
  person_id integer primary key,
  person_name varchar(30)
);

insert into Person values (1, 'Fred Jones');
insert into Person values (2, 'Alf Wilson');

create table Registrations (
  registration_id integer primary key,
  firstName varchar(30),
  lastName varchar(30),
  grade integer,
  email varchar(50),
  shirtSize char(1),
  hrUsername varchar(30)
);

