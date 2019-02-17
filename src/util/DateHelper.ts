
export function formatDate(date: string) {
  const formatedDate = new Date(date.replace(' ', 'T'));
  const time = `${formatedDate.getHours()}`.length === 1 ? `0${formatedDate.getHours()}` : `${formatedDate.getHours()}`;
  return time;
}


export function getDayFromDateString(dateString: string): string {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === (new Date().getDay())) {
    return 'Today';
  }
  switch (dayOfWeek) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}
