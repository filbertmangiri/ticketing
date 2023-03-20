<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
	protected static $resourcePrefixes = [
		'view any',
		'view',
		'create',
		'update',
		'delete',
		'restore',
		'force delete',
	];

	public static function getResourceNames(string $suffix, array|string $except = null): array
	{
		$except = is_array($except) ? $except : [$except];

		$names = [];

		foreach (self::$resourcePrefixes as $prefix) {
			if (!in_array($prefix, $except) && self::where('name', "$prefix $suffix")->exists()) {
				$names[] = "$prefix $suffix";
			}
		}

		return $names;
	}

	public static function getResourcesNames(array $resources, array|string $except = null): array
	{
		$names = [];

		foreach ($resources as $resource) {
			$names = array_merge($names, self::getResourceNames($resource, $except));
		}

		return $names;
	}

	public static function createResource(string $suffix, array|string $except = null): void
	{
		$except = is_array($except) ? $except : [$except];

		foreach (self::$resourcePrefixes as $prefix) {
			if (!in_array($prefix, $except)) {
				self::create(['name' => "$prefix $suffix"]);
			}
		}
	}

	public static function createResources(array $resources, array|string $except = null): void
	{
		foreach ($resources as $resource) {
			self::createResource($resource, $except);
		}
	}

	public static function deleteResource(string $suffix, array|string $except = null): void
	{
		$except = is_array($except) ? $except : [$except];

		foreach (self::$resourcePrefixes as $prefix) {
			if (!in_array($prefix, $except)) {
				self::where('name', "$prefix $suffix")->delete();
			}
		}
	}

	public static function deleteResources(array $resources, array|string $except = null): void
	{
		foreach ($resources as $resource) {
			self::deleteResource($resource, $except);
		}
	}
}
