import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/services/client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientJPV } from 'src/models/client';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  formCliente!: FormGroup;
  id!: number;
  client: ClientJPV= {name: '', saleValue: 0, cpf: '',  dateBirth:new Date()};
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      name: ['', Validators.required],
      dateBirth: ['', Validators.required],
      saleValue: ['', Validators.required],
      cpf: ['', [Validators.required, this.validarCPF]]
    });

    this.route.params.subscribe(params => {
      if(params && params['id']){
        this.initEdit(params['id']);
      }
    });
  }

  onSubmit(): void {
    if (!this.formCliente.valid) return;

    if(this.id > 0) this.edit();
    else this.create();

  }

  create(){
    this.clientService.createClient(this.formCliente.value).subscribe({
      next: ()=> {
        this.openSnackBar('Cliente criado com sucesso !');
        this.router.navigateByUrl('/client/list');
      },
      error: ()=> this.openSnackBar('Erro ao criar cliente')
    });
  }

  edit(){
    this.clientService.updateClient({...this.formCliente.value, id: this.id}).subscribe({
      next: ()=> {
        this.openSnackBar('Cliente atualizado com sucesso !');
        this.router.navigateByUrl('/client/list');
      },
      error: ()=> this.openSnackBar('Erro ao atualizar cliente')
    });
  }

  validarCPF(control:any): { [key: string]: boolean } | null {

    if (!control.value) {
        return null; 
    }

    const cpf = control.value.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return { 'invalidCpf': true };
    }

    if (cpf.length !== 11 || !!cpf.match(/(\\d)\\1{10}/)) {
        return { 'invalidCpf': true };
    }

    const digits = cpf.split('').map((el: string | number) => +el);

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
    }
    let remainder = sum % 11;
    const firstVerifier = remainder < 2 ? 0 : 11 - remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += digits[i] * (11 - i);
    }
    remainder = sum % 11;
    const secondVerifier = remainder < 2 ? 0 : 11 - remainder;

    if(digits[9] === firstVerifier && digits[10] === secondVerifier) return null;
    else return { 'invalidCpf': true };
    }

  openSnackBar(message: string){
    this._snackBar.open(message,'', {
      duration: 3000
    } );
  }

  initEdit(id:number){
    this.id =id;
    this.clientService.getClient(id).subscribe({
      next: res => {
        this.client = res;
      }
    });

  }
}
