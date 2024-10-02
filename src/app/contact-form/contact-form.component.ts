import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/IContact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  
  private fb = inject(FormBuilder)
  private router = inject(Router);
  private contactService = inject(ContactService);
  private activatedRoute = inject(ActivatedRoute);

  contact?: Contact;
  
  // Para cargar los datos del usuario en el edit.
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
    if(id) {
      this.contactService.get(parseInt (id))
      .subscribe(contact => {
        this.contact = contact;
        this.form.setValue({
          name: contact.name,
          email: contact.email,
        });
      });
    }
  }

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  save() {
    if (this.form.invalid) {
      alert('Por favor, completa los campos requeridos.');
      return;  // No proceder si el formulario es inválido
    }
  
    const contactForm = this.form.value;
  
    if (this.contact) {
      this.contactService.update(this.contact.id, contactForm)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.contactService.create(contactForm)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
  

}
