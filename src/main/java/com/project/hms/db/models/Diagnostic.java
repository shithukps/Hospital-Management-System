package com.project.hms.db.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="diagnostic")
public class Diagnostic {
    @Id
    @Column(name = "test_id")
    @NotNull
    private Integer test_id;

    @Size(max=50)
    @Column(name = "test_name")
    @NotNull
    private String test_name;

    @Column(name = "test_charge")
    @NotNull
    private float test_charge;

    public Diagnostic(){

    }

    public Diagnostic(Integer test_id, @Size(max = 50) String test_name, float test_charge) {
        this.test_id = test_id;
        this.test_name = test_name;
        this.test_charge = test_charge;
    }

    public Integer getTest_id() {
        return test_id;
    }

    public void setTest_id(Integer test_id) {
        this.test_id = test_id;
    }

    public String getTest_name() {
        return test_name;
    }

    public void setTest_name(String test_name) {
        this.test_name = test_name;
    }

    public float getTest_charge() {
        return test_charge;
    }

    public void setTest_charge(float test_charge) {
        this.test_charge = test_charge;
    }
}
