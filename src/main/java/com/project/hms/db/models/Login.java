package com.project.hms.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="login")
public class Login {
    @Id
    @Column(name="id")
    @Size(max = 10)
    @NotNull
    private String id;


    //    @JsonIgnore
    @Size(max = 20)
    @Column(name="password")
    @NotNull
    private String password;

    public Login() {

    }

    public Login(@Size(max = 10) @NotNull String id, @Size(max = 20) @NotNull String password) {
        this.id = id;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
