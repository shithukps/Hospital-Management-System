package com.project.hms.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Table(name="userstore")
public class UserStore {
    @Column(name="login")
    @Size(max = 10)
    @NotNull
    private String login;

    @Size(max = 20)
    @Column(name="password")
    @NotNull
    private String password;

    @Column(name="timestamp")
    @NotNull
    private Timestamp  timestamp;

    public UserStore() {

    }

    public UserStore(String login, String password, Timestamp timestamp) {
        this.login = login;
        this.password = password;
        this.timestamp = timestamp;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
