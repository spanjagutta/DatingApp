import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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

  constructor(private accountServce: AccountService) { }

  ngOnInit(): void {    
  }

  register(){
    console.log(this.model);
    this.accountServce.register(this.model).subscribe(response => {console.log( response)}, error => console.log(error));
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
