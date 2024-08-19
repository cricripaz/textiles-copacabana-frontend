import {NavItem} from "../../../models/navItem.model";

export const navDataTintor: NavItem[] = [

  {
    routeLink: '',
    icon: '',
    label: ''
  },
  {
    routeLink: 'recipes',
    icon: 'library_books',
    label: 'Recetas'
  },
  {
    routeLink: 'inventory-dye',
    icon: 'assignment',
    label: 'Inventario',
    isOpen: false // Agregar propiedad isOpen para consistencia
  },
  {
    routeLink: 'orders',
    icon: 'description',
    label: 'Órdenes',
    isOpen: false // Agregar propiedad isOpen para consistencia
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
