import { Component, OnInit } from '@angular/core';
import { AbstractAuthService } from 'src/app/services/abstract.auth.service';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private abstractAuthService: AbstractAuthService
  ) { }

  ngOnInit(): void {
  }

  signInWithMetamask(){
    this.abstractAuthService.signIn().subscribe({
      next: res => {
        console.log('res',res);
        // const recoveredAddress = recoverPersonalSignature({
        //   data: `0x${this.toHex('32')}`,
        //   signature: res,
        // });
        // console.log('recoveredAddress',recoveredAddress);
        
      },
      error: err => {
        console.log('err',err);
      } 
    })
  }

  toHex(stringToConvert: string) {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

}
