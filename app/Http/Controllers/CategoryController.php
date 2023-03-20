<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class CategoryController extends Controller
{
	public function __construct()
	{
		$this->authorizeResource(Category::class);
	}

	public function index()
	{
		$builder = Category::withCount('products')->filterWithPagination();

		$additional = Category::filterAdditional($builder);

		$categories = fn () => CategoryResource::collection($builder)->additional($additional);

		return inertia('Categories/Index', compact('categories'));
	}

	public function store(StoreCategoryRequest $request)
	{
		$validated = $request->validated();

		Category::create($validated);
	}

	public function show(Category $category)
	{
		$categories = fn () => Category::all();

		/* Products Datatable */
		$builder = $category->products()->with('category')->filterWithPagination('products');

		$additional = Product::filterAdditional($builder, 'products');

		$products = fn () => ProductResource::collection($builder)->additional($additional);

		return inertia('Categories/Show', compact('category', 'categories', 'products'));
	}

	public function update(UpdateCategoryRequest $request, Category $category)
	{
		$validated = $request->validated();

		$category->update($validated);
	}

	public function destroy(Category $category)
	{
		$category->delete();
	}

	public function restore(Category $category)
	{
		$category->restore();
	}

	public function forceDelete(Category $category)
	{
		$category->forceDelete();
	}

	public function fetchProducts(Category $category)
	{
		$products = $category->products()->select('id', 'name')->get();

		return response()->json($products);
	}
}
