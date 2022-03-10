import "./App.css";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

function App() {
  const [fields, setFields] = useState({
    backgroundImage: "",
    cardImage: "",
    description: "",
    subTitle: "",
    title: "",
    titleImage: "",
    type: "",
    createAt: "",
  });
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const colRef = collection(db, "movies");
  const [editid, setEditid] = useState("");
  // useEffect(() => {
  //   getDocs(collection(db, "movies"))
  //     .then((snapshot) => {
  //       setMovies(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  useEffect(() => {
    onSnapshot(query(colRef, orderBy("title", "asc")), (snapshot) => {
      setMovies(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    console.log(movies);
  }, []);

  const addData = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      backgroundImg: fields.backgroundImage,
      cardImg: fields.backgroundImage,
      description: fields.description,
      subTitle: fields.subTitle,
      title: fields.title,
      titleImg: fields.titleImage,
      type: fields.type,
      createAt: serverTimestamp(),
    }).then(() => {
      setFields({
        backgroundImage: "",
        cardImage: "",
        description: "",
        subTitle: "",
        title: "",
        titleImage: "",
        type: "",
        createAt: "",
      });
    });
  };

  const fieldsHandler = (e) => {
    e.preventDefault();

    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteDoc(doc(db, "movies", id));
      }
    });
  };

  const searchData = async (e) => {
    e.preventDefault();

    getDocs(query(colRef, where("title", "==", search)))
      .then((snapshot) => {
        setMovies(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  // Fetching SIngle Document
  // const docRef = doc(db, "movies", "37FUbylZsibA8Op0SbLe");

  // onSnapshot(docRef, (doc) => {

  //   console.log(doc.id, doc.data());
  // });

  const tes = (event, id) => {
    setEditid(id);
    const docRef = doc(db, "movies", id);

    getDoc(docRef).then((doc) => {
      const data = doc.data();
      setFields({
        backgroundImage: data.backgroundImg,
        cardImage: data.cardImg,
        description: data.description,
        subTitle: data.subTitle,
        title: data.title,
        titleImage: data.titleImg,
        type: data.type,
      });
    });
  };

  const updateData = (e) => {
    e.preventDefault();
    const docRef = doc(db, "movies", editid);

    updateDoc(docRef, {
      backgroundImg: fields.backgroundImage,
      cardImg: fields.backgroundImage,
      description: fields.description,
      subTitle: fields.subTitle,
      title: fields.title,
      titleImg: fields.titleImage,
      type: fields.type,
    }).then(() => {
      setFields({
        backgroundImage: "",
        cardImage: "",
        description: "",
        subTitle: "",
        title: "",
        titleImage: "",
        type: "",
        createAt: "",
      });

      setEditid("");
    });
  };
  return (
    <Container>
      <LeftSide>
        <img src="" alt="" />
        <h5>Disney+ Clone</h5>
        <form onSubmit={!editid ? addData : updateData}>
          <label htmlFor="backgroundImage">Background Image</label>
          {/* <input type="hidden" name="id" id="id" /> */}
          <input
            type="text"
            name="backgroundImage"
            id="backgroundImage"
            onChange={fieldsHandler}
            value={fields.backgroundImage}
          />
          <label htmlFor="cardImage">Card Image</label>
          <input
            type="text"
            name="cardImage"
            id="cardImage"
            onChange={fieldsHandler}
            value={fields.cardImage}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={fieldsHandler}
            value={fields.description}
          />
          <label htmlFor="subTitle">Sub Title</label>
          <input
            type="text"
            name="subTitle"
            id="subTitle"
            onChange={fieldsHandler}
            value={fields.subTitle}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={fieldsHandler}
            value={fields.title}
          />
          <label htmlFor="titleImage">Title Image</label>
          <input
            type="text"
            name="titleImage"
            id="titleImage"
            onChange={fieldsHandler}
            value={fields.titleImage}
          />
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="type"
            id="type"
            onChange={fieldsHandler}
            value={fields.type}
          />
          <button type="submit">
            {editid ? "Update Data" : "Submit Data"}
          </button>
        </form>
      </LeftSide>
      <RightSide>
        <form onSubmit={searchData}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={searchHandler}
            value={search}
            autoComplete="false"
          />
          <button type="submit"></button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Background Image</th>
              <th>Card Image</th>
              <th>Description</th>
              <th>Sub Title</th>
              <th>Title</th>
              <th>Title Image</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <button onClick={deleteData.bind(this, movie.id)}>
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      tes(e, movie.id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <img src={movie.backgroundImg} alt="" />
                </td>
                <td>
                  <img src={movie.cardImg} alt="" />
                </td>
                <td>{movie.description}</td>
                <td>{movie.subTitle}</td>
                <td>{movie.title}</td>
                <td>
                  <img src={movie.titleImg} alt="" />
                </td>
                <td>{movie.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RightSide>
    </Container>
  );
}

export default App;

const Container = styled.div`
  padding: 30px 30px;
  display: flex;
`;
const LeftSide = styled.div`
  width: 30%;
  padding-right: 30px;

  form {
  }

  input {
    display: flex;
    width: 100%;
    height: 40px;
    outline: none;
    border: 2px solid lightgray;
    border-radius: 4px;
    padding: 0 14px;
    font-size: 14px;
    margin-bottom: 12px;
    transition: all 250ms;

    &:focus {
      outline: 2px solid #0066dd;
    }
  }

  label {
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 4px;
    display: block;
  }

  button {
    display: block;
    width: 100%;
    padding: 12px 10px;
    border: none;
    background: #0066dd;
    border-radius: 4px;
    color: white;
    font-weight: 600;
    // text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
    transition: all 250ms;
    &:hover {
      background: #0066dd4d;
    }
  }
`;
const RightSide = styled.div`
  width: 70%;
  form {
    input {
      display: flex;
      width: 100%;
      height: 40px;
      outline: none;
      border: 2px solid lightgray;
      border-radius: 4px;
      padding: 0 14px;
      font-size: 14px;
      margin-bottom: 12px;
      transition: all 250ms;

      &:focus {
        outline: 2px solid #0066dd;
        border: none;
      }
    }
    button {
      visibility: hidden;
    }
  }
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    border: 2px solid lightgray;
    th,
    td {
      padding: 10px;
      border-collapse: collapse;
      border: 2px solid lightgray;
    }

    th {
      background-color: gray;
      color: white;
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
