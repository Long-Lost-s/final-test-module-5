export const Product = {
  id: Number,
  name: String,
  category: {
    id: Number,
    name: String,
  },
  entryDate: String, // Format: dd/MM/yyyy
  quantity: Number,
};

export const Category = {
  id: Number,
  name: String,
};