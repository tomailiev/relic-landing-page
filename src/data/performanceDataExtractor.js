function performanceSorter(performances) {
    return performances.sort(
        (a, b) => Number(a.id) - Number(b.id)
    );
}

export const performanceLocationExtractor = (performances) => {
    const sortedPerformances = performanceSorter(performances);

    const uniqueLocations = [
        ...new Set(sortedPerformances.map((p) => p.location)),
    ];

    return uniqueLocations.join(' • ');
}

export const performanceDateExtractor = (performances) => {
    const sortedPerformances = performanceSorter(performances);

    const startDate = new Date(sortedPerformances[0].date);
    const endDate = new Date(sortedPerformances[sortedPerformances.length - 1].date);

    return startDate.toDateString() === endDate.toDateString()
        ? `${startDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`
        : startDate.getMonth() === endDate.getMonth()
            ? `${startDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
            })} - ${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}`
            : `${startDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })} - ${endDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })}`;
}