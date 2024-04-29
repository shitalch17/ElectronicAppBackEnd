import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService:UserService){}
  ngOnInit(): void {
    
  }


  register(registerForm:NgForm)
  {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response)=>{
          console.log(response);
      },
      (error)=>
      {
        console.log(error);
      }
    );
  }
}
