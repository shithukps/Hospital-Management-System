alter table diagnostic_tracking ADD FOREIGN KEY (patient_id) REFERENCES patient(patient_id);
alter table diagnostic_tracking ADD FOREIGN KEY (test_id) REFERENCES diagnostic(test_id);