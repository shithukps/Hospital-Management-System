alter table medicine_tracking ADD FOREIGN KEY (patient_id) REFERENCES patient(patient_id);
alter table medicine_tracking ADD FOREIGN KEY (medicine_id) REFERENCES medicine(medicine_id);