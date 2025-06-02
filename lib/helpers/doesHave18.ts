export default function doesHave18(dateOfBirth: Date): boolean {
  const today = new Date();

  const difference = today.getTime() - dateOfBirth.getTime();
  const differenceInYears = difference / (1000 * 60 * 60 * 24 * 365.25);
  return differenceInYears >= 18;
}
