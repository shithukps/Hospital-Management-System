package com.project.hms.db.models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table
public class Patient {
    @Size(max=9)
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "patient_id")
    @NotNull
    private int patient_id;

    @NotNull
    @Size(max = 9)
    @Column(name = "ssnid")
    private String ssnid;


    @Size(max = 30)
    @NotNull
    @Column(name = "patient_name")
    private String patient_name;

    @Size(max = 50)
    @NotNull
    @Column(name = "address")
    private String address;

    @Column(name = "age")
    @NotNull
    private int age;

    @NotNull
    @Column(name = "date_of_admission")
    private String date_of_admission;

    @Size(max = 10)
    @NotNull
    @Column(name = "room_type")
    private String room_type;

    @Size(max=20)
    @NotNull
    @Column(name = "city")
    private String city;

    @Size(max=20)
    @NotNull
    @Column(name = "state")
    private String state;

    @Size(max=15)
    @NotNull
    @Column(name = "status")
    private String status;

    public Patient() {
    }

    public Patient(@Size(max = 9) int patient_id, @Size(max = 9) String ssnid, @Size(max = 30) String patient_name, @Size(max = 50) String address, int age, String date_of_admission, @Size(max = 10) String room_type, @Size(max = 20) String city, @Size(max = 20) String state, @Size(max = 15) String status) {
        this.patient_id = patient_id;
        this.ssnid = ssnid;
        this.patient_name = patient_name;
        this.address = address;
        this.age = age;
        this.date_of_admission = date_of_admission;
        this.room_type = room_type;
        this.city = city;
        this.state = state;
        this.status = status;
    }

    public int getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(int patient_id) {
        this.patient_id = patient_id;
    }

    public String getSsnid() {
        return ssnid;
    }


    public void setSsnid(String ssnid) {
        this.ssnid = ssnid;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
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

    public String getDate_of_admission() {
        return date_of_admission;
    }

    public void setDate_of_admission(String date_of_admission) {
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
