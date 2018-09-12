import { Component, OnInit, HostListener } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  imageToShow: any[] = [];
  imageLoading: boolean = false;
  imageDesc: any[] = [];
  loading: boolean = false;
  modal: NgbModalRef;
  imageForm: any = {}

  constructor(private imagesService: ImagesService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getImageDesc()
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.body.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      console.debug("na kraju sam ekrana")
    }
  }

  loadImage(filename, index) {
    this.imageLoading = true
    this.imagesService.getImage(filename).subscribe(
      (data) => {
        this.createImageFromBlob(data, index);
        this.imageLoading = false;
      }
      ,
    );
  }

  createImageFromBlob(image: Blob, index) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageDesc[index].image = reader.result
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageDesc(){
    this.loading = true;
    this.imagesService.getAll(5).subscribe(
      data => {
        let temp = data.body;
        this.imageDesc = temp.data
        this.imageDesc.forEach((x, index) => {
          this.loadImage(x.file, index)
        })
        this.loading = false
      }
    )
  }

  deleteImage(id){
    this.imagesService.delete(id).subscribe(
      data => {
        this.getImageDesc()
        this.toastr.success("Succesfully delete image!", "Success")
      }
    )
  }

  openEditModal(content, image){
    this.modal = this.modalService.open(content)
    this.imageForm = Object.assign({}, image)
  }

  saveEditModal(form){
    this.imageForm.image = null;
    this.imagesService.update(this.imageForm).subscribe(
      data => {
        this.toastr.success("Successfully update image"+this.imageForm.title, "Success")
        this.getImageDesc();
        this.modal.close();
      }
    )
  }
}
