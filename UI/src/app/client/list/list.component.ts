import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientJPV } from 'src/models/client';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dateBirth', 'saleValue', 'cpf', 'actions'];
  clients:any[]=[]
  
  constructor(
    private clientService: ClientService,
    private router: Router
  ) {
    this.getClients()
  }
  edit(id:number){
    this.router.navigateByUrl(`client/edit/${id}`);
  }

  ngOnInit(): void {
  }

  remove(client: ClientJPV) {
    this.clientService.deleteClient(client).subscribe({
        complete: () => this.getClients() 
    })
  }

  getClients(){
    this.clientService.getClients().subscribe((res)=> {
      this.clients = res
    })
  }

}
