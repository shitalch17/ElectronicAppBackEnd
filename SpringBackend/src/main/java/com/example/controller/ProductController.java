package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.employee.entity.Employee;
/*import com.example.entity.ImageModel;*/
//import com.example.entity.ImageModel;
import com.example.entity.Product;
import com.example.service.ProductService;

@RestController
public class ProductController {

	@Autowired
	private ProductService productService;



	@PreAuthorize("hasRole('Admin')")
	@PostMapping("/addNewProduct") 
	public ResponseEntity<Product> addNewProduct(@RequestBody Product product)
	{
		Product product1= productService.addNewProduct(product);
		return ResponseEntity.status(HttpStatus.CREATED).body(product1);
	}

	//@PreAuthorize("hasRole('Admin')")
	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts(@RequestParam(defaultValue="0") int pageNumber,@RequestParam(defaultValue="") String searchKey)
	{
		 List<Product> result = productService.getAllProducts(pageNumber, searchKey);
	        System.out.println("Result size is "+ result.size());
	        return result;
	}
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping({"/deleteProductDetails/{productId}"}) 
	public void deleteProductDetails(@PathVariable("productId") Integer productId) 
	{
		productService.deleteProductDetails(productId); 
	}

	@GetMapping({"/getProductDetailsById/{productId}"}) public Product
	getProductDetailsById(@PathVariable("productId") Integer productId) 
	{ 
		return productService.getProductDetailsById(productId); 
	}

	@PreAuthorize("hasRole('User')")
	@GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
	public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout" ) boolean isSingleProductCheckout,
			@PathVariable(name = "productId")  Integer productId) 
	{
		return productService.getProductDetails(isSingleProductCheckout, productId);
	}
	/*
	 * @PutMapping("addNewProduct/{id}") Product updateEmployee(@RequestBody Product
	 * newProduct, @PathVariable Integer id) { return
	 * productService.getProductDetailsById(id).map(product -> {
	 * product.setProductName(newProduct.getProductName());
	 * product.setProductDescription(newProduct.getProductDescription());
	 * product.setProductActualPrice(newProduct.getProductActualPrice());
	 * product.setProductDiscountedPrice(newProduct.getProductActualPrice()); return
	 * productService.addNewProduct(product);}) .orElseGet(() -> {
	 * newProduct.setProductId(id); return productService.addNewProduct(newProduct);
	 * }); }
	 */

	/*
	 * @GetMapping({"/getAllProducts"}) 
	 * public List<Product>getAllProducts(@RequestParam(defaultValue = "0") int pageNumber,
	 * 
	 * @RequestParam(defaultValue = "") String searchKey) { List<Product> result =
	 * productService.getAllProducts(pageNumber, searchKey);
	 * System.out.println("Result size is "+ result.size()); return result; }
	 * 
	 * @GetMapping({"/getProductDetailsById/{productId}"}) public Product
	 * getProductDetailsById(@PathVariable("productId") Integer productId) { return
	 * productService.getProductDetailsById(productId); }
	 * 
	 * @PreAuthorize("hasRole('Admin')")
	 * 
	 * @DeleteMapping({"/deleteProductDetails/{productId}"}) public void
	 * deleteProductDetails(@PathVariable("productId") Integer productId) {
	 * productService.deleteProductDetails(productId); }
	 * 
	 * @PreAuthorize("hasRole('User')")
	 * 
	 *
	 * 
	 *
	 */
}
