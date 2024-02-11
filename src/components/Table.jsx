// ФИО, возраст, адрес (город и название улицы), рост, вес, номер телефона и email-адрес

const response = await fetch('https://dummyjson.com/users/');
let data = await response.json();
let array = data['users'];


const unnecessaryKeys = ['bank', 'bloodGroup', 'birthDate', 'company', 'crypto', 'domain', 'ein', 'eyeColor', 'hair', 'height', 'image', 'ip', 'macAddress', 'password', 'ssn', 'university', 'userAgent', 'username', 'weight'];

const removeKey = (array, keys) => {
  return array.map(obj => {
    const newObj = { ...obj }; // Создаем копию объекта
    keys.forEach(key => {
      delete newObj[key];
    });
    return newObj;
  });
};

console.log(removeKey(array, unnecessaryKeys));

const Table = () => {
  return (
    <div className="mainTable">
      <table>
        <tbody>
          <tr>
            <th>ФИО</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Город проживания</th>
            <th>Улица проживания</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;