import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './../http-service.service';
import { User } from './../user';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    HttpServiceService
  ]
})
export class NavbarComponent implements OnInit {

  userData: User = new User();
  showSearchBar = false;
  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.httpService.getServer("/api/user/currentUser")
      .then(r => {
        console.log(r);
        this.userData.set(r._id, r.username, r.email, r.name, r.bio ? r.bio : "");
      })
      .catch(err => console.log(err));
  }

  showHideSearch() {
    if (this.showSearchBar) {
      this.hideSearch();
      this.showSearchBar = !this.showSearchBar;
    } else {
      this.showSearch();
      this.showSearchBar = !this.showSearchBar;
    }
  }

  showSearch() {
    $('#nav-home').addClass("d-none d-lg-block");
    $('#nav-create').addClass("d-none d-lg-block");
    $('#nav-profile').addClass("d-none d-lg-block");
    $('#close-search').removeClass("d-none");

    $('#nav-search-mobile').removeClass("d-lg-none d-block");
    $('#nav-search-mobile').addClass("d-none d-lg-block");
    $('#nav-search-pc').removeClass("d-none");
    $('#nav-search-pc').addClass("d-block");
    return true;
  }

  hideSearch() {
    $('#nav-home').removeClass("d-none d-lg-block");
    $('#nav-create').removeClass("d-none d-lg-block");
    $('#nav-profile').removeClass("d-none d-lg-block");
    $('#close-search').addClass("d-none");

    $('#nav-search-mobile').removeClass("d-none d-lg-block");
    $('#nav-search-mobile').addClass("d-lg-none d-block");
    $('#nav-search-pc').removeClass("d-block");
    $('#nav-search-pc').addClass("d-none");
  }
}
