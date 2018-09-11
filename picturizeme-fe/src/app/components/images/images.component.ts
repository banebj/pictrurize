import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  file: any
  image: any = {};

  constructor(private imagesService: ImagesService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit(){
    this.imagesService.upload(this.file).subscribe(
      data => {
        console.debug("Success")
        this.image.file = this.file.name;
        this.imagesService.save(this.image).subscribe(
          data => this.router.navigate([''])
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
