package com.example.dao;

import com.example.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface RoleDao extends CrudRepository<Role, String> 
{

}
