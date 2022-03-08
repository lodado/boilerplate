const [ID, CONTENT, CATEGORY, TIMESTAMP, RECOMMAND] = [1, 2, 3, 4, 5];

export function getTimeline(createdAt) {
  return `${createdAt.slice(0, 10)}, ${createdAt.slice(11, 16)}`;
}

function sortByType(currentTagIndex, orderByAsc) {
  const sortOrder = orderByAsc ? 1 : -1;
  const type = ID;

  function sortByNumber(first, second) {
    return (first[type] - second[type]) * sortOrder;
  }

  function sortByString(first, second) {
    const firstString = first[type].toLowerCase();
    const secondString = second[type].toLowerCase();
    if (firstString > secondString) return 1 * sortOrder;
    if (firstString < secondString) return -1 * sortOrder;
    return 0;
  }

  function sortByTimeStamp(first, second) {
    return (Date.parse(first[type]) - Date.parse(second[type])) * sortOrder;
  }

  switch (currentTagIndex) {
    case CONTENT:
    case CATEGORY:
      return sortByString;
    case TIMESTAMP:
      return sortByTimeStamp;
    case ID:
    case RECOMMAND:
    default:
      break;
  }

  return sortByNumber;
}

export function sortedData({ data, currentTagIndex, orderByAsc }) {
  data.sort(sortByType(currentTagIndex, orderByAsc));
  return data;
}
