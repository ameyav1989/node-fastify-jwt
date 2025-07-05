const { default: fastify } = require("fastify");
const { sql } = require("@sequelize/core")
const { sequelizePostgres } = require("../database/db.service")

const getUserData = async (username) => {
  // const userData = await sequelize.query(sql`SELECT * FROM users WHERE id = ${username}`);
  const [userData, metadata] = await sequelizePostgres.query(sql`SELECT * FROM services.users`);
  // console.log(userData)
  return userData;
}

const createNewUser = async (userData) => {
  try {
    const query = `
      INSERT INTO services.users (id, username, firstname, lastname, dob, email, mobileno, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
      RETURNING *
    `;

    const [results] = await sequelizePostgres.query(query, {
      bind: [
        userData.userId,
        userData.userName,
        userData.firstname,
        userData.lastname,
        userData.dateofbirth,
        userData.email,
        userData.mobileNo
      ],
      type: sequelizePostgres.QueryTypes.INSERT
    });

    console.log('User inserted successfully:', results[0]);
    return results[0];
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
}

module.exports = { getUserData, createNewUser }
