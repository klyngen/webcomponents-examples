import { Component } from '@angular/core';
import 'overtime-visualizer';
import { OvertimeData } from 'overtime-visualizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';
  subtract = 0;

  data: OvertimeData[] = [
   {name: 'Free overtime', color: '#F77', value: 10, priority: 1},
   {name: 'Valuable overtime', color: '#FF7', value: 15, priority: 2},
   {name: 'Premium overtime', color: '#77F', value: 20, priority: 3}
  ];
}

