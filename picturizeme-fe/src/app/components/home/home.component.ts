import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  imageToShow: any[] = [];
  imageLoading: boolean = false;
  imageDesc: any[] = [];

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    for(let i = 0; i < 1; i++){
      this.loadImage(i)
      this.getImageDesc(i)
    }
  }

  loadImage(n) {
    this.imageLoading = true
    this.imagesService.getImage(n).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.imageLoading = false;
      }
      ,
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow.push(reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageDesc(index){
    this.imagesService.getOneDesc(index).subscribe(
      data => {
        let temp = data.body;
        this.imageDesc.push(data.body.data.docs[0])
      }
    )
  }
}
