import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatOption} from "@angular/material";
import {UserService} from "../../common/user.service";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  roles$: Observable<Array<any>>;
  profileFormGroup: FormGroup;
  matcher;
  @ViewChild('allSelected') private allSelected: MatOption;
  private roles: Array<any>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<AddProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {profile: any}) {
    this.matcher = MyErrorStateMatcher();
    this.roles$ = this.userService.findAllRoles();
    this.roles$.subscribe(roles => this.roles = roles);
    let profile = null;
    if(this.data != undefined && this.data.profile != undefined) {
      profile = {
        id: [this.data.profile.id],
        name: [this.data.profile.name, Validators.required],
        description: [this.data.profile.description],
        roles: [this.data.profile.roles, Validators.required],
      }
    } else {
      profile = {
        id: [],
        name: [, Validators.required],
        description: [],
        roles: [, Validators.required],
      }
    }
    this.profileFormGroup = this.fb.group(profile);
  }

  compareId(o1: any, o2: any) {
    return (o1.id ==o2.id);
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.profileFormGroup.controls['roles']
        .patchValue([this.roles]);
    } else {
      this.profileFormGroup.controls['roles'].patchValue([]);
    }
  }


  ngOnInit() {
  }

  save() {
    if(this.profileFormGroup.invalid) {
      return;
    }
    this.userService.saveProfile(this.profileFormGroup.value).subscribe(result => {
      alert("Profile Saved");
      this.dialogRef.close();
    });
  }

  togglelePerOne(all) {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if(this.profileFormGroup.controls['roles'].value.length==this.roles.length)
      this.allSelected.select();
  }
}
