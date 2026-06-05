type TFn = (key: string) => string;

export function formatDuration(minutes: number, t: TFn): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const minStr = `${m} ${t('timeUnits.min')}`;
  const hourStr = `${h} ${h === 1 ? t('timeUnits.hour') : t('timeUnits.hours')}`;
  if (h === 0) return minStr;
  if (m === 0) return hourStr;
  return `${hourStr} ${minStr}`;
}
