<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;

class ProductController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Product::class);
	}

	public function index()
	{
		$categories = fn () => Category::all();

		$builder = Product::with('category')->filterWithPagination();

		$additional = Product::filterAdditional($builder);

		$products = fn () => ProductResource::collection($builder)->additional($additional);

		return inertia('Products/Index', compact('products', 'categories'));
	}

	public function store(StoreProductRequest $request)
	{
		$validated = $request->validated();

		$category = Category::findOrFail($validated['category_id']);

		$category->products()->create($validated);
	}

	public function show(Product $product)
	{
		$product->load('category');

		$categories = fn () => Category::all();

		return inertia('Products/Show', compact('product', 'categories'));
	}

	public function update(UpdateProductRequest $request, Product $product)
	{
		$validated = $request->validated();

		$product->update($validated);
	}

	public function destroy(Product $product)
	{
		$product->delete();
	}

	public function restore(Product $product)
	{
		$product->restore();
	}

	public function forceDelete(Product $product)
	{
		$product->forceDelete();
	}
}
