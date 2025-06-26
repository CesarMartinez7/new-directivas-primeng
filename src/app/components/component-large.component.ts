import { Component, OnInit } from '@angular/core';
// Ya NO necesitas importar HttpClient ni HttpClientModule aquí
import { CommonModule } from '@angular/common'; // Mantén CommonModule para *ngFor, *ngIf
import { Observable } from 'rxjs'; // Puedes quitar esto si no lo usas para nada más, pero lo mantengo por si acaso

// Define la interfaz para los datos que esperamos (sigue siendo buena práctica)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-single-file-api',
  standalone: true, // ¡Importante! Asegúrate de que siga siendo standalone
  imports: [CommonModule], // Solo CommonModule ahora
  template: `
    <div class="container">
      <h1>Publicaciones de JSONPlaceholder (Fetch Nativo)</h1>

      <div *ngIf="loading" class="loading">
        Cargando publicaciones...
      </div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && posts.length > 0" class="posts-list">
        <div *ngFor="let post of posts.slice(0,5); let i = index" class="post-card">
          <h2>{{ i + 1 }}. {{ post.title }}</h2>
          <p>{{ post.body }}</p>
          <small>Usuario ID: {{ post.userId }}</small>
        </div>
      </div>

      <div *ngIf="!loading && !error && posts.length === 0" class="no-data">
        No se encontraron publicaciones.
      </div>
    </div>
  `,
  styles: [`
    /* Tus estilos CSS aquí (los mismos que antes) */
    .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
    }

    .loading, .error, .no-data {
        text-align: center;
        padding: 20px;
        font-size: 1.1em;
        color: #666;
    }

    .error {
        color: #d9534f;
        font-weight: bold;
    }

    .posts-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .post-card {
        border: 1px solid #eee;
        border-radius: 6px;
        padding: 15px;
        background-color: #f9f9f9;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease-in-out;
    }

    .post-card:hover {
        transform: translateY(-5px);
    }

    .post-card h2 {
        font-size: 1.3em;
        color: #0056b3;
        margin-top: 0;
        margin-bottom: 10px;
    }

    .post-card p {
        font-size: 0.95em;
        line-height: 1.6;
        color: #555;
    }

    .post-card small {
        display: block;
        margin-top: 10px;
        color: #777;
        font-size: 0.85em;
        text-align: right;
    }
  `]
})
export class SingleFileApiComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  error: string | null = null;
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL de la API

  constructor() { } // Ya NO necesitamos inyectar HttpClient

  ngOnInit(): void {
    this.getPosts();
  }

  // --- Método para hacer la petición con Fetch API ---
  async getPosts(): Promise<void> {
    this.loading = true;
    this.error = null; // Reiniciar cualquier error previo

    try {
      const response = await fetch(this.apiUrl);

      // Manejar respuestas que no son OK (ej. 404, 500)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Post[] = await response.json();
      this.posts = data;
    } catch (err: any) {
      console.error('Error al obtener los posts con Fetch:', err);
      this.error = `No se pudieron cargar los datos. Detalles: ${err.message}`;
    } finally {
      this.loading = false;
    }
  }
}