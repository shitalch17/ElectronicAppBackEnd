package com.example.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Cart;
import com.example.entity.User;


  @Repository 
  public interface CartDao extends CrudRepository<Cart, Integer > {
  public List<Cart> findByUser(User user); }
 