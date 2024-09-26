import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Notes, setNotes] = useState(() => {
    // Load notes from localStorage, or use the default data if no notes exist
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : data;
  });
  const [count, setCount] = useState(() => {
    // Calculate the initial count based on the length of the loaded notes
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes).length : data.length;
  });

  // Update localStorage whenever Notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(Notes));
  }, [Notes]);

  function remove(id: any) {
    setNotes(Notes.filter((e: { key: any }) => e.key !== id));
  }

  
  function handle() {
    if (!title && !description) {
      alert("Please fill in the required fields");
      return;
    }
    setNotes([...Notes, { key: count, title: title, des: description }]);
    setCount(count + 1);
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="head-container">
            <h1>Notes</h1>
          </div>
          <div className="notes">
            {Notes.map((e: any) => (
              <div className="notes-item" key={e.key}>
                <div style={{ width: "90%" }}>
                  <h4>Title: {e.title}</h4>
                  <p>Content: {e.des}</p>
                </div>
                <button
                  style={{
                    fontSize: "20px",
                    width: "8%",
                    height: "35px",
                    padding: "0 2% 0 2%",
                    color: "black",
                  }}
                  onClick={() => remove(e.key)}
                >
                  X
                </button>
              </div>
            ))}
            <div className="add">
              <h3>Add Notes </h3>
              <input
                type="text"
                placeholder="Add title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit" onClick={handle}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Initial sample data
const data = [
  {
    key: 0,
    title: "Ilaz",
    des: "Ilaz Gashi baba",
  },
  { key: 1, title: "Hamdi", des: "Baba mas Ilazit" },
  {
    key: 2,
    title: "Axhia",
    des: "Ky sosht kerkah me jet",
  },
  {
    key: 3,
    title: "Bruda",
    des: "Man",
  },
];

export default Home;
