<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
	public function __invoke(Request $request)
	{
		$request->validate([
			'path' => ['required', 'string'],
			'filename' => ['nullable', 'string', 'max:255'],
		]);

		if ($request->path && Storage::disk()->exists($request->path)) {
			return Storage::download($request->path, $request->filename);
		} else {
			abort(404, 'File not found');
		}
	}
}
