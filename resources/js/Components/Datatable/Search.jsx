import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = ({ params, setParams, ...props }) => {
    return (
        <div {...props} className="relative">
            <input
                type="text"
                id="search"
                name="search"
                value={params.q}
                onChange={(e) => {
                    setParams({
                        ...params,
                        q: e.target.value,
                    });
                }}
                className="block w-full rounded-md border-gray-200 py-3 px-4 pl-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                placeholder="Search"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default Search;
