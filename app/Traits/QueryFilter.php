<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

trait QueryFilter
{
	public static function filterAdditional($builder, $queriesBag = '', $additional = [])
	{
		$request = request();

		$bag = $queriesBag ? "$queriesBag." : '';

		$default = [
			'attributes' => [
				'total' => $builder->total(),
			],
			'queriesBag' => $queriesBag,
			'queries' => [
				"{$bag}page" => $request->get("{$bag}page") ?? '',
				"{$bag}load" => $request->get("{$bag}load") ?? '',
				"{$bag}q" => $request->get("{$bag}q") ?? '',
				"{$bag}sort" => $request->get("{$bag}sort") ?? '',
				"{$bag}filter" => $request->get("{$bag}filter") ?? '',
			]
		];

		return array_merge($default, $additional);
	}

	public function scopeFilterWithPagination(Builder $builder, $queriesBag = '', $searchableColumns = [], $searchableRelations = [], $sortableColumns = [], $sortableRelations = [], $perPageDefault = 10, $sortDefault = 'id-asc')
	{
		$request = request();

		$bag = $queriesBag ? "$queriesBag." : '';

		$request->validate([
			"{$bag}page" => ['nullable', 'integer', 'min:1'],
			"{$bag}load" => ['nullable', 'integer', 'min:10', 'max:50'],
			"{$bag}q" => ['nullable', 'string', 'min:1', 'max:255'],
			"{$bag}sort" => ['nullable', 'string', 'regex:/^[a-z0-9_]+-(asc|desc)$/i'],
			"{$bag}filter" => ['nullable', 'string', 'in:with-deleted,only-deleted'],
		]);

		$relationDetails = $this->relationDetails;

		/* Search - name="q" */
		$searchableColumns = $this->searchableColumns ?? $searchableColumns;
		$searchableRelations = $this->searchableRelations ?? $searchableRelations;

		$builder = $builder->when($request->get("{$bag}q"), function (Builder $query, $q) use ($searchableColumns, $searchableRelations) {
			return $query
				->where(function (Builder $query) use ($q, $searchableColumns, $searchableRelations) {
					foreach ($searchableColumns as $field) {
						$query->orWhere($this->getTable() . '.' . $field, 'like', "%{$q}%");
					}

					foreach ($searchableRelations as $relation => $columns) {
						if (is_array($columns)) {
							$columns = implode(',', $columns);
						}

						$query->orWhereRelation($relation, $columns, 'like', "%{$q}%");
					}
				});
		});

		/* Sort - name="sort" */
		$sortableColumns = $this->sortableColumns ?? $sortableColumns;
		$sortableRelations = $this->sortableRelations ?? $sortableRelations;

		$builder = $builder->when($request->get("{$bag}sort") ?? $sortDefault, function (Builder $query, $sort) use ($sortableColumns, $sortableRelations, $relationDetails) {
			$sort = explode('-', $sort);

			if (count($sort) !== 2 || !in_array($sort[1], ['asc', 'desc'])) {
				return $query;
			}

			if (in_array($sort[0], $sortableColumns)) {
				return $query->orderBy($sort[0], $sort[1]);
			} elseif (array_key_exists($sort[0], $sortableRelations) && array_key_exists($sort[0], $relationDetails)) {
				$column = $sortableRelations[$sort[0]];
				$relation = $relationDetails[$sort[0]];
				$through = $relation['through'] ?? null;

				return $query->when($through, function ($query) use ($relationDetails, $through) {
					return $query->join(
						$relationDetails[$through]['table'] . ' as ' . $relationDetails[$through]['table'] . '_pivot',
						$relationDetails[$through]['table'] . '_pivot' . '.' . $relationDetails[$through]['local_key'],
						'=',
						$this->getTable() . '.' . $relationDetails[$through]['foreign_key']
					);
				})->orderBy(
					DB::table($relation['table'])
						->select($relation['table'] . '.' . $column)
						->whereColumn(
							$relation['table'] . '.' . $relation['local_key'],
							($through ? ($relationDetails[$through]['table'] . '_pivot') : $this->getTable()) . '.' . $relation['foreign_key']
						),
					$sort[1]
				);
			}

			return $query;
		});

		/* Filter (soft delete) - name="filter" */
		$builder = $builder->when($request->get("{$bag}filter") ?? '', function (Builder $query, $filter) {
			if ($filter == '') {
				return $query->whereNull('deleted_at');
			} elseif ($filter == 'with-deleted') {
				return $query->withTrashed();
			} elseif ($filter == 'only-deleted') {
				return $query->onlyTrashed();
			}

			return $query;
		});

		/* Pagination - name="page" */
		$builder = $builder->fastPaginate($request->get("{$bag}load") ?? $perPageDefault, [$this->getTable() . '.*'], 'page', $request->get("{$bag}page") ?? 1);

		return $builder;
	}
}
