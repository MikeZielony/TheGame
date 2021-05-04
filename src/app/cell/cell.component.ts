import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  isGreenVisible = false;
  isRedVisible = false;
  isYellowVisible = false;
  isBlueVisible = false;
  fieldNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

  emptyField(): boolean {
    return !this.isYellowVisible || !this.isRedVisible || !this.isGreenVisible || !this.isBlueVisible;
  }

}
