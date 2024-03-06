import Category from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  const resposne = await httpClient.get<Category[]>('books/category');
  return resposne.data;
};
