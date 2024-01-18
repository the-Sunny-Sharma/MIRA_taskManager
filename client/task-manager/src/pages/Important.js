import Navbar from "../components/Navbar";

export default function Important() {
  return (
    <>
      <div className="main-container">
        <div className="page-wrapper">
          <Navbar data={{ title: "Important" }} />
          <div className="content-wrapper">
            <h1>imp</h1>
          </div>
        </div>
      </div>
    </>
  );
}
