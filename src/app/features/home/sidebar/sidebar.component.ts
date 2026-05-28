import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class Sidebar {
  pinned = signal(false);
  hovered = signal(false);

  get expanded(): boolean {
    return this.pinned() || this.hovered();
  }

  toggle() { this.pinned.set(!this.pinned()); }
  onMouseEnter() { this.hovered.set(true); }
  onMouseLeave() { this.hovered.set(false); }
}
