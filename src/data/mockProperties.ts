import { Property } from "@/types/property";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export const mockProperties: Property[] = [
  {
    id: "1",
    name: "Villa Moderna de Lujo",
    address: "1234 Ocean Drive, Miami Beach, FL 33139",
    price: 2850000,
    image: property1,
    owner: "Maria González",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    description: "Impresionante villa de lujo con arquitectura contemporánea, amplios ventanales y vistas espectaculares. Acabados de primera calidad y diseño excepcional.",
  },
  {
    id: "2",
    name: "Penthouse Skyline Premium",
    address: "789 Park Avenue, Manhattan, NY 10021",
    price: 4200000,
    image: property2,
    owner: "Carlos Rodríguez",
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    description: "Exclusivo penthouse con vistas panorámicas de la ciudad. Interiores de diseñador, cocina gourmet y acabados de lujo en cada detalle.",
  },
  {
    id: "3",
    name: "Casa Familiar Suburbana",
    address: "456 Maple Street, Suburbs, CA 94022",
    price: 1650000,
    image: property3,
    owner: "Ana Martínez",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    description: "Hermosa casa familiar en zona tranquila con amplio jardín. Perfecta para familias que buscan comodidad y espacio al aire libre.",
  },
  {
    id: "4",
    name: "Loft Panorámico Centro",
    address: "321 Downtown Plaza, Chicago, IL 60601",
    price: 3100000,
    image: property4,
    owner: "José López",
    bedrooms: 2,
    bathrooms: 2,
    area: 220,
    description: "Espectacular loft con vistas 360° de la ciudad. Diseño moderno minimalista, cocina de concepto abierto y ubicación privilegiada.",
  },
  {
    id: "5",
    name: "Cottage Encantador",
    address: "654 Garden Lane, Portland, OR 97201",
    price: 895000,
    image: property5,
    owner: "Laura Fernández",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: "Encantador cottage estilo europeo rodeado de jardines florales. Perfecto para quienes buscan tranquilidad y belleza natural.",
  },
  {
    id: "6",
    name: "Apartamento Minimalista",
    address: "987 Modern Street, Seattle, WA 98101",
    price: 1250000,
    image: property6,
    owner: "Roberto Silva",
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    description: "Elegante apartamento de diseño minimalista con luz natural abundante. Ubicación céntrica y acabados contemporáneos de alta calidad.",
  },
];
