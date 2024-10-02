import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ContactList-app';

  ngOnInit() {
    console.log('ngOnInit called'); // Verifica que ngOnInit se está ejecutando
    this.createCursorTrail();
  }

  private createCursorTrail() {
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    console.log('Cursor trail created:', cursorTrail);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cursorTrail = document.querySelector('.cursor-trail') as HTMLElement;

    if (cursorTrail) {
      cursorTrail.style.left = `${event.clientX}px`;
      cursorTrail.style.top = `${event.clientY}px`;
    }
  }
}
