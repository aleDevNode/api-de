const { sequelize } = require("../../models");
const { QueryTypes } = require("sequelize");
class Base {
  constructor(base) {
    this.base = base;
  }
  async find(filters) {
    let filter = filters ? Object.keys(filters) : "";
    let value = filters ? filters[filter] : "";
    let where = "";

    try {
      if (filters) {
        where = `WHERE ${filter} = "${value}"`;
      }

      let query = `SELECT * FROM ${this.base} ${where}`;

      // const result = await sequelize.query(query, {type: QueryTypes.SELECT})

      return query;
    } catch (error) {
      throw error;
    }
  }

  async create(objct) {
    let valuesArr = [];
    Object.keys(objct).map((fild) => {
      valuesArr.push(objct[fild]);
    });

    const valuesMap = valuesArr.map((item) => {
      if (typeof item != "number") return '"' + item + '"';
      return item;
    });

    let filders = Object.keys(objct).join(",");
    let values = valuesMap.join(",");

    try {
      const query = `INSERT INTO ${this.base} (${filders}) VALUES (${values})`;
      // const result = await sequelize.query(query, {type: QueryTypes.INSERT})
      return query;
    } catch (error) {
      throw error;
    }
  }
  async findAllMembersUsersFile(queryParams) {
    try {
      const { page = 1 } = queryParams;
      const limit = 20;
      const offset = page < 1 ? 0 : (page - 1) * limit;

      const query = `
            SELECT m.*,f.path,u.id as user_id, 
            (Select COUNT(*) FROM members) AS total from members m
            LEFT JOIN users u
            ON m.id = u.member_id
            INNER JOIN files f 
            ON f.id = m.file_id
            ORDER BY m.rf ASC
            LIMIT ${limit}
            OFFSET ${offset}
            `;
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });

      return {members:result,total:result[0].total,limit};
    } catch (error) {
      throw error.message;
    }
  }
}

module.exports = {
  Base,
};
