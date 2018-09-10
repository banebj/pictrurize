import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  imageToShow: any;
  imageLoading: boolean = false;
  file: any;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {

  }

  loadImage(){
    this.imageLoading = true
    this.imagesService.getImage("image_1536612256165.jpg").subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.imageLoading = false;
      } 
      ,
    );
  }

  onSubmit(){
    this.imagesService.upload(this.file).subscribe(
      data => console.debug("Success")
    )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.debug(this.file)
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
