import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css']
})
export class HeaderFormComponent implements OnInit {
  @Input() headerText: any;
  @Input() iconHeader: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
