import { useState } from "react";

const Single = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [deal, setDeal] = useState(false);

  const handleChangeUpload = async (e) => {
    // console.log(e.target.files);

    if (e.target.files.length === 0) {
      return;
    }

    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Data Res", data);

      setImgUrl(data.imgUrl);
    } catch (error) {
      console.log("Error Post", error);
    }
  };

  const handleSubmit = async () => {
    const fields = {
      name,
      description,
      img_url: imgUrl,
      deal,
    };

    // console.log("SUBMIT", fields);

    try {
      await fetch("/api/addSingle", {
        method: "POST",
        body: JSON.stringify({ fields }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("err register", error);
    }
  };

  return (
    <>
      <h2>Single (Airtable & Cloudinary)</h2>

      <div>
        <div className="row">
          <div className="six columns">
            <label>name</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="six columns">
            <label>description</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label className="example-send-yourself-copy">
              <input
                type="checkbox"
                onChange={(e) => setDeal(e.target.checked)}
              />
              <span className="label-body">Send a copy to yourself</span>
            </label>
          </div>
          <div className="six columns">
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleChangeUpload}
            />
          </div>
        </div>
        <button className="button-primary" onClick={handleSubmit}>
          Submit Single
        </button>
      </div>
    </>
  );
};

export default Single;
