create table IF NOT EXISTS userstore(
  login varchar(10) not null,
  password varchar(20) not null,
  timestamp TIMESTAMP not null
);