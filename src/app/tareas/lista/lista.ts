import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar ngFor

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule], // Necesitas esto para directivas estructurales como *ngFor
  templateUrl: './lista.html',
  styleUrls: ['./lista.css']
})
export class ListaComponent implements OnInit {
  tareas: any[] = [];

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.getTareas().subscribe(data => {
      this.tareas = data;
      console.log('Tareas obtenidas:', this.tareas); // Opcional, para verificar en la consola
    });
  }
}
