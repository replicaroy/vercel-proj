import React, { useEffect, useState } from "react";
import axios from "axios";

const Assignment = () => {
  const [values, setValues] = useState({ name: "", url: "", date: "" });
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [editing, setEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      // If editing, update existing item
      putData(editItem.id);
    } else {
      // If not editing, submit new item
      postData();
    }
    setValues({ name: "", url: "", date: "" });
    setEditing(false);
  };

  const postData = async () => {
    try {
      let res = await axios.post("http://localhost:8000/objects", values);
      getData();
    } catch (error) {
      console.log(error, ": something wrong");
    }
  };

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8000/objects");
      setData(res.data);
    } catch (error) {
      console.log(error, ": something wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const del = async (i) => {
    try {
      let res = await axios.delete(`http://localhost:8000/objects/${i}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const edit = (item) => {
    setValues({ name: item.name, url: item.url, date: item.date });
    setEditing(true);
    setEditItem(item);
  };

  const putData = async (id) => {
    try {
      let res = await axios.put(`http://localhost:8000/objects/${id}`, values);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const filterValue = (e) => {
    setSelected(e.target.value);
  };
  let filteredValue = selected ? data.filter((ele) => ele.name === selected) : data;

  return (
    <>
      <div className="main-container">
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <div className="select abc">
              <label htmlFor="select">Select Name</label>
              <select id="name" onChange={handleChange} value={values.name}>
                <option id="option" value="">
                  Select
                </option>
                <option id="option" value="Ramu">
                  Ramu
                </option>
                <option id="option" value="Manjeet">
                  Manjeet
                </option>
                <option id="option" value="Sunil">
                  Sunil
                </option>
              </select>
            </div>
            <div className="url abc ">
              <label htmlFor="url">Insert Url</label>
              <input
                type="url"
                value={values.url}
                id="url"
                name="url"
                placeholder=""
                onChange={handleChange}
              />
            </div>

            <div className="date abc ">
              <label htmlFor="date">Select Date</label>
              <input
                type="date"
                value={values.date}
                id="date"
                name="date"
                onChange={handleChange}
              />
            </div>

            <div className="btn-div abc">
              <button className="btn">{editing ? "Update" : "Submit"}</button>
            </div>
          </form>
        </div>
        <br /> <br />

        <div className="container-two">
          <div className="sort-search">
            <div className="sort">
              <select id="name" onChange={filterValue} value={selected} style={{ padding: '10px 80px' }}>
                <option id="option" value="#" disabled> </option>
                <option id="option" value="">Sort By name</option>
                <option id="option" value="#" disabled> </option>
                <option id="option" value="">Relevance</option>
                <option id="option" value="#" disabled> </option>
                <option id="option" value="Ramu">Ramu</option>
                <option id="option" value="#" disabled> </option>
                <option id="option" value="Manjeet">Manjeet</option>
                <option id="option" value="#" disabled> </option>
                <option id="option" value="Sunil">Sunil</option>
              </select>
            </div>
            <div className="search">
              <input type="search" placeholder="Search" />
            </div>
          </div>

          <div className="table-container">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {filteredValue.length > 0 &&
                  filteredValue.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <a href={item.url} target="_blank">
                          {item.url.slice(0, 40) + "......"}
                        </a>
                      </td>
                      <td>{item.date}</td>

                      <td className="btn-td">
                        <button className="btn" onClick={() => del(item.id)}>
                          Delete
                        </button>
                        <button className="btn" onClick={() => edit(item)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignment;
