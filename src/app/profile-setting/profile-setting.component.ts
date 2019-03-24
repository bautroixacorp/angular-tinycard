import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpServiceService } from './../http-service.service';
import { User } from './../user';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class ProfileSettingComponent implements OnInit {

  userData: User = new User();
  passData = {
    newPass: "",
    currentPass: "",
    repeatPass: ""
  }

  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.init();
  }
  init(){
    this.getProfile();
  }
  getProfile() {
    this.httpService.getServer("/api/user/currentUser")
      .then(r => {
        console.log(r);
        this.userData.set(r._id, r.username, r.email, r.name, r.bio?r.bio:"");
      })
      .catch(err => console.log(err));
  }
  submit(){
    var data = this.userData;
    console.log(data);
    this.httpService.putServer("/api/user/currentUser",data)
      .then(resJson => alert(resJson.message))
      .catch(err => console.log(err));
  }
  reload(){
    window.location.reload();
  }
  submitChangePass(){
    var data = this.passData;
    console.log(data);
    this.httpService.putServer("/api/user/currentUser/password",data)
      .then(resJson => alert(resJson.message))
      .catch(err => console.log(err));
  }
}
