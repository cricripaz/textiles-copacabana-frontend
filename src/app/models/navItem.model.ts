export interface NavItem {
  routeLink: string;
  icon: string;
  label: string;
  subItems?: NavItem[];
  isOpen?: boolean; // Agregar propiedad isOpen para controlar la visualización
}
