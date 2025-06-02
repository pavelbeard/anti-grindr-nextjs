const currentYear = new Date().getFullYear();
const minimumYear = currentYear - 100;

export default function checkMinimumYear(year: number): boolean {
  return year >= minimumYear;
}

export { minimumYear };
