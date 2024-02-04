import { Observable } from "rxjs";

export abstract class AbstractAuthService {
    abstract signIn(): Observable<any>;
}