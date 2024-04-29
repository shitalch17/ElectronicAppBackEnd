package com.example.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.entity.OrderDetail;

import com.example.entity.User;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer>{
	 public List<OrderDetail> findByUser(User user);

	    public List<OrderDetail> findByOrderStatus(String status);
}
