export interface IBook {
  title: string;
  author: string;
  genre: 'SCIENCE' | 'FICTION' | 'HISTORY' | 'BIOGRAPHY' | 'TECHNOLOGY' | 'OTHER'; // You can expand genres as needed
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}