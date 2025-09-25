export default function extractEventValue(func) {
  return (e) => {
    func(e.target.value);
  };
}
