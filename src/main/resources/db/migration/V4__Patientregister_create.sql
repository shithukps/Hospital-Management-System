create table IF NOT EXISTS patient(
  patient_id int primary key AUTO_INCREMENT,
  ssnid varchar(9) not null,
  patient_name varchar(30) not null,
  address varchar(50) not null,
  age int not null,
  date_of_admission Date not null,
  room_type char(10) not null,
  city varchar(20) not null,
  state varchar(20) not null,
  status varchar(15) not null
);