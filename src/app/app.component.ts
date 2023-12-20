import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgForm} from "@angular/forms";
import {GuitarService} from "./guitar.service";
import {Guitar} from "./guitar";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'guitarchive_frontend';
  public guitars: Guitar[] | undefined | null;

  public isUpdateModal: boolean = false;
  public isDeleteModal: boolean = false;
  public isAddModal: boolean = false;
  public isDescriptionModal: boolean = false;

  @ViewChild('imageSelected') selectedImage: ElementRef | undefined;
  @ViewChild('imageUploadSubmit') imageUploadSubmit: ElementRef | undefined;
  @ViewChild('updateImageSelected') updateSelectedImage: ElementRef | undefined;
  @ViewChild('updateImageUploadSubmit') updateImageUploadSubmit: ElementRef | undefined;
  public selectedImageString: string | undefined;
  public editGuitar:  Guitar | undefined | null;
  public editGuitarId: any;
  public editGuitarNickname: any;
  public editGuitarMake: any;
  public editGuitarModel: any;
  public editGuitarYear: any;
  public editGuitarColor: any;
  public editGuitarDescription: any;
  public editGuitarImageURL: any;
  public imageFile: any;

  ngOnInit() {
    this.getGuitars();
  }

  constructor(private guitarService: GuitarService) {
  }

    public getGuitars():void{
      this.guitarService.getGuitars().subscribe({
        next: (response: Guitar[]) => {
          this.guitars = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }

    public addGuitar(formValue: Guitar):void{
      this.guitarService.addGuitar(formValue).subscribe({
        next: (response: Guitar[]) =>{
          this.guitars = response;
          this.getGuitars();
        },
        error: (error: HttpErrorResponse) =>{
          alert(error.message);
      }
      })
    }

  public updateGuitar(formValue: Guitar):void{
    this.guitarService.updateGuitar(formValue).subscribe({
      next: (response: Guitar[]) =>{
        this.guitars = response;
        this.getGuitars();
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

    public deleteGuitar(employeeId: number): void{
    this.guitarService.deleteGuitar(employeeId).subscribe({
      next: (response: Guitar[]) =>{
        this.guitars = response;
        this.getGuitars();
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    })
    }


    onOpenModal(type: string, guitar: Guitar | null): void {
      switch(type){
        case "add":
          this.isAddModal = true;
          break;
        case "update":
          this.isUpdateModal = true;
          if(guitar != null){
            this.editGuitar = guitar;
            this.editGuitarId = this.editGuitar.id;
            this.editGuitarNickname = this.editGuitar.nickname;
            this.editGuitarMake = this.editGuitar.make;
            this.editGuitarModel = this.editGuitar.model;
            this.editGuitarYear = this.editGuitar.year;
            this.editGuitarColor = this.editGuitar.color;
            this.editGuitarDescription = this.editGuitar.description;
            this.editGuitarImageURL = this.editGuitar.imageURL;
          }
          break;
        case "delete":
          this.isDeleteModal = true;
          if(guitar != null){
            this.editGuitar = guitar;
            this.editGuitarId = this.editGuitar.id;
          }
          break;
        case "description":
          this.isDescriptionModal = true;
          if(guitar != null){
            this.editGuitar = guitar;
            this.editGuitarId = this.editGuitar.id;
            this.editGuitarNickname = this.editGuitar.nickname;
            this.editGuitarMake = this.editGuitar.make;
            this.editGuitarModel = this.editGuitar.model;
            this.editGuitarYear = this.editGuitar.year;
            this.editGuitarColor = this.editGuitar.color;
            this.editGuitarDescription = this.editGuitar.description;
            this.editGuitarImageURL = this.editGuitar.imageURL;
          }
          break;
      }
    }

    onCloseModal(): void{
      this.isUpdateModal = false;
      this.isDeleteModal = false;
      this.isAddModal = false;
      this.isDescriptionModal = false;
    }

    onDeleteGuitar(formName: NgForm){
      let employeeId = formName.value.id;
      this.deleteGuitar(employeeId);
      this.isDeleteModal = false;
    }

    onAddGuitar(formName: NgForm) {
      if(formName.value.imageURL == ''){
        formName.value.imageURL = './assets/unknown_guitar.svg'
      }
      this.addGuitar(formName.value);
      this.isAddModal = false;
      formName.resetForm();
    }

    onUpdateGuitar(formName: NgForm): void{
    this.updateGuitar(formName.value);
    this.isUpdateModal = false;
    formName.resetForm();
    }
}
