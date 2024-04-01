import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;
  isDiffPass: boolean = true;

  constructor(private userService: UserService, private router: Router){}

  register(form: NgForm): void{
    if(form.invalid){
      return;
    }

    const {email, password, rePassword} = form.value;

    // Reset isDiffPass before checking if passwords match
    this.isDiffPass = true;

    if (password !== rePassword) {
      this.isDiffPass = false;
      return;
    }

    this.userService.register(email, password, rePassword).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  onPasswordInput(): void {
    this.isDiffPass = true; // Reset isDiffPass when passwords are being typed
  }
}
