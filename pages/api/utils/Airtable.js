var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("form product");

const getMinifyRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }

  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records) => {
  return records.map((record) => getMinifyRecord(record));
};

export { table, getMinifyRecord, minifyRecords };
