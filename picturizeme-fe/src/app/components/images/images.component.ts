import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  file: any
  image: any = {};

  constructor(private imagesService: ImagesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

  }

  onSubmit(){
    this.imagesService.upload(this.file).subscribe(
      data => {
        this.image.file = this.file.name;
        this.imagesService.save(this.image).subscribe(
          data => {
            setTimeout(() => {
              this.toastr.success("Successfully posted image "+this.image.title+" redirecting to home page", "Success")
              this.router.navigate([''])
            }, 1000);
          },
          data => {
              this.toastr.error(data.error.message, "Error")
          }
        )
      }
    )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  goBack(){
    this.router.navigate([''])
  }
}
