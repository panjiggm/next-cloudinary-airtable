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
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // GET The File Path
  const file = data?.files?.image;

  try {
    const multiltiple = file.map((item) => {
      return uploader.upload(item?.path, {
        public_id: item?.name,
        use_filename: true,
        unique_filename: false,
      });
    });

    const response = await Promise.all(multiltiple);
    const urls = response.map((res) => res.url);

    res.statusCode = 200;
    res.json({ status: "success", data: urls });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
};
