import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import _ from "lodash";

const response = await fetch("https://dummyjson.com/users/");
let data = await response.json();
let array = data["users"];

const unnecessaryKeys = [
  "bank",
  "bloodGroup",
  "birthDate",
  "company",
  "crypto",
  "domain",
  "ein",
  "eyeColor",
  "hair",
  "height",
  "image",
  "ip",
  "macAddress",
  "password",
  "ssn",
  "university",
  "userAgent",
  "username",
  "weight",
];

const removeKey = (array, keys) => {
  return array.map((obj) => {
    const newObj = { ...obj }; // Создаем копию объекта
    keys.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  });
};

const initialState = {
  search: "",
};

const Table = () => {
  const [initialArray, setInitialArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [values, setValues] = useState(initialState);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/users/");
      let data = await response.json();
      let filteredData = removeKey(data["users"], unnecessaryKeys);
      setInitialArray(filteredData);
      setResultArray(filteredData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredArray = initialArray.filter((user) => {
      // Преобразуем интересующие поля объекта в строку для поиска
      const userInfo =
        `${user.firstName} ${user.lastName} ${user.age} ${user.phone} ${user.email} ${user.address.city} ${user.address.address} ${user.gender}`.toLowerCase();
      return userInfo.includes(values.search.toLowerCase());
    });

    let sortedArray = filteredArray;
    switch (sortType) {
      case "nameUp":
        sortedArray = _.sortBy(filteredArray, ["firstName", "lastName"]);
        break;
      case "nameDown":
        sortedArray = _.orderBy(
          filteredArray,
          ["firstName", "lastName"],
          ["desc"]
        );
        break;
      case "ageUp":
        sortedArray = _.orderBy(filteredArray, ["age"], ["asc"]);
        break;
      case "ageDown":
        sortedArray = _.orderBy(filteredArray, ["age"], ["desc"]);
        break;
      case "genderUp":
        sortedArray = _.orderBy(filteredArray, ["gender"], ["asc"]);
        break;
      case "genderDown":
        sortedArray = _.orderBy(filteredArray, ["gender"], ["desc"]);
        break;
      case "phoneDown":
        sortedArray = _.orderBy(
          filteredArray,
          [(item) => item.phone.substring(1)],
          ["asc"]
        );

        break;
      case "phoneDown":
        sortedArray = _.orderBy(
          filteredArray,
          [(item) => item.phone.substring(1)],
          ["desc"]
        );
        break;
      case "cityUp":
        sortedArray = _.orderBy(filteredArray, ["address.city"], ["asc"]);
        break;
      case "cityDown":
        sortedArray = _.orderBy(filteredArray, ["address.city"], ["desc"]);
        break;
      case "addressUp":
        sortedArray = _.orderBy(filteredArray, ["address.address"], ["asc"]);
        break;
      case "addressDown":
        sortedArray = _.orderBy(filteredArray, ["address.address"], ["desc"]);
        break;
      default:
        // Если sortType не задан, оставляем массив без изменений
        break;
    }

    setResultArray(sortedArray);
  }, [sortType, initialArray, values.search]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          name="search"
          value={values.search.toLowerCase()}
          onChange={changeHandler}
        />
      </div>
      <div className="mainTable">
        <table>
          <tbody>
            <tr>
              <th className="table-header">
                <p>ФИО</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("nameUp")} />
                  <IoIosArrowDown onClick={() => setSortType("nameDown")} />
                </div>
              </th>
              <th className="table-header">
                <p>Возраст</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("ageUp")} />
                  <IoIosArrowDown onClick={() => setSortType("ageDown")} />
                </div>
              </th>
              <th className="table-header">
                <p>Пол</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("genderUp")} />
                  <IoIosArrowDown onClick={() => setSortType("genderDown")} />
                </div>
              </th>
              <th className="table-header">
                <p>Номер телефона</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("phoneUp")} />
                  <IoIosArrowDown onClick={() => setSortType("phoneDown")} />
                </div>
              </th>
              <th className="table-header">
                <p>Город проживания</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("cityUp")} />
                  <IoIosArrowDown onClick={() => setSortType("cityDown")} />
                </div>
              </th>
              <th className="table-header">
                <p>Улица проживания</p>
                <div className="icons">
                  <IoIosArrowUp onClick={() => setSortType("addressUp")} />
                  <IoIosArrowDown onClick={() => setSortType("addressDown")} />
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      {resultArray.map((r, index) => (
        <div className="mainTable" key={index}>
          <table>
            <tbody>
              <tr>
                <th>
                  {r.firstName} {r.lastName}
                </th>
                <th>{r.age}</th>
                <th>{r.gender}</th>
                <th>{r.phone}</th>
                <th>{r.address.city}</th>
                <th>{r.address.address}</th>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default Table;
