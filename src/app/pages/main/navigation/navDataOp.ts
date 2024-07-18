import {NavItem} from "../../../models/navItem.model";

export const navDataOp: NavItem[] = [
  {
    routeLink: '',
    icon: '',
    label: ''
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
  }
];
