import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  // const colRef = collection(db, "movies");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getDocs(collection(db, "movies"))
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
  }, []);

  console.log(movies);
  return (
    <Container>
      <LeftSide>Left</LeftSide>
      <RightSide>
        <table>
          <thead>
            <tr>
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
`;
const RightSide = styled.div`
  width: 70%;

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
