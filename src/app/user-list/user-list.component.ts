import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  sortedUsers: User[] = [];
  editingUser: User | null = null;
  nameForm: FormGroup;
  formHeader="Add Users";
  showForm: boolean = false;
  submitted: boolean = false;
  reverse: boolean = true;
  sortColumn: string = 'id';
  page: number = 1; 
  itemsPerPage: number = 10; 
  searchQuery: string = '';
  
  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
    
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.sortedUsers = [...this.users];
    });

  }

  

  get formControls() {
    return this.nameForm.controls;
  }
  
  // get emailid() {
  //   return this.nameForm.controls;
  // }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== id);
      this.sortedUsers = [...this.users]; // Update sortedUsers array
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.nameForm.reset();
      this.submitted = false;
    }
  }

  openForm(user: User | null = null): void {
    this.showForm = true;
    if (user) {
      this.formHeader = "Edit User";
      this.editingUser = user;
      this.nameForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      this.formHeader = "Add User";
      this.editingUser = null;
      this.nameForm.reset();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.nameForm.invalid) {
      return;
    }
    const formValue = this.nameForm.value;
    if (this.editingUser) {
      // Update user data in the array
      this.editingUser.name = formValue.name;
      this.editingUser.email = formValue.email;
      this.editingUser.role = formValue.role;
    } else {

    const newUser: User = {
      id: this.users.length + 1, // Auto-increment ID
      name: this.nameForm.value.name,
      email: this.nameForm.value.email,
      role: this.nameForm.value.role,
    };

    this.users.push(newUser);
  }
    this.sortedUsers = [...this.users];
    this.nameForm.reset();
    this.submitted = false;
    this.showForm = false;
    this.editingUser = null;
  }

  closeForm(): void {
    this.showForm = false;
    this.nameForm.reset();
    this.submitted = false;
    this.editingUser = null;
  }

  saveUser(): void {
    this.showForm = false;
    if (this.editingUser) {
      console.log('User saved:', {
        name: this.editingUser.name,
        email: this.editingUser.email,
        role: this.editingUser.role
      });
    }
    this.nameForm.reset();
    this.submitted = false;
    this.editingUser = null;
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.reverse = !this.reverse;
    } else {
      this.sortColumn = column;
      this.reverse = true;
    }

    const isAsc = this.reverse ? 1 : -1;
    this.sortedUsers = this.users.sort((a, b) => {
      switch (column) {
        case 'id':
          return (a.id - b.id) * isAsc;
        case 'name':
          return a.name.localeCompare(b.name) * isAsc;
        case 'email':
          return a.email.localeCompare(b.email) * isAsc;
        case 'role':
          return a.role.localeCompare(b.role) * isAsc;
        default:
          return 0;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.sortedUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

}