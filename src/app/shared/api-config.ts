import { HttpHeaders } from '@angular/common/http';

export class ApiConfig {

    static getHeader() {
        return new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('tomwellApp:$2a$10$zX8v86SyTpSivZWdCO9yqu9ccAK5nb5xs9Fa2xaj7F0Ecjn9jr0JC')
        });
    }
}
