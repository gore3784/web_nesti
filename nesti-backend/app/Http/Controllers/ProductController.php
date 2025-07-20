<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * GET /api/products
     * Tampilkan semua produk
     */
    public function index()
    {
        // Bisa juga with('category') kalau punya relasi
        return response()->json(Product::all());
    }

    /**
     * POST /api/products
     * Simpan produk baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        // buat slug otomatis
        $validated['slug'] = Str::slug($validated['name']);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    /**
     * GET /api/products/{id}
     * Tampilkan detail produk
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * PUT /api/products/{id}
     * Update produk
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * DELETE /api/products/{id}
     * Hapus produk
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function showBySlug($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function decreaseStock(Request $request)
    {
        $items = $request->input('items', []);

        foreach ($items as $item) {
            $product = Product::find($item['id']); // ✅ ambil single model
            if ($product) {
                $product->stock = max($product->stock - $item['quantity'], 0);
                $product->save();
            }
        }

        return response()->json(['message' => 'Stock updated']);
    }

}
