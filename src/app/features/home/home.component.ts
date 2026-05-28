import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Sidebar } from './sidebar/sidebar.component'

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Sidebar
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home { }
