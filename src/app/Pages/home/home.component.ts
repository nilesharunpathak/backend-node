import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userForm!: FormGroup;
  myusers: any;
  filteredUser: any[] = [];
  serachTerm: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userForm = this.fb.group({
      // _id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['active', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  saveUser() {
    console.log("userForm", this.userForm.value);


    if (this.userForm.value._id) {

      this.apiService.updateUser(this.userForm.value._id, this.userForm.value).subscribe((updatedUser) => {
        console.log("updated user", updatedUser);
        this.userForm.reset();
        if (updatedUser) {
          this.getUsers();

        }
      })
    } else {

      this.apiService.createUser(this.userForm.value).subscribe((createUser: any) => {
        console.log("created user", createUser);
        this.userForm.reset();
        this.getUsers();


      })
    }


  }

  getUsers() {
    this.apiService.getUsers().subscribe((users: any) => {
      this.myusers = users;
      console.log("this.users", this.myusers);

    })
  }

  editUser(editUsers: any) {
    console.log("editUsers", editUsers);
    this.userForm.patchValue(editUsers);


  }

  confirmDelete(deleteUser: any) {
    this.userForm.patchValue(deleteUser);
    console.log("this.userForm.patchValue(deleteUser);-->", this.userForm.value);


  }

  deleteUser() {
    console.log("this.userForm", this.userForm.value);

    this.apiService.deleteUser(this.userForm.value._id).subscribe(() => {
      console.log("user deleted");
      this.getUsers();

    })
  }

  filteredUsers() {
    const serachTermLower = this.serachTerm.toLowerCase();
    if (serachTermLower) {
      this.filteredUser = this.myusers.filter((user: any) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
        return fullName.includes(serachTermLower) || user.lastname.toLowerCase().includes(serachTermLower);
      });
      this.myusers = this.filteredUser;
      return this.myusers
    } else {
      this.myusers = [...this.myusers]
    }


  }
}
