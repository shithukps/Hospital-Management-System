create table IF NOT EXISTS patient(
  patient_id int primary key AUTO_INCREMENT,
  ssnid varchar(9),
  patient_name varchar(30),
  address varchar(50),
  age int,
  date_of_admission Date,
  room_type char(10),
  city varchar(20),
  state varchar(20),
  status varchar(15)
);