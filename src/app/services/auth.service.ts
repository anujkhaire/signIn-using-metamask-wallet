import { Injectable } from '@angular/core';
import { from,of, Observable, switchMap } from 'rxjs';
import { AbstractAuthService } from './abstract.auth.service';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractAuthService{

  
  constructor() { super(); }
  
  signIn(): Observable<any>{
    let ethereumProvider: any;
    let web3 = new Web3(Web3.givenProvider);  
    return from(detectEthereumProvider()).pipe(
      switchMap( async provider => {
        if(!provider){
          new Error('Please Install Metamask')
        }
        if(provider !== window.ethereum){
          new Error('Multiple wallets are installed')
        }
        ethereumProvider = provider;
        // if(window.ethereum.isMetaMask){
        // }
        console.log(ethereumProvider.selectedAddress);
        
        return await ethereumProvider.request({ method: 'eth_requestAccounts' });
      }),
      switchMap(
        async (response) =>
          await ethereumProvider.request({
            method: 'personal_sign',
            params: [
              `0x${this.toHex('32')}`,
              ethereumProvider.selectedAddress, 
            ],
          })
      ),
    )
  };
  private toHex(stringToConvert: string) {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }
}
