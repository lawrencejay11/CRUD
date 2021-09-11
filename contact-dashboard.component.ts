import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { ContactModel } from './contact-dashboard.model';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.css']
})
export class ContactDashboardComponent implements OnInit {

  formValue !: FormGroup;
  contactModelObj : ContactModel = new ContactModel();
  contactData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this. formValue = this.formbuilder.group({
      name : [''],
      email : [''],
      phone : ['']
    })
    this.getAllContact();
  }

  clickAddContact() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postContactDetails() {
    this.contactModelObj.name = this.formValue.value.name;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.phone = this.formValue.value.phone;

    this.api.postContact(this.contactModelObj)
    .subscribe(res=> {
      console.log(res);
      alert("Contact Added Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllContact();
    },
    err=> {
      alert("Something went Wrong!")
    })
  }

  getAllContact() {
    this.api.getContact()
    .subscribe(res=>{
      this.contactData = res;
    })
  }

  deleteContact(row : any) {
    this.api.deleteContact(row.id)
    .subscribe(res=>{
      alert("Contact has been Deleted!")
      this.getAllContact();
    })
  }

  editContact(row : any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.contactModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
  }

  updateContactDetails() {
    this.contactModelObj.name = this.formValue.value.name;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.phone = this.formValue.value.phone;

    this.api.updateContact(this.contactModelObj,this.contactModelObj.id)
    .subscribe(res=>{
      alert("Contact has updated Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllContact();
    })
  }
}
