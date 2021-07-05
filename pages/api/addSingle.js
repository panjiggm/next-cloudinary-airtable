import { table } from "./utils/Airtable";

export default async function addSingle(req, res) {
  const { fields } = req.body;

  try {
    const createdRecords = await table.create([{ fields }]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
}
