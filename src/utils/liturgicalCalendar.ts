import { LiturgicalDay, LiturgicalSeason, LiturgicalColor } from '../types';

export function getLiturgicalDay(date: Date = new Date()): LiturgicalDay {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = dayOfWeekNames[date.getDay()];

  // Format YYYY-MM-DD
  const dateString = date.toISOString().split('T')[0];

  // Calculate Liturgical Season
  let season: LiturgicalSeason = 'Ordinary Time';
  let color: LiturgicalColor = 'green';
  let rank: 'Weekday' | 'Memorial' | 'Feast' | 'Solemnity' = 'Weekday';
  let saintName: string | undefined;

  // Simple liturgical calendar logic for the Roman Rite
  // Easter calculation (Meeus/Jones/Butcher algorithm)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed: 2=March, 3=April
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;

  const easterDate = new Date(year, easterMonth, easterDay);
  const ashWednesday = new Date(easterDate);
  ashWednesday.setDate(easterDate.getDate() - 46);

  const pentecost = new Date(easterDate);
  pentecost.setDate(easterDate.getDate() + 49);

  // Advent start (4th Sunday before Christmas)
  const christmasDate = new Date(year, 11, 25);
  const christmasDayOfWeek = christmasDate.getDay();
  const adventStart = new Date(year, 11, 25);
  adventStart.setDate(25 - (christmasDayOfWeek === 0 ? 28 : christmasDayOfWeek + 21));

  if (date >= ashWednesday && date < easterDate) {
    season = 'Lent';
    color = 'purple';
  } else if (date >= easterDate && date <= pentecost) {
    season = 'Easter';
    color = 'white';
  } else if (date >= adventStart && date < christmasDate) {
    season = 'Advent';
    color = 'purple';
  } else if (
    (date >= christmasDate && date.getFullYear() === year) ||
    (month === 0 && day <= 13)
  ) {
    season = 'Christmas';
    color = 'white';
  } else {
    season = 'Ordinary Time';
    color = 'green';
  }

  // Check major fixed feast days
  const keyFeasts: Record<string, { title: string; rank: 'Solemnity' | 'Feast' | 'Memorial'; color: LiturgicalColor; saint?: string }> = {
    '01-01': { title: 'Solemnity of Mary, Mother of God', rank: 'Solemnity', color: 'white' },
    '01-06': { title: 'The Epiphany of the Lord', rank: 'Solemnity', color: 'white' },
    '01-25': { title: 'Conversion of Saint Paul, Apostle', rank: 'Feast', color: 'white', saint: 'St. Paul' },
    '02-02': { title: 'Presentation of the Lord (Candlemas)', rank: 'Feast', color: 'white' },
    '02-22': { title: 'Chair of Saint Peter, Apostle', rank: 'Feast', color: 'white', saint: 'St. Peter' },
    '03-19': { title: 'Solemnity of Saint Joseph, Husband of Mary', rank: 'Solemnity', color: 'white', saint: 'St. Joseph' },
    '03-25': { title: 'Annunciation of the Lord', rank: 'Solemnity', color: 'white' },
    '04-25': { title: 'Saint Mark, Evangelist', rank: 'Feast', color: 'red', saint: 'St. Mark' },
    '05-01': { title: 'Saint Joseph the Worker', rank: 'Memorial', color: 'white', saint: 'St. Joseph' },
    '05-31': { title: 'Visitation of the Blessed Virgin Mary', rank: 'Feast', color: 'white' },
    '06-24': { title: 'Nativity of Saint John the Baptist', rank: 'Solemnity', color: 'white', saint: 'St. John the Baptist' },
    '06-29': { title: 'Saints Peter and Paul, Apostles', rank: 'Solemnity', color: 'red', saint: 'St. Peter & St. Paul' },
    '07-03': { title: 'Saint Thomas, Apostle', rank: 'Feast', color: 'red', saint: 'St. Thomas' },
    '07-11': { title: 'Saint Benedict, Abbot, Patron of Europe', rank: 'Memorial', color: 'white', saint: 'St. Benedict' },
    '07-22': { title: 'Saint Mary Magdalene', rank: 'Feast', color: 'white', saint: 'St. Mary Magdalene' },
    '07-25': { title: 'Saint James, Apostle', rank: 'Feast', color: 'red', saint: 'St. James' },
    '07-31': { title: 'Saint Ignatius of Loyola, Priest', rank: 'Memorial', color: 'white', saint: 'St. Ignatius of Loyola' },
    '08-06': { title: 'Transfiguration of the Lord', rank: 'Feast', color: 'white' },
    '08-08': { title: 'Saint Dominic, Priest', rank: 'Memorial', color: 'white', saint: 'St. Dominic' },
    '08-15': { title: 'Assumption of the Blessed Virgin Mary', rank: 'Solemnity', color: 'white' },
    '08-20': { title: 'Saint Bernard, Abbot and Doctor of the Church', rank: 'Memorial', color: 'white', saint: 'St. Bernard' },
    '08-27': { title: 'Saint Monica', rank: 'Memorial', color: 'white', saint: 'St. Monica' },
    '08-28': { title: 'Saint Augustine, Bishop and Doctor', rank: 'Memorial', color: 'white', saint: 'St. Augustine' },
    '09-08': { title: 'Nativity of the Blessed Virgin Mary', rank: 'Feast', color: 'white' },
    '09-14': { title: 'Exaltation of the Holy Cross', rank: 'Feast', color: 'red' },
    '09-29': { title: 'Saints Michael, Gabriel, and Raphael, Archangels', rank: 'Feast', color: 'white' },
    '10-01': { title: 'Saint Thérèse of the Child Jesus, Doctor', rank: 'Memorial', color: 'white', saint: 'St. Thérèse of Lisieux' },
    '10-04': { title: 'Saint Francis of Assisi', rank: 'Memorial', color: 'white', saint: 'St. Francis of Assisi' },
    '10-15': { title: 'Saint Teresa of Jesus (Avila), Doctor', rank: 'Memorial', color: 'white', saint: 'St. Teresa of Avila' },
    '10-18': { title: 'Saint Luke, Evangelist', rank: 'Feast', color: 'red', saint: 'St. Luke' },
    '11-01': { title: 'All Saints', rank: 'Solemnity', color: 'white' },
    '11-02': { title: 'All Souls (Commemoration of All the Faithful Departed)', rank: 'Solemnity', color: 'purple' },
    '11-30': { title: 'Saint Andrew, Apostle', rank: 'Feast', color: 'red', saint: 'St. Andrew' },
    '12-08': { title: 'Immaculate Conception of the Blessed Virgin Mary', rank: 'Solemnity', color: 'white' },
    '12-12': { title: 'Our Lady of Guadalupe', rank: 'Feast', color: 'white' },
    '12-25': { title: 'The Nativity of the Lord (Christmas)', rank: 'Solemnity', color: 'white' },
    '12-27': { title: 'Saint John, Apostle and Evangelist', rank: 'Feast', color: 'white', saint: 'St. John' },
  };

  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const key = `${mm}-${dd}`;

  let liturgicalTitle = `${dayOfWeek} of ${season}`;
  if (keyFeasts[key]) {
    const f = keyFeasts[key];
    liturgicalTitle = f.title;
    rank = f.rank;
    color = f.color;
    saintName = f.saint;
  } else if (date.getDay() === 0) {
    rank = 'Solemnity';
    if (season === 'Ordinary Time') color = 'green';
    else if (season === 'Lent' || season === 'Advent') color = 'purple';
    else if (season === 'Easter' || season === 'Christmas') color = 'white';
  }

  // Calculate 4-week Psalter rotation
  // Start of week counter anchored to week of year
  const startOfYear = new Date(year, 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  const weekOfPsalter = (((weekNum - 1) % 4) + 1) as 1 | 2 | 3 | 4;

  return {
    dateString,
    dayOfWeek,
    liturgicalTitle,
    season,
    weekOfPsalter,
    color,
    rank,
    saintName,
  };
}
