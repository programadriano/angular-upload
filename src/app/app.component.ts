import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularUpload';
  localUrl: any;
  file?: File;


  constructor(private uploadService: UploadService) { }


  selectFile(event: any) {
    this.file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadFile() {
    if (this.file != undefined) {
      this.uploadService.uploadFile(this.file).subscribe((data) => {
        console.log(data);
        alert("Arquivo enviado com sucesso!")
      })
    } else {
      alert("Selecione um arquivo!")
    }
  }

}

