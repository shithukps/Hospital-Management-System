package com.project.hms.db.repositories;

import com.project.hms.db.models.Login;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface LoginRepository extends CrudRepository<Login,String> {
    @Transactional
    @Modifying
    @Query(
            value = "insert into userstore values(:loginId,:loginId,NOW())",
            nativeQuery = true)
    void insertUserStore(String loginId);
}
