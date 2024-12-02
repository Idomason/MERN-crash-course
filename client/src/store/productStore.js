import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Create Product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    const response = await fetch("/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = response.json();

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: data?.message };
  },

  // Fetch Products
  fetchProducts: async () => {
    try {
      const response = await fetch("/api/v1/products");
      const data = await response.json();
      set({ products: data.data });
      return { success: true, data: data };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Failed to fetch products" };
    }
  },

  // Update Product
  updateProduct: async (id, updatedProduct) => {
    try {
      const response = await fetch(`/api/v1/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();

      if (!data?.success) return { success: false, message: data?.message };

      // Update the UI immediately without needing a refresh
      set((state) => ({
        products: state.products.map((product) =>
          product?._id === id ? data.data : product
        ),
      }));
      return { success: true, message: data?.message };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to delete product" };
    }
  },

  // Delete Product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/v1/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!data?.success)
        return { success: false, message: "failed to delete product" };

      // Update the UI immediately without needing a refresh
      set((state) => ({
        products: state.products.filter((product) => product?._id !== id),
      }));
      return { success: true, message: data?.message };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Failed to delete product" };
    }
  },
}));
