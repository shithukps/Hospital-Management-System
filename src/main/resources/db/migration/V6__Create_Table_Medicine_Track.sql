create table IF NOT EXISTS medicine_tracking(
patient_id int(9) unsigned zerofill not null,
medicine_id int not null,
quantity_issued int not null
);