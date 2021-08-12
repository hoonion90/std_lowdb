import lodash from 'lodash'
import { join, dirname } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFileSync(file)
const db = new LowSync(adapter)

db.read()
// ...
// Note: db.data needs to be initialized before lodash.chain is called.
db.chain = lodash.chain(db.data)

// Instead of db.data, you can now use db.chain if you want to use the powerful API that lodash provides
const post = db.chain
  .get('posts')
  .find({ id: 1 })
  .value() // Important: value() needs to be called to execute chain
db.get('posts')
  .remove({id:1})
  .write()

db.write()

console.log(post)

console.log(db.chain
    .get('posts').value())