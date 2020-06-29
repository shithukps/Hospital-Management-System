create table IF NOT EXISTS medicine (
medicine_id int not null primary key,
medicine_name char(50) not null,
quantity_avail int not null,
rate float not null
);