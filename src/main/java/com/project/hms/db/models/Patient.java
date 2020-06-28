package com.project.hms.db.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


    @Table(name="Patient")
    public class Patient {
        @Column(name = "SSNID")
        @Size(max = 9)
        @NotNull
        private String SSNID;


        //    @JsonIgnore
        @Size(max = 9)
        @Column(name = "Patient_id")
        @NotNull
        private String Patient_id;

        @Size(max = 30)
        @Column(name = "Patient_Name")
        @NotNull
        private String Patient_Name;

        @Size(max = 50)
        @Column(name = "Address")
        @NotNull
        private String Address;

        @Size(max = 3)
        @Column(name = "age")
        @NotNull
        private String age;

        @Size(max = 8)
        @Column(name = "Date_of_admission")
        @NotNull
        private String Date_of_admission;

        @Size(max = 10)
        @Column(name = "Room_type")
        @NotNull
        private String Room_type;


        public Patient(@Size(max = 9) @NotNull String SSNID, @Size(max = 9) @NotNull String patient_id, @Size(max = 30) @NotNull String patient_Name, @Size(max = 50) @NotNull String address, @Size(max = 3) @NotNull String age, @Size(max = 8) @NotNull String date_of_admission, @Size(max = 10) @NotNull String room_type) {
            this.SSNID = SSNID;
            Patient_id = patient_id;
            Patient_Name = patient_Name;
            Address = address;
            this.age = age;
            Date_of_admission = date_of_admission;
            Room_type = room_type;
        }

        public String getSSNID() {
            return SSNID;
        }

        public void setSSNID(String SSNID) {
            this.SSNID = SSNID;
        }



        public String getPatient_id() {
            return Patient_id;
        }

        public void setPatient_id(String patient_id) {
            Patient_id = patient_id;
        }
        public String getPatient_Name() {
            return Patient_Name;
        }

        public void setPatient_Name(String patient_Name) {
            Patient_Name = patient_Name;
        }

        public String getAddress() {
            return Address;
        }

        public void setAddress(String address) {
            Address = address;
        }

        public String getAge() {
            return age;
        }

        public void setAge(String age) {
            this.age = age;
        }

        public String getDate_of_admission() {
            return Date_of_admission;
        }

        public void setDate_of_admission(String date_of_admission) {
            Date_of_admission = date_of_admission;
        }

        public String getRoom_type() {
            return Room_type;
        }

        public void setRoom_type(String room_type) {
            Room_type = room_type;
        }
    }

