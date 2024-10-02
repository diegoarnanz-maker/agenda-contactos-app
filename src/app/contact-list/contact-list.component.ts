import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../model/IContact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule,
    CommonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'] 
})
export class ContactListComponent implements OnInit {
  
  private contactService = inject(ContactService);
  contacts: Contact[] = [];

  ngOnInit(): void {
    this.contactService.list().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  deleteContact(contact: Contact) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperar este contacto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.delete(contact.id).subscribe(() => {
          this.contacts = this.contacts.filter(c => c.id !== contact.id);
          Swal.fire(
            'Eliminado!',
            'El contacto ha sido eliminado.',
            'success'
          );
        }, error => {
          Swal.fire(
            'Error!',
            'No se pudo eliminar el contacto.',
            'error'
          );
        });
      }
    });
  }
}
