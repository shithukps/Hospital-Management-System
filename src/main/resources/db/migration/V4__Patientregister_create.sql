create table IF NOT EXISTS Patient(
  SSNID int(9) not null,
  Patient_id int(9) primary key not null AUTO_INCREMENT,
  Patient_Name char(30) not null,
  Address varchar(50) not null,
  age int(3) not null,
  Date_of_admission Date not null,
  Room_type char(10) not null
);