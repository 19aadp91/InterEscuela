import { Routes } from '@angular/router';
import { SesionGuard } from './core/guards/SesionGuard';

export const routes: Routes = [
    {
        path: '',
        title:'Positiva',
        canActivate: [SesionGuard],
        loadComponent: () => import('./modules/layaut/layaut.component').then(c => c.LayautComponent),
        children: [
            {
                path: '',
                title:'estudiantes',
                loadComponent: () => import('./modules/estudiantes/page/estudiantes.component').then(c => c.EstudiantesComponent)
            },
            {
                path: 'MiUsuario',
                title:'Mi usuario',
                loadComponent: () => import('./modules/mi-usuario/page/mi-usuario.component').then(c => c.MiUsuarioComponent)
            }
        ]
    },
    {
        path: 'login',
        title: 'login',
        loadComponent: () => import('./modules/loguin/page/loguin.component').then(c => c.LoguinComponent),
    }
];
