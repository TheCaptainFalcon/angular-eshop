import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filler',
  templateUrl: './filler.component.html',
  styleUrls: ['./filler.component.css']
})
export class FillerComponent implements OnInit {

  constructor(private router: Router) { }

  goBack() {
    this.router.navigateByUrl('/admin/orders');
  }

  ngOnInit(): void {
  }

}
