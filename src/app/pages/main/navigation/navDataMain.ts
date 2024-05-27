// navDataMain.ts
interface NavItem {
  routeLink: string;
  icon: string;
  label: string;
  subItems?: NavItem[];
  isOpen?: boolean; // Agregar propiedad isOpen para controlar la visualización
}

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
