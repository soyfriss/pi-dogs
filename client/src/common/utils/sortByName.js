export function sortByNameAsc() {
    const collator = new Intl.Collator("en", {
        numeric: true,
        sensitivity: "base",
    });

    return (a, b) => collator.compare(a.name, b.name);
    // return ((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}
