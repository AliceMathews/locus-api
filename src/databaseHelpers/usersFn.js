const bcrypt = require("bcrypt");

//Get a single user from the database given their username
const getUserWithUsername = (db, loginInput) => {
  let queryParams = [loginInput.username];
  let queryString = `
      SELECT *
      FROM users
      WHERE users.username = $1 `;

  return db.query(queryString, queryParams).then(res => {
    if (bcrypt.compareSync(loginInput.password, res.rows[0].password)) {
      return res.rows[0];
    } else {
      return false; //this means wrong pw
    }
  });
};

//Get a single user from the database given their id
const getUserWithID = (db, userID) => {
  let queryParams = [userID];
  let queryString = `
    SELECT *
    FROM users
    WHERE users.id = $1; `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};
exports.getUserWithID = getUserWithID;

//Edit current user profile
const updateUserWithID = (db, newUserParams) => {
  let queryParams = [];
  let queryString = `
      UPDATE users `;

  if (newUserParams.username) {
    queryParams.push(`${newUserParams.username}`);
    queryString += `SET username = $${queryParams.length} `;
  }
  if (newUserParams.password) {
    queryParams.push(`${bcrypt.hashSync(newUserParams.password, 10)}`);

    if (queryParams.length > 1) {
      queryString += `, password = $${queryParams.length} `;
    } else {
      queryString += `SET password = $${queryParams.length} `;
    }
  }
  if (newUserParams.profile_pic) {
    queryParams.push(`${newUserParams.profile_pic}`);

    if (queryParams.length > 1) {
      queryString += `, profile_pic = $${queryParams.length} `;
    } else {
      queryString += `SET profile_pic = $${queryParams.length} `;
    }
  }
  queryParams.push(newUserParams.userID);
  queryString += `WHERE users.id = $${queryParams.length} RETURNING *`;

  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};
exports.updateUserWithID = updateUserWithID;

//Add a new user to the database
const addUser = (db, newUserParams) => {
  let queryParams = [
    newUserParams.username,
    bcrypt.hashSync(newUserParams.password, 10)
  ];
  let queryString = `
        INSERT INTO users `;
  if (newUserParams.profile_pic) {
    queryParams.push(newUserParams.profile_pic);
    queryString += `
        (username, password, profile_pic)
        VALUES ($1, $2, $3)
        RETURNING * `;
  } else {
    queryString += `
        (username, password)
        VALUES ($1, $2)
        RETURNING * `;
  }
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};
exports.addUser = addUser;

//Generate auth token
const generateAuthToken = () => {
  let output = "";
  let i = 24;
  while (i) {
    let arr = [
      String.fromCharCode(Math.floor(Math.random() * 9 + 48)),
      String.fromCharCode(Math.floor(Math.random() * 25 + 97)),
      String.fromCharCode(Math.floor(Math.random() * 25 + 65))
    ];
    output += arr[Math.floor(Math.random() * 3)];
    i--;
  }
  return output;
};

//Log user in
const login = async (db, userInput) => {
  try {
    const userInfo = await getUserWithUsername(db, userInput);
    if (userInfo) {
      const authToken = generateAuthToken();
      userInfo.authToken = authToken;
      return userInfo;
    }
  } catch (err) {
    throw err;
  }
};
exports.login = login;
