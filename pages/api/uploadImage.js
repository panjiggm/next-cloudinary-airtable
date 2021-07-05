import { uploader } from "./utils/Cloudinary";
import { IncomingForm } from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // GET The File Path
  const file = data?.files?.image?.path;

  try {
    const response = await uploader.upload(file, {
      public_id: data?.files?.image?.name,
      use_filename: true,
      unique_filename: false,
    });

    // send this url to Airtable
    const imgUrl = response.url;

    console.log("IMG URL CLDNR", imgUrl);

    res.statusCode = 200;
    res.json({ status: "success", imgUrl });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
};
