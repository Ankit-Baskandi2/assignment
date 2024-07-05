import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  data: any;

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('details') || '');
    if (Array.isArray(this.data) && this.data.length > 0) {
      console.log('This is array :', this.data[0].email);
    } else {
    }
  }
}
