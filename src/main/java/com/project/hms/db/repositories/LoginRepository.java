package com.project.hms.db.repositories;

import com.project.hms.db.models.Login;
import org.springframework.data.repository.CrudRepository;

public interface LoginRepository extends CrudRepository<Login,String> {
}
