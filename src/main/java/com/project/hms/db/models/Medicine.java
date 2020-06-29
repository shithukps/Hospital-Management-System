package com.project.hms.db.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="medicine")

public class Medicine {
    @Id
    @Column(name = "medicine_id")
    @NotNull
    private Integer medicine_id;

    @Size(max = 50)
    @Column(name = "medicine_name")
    @NotNull
    private String medicine_name;

    @Column(name = "quantity_avail")
    @NotNull
    private Integer quantity_avail;


    @Column(name = "rate")
    @NotNull
    private float rate;

    public Medicine(){


    }

    public Medicine(Integer medicine_id, @Size(max = 50) String medicine_name, Integer quantity_avail, float rate) {
        this.medicine_id = medicine_id;
        this.medicine_name = medicine_name;
        this.quantity_avail = quantity_avail;
        this.rate = rate;
    }

    public Integer getMedicine_id() {
        return medicine_id;
    }

    public void setMedicine_id(Integer medicine_id) {
        this.medicine_id = medicine_id;
    }

    public String getMedicine_name() {
        return medicine_name;
    }

    public void setMedicine_name(String medicine_name) {
        this.medicine_name = medicine_name;
    }

    public Integer getQuantity_avail() {
        return quantity_avail;
    }

    public void setQuantity_avail(Integer quantity_avail) {
        this.quantity_avail = quantity_avail;
    }

    public float getRate() {
        return rate;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }
}
