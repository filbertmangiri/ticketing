<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\Auth\SettingsRequest;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
	public function edit()
	{
		return inertia('Auth/Settings', [
			'userResource' => new UserResource(auth()->user()),
		]);
	}

	public function update(SettingsRequest $request)
	{
		$validated = $request->validated();

		if ($file = $validated['profile_picture']) {
			$file = str_replace('blob:', '', $file);

			$content = file_get_contents($file);

			$extension = explode('/', mime_content_type($file))[1];

			$filename = 'profile-pictures/' . date('Ymd') . '-' . Str::uuid() . '.' . $extension;

			Storage::disk('public')->put($filename, $content);

			if (($profilePicture = $request->user()->profile_picture) && Storage::disk('public')->exists($profilePicture)) {
				Storage::disk('public')->delete($profilePicture);
			}

			$validated['profile_picture'] = $filename;
		} else {
			unset($validated['profile_picture']);
		}

		$request->user()->update($validated);
	}
}
