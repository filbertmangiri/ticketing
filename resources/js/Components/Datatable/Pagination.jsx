const Pagination = ({ meta, params, setParams }) => {
    const { from, to, total, links } = meta;

    return (
        <>
            <p className="text-sm">
                Showing {from} to {to} of {total} entries
            </p>

            {links && (
                <div className="flex gap-x-1">
                    {links.map((link, key) => (
                        <button
                            key={`link-${key}`}
                            type="button"
                            disabled={link.active || !link.url}
                            onClick={() => {
                                setParams({
                                    ...params,
                                    page: new URL(link.url).searchParams.get(
                                        "page"
                                    ),
                                });
                            }}
                            className={`${
                                link.active ? "bg-indigo-600 text-white" : ""
                            } ${
                                link.url
                                    ? "text-black hover:text-white dark:text-white"
                                    : "text-gray-500"
                            } ${
                                link.url && !link.active
                                    ? "hover:bg-indigo-700"
                                    : ""
                            } inline-block rounded px-4 py-2 text-xs font-medium`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Pagination;
