package com.project.hms.services;

import com.project.hms.db.models.Login;
import com.project.hms.db.repositories.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Optional<Login> loginVerifier(String loginId) {
        return loginRepository.findById(loginId);

    }
    public void insertUserStore(String loginId){
        loginRepository.insertUserStore(loginId);
    }

}
