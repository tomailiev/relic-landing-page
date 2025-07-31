const customOrder = [
    "violin",
    "viola",
    "cello",
    "bass",
    "bassoon",
    "harpsichord",
    "theorbo",
];

// Sort descending based on the custom order
export const sortByNewTitle = (a, b) => {
    const indexA = customOrder.indexOf(a.newTitle.toLowerCase());
    const indexB = customOrder.indexOf(b.newTitle.toLowerCase());

    const rankA = indexA === -1 ? Infinity : indexA;
    const rankB = indexB === -1 ? Infinity : indexB;

    if (rankA !== rankB) {
        return rankA - rankB; // Primary: ascending by custom order
    }

    // Secondary: ascending alphabetical by name
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}; // to get descending order

