import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holdings',
  standalone: true,
  imports: [],
  templateUrl: './holdings.component.html',
  styleUrl: './holdings.component.css'
})
export class HoldingsComponent implements OnInit {
  investments = [
      { name: 'Fidelity Cash', amount: 2291.90 },
      { name: 'Wells Fargo', amount: 309.13 },
      { name: 'Fidelity Brokerage', amount: 53165.79 },
    ];
  constructor() { }

  ngOnInit(): void {}

}
