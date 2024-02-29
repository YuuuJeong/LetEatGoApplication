const { createConnection } = require('mysql2/promise');
function calculate(data, a, b, c, d) {
  const result = {};

  data.forEach((prefer) => {
    const made = prefer.made ? 1 : 0;
    const favorite = prefer.favorite ? 1 : 0;
    const sex = prefer.sex === 'Male' ? 1 : 0; // Adjust based on your data structure

    const rate =
      a * prefer.survey + b * prefer.like + c * made + d * prefer.view;

    if (!result[prefer.userId]) {
      result[prefer.userId] = {};
    }
    result[prefer.userId][prefer.foodId] = rate;
  });

  const resultArray = Object.entries(result).map(([userId, foodRatings]) => ({
    userId: parseInt(userId),
    ...foodRatings,
  }));

  const sortedResult = resultArray
    .map((userRatings) => {
      const totalRate = Object.values(userRatings).reduce(
        (sum, rate) => sum + rate,
        0,
      );
      return { userId: userRatings.userId, totalRate: totalRate };
    })
    .sort((a, b) => b.totalRate - a.totalRate)
    .slice(0, 5);

  const items = sortedResult.map((item) => item.foodId);

  return items;
}

exports.handler = async () => {
  try {
    // MySQL 연결 설정
    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    let data = [];

    // Fetch data from Prefer table
    const [rows] = await connection.execute('SELECT * FROM Prefer');

    // Extract unique userids
    const uniqueUserIds = Array.from(
      new Set(rows.map((entry) => entry.userId)),
    );

    // Fetch user sex information
    const [userRows] = await connection.execute(
      'SELECT sex, id FROM User WHERE id IN (?)',
      [uniqueUserIds],
    );

    const sexInfo = {};
    userRows.forEach((user) => {
      sexInfo[user.id] = user.sex;
    });

    // Prepare data for CSV
    rows.forEach((prefer) => {
      const made = prefer.made ? 1 : 0;
      const favorite = prefer.favorite ? 1 : 0;
      const sex = sexInfo[prefer.userId] || 0;

      data.push({
        userId: prefer.userId,
        sex,
        foodId: prefer.foodId,
        survey: prefer.survey,
        like: favorite,
        made,
        view: prefer.view,
      });
    });

    const result = calculate(data, 1, 1, 1, 2);
    // const test = [1, 2, 3, 4, 5];

    let insertQuery =
      'INSERT INTO Top5 (food_id, `rank`, created_at, updated_at) VALUES';

    for (let i = 0; i < result.length; i++) {
      insertQuery += ` (?, ?, NOW(), NOW())${i < result.length - 1 ? ',' : ''}`;
    }

    const values = result.map((foodId, index) => [foodId, index + 1]);

    await connection.execute(insertQuery, [].concat(...values));

    return 'successfully';
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Lambda function encountered an error');
  }
};
