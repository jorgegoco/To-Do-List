export default function idNumber(str) {
  return Number(str.replace(/\D/g, ''));
}