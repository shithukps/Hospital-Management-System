package com.project.hms.db.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="patient")
public class Patient {

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
        @Size(max = 9)
        @Column(name = "patient_id")
        @NotNull
        private String patient_id;

    @Size(max = 9)
    @Column(name = "ssnid")
    @NotNull
    private String ssnid;

        @Size(max = 30)
        @Column(name = "patient_name")
        @NotNull
        private String patient_Name;

        @Size(max = 50)
        @Column(name = "address")
        @NotNull
        private String address;

        @Size(max = 3)
        @Column(name = "age")
        @NotNull
        private int age;

        @Size(max = 8)
        @Column(name = "date_of_admission")
        @NotNull
        private Date date_of_admission;

        @Size(max = 10)
        @Column(name = "room_type")
        @NotNull
        private String room_type;

        @Size(max=20)
        @Column(name = "city")
        @NotNull
        private String city;

        @Size(max=20)
        @Column(name = "state")
        @NotNull
        private String state;

        @Size(max=15)
        @Column(name = "status")
        @NotNull
        private String status;

        public Patient() {

        }

    public Patient(@Size(max = 9) @NotNull String ssnid, @Size(max = 9) @NotNull String patient_id, @Size(max = 30) @NotNull String patient_Name, @Size(max = 50) @NotNull String address, @Size(max = 3) @NotNull int age, @Size(max = 8) @NotNull Date date_of_admission, @Size(max = 10) @NotNull String room_type, @Size(max = 20) @NotNull String city, @Size(max = 20) @NotNull String state, @Size(max = 15) @NotNull String status) {
        this.ssnid = ssnid;
        this.patient_id = patient_id;
        this.patient_Name = patient_Name;
        this.address = address;
        this.age = age;
        this.date_of_admission = date_of_admission;
        this.room_type = room_type;
        this.city = city;
        this.state = state;
        this.status = status;
    }

    public String getssnid() {
        return ssnid;
    }

    public void setssnid(String ssnid) {
        this.ssnid = ssnid;
    }

    public String getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(String patient_id) {
        this.patient_id = patient_id;
    }

    public String getPatient_Name() {
        return patient_Name;
    }

    public void setPatient_Name(String patient_Name) {
        this.patient_Name = patient_Name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getDate_of_admission() {
        return date_of_admission;
    }

    public void setDate_of_admission(Date date_of_admission) {
        this.date_of_admission = date_of_admission;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

