import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { HttpUtilService } from './http-util.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    private API_URL = environment.URL;

    constructor(private http: HttpClient, private httpUtil: HttpUtilService) { }

    uploadFile(file: File) {      
        const formData: FormData = new FormData();
        formData.append('image', file);

        return this.http.post(this.API_URL + `upload`, formData)
            .pipe(map(this.httpUtil.extrairDados))
            .pipe(
                retryWhen(errors => errors.pipe(delay(1000), take(10))),
                catchError(this.httpUtil.processarErros));
    }
}
