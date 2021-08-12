import lodash from "lodash";
import { LowSync, JSONFileSync } from "lowdb";

const db = new LowSync(new JSONFileSync("test.json"));

db.read();

db.chain = lodash.chain(db.data);

// db.chain.defaults.value({
//     test: 1,
// });
db.chain.defaults({
    test: 1,
}).value();

db.write();
console.log(db.data);