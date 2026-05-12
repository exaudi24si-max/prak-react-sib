const firstNames = [
  "Andi", "Budi", "Cici", "Dodi", "Eka", "Fani", "Gita", "Hadi", "Indah", "Joko", "Kiki", "Lina", "Maya", "Nina", "Oscar"
];

export const customers = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const name = `${firstNames[index % firstNames.length]} ${id}`;
  return {
    id,
    name,
    email: `customer${id}@example.com`,
    phone: `0812${String(100 + id).slice(-3)}${String(200 + id).slice(-3)}`,
    loyalty: index % 3 === 0 ? "Bronze" : index % 3 === 1 ? "Silver" : "Gold",
    address: `Jl. Contoh No.${id}, Jakarta`,
    joined: `2025-0${(index % 9) + 1}-15`
  };
});

export function getCustomerById(id) {
  return customers.find((customer) => String(customer.id) === String(id));
}
