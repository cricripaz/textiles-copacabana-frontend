// navDataMain.ts

import {NavItem} from "../../../models/navItem.model";

export const navbarData: NavItem[] = [
  {
    routeLink: '',
    icon: '',
    label: ''
  },
  {
    routeLink: 'dashboard',
    icon: 'pie_chart',
    label: 'Dashboard'
  }, {
    routeLink: 'dashboard-ia',
    icon: 'timeline',
    label: 'Dashboard IA'
  },
  {
    routeLink: 'users',
    icon: 'supervisor_account',
    label: 'Usuarios'
  },
  {
    routeLink: 'customers',
    icon: 'wc',
    label: 'Clientes'
  },
  {
    routeLink: 'inventory-dye',
    icon: 'assignment',
    label: 'Inventario'
  },
  {
    routeLink: 'recipes',
    icon: 'library_books',
    label: 'Recetas'
  },
  {
    routeLink: 'orders',
    icon: 'description',
    label: 'Órdenes'
  },
  {
    routeLink: '',
    icon: 'category',
    label: 'Catálogo',
    isOpen: false,
    subItems: [
      {
        routeLink: 'colors',
        icon: 'palette',
        label: 'Colores'
      },
      {
        routeLink: 'materials',
        icon: 'inventory',
        label: 'Materiales'
      }
    ]
  }
];
