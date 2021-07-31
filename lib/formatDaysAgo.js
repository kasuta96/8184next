
export function formatDaysAgo(value, locale='en') {
  const date = new Date(value);
  const formatter = new Intl.RelativeTimeFormat(locale);
  // seconds
  const second = (date.getTime() - Date.now()) / 1000;
  const secondOfTime = [
    {
      type: 'year',
      value: 31536000
    },
    {
      type: 'week',
      value: 604800
    },
    {
      type: 'day',
      value: 86400
    },
    {
      type: 'hour',
      value: 3600
    },
    {
      type: 'minute',
      value: 60
    },
    {
      type: 'second',
      value: 1
    },
  ]

  let num = 0;
  let type = 'second';
  for (let val of secondOfTime) {
    num = second/val.value;
    if (num <= -1 || num >= 1) {
      type = val.type;  
      break;
    }
  }
  return formatter.format(Math.round(num), type);
}