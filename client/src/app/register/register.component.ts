import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any ={};

  constructor(private accountServce: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {    
  }

  register(){
    console.log(this.model);
    this.accountServce.register(this.model).subscribe(response => {console.log( response)}, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
